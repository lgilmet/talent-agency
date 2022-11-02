import groq from "groq";
import { GetStaticProps } from "next";
import { Model } from "../../utils/dataTypes";
import { sanityClient } from "../../utils/sanity";

type Props = {
    model: Model;
};

export default function Talent({ model }: Props) {
    console.log(model);

    return model ? (
        <div>
            {model._id} - {model.name}
            {/* {model.mainImage} */}
            {model.description}
        </div>
    ) : (
        <div>this model cant be retrieved</div>
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
        name,
        mainImage,
        description
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
