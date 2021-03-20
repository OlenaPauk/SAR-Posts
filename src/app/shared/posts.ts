
export interface IPost {
    id: number;
    title: string;
    body: string;
}
export interface IPhoto {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}
export class Post implements IPost {
    constructor(public id: number, public title: string, public body: string) { }
}