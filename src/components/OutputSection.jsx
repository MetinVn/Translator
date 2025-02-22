import { BarLoader } from "react-spinners";
import { FaMicrophone } from "react-icons/fa";

const OutputSection = ({ translated, loading, error, handleSpeech, recognizedText, isListening }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white p-4 overflow-x-hidden">
      {recognizedText && <div className=" text-xl whitespace-pre-wrap break-words max-w-full">Recognized: {recognizedText}</div>}
      {loading ? (
        <BarLoader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="mt-4 text-xl whitespace-pre-wrap break-words max-w-full">Translate: {translated}</div>
      )}
      {isListening && <div className="text-blue-600">Listening...</div>}
      <button className="mt-4 bg-blue-500 p-2 rounded-full hover:bg-blue-700" onClick={handleSpeech}>
        <FaMicrophone size={24} />
      </button>
    </div>
  );
};

export default OutputSection;
