export const startSpeechRecognition = ({ language = "en-EN", onStart, onResult, onSpeechEnd, onError, onTimeout }) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = language;

  let speechTimeout;

  recognition.onstart = () => {
    if (onStart) onStart();
  };

  recognition.onresult = (event) => {
    if (event.results.length > 0) {
      const transcript = event.results[0][0].transcript;
      if (onResult) onResult(transcript);

      clearTimeout(speechTimeout);

      speechTimeout = setTimeout(() => {
        recognition.stop();
        if (onTimeout) onTimeout();
      }, 2000);
    }
  };

  recognition.onspeechend = () => {
    setTimeout(() => {
      recognition.stop();
      if (onSpeechEnd) onSpeechEnd();
    }, 5000);
  };

  recognition.onerror = (event) => {
    if (onError) onError(event);
  };

  recognition.start();

  return recognition;
};
