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
      url: string;
    };
  };
  gallery?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  }[];
  tier?: TierRef;
  dimensions?: string;
  finish: 'Matte' | 'Honed' | 'Polished';
  features?: string[];
}
