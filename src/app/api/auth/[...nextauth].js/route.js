import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "joe@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required")
                }
                try {
                    const user = await User.findOne({ email: credentials.email })
                    if (!user) {
                        throw new Error("Invalid email or password")

                    }
                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
                    if (!isPasswordValid) {
                        throw new Error("Invalid email or password")
                    }

                    return { id: user._id.toString(), email: user.email }


                } catch (error) {
                    throw new Error(error)
                }



            }
        })

    ],

    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.id = user.id
            }
            return token
        }
    }
}

export default NextAuth(authOptions)