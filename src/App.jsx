import { useRef, useState } from "react";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader";
import { CopyToClipboard } from "react-copy-to-clipboard";
function App() {
  function setDarkMode() {
    document.documentElement.classList = "dark";
  }
  function setLightMode() {
    document.documentElement.classList = "light";
  }
  // Translate
  const input = useRef(null);
  const [translated, setTranslate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const encodedParams = new URLSearchParams();
  // **************************************************************************************
  const [source, setSource] = useState("en");
  const [target, setTarget] = useState("es");
  const selectOptionsSource = [
    { label: "English", value: "en" },
    { label: "Azerbaijani", value: "az" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Italian", value: "it" },
    { label: "Turkish", value: "tr" },
    { label: "Russian", value: "ru" },
  ];
  const selectOptionsTarget = [
    { label: "Spanish", value: "es" },
    { label: "Azerbaijani", value: "az" },
    { label: "English", value: "en" },
    { label: "German", value: "de" },
    { label: "Italian", value: "it" },
    { label: "Turkish", value: "tr" },
    { label: "Russian", value: "ru" },
  ];

  function handleSource(event) {
    setSource(event.target.value);
  }
  function handleTarget(event) {
    setTarget(event.target.value);
  }
  //**************************************************************************************
  const handleTranslate = (e) => {
    e.preventDefault();
    setTranslate("");
    setError(false);
    if (input.current.value.length === 0) {
      setError(true);
    } else {
      encodedParams.set("source_language", source);
      encodedParams.set("target_language", target);
      encodedParams.set("text", input.current.value);
      const options = {
        method: "POST",
        url: "https://text-translator2.p.rapidapi.com/translate",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "03d2e43cd5msh60ee8c95e26694ap104376jsn22703941ef17",
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
        data: encodedParams,
      };
      axios(options)
        .then((res) => {
          setError(false);
          setLoading(true);
          setTranslate(null);
          setTimeout(() => {
            setTranslate(res.data.data.translatedText);
            setLoading(false);
          }, 400);
        })
        .catch(() => {
          setLoading(true);
          setTranslate(null);
          setTimeout(() => {
            setError(true);
            setLoading(false);
          }, 600);
        });
    }
  };
  return (
    <>
      <div className="h-screen bg-slate-500 dark:bg-black flex flex-col justify-center duration-300">
        <div className="max-w-[1350px] mx-auto flex flex-col items-center gap-2">
          <div className="flex flex-row gap-1 md:gap-10">
            <button
              onClick={setLightMode}
              className="bg-black/50 rounded-md px-4 py-1 dark:bg-slate-500 text-white hover:opacity-80 active:scale-95 duration-150">
              Light Mode
            </button>
            <button
              onClick={setDarkMode}
              className="bg-black/50 rounded-md px-4 py-1 dark:bg-slate-500 text-white hover:opacity-80 active:scale-95 duration-150">
              Dark Mode
            </button>
          </div>
          <form
            id="form"
            onSubmit={handleTranslate}
            className="flex flex-col justify-center items-center gap-4">
            <div className="flex justify-center items-center gap-2">
              <h1 className="text-white">Translate from</h1>
              <select
                name="source"
                id="source"
                onChange={handleSource}
                className="form-select">
                {selectOptionsSource.map((option, key) => (
                  <option key={key} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <h1 className="text-white">To</h1>
              <select
                name="target"
                id="target"
                onChange={handleTarget}
                className="form-select">
                {selectOptionsTarget.map((option, key) => (
                  <option key={key} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <input
              className="outline-none px-2 py-1 dark:shadow-emerald-400/50 shadow-md hover:shadow-lg rounded-md min-w-[150px] w-full max-w-[400px]"
              ref={input}
              type="text"
              placeholder="Translate here..."
            />
            <button
              className="bg-emerald-400 shadow-lg dark:shadow-emerald-400/30 hover:bg-emerald-500 text-white active:scale-95 rounded-md p-1 px-5"
              onClick={handleTranslate}>
              Translate
            </button>
          </form>
          <div className="flex flex-col m-3 gap-2 items-center">
            {translated ? (
              <span className="text-white text-sm sm:text-lg border-[1px] px-2 rounded-md shadow-inner">
                {translated}
              </span>
            ) : loading ? (
              <BarLoader
                className="m-1"
                color={"#fff"}
                loading={loading}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              ""
            )}
            {translated ? (
              <CopyToClipboard
                text={translated}
                className="bg-emerald-400 shadow-lg hover:bg-emerald-500 active:scale-90 text-white rounded-md p-1 px-2">
                <button>Copy</button>
              </CopyToClipboard>
            ) : (
              ""
            )}
          </div>
          {error ? (
            <span className="text-red-300 p-1 px-5 rounded-[4px] border-[1px] border-red-600 ">
              This field can not be empty!
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default App;
