/*import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  console.log({ session });

  // If there's no session, redirect to the sign-in page
  if (!session) {
    // You can customize the sign-in URL as needed
    const signInUrl = new URL('/auth/signin', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // If there is a session, allow the request to continue
  return NextResponse.next();
}

export const config = { 
  matcher: ['/analytics'] // This should match the routes you want to protect
};
*/

export { default } from 'next-auth/middleware';

export const config = { matcher: ['/analytics'] };