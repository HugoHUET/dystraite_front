import { User } from "../user/user.model"

export class Tips {
    id: number
    content: string
    createdAt: Date
    liked: User[]
}
