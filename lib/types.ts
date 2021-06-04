export interface Tag {
  label: string;
  value: string;
}

export interface Order {
  id: number | string;
  title: string;
  departure: string;
  destination: string;
  phoneNumber: string;
  details?: {
    weight?: number;
    height?: number;
    width?: number;
    length?: number;
    peopleCount?: number;
  }
  date?: string;
  tags?: Tag[];
  price?: number;
  description: string;
}

export interface Driver {
  id: number | string;
  fullName: string;
  experience: string;
  description?: string;
  tags: Tag[];
}

export interface Point {
  lat: number;
  lng: number;
}

export interface Notification {
  id: string | number;
  title: string;
  text: string;
}