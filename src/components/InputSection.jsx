const InputSection = ({ input, handleTranslate }) => (
  <div className="flex flex-col justify-center items-center h-full bg-white dark:bg-gray-900 p-10 rounded-md shadow-lg">
    <h2 className="text-xl font-semibold text-emerald-500 dark:text-white mb-4">Enter Text to Translate</h2>
    <input
      ref={input}
      type="text"
      placeholder="Type something..."
      className="w-full p-4 rounded-md outline-none shadow-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-150"
    />
    <button
      onClick={handleTranslate}
      className="mt-6 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-emerald-600 active:scale-95 transition-transform duration-150">
      Translate
    </button>
  </div>
);

export default InputSection;
