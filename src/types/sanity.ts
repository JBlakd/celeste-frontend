export interface HomepageSettings {
  _type: 'homepage';
  _id: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;

  heroVideo?: {
    _type: 'file';
    asset: {
      _ref: string;
      _type: 'reference';
      url?: 'string';
    };
  };

  heroText?: string;
  ctaButtonLabel?: string;
  ctaButtonLink?: string;

  featuredProducts?: Array<{
    _id: string;
    title: string;
    sku: string;
    slug: {
      current: string;
    };
    range: {
      slug: {
        current: string;
      };
    };
    image?: {
      asset: {
        url: string;
      };
    };
    lowRes?: {
      _type: 'image';
      asset: {
        _ref: string;
        _type: 'reference';
        url?: string;
      };
    };
  }>;
}

export interface Range {
  _id: string;
  title: string;
  description: string;
  slug: {
    current: string;
  };
  rank: number;
  heroImage?: { asset?: { url: string } };
}

export interface RangeRef {
  _ref: string;
  _type: 'reference';
}

export interface Product {
  _id: string;
  _type: 'product';
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  sku: string;
  description?: string;
  rank: number;
  image?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
      url?: string;
    };
  };
  lowResImage?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
      url?: string;
    };
  };
  lowRes?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
      url?: string;
    };
  };
  highResZoomed?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
      url?: string;
    };
  };
  lowResZoomed?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
      url?: string;
    };
  };
  gallery?: Array<{
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
      url?: string;
    };
  }>;
  range?: Range;
  dimensions?: string;
  finish: ('Matte' | 'Polished')[];
  features?: string[];
}

export interface AboutUsPage {
  _type: 'aboutUs';
  _id: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;

  pageTitle: string;
  mission?: string;
  vision?: string;

  factoryParagraphs?: Array<{
    title?: string;
    body?: string;
  }>;

  factoryCarousel?: Array<{
    image: {
      _type: 'image';
      asset: {
        _ref: string;
        _type: 'reference';
        url?: string;
      };
    };
    title?: string;
    caption?: string;
  }>;
}

export interface ResourceAsset {
  url?: string;
  originalFilename?: string;
  mimeType?: string;
  size?: number;
  _ref?: string;
  _type?: 'reference';
}

export interface ResourceFile {
  _type: 'file';
  asset: ResourceAsset;
}

export interface ResourceItem {
  title: string;
  description?: string;
  file?: ResourceFile | null;
}

export interface ResourcePage {
  _type: 'resourcePage';
  _id: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;

  pageTitle: string;
  paragraphs?: string[];
  resources?: ResourceItem[];
}

export interface Announcement {
  message: string;
  linkText: string;
  linkUrl: string;
}

export interface DeliveryPage {
  _type: 'delivery';
  _id: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;

  pageTitle: string;

  paragraphs?: Array<{
    title?: string;
    body?: string;
  }>;

  map?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
      url?: string;
    };
  };
}

export interface Collaborator {
  _id: string;
  _type: 'collaborator';
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;

  name: string;
  slug: {
    _type?: 'slug';
    current: string;
  };
  website?: string;
  logo: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
      url?: string;
    };
  };
  description?: string;
  contactEmail?: string;
  phone?: string;
  address?: string;
  coordinates?: {
    _type: 'geopoint';
    lat: number;
    lng: number;
    alt?: number;
  };
  rank?: number;
}
