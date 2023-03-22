import React from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import axios from 'axios';

const Chatbot = () => {
  const handleNewUserMessage = async (message) => {
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: `I am a chatbot for a property website in Singapore. I can answer questions like "What time do you open?" and "Where can I email you?".\n\nUser: ${message}\nChatbot:`,
        max_tokens: 50,
        n: 1,
        stop: null,
        temperature: 0.7,
        top_p: 1,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
        },
      });

      const reply = response.data.choices[0].text.trim();
      addResponseMessage(reply);
    } catch (error) {
      addResponseMessage('Sorry, I am having trouble processing your request. Please try again later.');
    }
  };

  return (
    <div>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Property Chatbot"
        subtitle="Ask me anything about properties in Singapore!"
      />
    </div>
  );
};

export default Chatbot;