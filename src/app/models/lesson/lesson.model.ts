import { Tag } from "../tag/tag.model"

export class Lesson {
    id: number
    title: string
    description: string
    content: string
    thumbnail: string
    video: string
    createdAt: Date
    tags: Tag[]
}
