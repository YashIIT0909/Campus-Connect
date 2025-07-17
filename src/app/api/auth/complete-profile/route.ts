import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User.models';

export async function POST(request: Request) {
    try {
        const { email, admissionNumber, hostel } = await request.json();

        if (!email || !admissionNumber || !hostel) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        await dbConnect();

        // Check if admission number is already used
        const existingAdmission = await UserModel.findOne({ AdmissionNumber: admissionNumber });
        if (existingAdmission && existingAdmission.email !== email) {
            return NextResponse.json({ message: 'Admission number already in use' }, { status: 409 });
        }

        // Update the user profile
        const updatedUser = await UserModel.findOneAndUpdate(
            { email },
            {
                AdmissionNumber: admissionNumber,
                Hostel: hostel,
                needsProfileCompletion: false
            },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ message: 'Failed to update profile' }, { status: 500 });
    }
}