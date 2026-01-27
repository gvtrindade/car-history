export type Car = {
  id: string;
  name: string;
  model: string;
  year: number;
  brand: string;
  color: string;
  plate: string;
  renavam: string;
  aquired_year: number;
  user_id: string;
  linked_emails?: string[];
};

export type Entry = {
  id: number;
  car_id: string;
  date: Date;
  odometer: number;
  description: string;
  amount: number;
  place: string | null;
  tags: string;
};

export type User = {
  id: string;
  email: string;
  hash: string;
  is_deleted: boolean;
  is_admin: boolean;
  is_validated: boolean;
};

export type EmailData = {
  to: string;
  subject: string;
  template: "signup" | "forgot-password";
  url: string;
};
