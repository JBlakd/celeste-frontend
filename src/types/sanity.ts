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
  image?: {
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
  highResZoomed?: {
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
  range?: RangeRef;
  dimensions?: string;
  finish: 'Matte' | 'Honed' | 'Polished';
  features?: string[];
}
