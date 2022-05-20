import { fetchFromApi, postToApi } from "./ApiFetch";

export interface LoginRequest {
  username: string;
  password: string;
}

export const BLANK_LOGIN_REQUEST = {
  username: "",
  password: ""
}

export interface LoginResponse {
  data: string;
  success: boolean;
  message: string;
}

export function Login(loginRequest: LoginRequest): Promise<LoginResponse> {
  return postToApi("/SakeAuth/Login", JSON.stringify(loginRequest))
    .then(response => response.json());
}