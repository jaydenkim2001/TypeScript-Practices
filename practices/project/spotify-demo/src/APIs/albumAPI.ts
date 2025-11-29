import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { getNewReleasesResponse } from "../typeSpecification/album";

export const getNewReleases = async (
  clientCredentialToken: string
): Promise<getNewReleasesResponse> => {
  try {
    const response = await axios.get(
      `${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`,
      {
        headers: {
          Authorization: `Bearer ${clientCredentialToken}`,
        },
      }
    );
    console.log("URL: " + SPOTIFY_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch new releases!");
  }
};
