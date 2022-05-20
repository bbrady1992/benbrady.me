import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { Dispatch, useCallback, useReducer } from "react";
import {
  BLANK_LOGIN_REQUEST,
  Login,
  LoginRequest,
  LoginResponse,
} from "../api/SakeAuth";

class LoginState {
  loginRequest: LoginRequest = BLANK_LOGIN_REQUEST;
  loginAttempted = false;
  loginSucceeded = false;
  requestSent = false;
  responseReceived = false;
}

type LoginInfoChangedAction = ["loginInfoChanged", LoginRequest];
type LoginRequestAction = ["sendLoginRequest", Dispatch<LoginRequestOutcome>];
type LoginRequestOutcome = ["loginRequestOutcome", LoginResponse];

type LoginAction =
  | LoginInfoChangedAction
  | LoginRequestAction
  | LoginRequestOutcome;

function LoginInfoReducer(state: LoginState, action: LoginAction): LoginState {
  switch (action[0]) {
    case "loginInfoChanged": {
      const [{}, newLoginInfo] = action;
      return {
        ...state,
        loginRequest: newLoginInfo,
      };
    }
    case "sendLoginRequest": {
      const [{}, dispatch] = action;
      Login(state.loginRequest).then((data) => {
        dispatch(["loginRequestOutcome", data]);
      });
      return {
        ...state,
        loginAttempted: true,
        requestSent: true,
        responseReceived: false,
      };
    }
    case "loginRequestOutcome": {
      const [{}, loginResponse] = action;
      return {
        ...state,
        loginSucceeded: loginResponse.success,
        responseReceived: true,
      };
    }
  }
}

export default function SakeLogin(): JSX.Element {
  const [state, dispatch] = useReducer(
    LoginInfoReducer,
    null,
    () => new LoginState()
  );

  const onUsernameChange = useCallback(
    (event: any) =>
      dispatch([
        "loginInfoChanged",
        { ...state.loginRequest, username: event.target.value },
      ]),
    [state]
  );

  const onPasswordChange = useCallback(
    (event: any) =>
      dispatch([
        "loginInfoChanged",
        { ...state.loginRequest, password: event.target.value },
      ]),
    [state]
  );

  const onLoginClicked = useCallback(
    () => dispatch(["sendLoginRequest", dispatch]),
    []
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
          {RequestStatusIndicator(state)}
        </VStack>
      </Flex>
    </Container>
  );
}

function RequestStatusIndicator(state: LoginState): JSX.Element {
  if (state.requestSent && !state.responseReceived) {
    return <Spinner color="brand.text" />;
  } else if (state.responseReceived && state.loginSucceeded) {
    return <Heading color="brand.text">Login succeeded!</Heading>;
  } else if (state.responseReceived && !state.loginSucceeded) {
    return <Heading color="brand.text">Login failed.</Heading>;
  }
  return <></>;
}
