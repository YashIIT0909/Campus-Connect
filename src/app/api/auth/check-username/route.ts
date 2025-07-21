import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.models";
import { z } from "zod";
import { usernameValidation } from "@/schema/signUpSchema";


const UserQuerySchema = z.object({
    username: usernameValidation,
})

export async function GET(request: Request) {

    await dbConnect();

    try {

        const { searchParams } = new URL(request.url);
        const queryParam = {
            username: searchParams.get('username')
        }

        const result = UserQuerySchema.safeParse(queryParam)

        console.log(result)

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: "Invalid username format.",

            }, { status: 400 });
        }

        const { username } = result.data;

        const existingUser = await UserModel.findOne({ username: username })

        if (existingUser) {
            return Response.json({
                success: false,
                message: "Username is already taken.",

            }, { status: 409 });
        }

        return Response.json({
            success: true,
            message: "Username is available.",

        }, { status: 200 });

    } catch (error) {
        console.error("Error checking username uniqueness:", error);
        return Response.json({
            success: false,
            message: "An error occurred while checking username uniqueness.",

        }, { status: 500 });

    }

}