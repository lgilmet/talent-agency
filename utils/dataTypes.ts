interface SanityBody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _updatedAt: string;
}

interface Image {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
}

interface Slug {
    _type: "slug";
    current: "string";
}

export interface Link extends SanityBody {
    _type: "link";
    linkUrl: string;
    title: string;
}

export interface Model extends SanityBody {
    _type: "model";
    name: string;
    slug: Slug;
    mainImage: Image;
    description: string;
    links: Link[];
    nextModel: Model;
    previousModel: Model;
}
