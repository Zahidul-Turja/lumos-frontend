import Cookies from "js-cookie";
import api, { publicApi } from "./api";
import { toast } from "react-toastify";

export async function loginBasic(email, password) {
  try {
    const res = await publicApi.post("/users/auth/login/", { email, password });

    toast.success(res.data.message || "Login successful!");

    if (res.data.data) {
      Cookies.set("access", res.data.data.access, { secure: true });
      Cookies.set("refresh", res.data.data.refresh, { secure: true });
    }

    return res.data;
  } catch (err) {
    if (err.response) {
      const message =
        err.response.data?.message || "Login failed. Please try again.";
      toast.error(message);
    } else {
      toast.error("Network error. Please try again.");
    }

    return null;
  }
}

export async function loginWithMagicLink(email, isSignup = false) {
  return api.post("/users/auth/magic-link/request/", {
    email,
    is_signup: isSignup,
  });
}

export async function verifyMagicLink(token) {
  const res = await api.post("/users/auth/magic-link/verify/", { token });
  if (res.data.tokens) {
    Cookies.set("access", res.data.tokens.access, { secure: true });
    Cookies.set("refresh", res.data.tokens.refresh, { secure: true });
  }
  return res.data;
}

export async function loginWithGoogle(access_token) {
  const res = await api.post("/users/auth/google/", { access_token });
  if (res.data.tokens) {
    Cookies.set("access", res.data.tokens.access, { secure: true });
    Cookies.set("refresh", res.data.tokens.refresh, { secure: true });
  }
  return res.data;
}

export async function logout(refreshToken) {
  await api.post("/users/auth/logout/", { refresh_token: refreshToken });
  Cookies.remove("access");
  Cookies.remove("refresh");
}

export async function getProfile() {
  const res = await api.get("/users/profile/");
  Cookies.set("user", JSON.stringify(res.data.data), { secure: true });
  return res.data;
}

export async function updateProfile(data) {
  return api.put("/users/profile/", data);
}

export async function getSessions() {
  return api.get("/users/sessions/");
}
