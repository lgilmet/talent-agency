import groq from "groq";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Model } from "../../utils/dataTypes";
import { sanityClient, urlFor } from "../../utils/sanity";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

type Props = {
    model: Model;
};

export default function Talent({ model }: Props) {
    const router = useRouter();
    useEffect(() => {
        document.addEventListener("keydown", detectKeyDown, true);
    });

    // This throws: Error: Loading initial props cancelled
    const detectKeyDown = (e: KeyboardEvent) => {
        if (e.key == "ArrowLeft" && model?.previousModel?.slug != null) {
            router.push(`/talent/${model.previousModel.slug.current}`);
        }
        if (e.key == "ArrowRight" && model?.nextModel?.slug?.current != null) {
            router.push(`/talent/${model.nextModel.slug.current}`);
        }
    };

    return model ? (
        <div className="pt-4 ">
            <div className="flex justify-between items-center ">
                <div>
                    {model.previousModel ? (
                        <Link
                            href={`/talent/${model.previousModel.slug.current}`}>
                            <ArrowLeftIcon className="h-4" />
                        </Link>
                    ) : (
                        <span className="opacity-20">
                            <ArrowLeftIcon className="h-4" />
                        </span>
                    )}
                </div>
                <p className="text-xl md:text-3xl font-semibold">
                    {model.name}
                </p>

                <div>
                    {model.nextModel ? (
                        <Link href={`/talent/${model.nextModel.slug.current}`}>
                            <ArrowRightIcon className="h-4" />
                        </Link>
                    ) : (
                        <span className="opacity-20">
                            <ArrowRightIcon className="h-4" />
                        </span>
                    )}
                </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse mt-4">
                <div className="relative w-full md:w-1/2 md:pb-4">
                    {model.mainImage && (
                        <Image
                            className="border-4 border-yellow-400"
                            layout="responsive"
                            objectFit="contain"
                            alt={`Model portrait of ${model.name}`}
                            src={urlFor(model.mainImage)?.url()}
                            width={1}
                            height={1}
                        />
                    )}
                </div>
                <div className=" md:w-1/2 md:pr-4 pb-4 pt-4 md:pt-0">
                    <p>{model.description}</p>
                    <p className="mt-5">
                        {model.links?.map((link) => (
                            <Link
                                key={link._id}
                                href={link.linkUrl}
                                className="underline"
                                target="_blank">
                                {link.title}
                            </Link>
                        ))}
                    </p>
                </div>
            </div>
            {model.mainImage && (
                <Image
                    layout="responsive"
                    objectFit="contain"
                    alt={`Model portrait of ${model.name}`}
                    src={urlFor(model.mainImage)?.url()}
                    width={1}
                    height={1}
                />
            )}
        </div>
    ) : (
        <div>This model could not be retrieved.</div>
    );
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(
        groq`*[_type == "model" && defined(slug.current)][].slug.current`
    );

    return {
        paths: paths.map((slug: any) => ({ params: { slug } })),
        fallback: true,
    };
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const slug = params?.slug;
    const model = await sanityClient.fetch(
        groq`
        *[_type=="model" && slug.current == $slug][0] {
        _id,
        next, 
        slug,
        name,
        mainImage,
        description,
        links[]->{_id, linkUrl, title},
        'nextModel': *[_type=="model" && name > ^.name][0] { name, slug },
        'previousModel': *[_type=="model" && name < ^.name][0] { name, slug },
    }
    `,
        { slug }
    );

    return {
        props: {
            model,
        },
    };
};
