import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import { useCallback, useContext } from "react";
import {
  SakeAuthDispatchContext,
  SakeAuthStateContext,
} from "../api/SakeAuthContext";
import NextLink from "next/link";

export default function SakeNavbar() {
  const authState = useContext(SakeAuthStateContext);
  const authStateDispatch = useContext(SakeAuthDispatchContext);

  const OnLogoutClicked = useCallback(
    () => authStateDispatch(["logoutRequest"]),
    [authStateDispatch]
  );

  return (
    <Flex
      bg="sake.dark"
      paddingX={8}
      paddingY={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading color="sake.text">
        <NextLink href="/SakeTracker">
          <Link>Sake Tracker</Link>
        </NextLink>
      </Heading>
      {authState.signed_in ? (
        <>
          <HStack gap={8}>
            <Text color="sake.text">{authState.username}</Text>
            <Button variant="link" color="sake.text" onClick={OnLogoutClicked}>
              Sign out
            </Button>
          </HStack>
        </>
      ) : (
        <>
          <NextLink href="/SakeLogin">
            <Link color="sake.text">Sign in</Link>
          </NextLink>
        </>
      )}
    </Flex>
  );
}
