import { createClient } from "next-sanity";
import {
    createPreviewSubscriptionHook,
    createCurrentUserHook,
} from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";

export const config = {
    dataset: "production",
    projectId: "etfg73eu",
    apiVersion: "2021-10-21",
    useCdn: true,
};

export const sanityClient = createClient(config);

export const urlFor = (source: SanityImageSource) => {
    return imageUrlBuilder(sanityClient).image(source);
};

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const useCurrentUser = createCurrentUserHook(config);
