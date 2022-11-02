/* eslint-disable @next/next/no-img-element */
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
        <div className=" bg-yellow-400 ">
            {model.mainImage && (
                <div className="p-1">
                    <img
                        className="object-cover object-center h-[200px] w-full"
                        alt={`Portrait of ${model.name}`}
                        src={urlFor(model.mainImage)?.url()}
                    />
                </div>
            )}
            <div className="p-1">{model.name}</div>
        </div>
    ) : (
        <div> no model </div>
    );
}
