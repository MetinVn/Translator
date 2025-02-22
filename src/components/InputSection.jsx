import { useState } from "react";

const MAX_CHARACTERS = 35;

const InputSection = ({ input, handleTranslate }) => {
  const [hasMaxError, setHasMaxError] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.value.length >= MAX_CHARACTERS) {
      setHasMaxError(true);
    } else {
      setHasMaxError(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full bg-white dark:bg-gray-900 p-10 rounded-md shadow-lg">
      <h2 className="text-xl font-semibold text-emerald-500 dark:text-white mb-4">Enter Text to Translate</h2>
      <input
        ref={input}
        type="text"
        placeholder="Type something..."
        maxLength={MAX_CHARACTERS}
        onInput={handleInputChange}
        className={`w-full p-4 rounded-md outline-none shadow-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white transition-all duration-150 ${
          hasMaxError ? "border-2 border-red-500" : "focus:ring-2 focus:ring-blue-500"
        }`}
      />
      {hasMaxError && <div className="mt-2 text-red-500 text-sm">Maximum character limit reached.</div>}
      <button
        onClick={handleTranslate}
        className="mt-6 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-emerald-600 active:scale-95 transition-transform duration-150">
        Translate
      </button>
    </div>
  );
};

export default InputSection;
