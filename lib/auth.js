import Cookies from "js-cookie";
import api from "./api";

export async function loginWithMagicLink(email, isSignup = false) {
  return api.post("/auth/magic-link/request/", { email, is_signup: isSignup });
}

export async function verifyMagicLink(token) {
  const res = await api.post("/auth/magic-link/verify/", { token });
  if (res.data.tokens) {
    Cookies.set("access", res.data.tokens.access, { secure: true });
    Cookies.set("refresh", res.data.tokens.refresh, { secure: true });
  }
  return res.data;
}

export async function loginWithGoogle(access_token) {
  const res = await api.post("/auth/google/", { access_token });
  if (res.data.tokens) {
    Cookies.set("access", res.data.tokens.access, { secure: true });
    Cookies.set("refresh", res.data.tokens.refresh, { secure: true });
  }
  return res.data;
}

export async function logout(refreshToken) {
  await api.post("/auth/logout/", { refresh_token: refreshToken });
  Cookies.remove("access");
  Cookies.remove("refresh");
}

export async function getProfile() {
  return api.get("/profile/");
}

export async function updateProfile(data) {
  return api.put("/profile/", data);
}

export async function getSessions() {
  return api.get("/sessions/");
}
