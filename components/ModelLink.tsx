import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Model } from "../utils/dataTypes";
import { urlFor } from "../utils/sanity";

type Props = {
    model: Model;
};

export default function ModelLink({ model }: Props) {
    return model ? (
        <div className="bg-yellow-400 h-full">
            {model.name} - {model.description}
            {model.mainImage && (
                <Image
                    className="h-full"
                    layout="responsive"
                    objectFit="cover"
                    alt={`Model portrait of ${model.name}`}
                    src={urlFor(model.mainImage)?.url()}
                    width={1}
                    height={1}
                />
            )}
        </div>
    ) : (
        <div> no model </div>
    );
}
