import { createContext, Dispatch } from "react";
import { Login, LoginRequest, LoginResponse } from "./SakeAuth";
import jwtDecode from "jwt-decode";

export class SakeAuthState {
  username: string | undefined;
}

export const DEFAULT_SAKE_AUTH_STATE: SakeAuthState = {
  username: undefined
}

export interface JwtToken {
  exp: number,
  iat: number,
  nameid: string,
  nbf: number,
  unique_name: string
}

type SakeAuthLoginRequestAction = ["sendLoginRequest", LoginRequest, Dispatch<SakeAuthLoginRequestOutcome>];
export type SakeAuthLoginRequestOutcome = ["loginRequestOutcome", LoginResponse]

type SakeAuthAction = SakeAuthLoginRequestAction | SakeAuthLoginRequestOutcome;

export function SakeAuthReducer(state: SakeAuthState, action: SakeAuthAction): SakeAuthState {
  switch (action[0]) {
    case "sendLoginRequest": {
      const [{ }, loginRequest, dispatch] = action;
      Login(loginRequest).then(data => dispatch(["loginRequestOutcome", data]));
      return {
        ...state,
      }
    }
    case "loginRequestOutcome": {
      const [{ }, loginResponse] = action;
      const decoded_token: JwtToken = jwtDecode(loginResponse.data)
      console.log("Received loginResponse", { loginResponse, decoded_token })
      return {
        ...state,
        username: decoded_token.unique_name
      }
    }
  }
}


export const SakeAuthStateContext = createContext(DEFAULT_SAKE_AUTH_STATE)
export const SakeAuthDispatchContext = createContext<{
  state: SakeAuthState;
  dispatch: Dispatch<SakeAuthAction>
}>({ state: DEFAULT_SAKE_AUTH_STATE, dispatch: () => null });