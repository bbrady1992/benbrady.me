import { deleteToApi, fetchFromApi, postToApi } from "./ApiFetch";

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
  notes: string;
}

export const BLANK_SAKE = {
  name: "",
  type: "",
  bensRating: -1,
  jasonsRating: -1,
  cost: -1,
  notes: ""
}

export function GetAllSakes(): Promise<GetAllSakesResponse> {
  return fetchFromApi("/SakeTracker/GetAllSakes")
    .then(response => response.json());
}

export function AddNewSake(newSake: Sake, token: string): Promise<GetAllSakesResponse> {
  return postToApi("/SakeTracker/AddSake", JSON.stringify(newSake), token)
    .then(response => response.json());
}

export function DeleteSake(Id: string, token: string): Promise<GetAllSakesResponse> {
  return deleteToApi("/SakeTracker/DeleteSake", new URLSearchParams({ Id }), token)
    .then(response => response.json());
}