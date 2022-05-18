import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AddNewSake, Sake } from "../api/SakeTracker";

export default function AddSake(): JSX.Element {
  return (
    <Container maxWidth="full" padding={0} bg="brand.background">
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <VStack padding={4} spacing={4} textAlign="center">
          <Button onClick={AddSakeStub}>Add new sake</Button>
          <Heading size="2xl" color="brand.text">
            Add new sake
          </Heading>
          {AddSakeForm()}
          <Button colorScheme="green">Save</Button>
          <NextLink href="/SakeTracker">
            <Link color="brand.text">Return to sake list</Link>
          </NextLink>
        </VStack>
      </Flex>
    </Container>
  );
}

function AddSakeForm() {
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
            <Input id="input-sake-name" type="text" required />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel htmlFor="input-sake-type">Type</FormLabel>
            <Input id="input-sake-type" type="text" required />
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
