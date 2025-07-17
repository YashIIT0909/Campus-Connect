import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            email: string;
            admissionNumber: string;
            hostel: string;
        } & DefaultSession["user"];
    }
}