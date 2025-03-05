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
}

export type Entry = {
    id: number;
    car: Car;
    date: Date;
    odometer: number;
    description: string;
    amount: number;
    place: string | null;
    tags: string;
}

export type User = {
    id: string;
    username: string;
    hash: string;
    email: string;
    cars: Car[];
}
