import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import axios from "axios";

export const handler = (req, res) => {
    // credentials :(
    
    return NextAuth(req, res, {
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_SECRET,
                authorization: {
                    params: {
                        prompt: "consent",
                        access_type: "offline",
                        response_type: "code"
                    }
                }
            }),

            LinkedInProvider({
                clientId: process.env.LINKEDIN_CLIENT_ID,
                clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
                client: { token_endpoint_auth_method: "client_secret_post" },
                scope: "r_liteprofile r_emailaddress",
                issuer: "https://www.linkedin.com",
                userinfo: {
                    url: "https://api.linkedin.com/v2/userinfo",
                },
                tokenUri: "https://www.linkedin.com/oauth/v2/accessToken",
                wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
                authorization: {
                    url: "https://www.linkedin.com/oauth/v2/authorization",
                    params: {
                        scope: "profile email openid",
                        prompt: "consent",
                        access_type: "offline",
                        response_type: "code",
                    },
                },
                token: {
                    url: "https://www.linkedin.com/oauth/v2/accessToken",
                },
                jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
                async profile(profile) {
                    return {
                        id: profile.sub,
                        name: profile.name,
                        firstname: profile.given_name,
                        lastname: profile.family_name,
                        email: profile.email,
                    };
                },
            })
        ],
        pages: {
            signIn: '/login'
        },
        jwt: {
            maxAge: 60 * 60 * 24 * 30,
        },
        session: {
            strategy: 'jwt',
            maxAge: 30 * 24 * 60 * 60,
        },
        secret: process.env.NEXTAUTH_SECRET,
        callbacks: {
            async redirect({ url, baseUrl }) {
                return baseUrl + "/validate";
            },

            session: async ({ session, token }) => {
                session.accessToken = token.accessToken;
                return session;
            },

            async signIn({ account, profile }) {
                return true;
            },

            jwt: async ({ token, user, account }) => {
                if (account && account.access_token) {
                    // set need things for backend validation
                    token.provider = account.provider;
                    token.accessToken = account.access_token;
                }
                return token
            },
        },
    })
};
export { handler as GET, handler as POST };
