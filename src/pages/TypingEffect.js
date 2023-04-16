import React, { useState, useEffect } from "react";

const TypingEffect = ({ text, speed }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayText((prevText) => {
        if (index >= text.length) {
          clearInterval(intervalId);
        }
        index += 1;
        return text.slice(0, index);
      });
    }, speed);

    return () => {
      clearInterval(intervalId);
      index = 0;
    };
  }, [text, speed]);

  return <span dangerouslySetInnerHTML={{__html: displayText}}/>;
};

export default TypingEffect;
