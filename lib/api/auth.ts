import { apiFetch, clearToken, setToken } from "./client";
import type { LoginPayload, RegisterPayload, Token, Usuario } from "./types";

export async function login(payload: LoginPayload): Promise<Token> {
  const token = await apiFetch<Token>("/auth/login", {
    method: "POST",
    body: payload,
    auth: false,
  });
  setToken(token.access_token);
  return token;
}

export async function register(payload: RegisterPayload): Promise<Usuario> {
  return apiFetch<Usuario>("/auth/register", {
    method: "POST",
    body: payload,
    auth: false,
  });
}

export async function me(): Promise<Usuario> {
  return apiFetch<Usuario>("/auth/me");
}

export function logout(): void {
  clearToken();
}
