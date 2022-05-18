import {
  Container,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  UnorderedList,
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
          {sakeDataLoaded ? (
            <>
              <TableContainer color="brand.text">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Type</Th>
                      <Th>Ben's Rating</Th>
                      <Th>Jason's Rating</Th>
                      <Th>Cost</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {sakeData.data.map((sake) => {
                      return (
                        <Tr>
                          <Td>{sake.name}</Td>
                          <Td>{sake.type}</Td>
                          <Td>{sake.bensRating}</Td>
                          <Td>{sake.jasonsRating}</Td>
                          <Td>{sake.cost}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Spinner color="brand.text" />
          )}
        </VStack>
      </Flex>
    </Container>
  );
}
