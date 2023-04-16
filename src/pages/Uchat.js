import React, {
  useState,
  useRef,
  useEffect
} from "react";
import { Container, Button } from "@mui/material";
import Input from "antd/lib/input";
import Typography from "antd/lib/typography";

import hljs from "highlight.js";
import axios from "axios";
import { SendOutlined, CopyOutlined } from "@ant-design/icons";
import Typewriter from "typewriter-effect";
import { BaseURL } from "./UrlConfig";
// sections
import "./styles.css";

import Header from "./ChatHeader";

const { Paragraph } = Typography;

export default function UChat() {
  const [inputValue, setInputValue] = useState("");
  const [question, setQuestion] = useState("");
  const [conversations, setConversations] = useState([]);
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  function BouncingDotsLoader() {
    return (
      <>
        <blockquote style={{ fontSize: "16px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              src="/assets/icons/user_ic.png"
              width={36}
              height={36}
              style={{ padding: 5 }}
              alt="Ucmate Chat logo"
            />{" "}
            {question}
          </div>
        </blockquote>
        <div className="bouncing-loader">
          <div />
          <div />
          <div />
        </div>
      </>
    );
  }
  const handleClick = (text) => {
    setQuestion(text);
    setInputValue("");
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BaseURL}/v1/ai-chatbot/?query=${text}&lang=en&is_ai=false`
        );
        const newConversation = {
          question: text,
          answer: response.data.response,
        };
        setConversations([...conversations, newConversation]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCopyResponse = (responseText) => {
    navigator.clipboard.writeText(responseText);
  };

  useEffect(() => {
    hljs.highlightAll();
  }, [conversations]);

  return (
    <>
      <Header />
      <main className="App">
        <section className="wrapper">
          <div className="container">
            <div className="ptop" />
            <Container>
              <Paragraph>
                <blockquote style={{ fontSize: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <img
                      src="/assets/icons/uaichat.png"
                      width={31}
                      height={31}
                      style={{ padding: 5 }}
                      alt="Ucmate Chat logo"
                    />{" "}
                    Hello! How can I help you?
                  </div>
                </blockquote>
                {conversations.map((conversation, index) => (
                  <div key={index}>
                    <p>
                      <blockquote style={{ fontSize: "16px" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <img
                            src="/assets/icons/user_ic.png"
                            width={36}
                            height={36}
                            style={{ padding: 5 }}
                            alt="Ucmate Chat logo"
                          />{" "}
                          {conversation.question}
                        </div>
                      </blockquote>
                    </p>
                    <div style={{ position: "relative" }}>
                      <Button
                        onClick={() => handleCopyResponse(conversation.answer)}
                        icon={<CopyOutlined />}
                        style={{ position: "absolute", bottom: 0, right: 0 }}
                      >
                        <CopyOutlined />
                      </Button>
                      <pre>
                        <div style={{ display: "flex" }}>
                          <img
                            src="/assets/icons/uaichat.png"
                            width={40}
                            height={40}
                            style={{ padding: 10 }}
                            alt="Ucmate Chat logo"
                          />
                          <Typewriter
                            onInit={(typewriter) => {
                              typewriter
                                .typeString(conversation.answer)
                                .callFunction(() => {
                                  hljs.highlightAll();
                                  console.log("All strings were deleted");
                                })
                                .start();
                            }}
                            options={{
                              typeSpeed: 1,
                              smartBackspace: false,
                              deleteSpeed: 1000000000,
                              cursor: "",
                              delay: 1,
                            }}
                          />
                        </div>
                      </pre>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
                {isLoading && <BouncingDotsLoader />}
              </Paragraph>

              <div
                style={{
                  position: "fixed",
                  width: "100%",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Input.Search
                  placeholder="Say anything..."
                  allowClear
                  size="large"
                  enterButton={<SendOutlined />}
                  value={inputValue}
                  onChange={handleInputChange}
                  onSearch={handleClick}
                  style={{ width: "100%", maxWidth: "600px", padding: 10 }}
                />
              </div>
            </Container>
          </div>
        </section>
      </main>
      <div className="pbottom" />
    </>
  );
}
