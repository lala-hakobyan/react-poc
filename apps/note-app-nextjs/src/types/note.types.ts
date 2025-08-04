export type Note = {
    id: string;
    link?: string;
    image?: string;
    title: string;
    description: string;
    color?: Color;
    priority?: Priority;
    creationDate?: Date;
    lastUpdatedDate?: Date;
    dueDate?: Date;
    category?: Category;
}

export enum Priority {
    high = 'high',
    low = 'low',
    medium = 'medium'
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