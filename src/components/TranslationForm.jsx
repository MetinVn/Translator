const TranslationForm = ({ inputRef, handleTranslate }) => (
  <form onSubmit={handleTranslate} className="flex flex-col items-center gap-4">
    <input
      ref={inputRef}
      type="text"
      placeholder="Enter text to translate..."
      className="outline-none px-4 py-2 shadow-md hover:shadow-lg rounded-md w-full max-w-[400px]"
    />
    <button className="bg-blue-500 shadow-lg hover:bg-blue-600 text-white active:scale-95 rounded-md p-2 px-5" type="submit">
      Translate
    </button>
  </form>
);
export default TranslationForm;
