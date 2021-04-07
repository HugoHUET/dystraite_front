import { Tips } from "../tips/tips"

export class User {
    id: number
    email: string
    lastname: string
    firstname: string
    birthdate: Date
    latitude: number
    longitude: number
    city: string
    zipcode: number
    role: string
    profilePicture: string
    speechtherapist: User
    tips: Tips[]
    likedTips: Tips[]
}
