export interface IBranch {
  name: string;
  code?: string;
  manager?: {
    name: string;
    contact: string;
    email?: string;
  };
  contactNumber?: string;
  email?: string;

  address: {
    district: string;
    city: string;
    town?: string;
    thana?: string;
    addressLine: string;
    postalCode?: string;
  };

  openingHours?: {
    open: string;
    close: string;
  };

  establishedAt?: Date;
  isActive: boolean;
  isDeleted: boolean;

  locationCoordinates?: {
    lat: number;
    lng: number;
  };
}
