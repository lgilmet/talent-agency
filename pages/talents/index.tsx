import groq from "groq";
import { GetStaticProps } from "next";
import Link from "next/link";
import ModelLink from "../../components/ModelLink";
import { Model } from "../../utils/dataTypes";
import { sanityClient } from "../../utils/sanity";

type Props = {
    models: Model[];
};

export default function Talents({ models }: Props) {
    return (
        <div className="grid-cols-2 md:grid-cols-3 grid gap-4">
            {models?.map((model) => (
                <Link
                    className="h-[300px]"
                    key={model._id}
                    href={`/talent/${model.slug.current}`}>
                    <ModelLink model={model} />
                </Link>
            ))}
        </div>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const models: Model[] = await sanityClient.fetch(groq`
        *[_type=="model"] | order(name asc){
            _id,
            name,
            slug,
            mainImage
        }
    `);

    return {
        props: {
            models,
        },
    };
};
