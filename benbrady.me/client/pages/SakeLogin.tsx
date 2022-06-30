import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Router from "next/router";
import { useCallback, useContext, useState } from "react";
import { BLANK_LOGIN_REQUEST, LoginRequest } from "../api/SakeAuth";
import {
  SakeAuthDispatchContext,
  SakeAuthState,
  SakeAuthStateContext,
} from "../api/SakeAuthContext";
import SakeTrackerParent from "../Components/SakeTrackerParent";

export default function SakeLogin(): JSX.Element {
  const authState = useContext<SakeAuthState>(SakeAuthStateContext);
  const authStateDispatch = useContext(SakeAuthDispatchContext);

  const [loginRequest, setLoginRequest] =
    useState<LoginRequest>(BLANK_LOGIN_REQUEST);

  const onUsernameChange = useCallback(
    (event: any) => {
      const newLoginRequest = { ...loginRequest, username: event.target.value };
      setLoginRequest({ ...loginRequest, username: event.target.value });
    },
    [loginRequest]
  );
  const onPasswordChange = useCallback(
    (event: any) =>
      setLoginRequest({ ...loginRequest, password: event.target.value }),
    [loginRequest]
  );

  const onLoginClicked = useCallback(
    () =>
      authStateDispatch(["sendLoginRequest", loginRequest, authStateDispatch]),
    [authStateDispatch, loginRequest]
  );

  if (authState.signed_in) {
    Router.push("/SakeTracker");
  }

  return (
    <>
      <SakeTrackerParent>
        <Container maxWidth="full" padding={0} bg="sake.background">
          <Flex height="100vh" justifyContent="center" alignItems="center">
            <VStack padding={4} spacing={8} textAlign="center">
              <SimpleGrid
                columns={2}
                columnGap={3}
                rowGap={6}
                width="full"
                color="sake.text"
              >
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel htmlFor="input-sake-login-username">
                      Username
                    </FormLabel>
                    <Input
                      id="input-sake-login-username"
                      onChange={onUsernameChange}
                      type="text"
                      placeholder="Username"
                      required
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel htmlFor="input-sake-login-password">
                      Password
                    </FormLabel>
                    <Input
                      id="input-sake-login-password"
                      onChange={onPasswordChange}
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </FormControl>
                </GridItem>
              </SimpleGrid>
              <Button
                bgColor="sake.dark"
                color="sake.text"
                _hover={{ bg: "sake.light" }}
                _active={{ bg: "sake.primary" }}
                onClick={onLoginClicked}
              >
                Login
              </Button>
            </VStack>
          </Flex>
        </Container>
      </SakeTrackerParent>
    </>
  );
}
