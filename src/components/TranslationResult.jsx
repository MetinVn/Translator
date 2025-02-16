import { CopyToClipboard } from "react-copy-to-clipboard";
import { BarLoader } from "react-spinners";

const TranslationResult = ({ translated, loading, error }) => (
  <div className="flex flex-col items-center gap-4">
    {loading && <BarLoader color={"#fff"} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader" />}
    {translated && (
      <div className="flex flex-col items-center gap-2">
        <span className="text-black dark:text-white text-sm sm:text-lg border-[1px] px-4 py-2 rounded-md shadow-inner bg-gray-100 dark:bg-gray-700">
          {translated}
        </span>
        <CopyToClipboard text={translated}>
          <button type="button" className="bg-green-500 shadow-lg hover:bg-green-600 active:scale-90 text-white rounded-md p-2 px-4">
            Copy
          </button>
        </CopyToClipboard>
      </div>
    )}
    {error && <span className="text-red-500 p-2 px-5 rounded-[4px] border-[1px] border-red-500">This field cannot be empty!</span>}
  </div>
);
export default TranslationResult;
