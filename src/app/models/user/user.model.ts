import { Tips } from "../tips/tips"

export class User {
  id: number
  email: string
  lastname: string
  firstname: string
  username: string
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
