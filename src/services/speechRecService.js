export const startSpeechRecognition = ({ language = "en-EN", onStart, onResult, onSpeechEnd, onError, onTimeout }) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = language;

  let speechTimeout;
  let stopped = false;

  const safeStop = () => {
    if (!stopped) {
      try {
        recognition.stop();
      } catch (err) {}
      stopped = true;
    }
  };

  recognition.onstart = () => {
    if (onStart) onStart();
  };

  recognition.onresult = (event) => {
    if (event.results.length > 0) {
      const transcript = event.results[0][0].transcript;
      if (onResult) onResult(transcript);
      clearTimeout(speechTimeout);
      speechTimeout = setTimeout(() => {
        safeStop();
        if (onTimeout) onTimeout();
      }, 2000);
    }
  };

  recognition.onspeechend = () => {
    clearTimeout(speechTimeout);
    safeStop();
    if (onSpeechEnd) onSpeechEnd();
  };

  recognition.onerror = (event) => {
    if (event.error === "aborted" || event.error === "no-speech") {
      if (onSpeechEnd) onSpeechEnd();
      return;
    }
    if (onError) onError(event);
  };

  recognition.start();
  return recognition;
};
