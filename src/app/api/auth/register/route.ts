import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User.models';
import { signUpValidation } from '@/schema/signUpSchema';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate with Zod
        const validationResult = signUpValidation.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json({ message: 'Invalid data provided' }, { status: 400 });
        }

        const { username, email, password, admissionNumber, hostel } = body;

        // Connect to database
        await dbConnect();

        // Check if user exists
        const existingUser = await UserModel.findOne({
            $or: [
                { email },
                { username },
                { AdmissionNumber: admissionNumber }
            ]
        });

        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            AdmissionNumber: admissionNumber,
            Hostel: hostel,
            LostOrFound: []
        });

        return NextResponse.json({ message: 'Registration successful' }, { status: 201 });
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json({ message: error.message || 'Registration failed' }, { status: 500 });
    }
}