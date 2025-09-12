import { routing } from '@/i18n/routing';
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import {
  protectedWhenUnauthenticated,
  protectedWhenAuthenticated,
  startsWithAny
} from '@/config/protected-routes';

export async function updateSessionAndProtectRoutes(request: NextRequest) {
  // Middleware de internacionalización
  const intlMiddleware = createMiddleware(routing);
  let supabaseResponse = intlMiddleware(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  // Generar regex dinámicamente con los locales del routing
  const localesRegex = new RegExp(`^/(${routing.locales.join('|')})(?=/|$)`);
  const pathname = request.nextUrl.pathname;

  // Eliminar el locale del inicio de la ruta
  const pathnameWithoutLocale = pathname.replace(localesRegex, '');

  // =====================================
  // Si el usuario NO está autenticado y accede a una ruta protegida
  // =====================================
  if (!user && startsWithAny(pathnameWithoutLocale, protectedWhenUnauthenticated)) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';

    const myNewResponse = NextResponse.redirect(url);

    // Copiar cookies manualmente
    for (const cookie of supabaseResponse.cookies.getAll()) {
      myNewResponse.cookies.set(cookie.name, cookie.value, cookie);
    }

    return myNewResponse;
  }

  // =====================================
  // Si el usuario SÍ está autenticado y accede a rutas exclusivas para NO autenticados
  // =====================================
  if (user && startsWithAny(pathnameWithoutLocale, protectedWhenAuthenticated)) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';

    const myNewResponse = NextResponse.redirect(url);

    // Copiar cookies manualmente
    for (const cookie of supabaseResponse.cookies.getAll()) {
      myNewResponse.cookies.set(cookie.name, cookie.value, cookie);
    }

    return myNewResponse;
  }

  return supabaseResponse;
}
