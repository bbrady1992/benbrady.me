import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  CloseButton,
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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BLANK_GET_ALL_SAKES_RESPONSE,
  DeleteSake,
  GetAllSakes,
  GetAllSakesResponse,
} from "../api/SakeTracker";

import NextLink from "next/link";
import SakeTrackerParent from "../Components/SakeTrackerParent";
import { SakeAuthStateContext } from "../api/SakeAuthContext";

const NOTES_MAX_WIDTH = 80;

export default function SakeTracker() {
  const sakeAuthState = useContext(SakeAuthStateContext);

  const [sakeData, setSakeData] = useState<GetAllSakesResponse>(
    BLANK_GET_ALL_SAKES_RESPONSE
  );

  const [sakeToDeleteId, setSakeToDeleteId] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    GetAllSakes().then((data) => {
      setSakeData(data);
    });
  }, []);

  const sakeDataLoaded = useMemo(() => {
    return sakeData != BLANK_GET_ALL_SAKES_RESPONSE;
  }, [sakeData]);

  const deleteSakeCallback = useCallback(() => {
    DeleteSake(sakeToDeleteId, sakeAuthState.token ?? "").then((data) =>
      setSakeData(data)
    );
    onClose();
  }, [onClose, sakeToDeleteId]);

  return (
    <SakeTrackerParent>
      <Container maxWidth="full" padding={0} bg="sake.background">
        <Flex
          height="100vh"
          justifyContent="center"
          alignItems="flex-start"
          paddingTop={8}
        >
          <VStack padding={4} spacing={4} textAlign="center">
            <Heading size="md" as="em" color="sake.text">
              Sekiro
            </Heading>
            <DeleteConfirmationDialog
              isOpen={isOpen}
              onCancel={onClose}
              onDelete={deleteSakeCallback}
            />
            {sakeDataLoaded ? (
              <>
                <TableContainer color="sake.text">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        {sakeAuthState.signed_in && <Th></Th>}
                        <Th color="sake.text">Name</Th>
                        <Th color="sake.text">Type</Th>
                        <Th color="sake.text">Ben's Rating</Th>
                        <Th color="sake.text">Jason's Rating</Th>
                        <Th color="sake.text">Cost</Th>
                        <Th maxWidth={NOTES_MAX_WIDTH} color="sake.text">
                          Notes
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {sakeData.data.map((sake) => {
                        return (
                          <Tr key={sake.id}>
                            {sakeAuthState.signed_in && (
                              <Td>
                                <CloseButton
                                  color="red"
                                  onClick={() => {
                                    setSakeToDeleteId(sake.id ?? "");
                                    onOpen();
                                  }}
                                />
                              </Td>
                            )}
                            <Td>{sake.name}</Td>
                            <Td>{sake.type}</Td>
                            <Td>{sake.bensRating}</Td>
                            <Td>{sake.jasonsRating}</Td>
                            <Td>{sake.cost}</Td>
                            <Td
                              maxWidth={NOTES_MAX_WIDTH}
                              style={{ wordWrap: "break-word" }}
                            >
                              {sake.notes}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
                {sakeAuthState.signed_in && (
                  <NextLink href="/AddSake">
                    <Link color="sake.text">Add new sake</Link>
                  </NextLink>
                )}
              </>
            ) : (
              <Spinner color="sake.text" />
            )}
          </VStack>
        </Flex>
      </Container>
    </SakeTrackerParent>
  );
}

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

function DeleteConfirmationDialog({
  isOpen,
  onCancel,
  onDelete,
}: DeleteConfirmationDialogProps) {
  const cancelRef = useRef(null);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onCancel}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Sake
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this sake?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCancel}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
