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
  HStack,
  Image,
  Img,
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
        <Flex
          height="100vh"
          justifyContent="center"
          alignItems="center"
          paddingY={[0, 10, 20]}
        >
          <VStack paddingX={4} spacing={4} textAlign="center">
            <Heading color="brand.text" size="2xl">
              These are some jokes.
            </Heading>
            <Flex
              gap={4}
              alignItems={{ base: "center", lg: "flex-start" }}
              direction={{ base: "column", lg: "row" }}
            >
              <Accordion allowToggle width="full" color="brand.text">
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

                <Joke
                  setup="What did one poop say to the other poop?"
                  punchline="Nothing, they just waved"
                />

                <Joke setup="Who destroy the city" punchline="buttzilla" />

                <Joke
                  setup="Where does Hitler keep his armies?"
                  punchline="In his sleevies"
                />
              </Accordion>
              <Img
                src="/images/stuart-little.jpg"
                alt="We'll take the rat"
                boxSize={{ base: "200px", md: "400px" }}
              />
            </Flex>
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
      <AccordionPanel overflowWrap="break-word" pb={4}>
        {punchline}
      </AccordionPanel>
    </AccordionItem>
  );
}
