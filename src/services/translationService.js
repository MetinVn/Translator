import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const translateText = async ({ source, target, text }) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", source);
  encodedParams.set("target_language", target);
  encodedParams.set("text", text);

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  };

  const response = await axios(options);
  return response.data.data.translatedText;
};

export const useTranslate = () => {
  return useMutation({
    mutationFn: translateText,
  });
};
