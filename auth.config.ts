import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

            // old solution
            // if(isOnDashboard) {
            //     if(isLoggedIn) return true;
            //     return false;
            // } else if (isLoggedIn) {
            //     return Response.redirect(new URL('/dashboard', nextUrl))
            // }

            // new solution
            if (isOnDashboard && !isLoggedIn) {
                return false;
            }

            if (!isOnDashboard && isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }

            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;