import Link from "next/link";
import React from "react";
import { Model } from "../utils/dataTypes";

type Props = {
    model: Model;
};

export default function ModelLink({ model }: Props) {
    return model ? (
        <div className="bg-yellow-400">
            {model._id} - {model.name} - {model.description}
        </div>
    ) : (
        <div> no model </div>
    );
}
