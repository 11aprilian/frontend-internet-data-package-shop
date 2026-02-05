import { setCookie, destroyCookie, parseCookies } from "nookies";

export const setAuthCookie = (user) => {
  setCookie(null, "auth_user", JSON.stringify(user), {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export const getAuthUser = (ctx = null) => {
  const cookies = parseCookies(ctx);
  if (!cookies.auth_user) return null;

  try {
    return JSON.parse(cookies.auth_user);
  } catch {
    return null;
  }
};

export const clearAuthCookie = () => {
  destroyCookie(null, "auth_user", { path: "/" });
};
