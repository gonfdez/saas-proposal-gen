import { type NextRequest } from 'next/server'
import { updateSessionAndProtectRoutes } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSessionAndProtectRoutes(request)
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};