// components/Typewriter.tsx
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

interface TypewriterProps {
  words: string[];
  speed: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ words, speed }) => {
  const [displayText, setDisplayText] = useState<string>("");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const typeChars = () => {
      if (wordIndex < words.length) {
        const currentWord = words[wordIndex];
        if (charIndex < currentWord.length) {
          setDisplayText((prev) => prev + currentWord[charIndex]);
          setCharIndex((prev) => prev + 1);
          timeoutId = setTimeout(typeChars, speed);
        } else {
          // Move to the next word
          setCharIndex(0);
          setWordIndex((prev) => prev + 1);
          timeoutId = setTimeout(typeChars, speed);
        }
      }
    };

    timeoutId = setTimeout(typeChars, speed);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [words, speed, wordIndex, charIndex]);

  return <Typography variant="h4" color="white">{displayText}</Typography>;
};

export default Typewriter;
