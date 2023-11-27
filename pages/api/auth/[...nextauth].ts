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
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        // @ts-ignore
        async jwt({ token }) {
            return token;
        },
        // @ts-ignore
        async session({ session }) {
            console.log(session);
            return session;
        },
        // @ts-ignore
        async redirect({ url, baseUrl }) {
            if (url.startsWith('/')) {
                return `${baseUrl}{$url}`;
            } else if (new URL(url).origin === baseUrl) {
                return `${baseUrl}`;
            }
            return baseUrl;
        },
    },
};

export default NextAuth(authOptions);
