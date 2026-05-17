import { startSpeechRecognition } from "../services/speechRecService";

export default function VoiceTranslator({
  source,
  speechOptions,
  inputRef,
  onTranslate,
  setRecognizedText,
  setIsListening,
}) {
  const handleSpeech = async () => {
    setRecognizedText("");

    const speechQualityOptions = [
      { noiseSuppression: { ideal: true }, echoCancellation: { ideal: true } },
    ];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { advanced: speechQualityOptions },
      });
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      alert(
        "Microphone access is blocked. Please enable microphone access in your browser settings and try again.",
      );
      return;
    }

    const selectedSpeechOption = speechOptions.find((option) => option.label === source);
    const recognitionLanguage = selectedSpeechOption ? selectedSpeechOption.value : "en";

    startSpeechRecognition({
      language: recognitionLanguage,
      onStart: () => {
        setIsListening(true);
      },
      onResult: (speechResult) => {
        setRecognizedText(speechResult);
        if (inputRef.current) {
          inputRef.current.value = speechResult;
        }
      },
      onTimeout: () => {
        setIsListening(false);
        onTranslate({ preventDefault: () => {} });
      },
      onSpeechEnd: () => {
        setIsListening(false);
        if (inputRef.current && inputRef.current.value.trim()) {
          onTranslate({ preventDefault: () => {} });
        }
      },
      onError: (event) => {
        setIsListening(false);
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          alert(
            "Microphone access is blocked. Please enable microphone access in your browser settings.",
          );
          return;
        }
        if (event.error === "not-supported") {
          alert(event.message);
          return;
        }
        alert("Speech recognition failed to start");
      },
    });
  };

  return (
    <button
      type="button"
      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
      onClick={handleSpeech}
    >
      Speak
    </button>
  );
}
