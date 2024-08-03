// import { NextResponse } from 'next/server';
// export function middleware(req) {
//   console.log(req);
//   return NextResponse.redirect(new URL('/about', req.url));
// }
// redirect from specified routes only
// export const config = {
//   matcher: ['/account'],
// };

import { auth } from '@/app/_lib/auth';
export const middleware = auth; // + specify cb in authConfig

// redirect from specified routes only = protects these routes
export const config = {
  matcher: ['/account'],
};
