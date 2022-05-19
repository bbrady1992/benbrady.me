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
import { ChangeEventHandler, Dispatch, useCallback, useReducer } from "react";
import { AddNewSake, BLANK_SAKE, Sake } from "../api/SakeTracker";

class AddSakeState {
  sake: Sake = BLANK_SAKE;
}

type SakeChangedAction = ["sakeChanged", Sake];
type CommitNewSakeAction = ["commitNewSake"];

type AddSakeAction = SakeChangedAction | CommitNewSakeAction;

function AddSakeReducer(
  state: AddSakeState,
  action: AddSakeAction
): AddSakeState {
  switch (action[0]) {
    case "sakeChanged": {
      const [{}, newSake] = action;
      console.log("AddSakeReducer", { state, action });

      return {
        ...state,
        sake: newSake,
      };
    }
    case "commitNewSake": {
      console.log("Trying to save new sake:", { newSake: state.sake });
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
    (event: any) =>
      dispatch(["sakeChanged", { ...state.sake, name: event.target.value }]),
    [state]
  );

  const onTypeChange = useCallback(
    (event: any) =>
      dispatch(["sakeChanged", { ...state.sake, type: event.target.value }]),
    [state]
  );

  const onBensRatingChange = useCallback(
    (_: string, rating: number) =>
      dispatch(["sakeChanged", { ...state.sake, bensRating: rating }]),
    [state]
  );

  const onJasonsRatingChange = useCallback(
    (_: string, rating: number) =>
      dispatch(["sakeChanged", { ...state.sake, jasonsRating: rating }]),
    [state]
  );

  const onCostChange = useCallback(
    (_: string, cost: number) =>
      dispatch(["sakeChanged", { ...state.sake, cost: cost }]),
    [state]
  );

  const onSave = useCallback(() => dispatch(["commitNewSake"]), []);

  return (
    <Container maxWidth="full" padding={0} bg="brand.background">
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <VStack padding={4} spacing={4} textAlign="center">
          <Heading size="2xl" color="brand.text">
            Add new sake
          </Heading>
          {AddSakeForm({
            onNameChange,
            onTypeChange,
            onBensRatingChange,
            onJasonsRatingChange,
            onCostChange,
          })}
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

interface AddSakeFormProps {
  onNameChange: ChangeEventHandler<HTMLInputElement>;
  onTypeChange: ChangeEventHandler<HTMLInputElement>;
  onBensRatingChange: (valueAsString: string, value: number) => void;
  onJasonsRatingChange: (valueAsString: string, value: number) => void;
  onCostChange: (valueAsString: string, value: number) => void;
}

function AddSakeForm(props: AddSakeFormProps) {
  const {
    onNameChange,
    onTypeChange,
    onBensRatingChange,
    onJasonsRatingChange,
    onCostChange,
  } = props;
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
              onChange={onTypeChange}
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
              onChange={onBensRatingChange}
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
              onChange={onJasonsRatingChange}
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
            onChange={onCostChange}
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
