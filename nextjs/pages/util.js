export function predictTopic(sentences) {
    const topics = [];
    let commonTopic = null;

    // function to find topics in a sentence
    function findTopics(sentence, topics) {
        const words = sentence.split(' ');
        for (let i = 1; i < words.length - 1; i++) {
            const prevWord = words[i - 1];
            const nextWord = words[i + 1];
            const currentWord = words[i].replace(/[^\w]/g, '');
            if (!isGrammaticalWord(currentWord)) {
                const isTopic = topics.includes(currentWord);
                const isMatch = currentWord === prevWord || currentWord === nextWord;
                if (!isTopic && isMatch) {
                    // if topic is not already in the array, add it
                    topics.push(currentWord);
                }
            }
        }
    }

    // find topics in all sentences
    for (let i = 0; i < sentences.length; i++) {
        const currentSentence = sentences[i];
        findTopics(currentSentence, topics);
    }

    // check for common topics
    for (let i = 0; i < topics.length; i++) {
        const currentTopic = topics[i];
        let foundInAllSentences = true;
        for (let j = 0; j < sentences.length; j++) {
            const currentSentence = sentences[j];
            if (!currentSentence.includes(currentTopic)) {
                foundInAllSentences = false;
                break;
            }
        }
        if (foundInAllSentences) {
            commonTopic = currentTopic;
            break;
        }
    }

    // return the predicted common topic
    return commonTopic;
}

function isGrammaticalWord(word) {
    const grammaticalWords = ['a', 'an', 'the', 'and', 'but', 'in', 'on', 'at', 'to', 'of'];
    return grammaticalWords.includes(word);
}
