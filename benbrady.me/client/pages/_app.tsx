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
    text: "#ffffff",
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
