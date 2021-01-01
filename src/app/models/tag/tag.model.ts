import { Book } from "../book/book.model"
import { Lesson } from "../lesson/lesson.model"

export class Tag {
    id: number
    title: string
    description: string
    color: string
    lessons: Lesson[]
    books: Book[]
}
