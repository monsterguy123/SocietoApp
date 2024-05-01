import zod,{object} from 'zod'

export const userSchema = object({
    name:zod.string().max(20),
    email:zod.string().email().includes('@'),
    password:zod.string().min(6).max(20),
    FlatNo:zod.string(),
    society:zod.string(),
    PhoneNo:zod.string().min(10).max(10)
})

export type UserSchema = zod.infer<typeof userSchema>

export const userSigninSchema = object({
    email:zod.string().email().includes('@'),
    password:zod.string().min(8).max(20),
})

export type UserSigninSchema = zod.infer<typeof userSchema>