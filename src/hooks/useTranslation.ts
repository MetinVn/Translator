import { useMutation } from "@tanstack/react-query";
import { translateText } from "../services/translationService";

export const useTranslate = () => {
  return useMutation({
    mutationFn: translateText,
  });
};
