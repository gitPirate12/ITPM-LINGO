import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { LuCopy } from "react-icons/lu";
import { FaMicrophone, FaStop } from "react-icons/fa6";
import "./translator.css";

function LanguageTranslator() {
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });
  const [isListening, setIsListening] = useState(false);
  const [fromContent] = useState("en-GB");
  const [toContent] = useState("si-LK");
  const [translatedText, setTranslatedText] = useState("");
  const [inputText, setInputText] = useState("");

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
    setIsListening(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleTranslate = () => {
    const translationText = inputText + transcript;
    if (!translationText.trim()) return;

    const transLINK = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      translationText
    )}&langpair=${fromContent}|${toContent}`;

    fetch(transLINK)
      .then((response) => response.json())
      .then((data) => {
        if (data.responseStatus === 200) {
          setTranslatedText(data.responseData.translatedText);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.warn("Browser does not support speech recognition.");
      return;
    }
    setTextToCopy(translatedText);
  }, [inputText, transcript, translatedText, browserSupportsSpeechRecognition]);

  return (
    <div className="translator-container">
      <div className="language-selector">
        <div className="lang-eng">English</div>
        <div className="lang-sin">Sinhala</div>
      </div>

      <div className="translation-grid">
        <textarea
          className="text-input"
          placeholder="Speak or type here..."
          value={inputText + transcript}
          onChange={handleInputChange}
          maxLength="5000"
        />

        <textarea
          className="text-output"
          placeholder="Translation will appear here..."
          value={translatedText}
          readOnly
        />
      </div>

      <div className="control-bar">
        <button className="control-btn primary" onClick={handleTranslate}>
          Translate
        </button>

        <button
          className={`control-btn ${isCopied ? "copied" : ""}`}
          onClick={setCopied}
        >
          <LuCopy className="icon" />
          {isCopied && <span className="feedback">Copied!</span>}
        </button>

        <button
          className={`control-btn ${isListening ? "active" : ""}`}
          onClick={isListening ? stopListening : startListening}
        >
          {isListening ? (
            <FaStop className="icon" />
          ) : (
            <FaMicrophone className="icon" />
          )}
          <span className="state-text">{isListening ? "Stop" : "Listen"}</span>
        </button>
      </div>
    </div>
  );
}

export default LanguageTranslator;
