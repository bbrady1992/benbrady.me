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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ChangeEventHandler, useCallback, useReducer } from "react";
import { AddNewSake, BLANK_SAKE, Sake } from "../api/SakeTracker";

class AddSakeState {
  sake: Sake = BLANK_SAKE;
}

type NameChangedAction = ["nameChanged", string];
type CommitNewSakeAction = ["commitNewSake"];

type AddSakeAction = NameChangedAction | CommitNewSakeAction;

function AddSakeReducer(
  state: AddSakeState,
  action: AddSakeAction
): AddSakeState {
  switch (action[0]) {
    case "nameChanged": {
      const [{}, newName] = action;
      console.log("AddSakeReducer", { state, action });

      return {
        ...state,
        sake: { ...state.sake, name: newName },
      };
    }
    case "commitNewSake": {
      console.log("Trying to save new sake");
      AddNewSake(state.sake).then((data) =>
        console.log("Added new sake and received response:, data")
      );
      return {
        ...state,
      };
    }
  }
}

export default function AddSake(): JSX.Element {
  const [state, dispatch] = useReducer(
    AddSakeReducer,
    null,
    () => new AddSakeState()
  );

  const onNameChange = useCallback(
    (event: any) => dispatch(["nameChanged", event.target.value]),
    []
  );

  const onSave = useCallback(() => dispatch(["commitNewSake"]), []);

  return (
    <Container maxWidth="full" padding={0} bg="brand.background">
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <VStack padding={4} spacing={4} textAlign="center">
          <Button onClick={AddSakeStub}>Add new sake</Button>
          <Heading size="2xl" color="brand.text">
            Add new sake
          </Heading>
          {AddSakeForm(onNameChange)}
          <Button colorScheme="green" onClick={onSave}>
            Save
          </Button>
          <NextLink href="/SakeTracker">
            <Link color="brand.text">Return to sake list</Link>
          </NextLink>
        </VStack>
      </Flex>
    </Container>
  );
}

function AddSakeForm(onNameChange: ChangeEventHandler<HTMLInputElement>) {
  return (
    <>
      <SimpleGrid
        columns={2}
        columnGap={3}
        rowGap={6}
        width="full"
        color="brand.text"
      >
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel htmlFor="input-sake-name">Name</FormLabel>
            <Input
              id="input-sake-name"
              type="text"
              onChange={onNameChange}
              placeholder="Name"
              required
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel htmlFor="input-sake-type">Type</FormLabel>
            <Input
              id="input-sake-type"
              type="text"
              placeholder="Type"
              required
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel htmlFor="input-bens-rating">Ben's Rating</FormLabel>
            <NumberInput
              id="input-bens-rating"
              defaultValue={3}
              min={0}
              max={5}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel htmlFor="input-jasons-rating">Jason's Rating</FormLabel>
            <NumberInput
              id="input-jasons-rating"
              defaultValue={3}
              min={0}
              max={5}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormLabel htmlFor="input-sake-cost">Cost</FormLabel>
          <NumberInput
            id="input-sake-cost"
            defaultValue={15}
            precision={2}
            step={0.01}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </GridItem>
        <GridItem colSpan={1}></GridItem>
      </SimpleGrid>
    </>
  );
}

function AddSakeStub() {
  const newSake: Sake = {
    name: "Stubby sake",
    type: "Junmai Gaijin",
    bensRating: 3,
    jasonsRating: 4,
    cost: 18.99,
  };

  AddNewSake(newSake).then((data) =>
    console.log("Added sake and received response:", data)
  );
}
