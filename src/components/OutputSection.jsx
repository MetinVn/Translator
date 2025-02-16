import { BarLoader } from "react-spinners";

import { FaMicrophone } from "react-icons/fa";

const OutputSection = ({ translated, loading, error, handleSpeech, recognizedText }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      {loading ? <BarLoader /> : error ? <div>{error}</div> : <div className="text-3xl">{translated}</div>}
      {recognizedText && <div className="mt-4 text-xl">Recognized: {recognizedText}</div>}
      <button className="mt-4 bg-blue-500 p-2 rounded-full hover:bg-blue-700" onClick={handleSpeech}>
        <FaMicrophone size={24} />
      </button>
    </div>
  );
};

export default OutputSection;
