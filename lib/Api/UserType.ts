export interface User {
  created_at: Date;
  email: string;
  email_verified: boolean;
  identities: Identity[];
  user_metadata: UserMetadata;
  name: string;
  nickname: string;
  picture: string;
  user_id: string;
  family_name: string;
  given_name: string;
}

export interface Identity {
  connection: string;
  provider: string;
  user_id: string;
  social: boolean;
}

export interface UserMetadata {
  notifications: Notification[];
  advertisements: Advertisement[];
  driver: Driver;
}

export interface Advertisement {
  id: number;
  title: string;
  types: Type[];
  details: Details;
  responded: Responded[];
  price: number;
  date: Date;
  period: number;
  description: string;
  status: string;
  deliver_from: string;
  deliver_to: string;
  driver_id: number;
  phone_number: string;
  user_id: string;
}

export interface Details {
  id: number;
  height: number;
  width: number;
  length: number;
  weight: number;
  people_count: number;
  advertisement_id: number;
}

export interface Responded {}

export interface Type {
  id: number;
  name: string;
}

export interface Driver {
  id: number;
  experience: number;
  description: string;
  name: string;
  types: Type[];
  advertisements: Advertisement[];
  user_id: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  time_stamp: Date;
  user_id: string;
}
