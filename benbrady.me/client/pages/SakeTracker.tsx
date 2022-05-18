import { Heading, ListItem, OrderedList, Spinner } from "@chakra-ui/react";
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
    <>
      <Heading>Sake Tracker</Heading>
      <OrderedList>
        {sakeDataLoaded ? (
          sakeData?.data?.map((sake) => (
            <ListItem>
              {sake.id} - {sake.bensRating} - {sake.jasonsRating} - {sake.cost}
            </ListItem>
          ))
        ) : (
          <Spinner />
        )}
      </OrderedList>
    </>
  );
}
