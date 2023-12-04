import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: '아이디',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: '비밀번호',
                },
            },
            async authorize(credentials, req) {
                const { username, password } = credentials!;
                const payload = new URLSearchParams();
                payload.append('username', username);
                payload.append('password', password);
                const res = await fetch(`${process.env.api}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: payload,
                });

                const user = await res.json();

                if (res.ok && user) {
                    return user;
                }

                return null;
            },
        }),
    ],
    callbacks: {
        // @ts-ignore
        async redirect({ url, baseUrl }) {
            if (url.startsWith('/')) {
                return `${baseUrl}${url}`;
            } else if (new URL(url).origin === baseUrl) {
                return url;
            }
            return baseUrl;
        },
        // @ts-ignore
        async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        // @ts-ignore
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
    pages: {
        signIn: '/signin',
        // error: '/signin',
    },
};

export default NextAuth(authOptions);
