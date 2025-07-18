import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.models";
import bcrypt from "bcryptjs";
import { signUpValidation } from "@/schema/signUpSchema";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing Google Client ID or Secret in environment variables");
}

const GoogleClientId: string = process.env.GOOGLE_CLIENT_ID;
const GoogleClientSecret: string = process.env.GOOGLE_CLIENT_SECRET;

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: GoogleClientId,
            clientSecret: GoogleClientSecret,
        }),

        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials): Promise<any> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password required");
                }

                await dbConnect();

                try {
                    const user = await UserModel.findOne({ email: credentials.email });

                    if (!user) {
                        console.error("User not found");
                        throw new Error("Invalid email or password");
                    }

                    // Skip password check for Google users
                    if (user.password) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (!isPasswordCorrect) {
                            console.error("Incorrect password");
                            throw new Error("Invalid email or password");
                        }
                    } else {
                        // If user registered with Google and has no password
                        throw new Error("Please sign in with Google");
                    }

                    return {
                        id: (user._id as { toString(): string }).toString(),
                        email: user.email,
                        username: user.username,
                        admissionNumber: user.AdmissionNumber,
                        hostel: user.Hostel
                    };
                } catch (error: any) {
                    console.error("Authentication error:", error);
                    throw new Error(error.message || "Authentication failed");
                }
            }
        })

    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                await dbConnect();

                // Check if user exists in our DB
                let dbUser = await UserModel.findOne({ email: user.email });

                if (!dbUser) {
                    try {
                        // Create temp user with placeholder values
                        dbUser = await UserModel.create({
                            username: user.name?.replace(/\s+/g, '') || user.email?.split('@')[0],
                            email: user.email,
                            // Use placeholder values for required fields
                            password: await bcrypt.hash(Math.random().toString(36), 10),
                            AdmissionNumber: "PENDING",
                            Hostel: "Aquamarine", // Default value, will update later
                            needsProfileCompletion: true // Add this field to your schema
                        });
                    } catch (error) {
                        console.error("Error creating user:", error);
                        return false;
                    }
                }

                if (dbUser.needsProfileCompletion) {
                    return `/complete-profile?email=${encodeURIComponent(user.email ?? "")}`;
                }

                return true;
            }
            // Explicitly return false for non-google providers or if no return above
            return false;
        },

        async jwt({ token, user }) {
            if (user) {
                await dbConnect();
                const dbUser = await UserModel.findOne({ email: user.email });
                if (dbUser) {
                    const parsed = signUpValidation.safeParse({
                        username: dbUser.username,
                        email: dbUser.email,
                        password: dbUser.password,
                        admissionNumber: dbUser.AdmissionNumber,
                        hostel: dbUser.Hostel,
                    });
                    if (!parsed.success) {
                        throw new Error("User data validation failed");
                    }
                    token.id = (dbUser._id as string | { toString(): string }).toString();
                    token.username = dbUser.username;
                    token.email = dbUser.email;
                    token.admissionNumber = dbUser.AdmissionNumber;
                    token.hostel = dbUser.Hostel;
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.email = token.email as string;
                session.user.admissionNumber = token.admissionNumber as string;
                session.user.hostel = token.hostel as string;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        error: '/sign-up', // This redirects all auth errors to sign-up page
        signIn: '/sign-in',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
