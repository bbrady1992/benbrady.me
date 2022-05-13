import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";

export default function Jokes(): JSX.Element {
  return (
    <>
      <Head>
        <title>Very hip, refined jokes</title>
      </Head>

      <Container maxWidth="full" padding={0} bg="brand.background">
        <Flex height="100vh" justifyContent="center" alignItems="center">
          <VStack spacing={4} textAlign="center">
            <Heading color="brand.text" size="2xl">
              These are some jokes.
            </Heading>
            <Accordion color="brand.text">
              <Joke
                setup="How do you catch a bunny rabbit?"
                punchline="Lay in a field and make carrot noises"
              />

              <Joke setup="Guess how many snakes" punchline="13" />

              <Joke
                setup="What do you call a tiger in a lab coat?"
                punchline="A scientist tiger"
              />

              <Joke
                setup="How do you smoke a swordfish?"
                punchline="Put the tail in your mouth and light the other end"
              />
            </Accordion>

            <Image
              src="/images/stuart-little.jpg"
              alt="We'll take the rat"
              height="400"
              width="400"
            />
          </VStack>
        </Flex>
      </Container>
    </>
  );
}

interface JokeProps {
  setup: string;
  punchline: string;
}

function Joke({ setup, punchline }: JokeProps): JSX.Element {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {setup}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{punchline}</AccordionPanel>
    </AccordionItem>
  );
}
