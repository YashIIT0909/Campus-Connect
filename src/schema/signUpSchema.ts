import { z } from 'zod';


export const hostelList = [
    "Aquamarine",
    "Sapphire",
    "Amber",
    "Topaz",
    "Diamond",
    "Jasper",
    "Ruby & Rosaline",
    "Emerald",
    "Opal",
    "international"
] as const;

export const usernameValidation = z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(20, { message: 'Username must be at most 20 characters long' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, and underscores' });


export const signUpValidation = z.object({
    username: usernameValidation,
    email: z.email({ message: 'Invalid email address' }),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(128, { message: 'Password must be at most 128 characters long' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[\W_]/, { message: 'Password must contain at least one special character' }),
    admissionNumber: z.string(),
    hostel: z.enum(hostelList),


})