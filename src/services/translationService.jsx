import axios from "axios";

export const translateText = async (source, target, text) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", source);
  encodedParams.set("target_language", target);
  encodedParams.set("text", text);

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "03d2e43cd5msh60ee8c95e26694ap104376jsn22703941ef17",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  };

  const response = await axios(options);
  return response.data.data.translatedText;
};
