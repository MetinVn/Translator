import { useRef, useState, useCallback } from "react";

import ModeToggle from "./components/ModeToggle";
import LanguageSelector from "./components/LanguageSelector";
import InputSection from "./components/InputSection";
import OutputSection from "./components/OutputSection";
import { translateText } from "./services/translationService";
import { startSpeechRecognition } from "./services/speechRecService";

function App() {
  const input = useRef(null);
  const [translated, setTranslate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState("en");
  const [target, setTarget] = useState("es");
  const [recognizedText, setRecognizedText] = useState("");

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

  const handleTranslate = useCallback(
    async (e) => {
      if (e) e.preventDefault();
      setTranslate(null);
      setError(null);

      const text = input.current.value;
      if (!text) {
        setError("Input cannot be empty");
        return;
      }

      try {
        setLoading(true);
        const result = await translateText(source, target, text);
        setTranslate(result);
      } catch (err) {
        setError("Translation failed");
      } finally {
        setLoading(false);
      }
    },
    [source, target]
  );

  const handleSpeech = () => {
    setError(null);
    setLoading(true);
    setTranslate("");

    // Find the speech recognition language based on the selected source language.
    // Fallback to "en-US" if not found.
    const selectedSpeechOption = speechOptions.find((option) => option.label === source);
    const recognitionLanguage = selectedSpeechOption ? selectedSpeechOption.value : "en-US";

    startSpeechRecognition({
      language: recognitionLanguage,
      onStart: () => console.log("Speech recognition started"),
      onResult: (speechResult) => {
        setRecognizedText(speechResult);
        input.current.value = speechResult;
      },
      onTimeout: () => {
        // Trigger translation automatically when speech recognition times out
        handleTranslate({ preventDefault: () => {} });
      },
      onSpeechEnd: () => setLoading(false),
      onError: (event) => {
        setLoading(false);
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          setError("Microphone access denied. Please allow microphone access to use this feature.");
        } else {
          setError("Speech recognition failed. Please try again.");
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
          translated={translated}
          loading={loading}
          error={error}
          handleSpeech={handleSpeech}
          recognizedText={recognizedText}
        />
      </div>
    </div>
  );
}

export default App;
