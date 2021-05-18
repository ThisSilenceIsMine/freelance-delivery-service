export interface Tag {
  label: string;
  value: string;
}

export interface Order {
  title: string;
  departure: string;
  destination: string;
  tags: Tag[];
}