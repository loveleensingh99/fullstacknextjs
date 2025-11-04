import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;

        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        if (pathname === "/" || pathname.startsWith("/api/videos")) {
          return true;
        }

        if (token) {
          return true;
        }

        // Explicitly return false if none of the above conditions are met
        return false;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image | favicon.ico | public/).*)"],
};
//what is mean by this ?
