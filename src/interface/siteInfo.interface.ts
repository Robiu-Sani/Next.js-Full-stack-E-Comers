export interface ISiteInfo {
  number: string;
  email: string;
  name: string;
  logo: string;
  banner: {
    carousel: {
      image: string;
      link: string;
    }[];
    firstImage: {
      image?: string;
      link?: string;
    };
    secondImage: {
      image?: string;
      link?: string;
    };
  };
  socialContact: {
    facebook: string;
    youtube?: string;
    instagrame?: string;
    linkedIn?: string;
    whatsApp?: string;
    twitter?: string;
  };
  addresses: {
    name: string;
    address: string;
  }[];
  mapLink: string;
  footerLinks: {
    name: string;
    url: string;
  }[];
  marqueeText: string;
}
