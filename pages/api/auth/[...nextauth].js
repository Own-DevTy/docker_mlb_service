import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                user_id: {label: "Username", type: "text", placeholder: "아이디"},
                password: {label: "Password", type: "password", placeholder: "비밀번호"}
            },
            async authorize(credentials, req) {
                // const user = { id: "1", name: "taeyang", email: "tae_yang__@naver.com"}
                const {user_id, password} = credentials;


                if(user) {
                    return user;
                }else{
                    return null;
                }
            },
        })
    ],
    secret: 'pythonMlbBackSecret',
    // pages: {},
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60,
        updateAge: 2 * 24 * 60 * 60
    },
    callbacks: {
        async jwt({token, account}){
            if(account){
                token.accessToken = account.access_token
            }
            return token
        },
        async session({session, token, user}) {
            session.user = token.user;
            return session;
        },
        async redirect({url, baseUrl}){
            if(url.startsWith("/")){
                return `${baseUrl}{$url}`;
            }else if(new URL(url).origin === baseUrl){
                return `${baseUrl}`;
            }
            return baseUrl
        }
    }
}

export default NextAuth(authOptions)