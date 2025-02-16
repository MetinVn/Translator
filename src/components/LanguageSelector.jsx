const LanguageSelector = ({ source, target, handleSource, handleTarget, handleSwap, selectOptions }) => (
  <div className="flex items-center justify-center gap-1 md:gap-4 my-6">
    <select
      name="source"
      value={source}
      onChange={handleSource}
      className="outline-none bg-white dark:bg-gray-700 text-gray-700 dark:text-white shadow-md rounded-md px-4 py-2 cursor-pointer transition-all duration-150 focus:ring-2 focus:ring-blue-500">
      {selectOptions.map((option, key) => (
        <option key={key} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <button
      type="button"
      onClick={handleSwap}
      className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 active:scale-95 transition-transform duration-150">
      Swap
    </button>
    <select
      name="target"
      value={target}
      onChange={handleTarget}
      className="outline-none bg-white dark:bg-gray-700 text-gray-700 dark:text-white shadow-md rounded-md px-4 py-2 cursor-pointer transition-all duration-150 focus:ring-2 focus:ring-blue-500">
      {selectOptions.map((option, key) => (
        <option key={key} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
export default LanguageSelector;
