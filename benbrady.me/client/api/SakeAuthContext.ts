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

type SakeAuthInitialize = ["initialize"];
type SakeAuthLoginRequestAction = ["sendLoginRequest", LoginRequest, Dispatch<SakeAuthLoginRequestOutcome>];
type SakeAuthLoginRequestOutcome = ["loginRequestOutcome", LoginResponse]
type SakeAuthLogoutRequest = ["logoutRequest"]

export type SakeAuthAction = SakeAuthInitialize | SakeAuthLoginRequestAction | SakeAuthLoginRequestOutcome | SakeAuthLogoutRequest;

export function SakeAuthReducer(state: SakeAuthState, action: SakeAuthAction): SakeAuthState {
  switch (action[0]) {
    case "initialize": {
      const token = TokenManager.RetrieveToken();
      if (token != null) {
        try {
          const decoded_token: JwtToken = jwtDecode(token);
          return {
            ...state,
            username: decoded_token.unique_name,
            signed_in: true
          }
        } catch (error) {
          console.log("Unable to decode stored JWT. Cannot re-establish user session.");
          TokenManager.ClearToken();
          return {
            ...state,
            signed_in: false
          }
        }
      } else {
        return { ...state, signed_in: false }
      }
    }
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
        try {
          const decoded_token: JwtToken = jwtDecode(loginResponse.data)
          TokenManager.StoreToken(loginResponse.data);
          return {
            ...state,
            username: decoded_token.unique_name,
            signed_in: true
          }
        } catch (error) {
          console.log("Unable to decode JWT received from server. Cannot log user in.")
          return {
            ...state,
            signed_in: false
          }
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
    case "logoutRequest": {
      TokenManager.ClearToken();
      return DEFAULT_SAKE_AUTH_STATE;
    }
  }
}


export const SakeAuthStateContext = createContext(DEFAULT_SAKE_AUTH_STATE)
export const SakeAuthDispatchContext = createContext<any>(() => null);
//export const SakeAuthDispatchContext = createContext<{
//  state: SakeAuthState;
//  dispatch: Dispatch<SakeAuthAction>
//}>({ state: DEFAULT_SAKE_AUTH_STATE, dispatch: () => null });

interface ITokenManager {
  StoreToken: (token: string) => boolean;
  RetrieveToken: () => string | null;
  ClearToken: () => void;
}

const SAKE_AUTH_SESSION_STORAGE_KEY = "SakeAuthToken"

const TokenManager: ITokenManager = {
  StoreToken: (token: string): boolean => {
    return StorageOperation(() => {
      try {
        sessionStorage.setItem(SAKE_AUTH_SESSION_STORAGE_KEY, token);
        return true;
      } catch (error) {
        console.log("Unable to store Sake Tracker login token. Persisten login will not function.");
        return false;
      }
    })
  },
  RetrieveToken: (): string | null => {
    return StorageOperation(() => sessionStorage.getItem(SAKE_AUTH_SESSION_STORAGE_KEY));
  },
  ClearToken: () => StorageOperation(() => sessionStorage.removeItem(SAKE_AUTH_SESSION_STORAGE_KEY)),
}

const StorageOperation = (storageOperation: any) => {
  if (typeof window !== "undefined") {
    return storageOperation();
  }
}