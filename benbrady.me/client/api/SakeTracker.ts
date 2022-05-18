import internal from "stream";
import { fetchFromApi } from "./ApiFetch";

export interface GetAllSakesResponse {
  data: Sake[];
  success: boolean;
  message: string;
}

export const BLANK_GET_ALL_SAKES_RESPONSE = {
  data: [],
  success: true,
  message: ""
}

export interface Sake {
  id: string;
  name: string;
  type: string;
  bensRating: number;
  jasonsRating: number;
  cost: number;
}

export function GetAllSakes(): Promise<GetAllSakesResponse> {
  return fetchFromApi("/SakeTracker/GetAllSakes")
    .then(response => response.json());
}