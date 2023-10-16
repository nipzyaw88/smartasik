import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

let yuser = null;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'my-project',
      credentials: {
        nama_pengguna: {
          label: 'Username',
          type: 'text',
        },
        katakunci: { label: 'Kata Kunci', type: 'password' }
      },
      async authorize(credentials, req) {
        const payload = {
          nama_pengguna: credentials.nama_pengguna,
          katakunci: credentials.katakunci,
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/auth`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Authorization': 'Basic ' + btoa('moeMoe:09BabyPink'),
                'Content-Type' : 'application/json'
            }
        });

        const resp = await response.json();
        const statusCode = response.status.toString();

        if (response.ok && statusCode === '200') {
          var o = {
            id: resp.id,
            nama: resp.nama
          }
          return o;
        }

        if (!response.ok) {
          throw new Error(response.message);
        }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/',
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    session: ({session, token}) => {
      console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          nama: token.nama
        }
      }
    },
    jwt: ({token, user}) => {
      console.log("JWT Callback", { token, user });
      if (user) {
        return {
          ...token,
          id: user.id,
          nama: user.nama
        };
      }
      return token;
    }
  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code #33FF5D
    logo: '/logo.png', // Absolute URL to image
  },
  debug: false,
});

export { handler as GET, handler as POST }