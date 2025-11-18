import axios from "axios";
import { spotifyBaseURL } from "../configs/commonConfig";
import { getNewReleasesResponse } from "../typeSpecification/album";

export const getNewReleases = async (
  clientCredentialToken: string
): Promise<getNewReleasesResponse> => {
  
  const tempSpotifyBaseURl = "https://api.spotify.com/v1"

  try {
    const response = await axios.get(
      `${tempSpotifyBaseURl}/browse/new-releases?limit=6`,
      {
        headers: {
          Authorization: `Bearer ${clientCredentialToken}`,
        },
      }
    );
    console.log("URL: " + spotifyBaseURL)
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch new releases!");
  }
};
