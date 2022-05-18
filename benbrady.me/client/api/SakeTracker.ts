import { fetchFromApi, postToApi } from "./ApiFetch";

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
  id?: string;
  name: string;
  type: string;
  bensRating: number;
  jasonsRating: number;
  cost: number;
}

export const BLANK_SAKE = {
  name: "",
  type: "",
  bensRating: -1,
  jasonsRating: -1,
  cost: -1
}

export function GetAllSakes(): Promise<GetAllSakesResponse> {
  return fetchFromApi("/SakeTracker/GetAllSakes")
    .then(response => response.json());
}

export function AddNewSake(newSake: Sake) {
  return postToApi("/SakeTracker/AddSake", JSON.stringify(newSake))
    .then(response => response.json());
}