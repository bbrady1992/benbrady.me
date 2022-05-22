import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  Link,
  SimpleGrid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useContext, useState } from "react";
import { BLANK_LOGIN_REQUEST, LoginRequest } from "../api/SakeAuth";
import {
  SakeAuthDispatchContext,
  SakeAuthStateContext,
} from "../api/SakeAuthContext";
import NextLink from "next/link";

export default function SakeLogin(): JSX.Element {
  const authState = useContext(SakeAuthStateContext);
  const authStateDispatch = useContext(SakeAuthDispatchContext);

  const [loginRequest, setLoginRequest] =
    useState<LoginRequest>(BLANK_LOGIN_REQUEST);

  const onUsernameChange = useCallback(
    (event: any) => {
      const newLoginRequest = { ...loginRequest, username: event.target.value };
      console.log("Set username", { newLoginRequest });
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

  return (
    <Container maxWidth="full" padding={0} bg="brand.background">
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <VStack padding={4} spacing={4} textAlign="center">
          <Heading size="xl" color="brand.text">
            Sign into Sake Tracker
          </Heading>
          <SimpleGrid
            columns={2}
            columnGap={3}
            rowGap={6}
            width="full"
            color="brand.text"
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
          <Button colorScheme="green" onClick={onLoginClicked}>
            Login
          </Button>
          <NextLink href="/SakeTracker">
            <Link color="brand.text">Sake Tracker</Link>
          </NextLink>
        </VStack>
      </Flex>
    </Container>
  );
}

//function RequestStatusIndicator(state: LoginState): JSX.Element {
//  if (state.requestSent && !state.responseReceived) {
//    return <Spinner color="brand.text" />;
//  } else if (state.responseReceived && state.loginSucceeded) {
//    return (
//      <Heading color="brand.text">
//        Login succeeded! Signed in as {state.authState?.username ?? "undefined"}
//      </Heading>
//    );
//  } else if (state.responseReceived && !state.loginSucceeded) {
//    return <Heading color="brand.text">Login failed.</Heading>;
//  }
//  return <></>;
//}
//
