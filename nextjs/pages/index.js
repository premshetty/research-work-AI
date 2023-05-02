import React, { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";


const App = () => {
  const [speech, setSpeech] = useState("");
  const [currentSentence, setCurrentSentence] = useState("");
  const [sentenceList, setSentenceList] = useState([]);



  const { listen, listening, stop } = useSpeechRecognition({
    onResult: async (result) => {
      const transcript = result;
      setSpeech(transcript);
      // If transcript is not undefined and length > 0
      if (transcript && transcript.length > 0) {
        let sentences = transcript;
        if (sentences && sentences.length > 0) {
          const commonTopic = predictTopic(sentences); // use predictTopic to find the common topic
          let prevTopic = null;
          for (let i = 0; i < sentences.length; i++) {
            const sentence = sentences[i];
            const matchedTopic = sentence.includes(commonTopic) ? commonTopic : null; // check if the sentence includes the common topic
            if (matchedTopic && matchedTopic === prevTopic) {
              setSentenceList(prevList => {
                const lastSentenceIndex = prevList.length - 1;
                const previousSentence = prevList[lastSentenceIndex];
                const updatedSentence = `${previousSentence} ${sentence}`;
                setCurrentSentence(updatedSentence);
                return [...prevList.slice(0, -1), updatedSentence];
              });
            } else if (matchedTopic && matchedTopic !== prevTopic) {
              setCurrentSentence(sentence);
              setSentenceList(prevList => [...prevList, sentence]);
              prevTopic = matchedTopic;
            } else {
              setCurrentSentence(sentence);
              setSentenceList(prevList => [...prevList, sentence]);
              prevTopic = null;
            }
          }

        }
      }
    }
  });


  console.log({
    currentSentence, sentenceList, speech
  })
  return (< div >
    <button onClick={listen}>Start</button>
    <button onClick={stop}>Stop</button>
    <p>Current Text: {speech}</p><p p > Current Sentence: {currentSentence}</p>
    <p>Sentence List: </p>
    <ul>
      {sentenceList.map((sentence, index) => (
        <li key={index}>{sentence}</li>
      ))}
    </ul>
  </div >
  );
};

export default App;
