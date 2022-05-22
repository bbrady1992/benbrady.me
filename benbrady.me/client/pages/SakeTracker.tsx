import {
  Container,
  Flex,
  Heading,
  Link,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import {
  BLANK_GET_ALL_SAKES_RESPONSE,
  GetAllSakes,
  GetAllSakesResponse,
} from "../api/SakeTracker";

import NextLink from "next/link";
import SakeTrackerParent from "../Components/SakeTrackerParent";

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
    <SakeTrackerParent>
      <Container maxWidth="full" padding={0} bg="brand.background">
        <Flex height="100vh" justifyContent="center" alignItems="center">
          <VStack padding={4} spacing={4} textAlign="center">
            <Heading size="md" as="em" color="brand.text">
              Sekiro
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
                <NextLink href="/AddSake">
                  <Link color="brand.text">Add new sake</Link>
                </NextLink>
              </>
            ) : (
              <Spinner color="brand.text" />
            )}
          </VStack>
        </Flex>
      </Container>
    </SakeTrackerParent>
  );
}
