const ModeToggle = () => {
  const setDarkMode = () => (document.documentElement.classList = "dark");
  const setLightMode = () => (document.documentElement.classList = "light");

  return (
    <div className="absolute top-1 right-4 flex gap-4">
      <button
        onClick={setLightMode}
        className="bg-gray-200 text-black rounded-full px-3 py-1 dark:bg-gray-800 dark:text-white hover:opacity-80 active:scale-95 duration-150 shadow-md">
        Light
      </button>
      <button
        onClick={setDarkMode}
        className="bg-gray-200 text-black rounded-full px-3 py-1 dark:bg-gray-800 dark:text-white hover:opacity-80 active:scale-95 duration-150 shadow-md">
        Dark
      </button>
    </div>
  );
};

export default ModeToggle;
