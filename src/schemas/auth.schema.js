import {z} from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: "Username is required"
    }).min(3, {
        message: "Username must contain at least 3 characters"
    }).max(50, {
        message: "Username must contain no more than 50 characters"
    }),

    email: z.string({
        required_error: "Mail is required"
    }).email({
        message: "Invalid email address"
    }),

    password: z.string({
        required_error: "Password is required"
    }).min(8,{
        message: "Password must contain at least 8 characters"
    }).regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter"
    }).regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter"
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Mail is required"
    }).email({
        message: "Invalid email address"
    }),

    password: z.string({
        required_error: "Password is required"
    }).min(8,{
        message: "Password must contain at least 8 characters"
    }).regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter"
    }).regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter"
    })
})