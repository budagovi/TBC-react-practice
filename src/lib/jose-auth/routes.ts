/**
 * Array of routes that are accessible publicly.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  '/cart', '/contact', '/store', '/blogs', '/en', '/ka'
]

/**
 * Array of routes that are used for authentication.
 * These routes will redirect logged in users.
 * @type {string[]}
 */
export const authRoutes: string[] = [
  '/sign-in', '/sign-up'
]

/**
 * Prefix for api authentication routes.
 * Routes that start with that prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix: string = 'api/auth';

/**
 * Default redirect path, after loggin in successfully.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/';