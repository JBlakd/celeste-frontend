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
    slug: {
      current: string;
    };
    tier: {
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

export interface Tier {
  _id: string;
  title: string;
  description: string;
  slug: {
    current: string;
  };
  rank: number;
  heroImage?: { asset?: { url: string } };
}

export interface TierRef {
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
  gallery?: Array<{
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  }>;
  tier?: TierRef;
  dimensions?: string;
  finish: 'Matte' | 'Honed' | 'Polished';
  features?: string[];
}
