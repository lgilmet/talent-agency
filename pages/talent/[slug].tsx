import groq from "groq";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Model } from "../../utils/dataTypes";
import { sanityClient, urlFor } from "../../utils/sanity";

type Props = {
    model: Model;
};

export default function Talent({ model }: Props) {
    const router = useRouter();
    useEffect(() => {
        document.addEventListener("keydown", detectKeyDown, true);
    });

    // this still bugs when trying to reach after last or before first model
    const detectKeyDown = (e: KeyboardEvent) => {
        if (
            e.key == "ArrowLeft" &&
            model?.previousModel?.slug?.current != null
        ) {
            router.push(`/talent/${model.previousModel.slug.current}`);
        }
        if (e.key == "ArrowRight" && model?.nextModel?.slug?.current !== null) {
            router.push(`/talent/${model.nextModel.slug.current}`);
        }
    };

    return model ? (
        <div className="pt-4 ">
            <div className="grid grid-cols-3 justify-between text-center">
                {model.previousModel ? (
                    <Link href={`/talent/${model.previousModel.slug.current}`}>
                        {"<-"}
                    </Link>
                ) : (
                    <span>-</span>
                )}
                <p>{model.name}</p>

                {model.nextModel ? (
                    <Link href={`/talent/${model.nextModel.slug.current}`}>
                        {"->"}
                    </Link>
                ) : (
                    <span>-</span>
                )}
            </div>
            <div className="flex flex-col md:flex-row-reverse">
                <div className="relative w-full md:w-1/2">
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
                <div className=" md:w-1/2">
                    <p>{model.description}</p>
                    <p>
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
