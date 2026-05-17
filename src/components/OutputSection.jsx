import { BarLoader } from "react-spinners";

const OutputSection = ({ translated, loading, error, recognizedText, isListening }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white p-4 overflow-x-hidden">
      {recognizedText && <div className=" text-xl whitespace-pre-wrap break-words max-w-full">Recognized: {recognizedText}</div>}
      {loading ? (
        <BarLoader />
      ) : error ? (
        <span className="text-red-500">{error}</span>
      ) : translated? (
        <div className="mt-4 text-xl whitespace-pre-wrap break-words max-w-full">Translate: {translated}</div>
      ):(
        <div className="mt-4 text-xl whitespace-pre-wrap break-words max-w-full">Translation will appear here</div>
      ) 
      }
      {isListening && <div className="text-blue-600">Listening...</div>}
    </div>
  );
};

export default OutputSection;
