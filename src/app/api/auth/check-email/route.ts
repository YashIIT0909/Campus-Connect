import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.models";
import { z } from "zod";
import { emailValidation } from "@/schema/signUpSchema";

const EmailQuerySchema = z.object({
    email: emailValidation,
});

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParam = {
            email: searchParams.get('email')
        };

        const result = EmailQuerySchema.safeParse(queryParam);

        if (!result.success) {
            const emailErrors = result.error.format().email?._errors || [];
            return Response.json({
                success: false,
                message: "Invalid email format.",

            }, { status: 400 });
        }

        const { email } = result.data;

        const existingUser = await UserModel.findOne({ email: email });

        if (existingUser) {
            return Response.json({
                success: false,
                message: "Email is already registered.",

            }, { status: 409 });
        }

        return Response.json({
            success: true,
            message: "Email is available.",

        }, { status: 200 });

    } catch (error) {
        console.error("Error checking email uniqueness:", error);
        return Response.json({
            success: false,
            message: "An error occurred while checking email uniqueness.",

        }, { status: 500 });
    }
}