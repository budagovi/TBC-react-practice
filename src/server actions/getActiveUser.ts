'use server'
// --- jose-auth
import { getSession } from "../lib/jose-auth/auth";

/**
 * Returns session user information if logged in, otherwise - null (used for cliet-side)
 */
async function getActiveUser() {
  const session = await getSession();

  if (session) {
    return (session.user)
  }
  return null;
}

export default getActiveUser;