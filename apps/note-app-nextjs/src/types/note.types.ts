export type Note = {
    id: string;
    link?: string;
    image?: string;
    title: string;
    description: string;
    color?: Color;
    creationDate?: Date;
    lastUpdatedDate?: Date;
    dueDate?: Date;
    category?: Category;
}

export enum Color {
    red = 'red',
    green = 'green',
    blue = 'blue',
    yellow = 'yellow',
}

export enum Category {
    work = 1,
    study = 2,
    personal = 3,
    relationship = 4
}

export type FetchNotesAction = 'set_init' | 'set_load_more';