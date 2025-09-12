/**
 * Rutas que necesitan que el usuario esté autenticado.
 * Si NO está autenticado será redirigido a /auth/login
 */
export const protectedWhenUnauthenticated: string[] = [
  '/dashboard',
];

/**
 * Rutas que NO deben ser accesibles si el usuario ya está autenticado.
 * Si NO está autenticado será redirigido a /dashboard
 */
export const protectedWhenAuthenticated: string[] = [
  '/auth',
];

/**
 * Helper para comprobar si la ruta actual empieza por alguna de la lista
 */
export function startsWithAny(pathname: string, routes: string[]): boolean {
  return routes.some(route => pathname.startsWith(route));
}
