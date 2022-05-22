import { createContext, Dispatch } from "react";
import { Login, LoginRequest, LoginResponse } from "./SakeAuth";
import jwtDecode from "jwt-decode";

export class SakeAuthState {
  username: string | undefined;
  signed_in: boolean = false;
  failed_logins: number = 0;
}

export const DEFAULT_SAKE_AUTH_STATE: SakeAuthState = {
  username: undefined,
  signed_in: false,
  failed_logins: 0
}

export interface JwtToken {
  exp: number,
  iat: number,
  nameid: string,
  nbf: number,
  unique_name: string
}

type SakeAuthLoginRequestAction = ["sendLoginRequest", LoginRequest, Dispatch<SakeAuthLoginRequestOutcome>];
type SakeAuthLoginRequestOutcome = ["loginRequestOutcome", LoginResponse]

export type SakeAuthAction = SakeAuthLoginRequestAction | SakeAuthLoginRequestOutcome;

export function SakeAuthReducer(state: SakeAuthState, action: SakeAuthAction): SakeAuthState {
  switch (action[0]) {
    case "sendLoginRequest": {
      const [{ }, loginRequest, dispatch] = action;
      console.log("Sending login request", { loginRequest })
      Login(loginRequest).then(data => dispatch(["loginRequestOutcome", data]));
      return {
        ...state,
      }
    }
    case "loginRequestOutcome": {
      const [{ }, loginResponse] = action;
      if (loginResponse.success) {
        const decoded_token: JwtToken = jwtDecode(loginResponse.data)
        return {
          ...state,
          username: decoded_token.unique_name,
          signed_in: true
        }
      }
      else {
        return {
          ...state,
          failed_logins: state.failed_logins + 1,
          signed_in: false
        }
      }
    }
  }
}


export const SakeAuthStateContext = createContext(DEFAULT_SAKE_AUTH_STATE)
export const SakeAuthDispatchContext = createContext<any>(() => null);
//export const SakeAuthDispatchContext = createContext<{
//  state: SakeAuthState;
//  dispatch: Dispatch<SakeAuthAction>
//}>({ state: DEFAULT_SAKE_AUTH_STATE, dispatch: () => null });