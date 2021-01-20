import { Tag } from "../tag/tag.model"

export class Book {
    id: number
    title: string
    description: string
    link: string
    thumbnail: string
    createdAt: Date
    tags: Tag[]
}
