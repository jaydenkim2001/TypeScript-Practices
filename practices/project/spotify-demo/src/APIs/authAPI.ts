import axios from "axios";
import { clientID, clientSecret } from "../configs/authConfig";
import { ClientCredentialTokenResponse } from "../typeSpecification/auth";

const encodedBase64 = (data: string): string => {
  if(typeof window !== "undefined"){
    // browser environment
    return btoa(data);
  } else {
    //nodeJS environment
    return Buffer.from(data).toString("base64");
  }
};

export const getClientCredentialToken =
  async (): Promise<ClientCredentialTokenResponse> => {

    const tempClientID = "4af1a8408a064d739f86435e2172ca1f";
    const tempClientSecret = "736fd451f2fb4ab7a9178e72881d601f";

    try {
      const body = new URLSearchParams({
        grant_type: "client_credentials",
      });
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        body,
        {
          headers: {
            Authorization: `Basic ${encodedBase64(
              clientID + ":" + clientSecret
            )}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch client credential token!");
    }
  };
