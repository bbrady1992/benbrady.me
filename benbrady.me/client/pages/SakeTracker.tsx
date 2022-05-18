import {
  Container,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import {
  BLANK_GET_ALL_SAKES_RESPONSE,
  GetAllSakes,
  GetAllSakesResponse,
} from "../api/SakeTracker";

export default function SakeTracker() {
  const [sakeData, setSakeData] = useState<GetAllSakesResponse>(
    BLANK_GET_ALL_SAKES_RESPONSE
  );

  useEffect(() => {
    GetAllSakes().then((data) => {
      setSakeData(data);
    });
  }, []);

  const sakeDataLoaded = useMemo(() => {
    return sakeData != BLANK_GET_ALL_SAKES_RESPONSE;
  }, [sakeData]);

  return (
    <Container maxWidth="full" padding={0} bg="brand.background">
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <VStack padding={4} spacing={4} textAlign="center">
          <Heading size="2xl" color="brand.text">
            Sake Tracker
          </Heading>
          <OrderedList color="brand.text">
            {sakeDataLoaded ? (
              sakeData?.data?.map((sake) => (
                <ListItem>
                  {sake.id} - {sake.bensRating} - {sake.jasonsRating} -{" "}
                  {sake.cost}
                </ListItem>
              ))
            ) : (
              <Spinner />
            )}
          </OrderedList>
        </VStack>
      </Flex>
    </Container>
  );
}
