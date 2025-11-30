import { useMutation } from "@tanstack/react-query";
import { exchangeToken } from "../APIs/authAPI";
import { ExchangeTokenResponse } from "../typeSpecification/auth";

const useExchangeToken = () => {
  return useMutation<
    ExchangeTokenResponse,
    Error,
    { code: string; codeVerifier: string }
  >({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
    },
  });
};

export default useExchangeToken;
