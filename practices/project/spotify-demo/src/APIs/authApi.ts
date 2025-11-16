import axios from "axios";
import { clientID, clientSecret } from "../configs/authConfig";
import { ClientCredentialTokenResponse } from "../models/auth";

const encodedBase64 = (data: string): string => {
  return Buffer.from(data).toString("base64");
};

export const getClientCredentialToken =
  async (): Promise<ClientCredentialTokenResponse> => {
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
