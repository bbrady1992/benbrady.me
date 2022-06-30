import "../styles/globals.css";
import type { AppProps } from "next/app";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import {
  DEFAULT_SAKE_AUTH_STATE,
  SakeAuthStateContext,
  SakeAuthReducer,
  SakeAuthState,
  SakeAuthDispatchContext,
} from "../api/SakeAuthContext";
import { useEffect, useReducer } from "react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
    background: "#222222",
    dark: "#171717",
    text: "#ffffff",
  },
  sake: {
    light: "#4e47bf",
    primary: "#001f8e",
    dark: "#00005f",
    background: "#001f8e",
    text: "#fff8e1",
  },
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }: AppProps) {
  const [authState, authDispatch] = useReducer(
    SakeAuthReducer,
    DEFAULT_SAKE_AUTH_STATE
  );
  useEffect(() => authDispatch(["initialize"]), []);
  return (
    <SakeAuthStateContext.Provider value={authState}>
      <SakeAuthDispatchContext.Provider value={authDispatch}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SakeAuthDispatchContext.Provider>
    </SakeAuthStateContext.Provider>
  );
}

export default MyApp;
