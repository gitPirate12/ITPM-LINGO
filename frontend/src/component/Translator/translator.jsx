import "./Translator.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useEffect, useState } from "react";
import { FaStop } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { IoPlay } from "react-icons/io5";

const Translator = () => {
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });
  const [translatedText, setTranslatedText] = useState("");
  const [inputText, setInputText] = useState("");

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-GB" });

  const handleTranslate = () => {
    const textToTranslate = inputText + transcript;
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      textToTranslate
    )}&langpair=en-GB|si-LK`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.responseData) {
          setTranslatedText(data.responseData.translatedText);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (translatedText) {
      setTextToCopy(translatedText);
    }
  }, [translatedText]);

  if (!browserSupportsSpeechRecognition) {
    return <div>Browser doesn't support speech recognition.</div>;
  }

  return (
    
      <div className="trans-container">
        <h1>English to Sinhala Translator</h1>
        <div className="text-container">
          <textarea
            className="fromText"
            placeholder="Enter Text"
            value={inputText + transcript}
            onChange={(e) => setInputText(e.target.value)}
            maxLength="5000"
          />
          <textarea
            className="toTranslate"
            placeholder="Translation"
            value={translatedText}
            readOnly
          />
        </div>

        <div className="button-container">
          <button className="translateBtn" onClick={handleTranslate}>
            <IoPlay />
          </button>
          <button className="translateBtn" onClick={setCopied}>
            {isCopied ? "Copied!" : <MdContentCopy />}
          </button>
          <button className="translateBtn" onClick={startListening}>
            <FaMicrophone />
          </button>
          <button
            className="translateBtn"
            onClick={SpeechRecognition.stopListening}
          >
            <FaStop />
          </button>
        </div>
      </div>
   
  );
};

export default Translator;
