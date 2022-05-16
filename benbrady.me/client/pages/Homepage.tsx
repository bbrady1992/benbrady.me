import {
  AspectRatio,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Img,
  Input,
  Select,
  SimpleGrid,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function Homepage(): JSX.Element {
  return (
    <Container maxWidth="full" padding={0} bg="brand.background">
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <VStack padding={4} spacing={4} textAlign="center">
          <Heading size="2xl" color="brand.text">
            Well, well, well...back again, DAN??
          </Heading>
          <Img src="/images/random-itysl.gif" alt="RANDOM" />
          <Text color="brand.text">
            <Link href="/Jokes">
              <a>Jokes</a>
            </Link>
          </Text>
        </VStack>
      </Flex>
    </Container>
  );
}

//export default function Homepage(): JSX.Element {
//  return (
//    <Container maxWidth="container.xl" padding={0}>
//      <Flex height="100vh" paddingY={20}>
//        <Details />
//        <Cart />
//      </Flex>
//    </Container>
//  );
//}
//
//function Cart() {
//  const { toggleColorMode } = useColorMode();
//  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
//  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");
//
//  return (
//    <VStack
//      width="full"
//      height="full"
//      padding={10}
//      alignItems="flex-start"
//      bg={bgColor}
//    >
//      <VStack alignItems="flex-start" spacing={3}>
//        <Heading size="2xl">Your cart</Heading>
//        <Text>
//          If the price is too hard on your eyes,
//          <Button onClick={toggleColorMode} variant="link" colorScheme="black">
//            try changing the theme.
//          </Button>
//        </Text>
//        <Text color={secondaryTextColor}>This is some text</Text>
//      </VStack>
//      <HStack spacing={6} alignItems="center" width="full"></HStack>
//    </VStack>
//  );
//}
//
//function Details() {
//  return (
//    <VStack width="full" height="full" padding={10} alignItems="flex-start">
//      <VStack spacing={3} alignItems="flex-start">
//        <Heading size="2xl">Your details</Heading>
//        <Text>If you already have an account, click here to log in</Text>
//      </VStack>
//      <SimpleGrid columns={2} columnGap={3} rowGap={6} width="full">
//        <GridItem colSpan={1}>
//          <FormControl>
//            <FormLabel>First Name</FormLabel>
//            <Input placeholder="John"></Input>
//          </FormControl>
//        </GridItem>
//
//        <GridItem colSpan={1}>
//          <FormControl>
//            <FormLabel>Last Name</FormLabel>
//            <Input placeholder="Doe"></Input>
//          </FormControl>
//        </GridItem>
//
//        <GridItem colSpan={2}>
//          <FormControl>
//            <FormLabel>Address</FormLabel>
//            <Input placeholder="Address"></Input>
//          </FormControl>
//        </GridItem>
//
//        <GridItem colSpan={1}>
//          <FormControl>
//            <FormLabel>City</FormLabel>
//            <Input placeholder="San Francisco"></Input>
//          </FormControl>
//        </GridItem>
//
//        <GridItem colSpan={1}>
//          <FormControl>
//            <FormLabel>Country</FormLabel>
//            <Select>
//              <option value="usa">United States of America</option>
//              <option value="uae">United Arab Emirates</option>
//              <option value="nmk">North Macedonia</option>
//              <option value="de">Germany</option>
//            </Select>
//          </FormControl>
//        </GridItem>
//
//        <GridItem colSpan={2}>
//          <Checkbox defaultChecked>Ship to billing address.</Checkbox>
//        </GridItem>
//
//        <GridItem colSpan={2}>
//          <Button size="lg" width="full">
//            Place Order
//          </Button>
//        </GridItem>
//      </SimpleGrid>
//    </VStack>
//  );
//}
//
