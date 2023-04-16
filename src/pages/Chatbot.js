import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useRef, useEffect } from 'react';
// @mui
import {
  Popover,
  MenuItem,
  Container,
  Button
} from '@mui/material';

import { Input, Typography } from 'antd';
import { SendOutlined, UserOutlined,CopyOutlined  } from '@ant-design/icons';
import axios from "axios";

import hljs from 'highlight.js';
import Typewriter from 'typewriter-effect';

// components
import Iconify from '../components/iconify';
import { BaseURL } from "./UrlConfig";
// sections
// mock
import './styles.css';
// ----------------------------------------------------------------------

const { Title, Paragraph, Text, Link } = Typography;
// ----------------------------------------------------------------------



export default function Chatbot() {
  const [open, setOpen] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [conversations, setConversations] = useState([]);
  const messagesEndRef = useRef(null);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClick = (text) => {
    setInputValue('');
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/v1/ai-chatbot/?query=${text}&lang=en&is_ai=false`);
        const newConversation = { question: text, answer: response.data.response };
        setConversations([...conversations, newConversation]);
      } catch (error) {
        console.error(error);
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
  }, []);

    return (
    <>
      <Helmet>
        <title> Chatbot | AiEStack.Com</title>
      </Helmet>

      <Container>

   <Paragraph>
      {conversations.map((conversation, index) => (
        <div key={index}>
          <p>
            <blockquote style={{ fontSize: '16px' }}> <UserOutlined /> {conversation.question}</blockquote>
          </p>
          <div style={{ position: 'relative' }}>
            <Button onClick={() => handleCopyResponse(conversation.answer)} icon={<CopyOutlined />} style={{ position: 'absolute', bottom: 0, right: 0 }}><CopyOutlined /></Button>
            <p>
              <pre>

                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter.typeString(conversation.answer)
                      .callFunction(() => {
                        hljs.highlightAll();
                        console.log('All strings were deleted');
                      })
                        .start();
                    }}
                    options={{
                      typeSpeed: 1,
                      smartBackspace: false,
                      deleteSpeed: 1000000000, 
                      cursor: "",
                      delay: 1
                    }}
                  />


              </pre>
            </p>
          </div>
        </div>
      ))}
  <div ref={messagesEndRef} />
</Paragraph>

        <div style={{ position: 'fixed', width:'100%', left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Input.Search
          placeholder="Say anything..."
          allowClear
          size="large"
          enterButton={<SendOutlined />}
          value={inputValue}
          onChange={handleInputChange}
          onSearch={handleClick}
          style={{ width: '100%', maxWidth: '600px', padding: 10 }}
        />
      </div>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
