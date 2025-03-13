import { useRef, useState, useCallback } from "react";

import ModeToggle from "./components/ModeToggle";
import LanguageSelector from "./components/LanguageSelector";
import InputSection from "./components/InputSection";
import OutputSection from "./components/OutputSection";
import { useTranslate } from "./services/translationService";
import { startSpeechRecognition } from "./services/speechRecService";

function App() {
  const input = useRef(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [source, setSource] = useState("en");
  const [target, setTarget] = useState("es");
  const [isListening, setIsListening] = useState(false);

  const selectOptions = [
    { label: "English", value: "en" },
    { label: "Azerbaijani", value: "az" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Italian", value: "it" },
    { label: "Turkish", value: "tr" },
    { label: "Russian", value: "ru" },
  ];

  const speechOptions = [
    { label: "en", value: "en-US" },
    { label: "az", value: "az-AZ" },
    { label: "de", value: "de-DE" },
    { label: "es", value: "es-ES" },
    { label: "it", value: "it-IT" },
    { label: "tr", value: "tr-TR" },
    { label: "ru", value: "ru-RU" },
  ];

  const handleSource = (e) => setSource(e.target.value);
  const handleTarget = (e) => setTarget(e.target.value);
  const handleSwap = () => {
    setSource(target);
    setTarget(source);
  };

  const { mutate: translate, data: translatedText, isPending, error } = useTranslate();

  const handleTranslate = useCallback(
    (e) => {
      if (e) e.preventDefault();

      const text = input.current.value;
      if (!text.trim()) {
        alert("Input cannot be empty");
        return;
      }
      translate({ source, target, text });
    },
    [source, target, translate]
  );

  const handleSpeech = async () => {
    setRecognizedText("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      alert("Microphone access is blocked. Please enable microphone access in your browser settings and try again.");
      return;
    }

    const selectedSpeechOption = speechOptions.find((option) => option.label === source);
    const recognitionLanguage = selectedSpeechOption ? selectedSpeechOption.value : "en-US";

    startSpeechRecognition({
      language: recognitionLanguage,
      onStart: () => {
        setIsListening(true);
      },
      onResult: (speechResult) => {
        setRecognizedText(speechResult);
        if (input.current) {
          input.current.value = speechResult;
        }
      },
      onTimeout: () => {
        setIsListening(false);
        handleTranslate({ preventDefault: () => {} });
      },
      onSpeechEnd: () => {
        setIsListening(false);
        if (input.current && input.current.value.trim()) {
          handleTranslate({ preventDefault: () => {} });
        }
      },
      onError: (event) => {
        setIsListening(false);
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          alert("Microphone access is blocked. Please enable microphone access in your browser settings.");
        } else {
          alert("Speech recognition failed. Please try again.");
        }
      },
    });
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <ModeToggle />
      <div className="flex-1 flex flex-col p-6 space-y-6 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-gray-800 dark:to-gray-900">
        <LanguageSelector
          source={source}
          target={target}
          handleSource={handleSource}
          handleTarget={handleTarget}
          handleSwap={handleSwap}
          selectOptions={selectOptions}
        />
        <InputSection input={input} handleTranslate={handleTranslate} />
      </div>
      <div className="flex-1 p-6 bg-gradient-to-r from-green-400 to-green-600 dark:from-gray-900 dark:to-gray-800">
        <OutputSection
          translated={translatedText}
          loading={isPending}
          error={error ? error.message || "Translation failed" : null}
          handleSpeech={handleSpeech}
          recognizedText={recognizedText}
          isListening={isListening}
        />
      </div>
    </div>
  );
}

export default App;
