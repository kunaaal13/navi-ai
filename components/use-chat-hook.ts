import { useState } from 'react';

import getAIResponse from '~/lib/gemini';

function useChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  async function sendMessage(onMessageAdd: () => void) {
    if (input === '') return;

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        text: input,
      },
    ]);

    setInput('');
    onMessageAdd();

    // Get a response from the AI
    try {
      let stream = await getAIResponse(input, messages);
      console.log(stream);

      let text = '';
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: '',
        },
      ]);

      for await (const chunk of stream) {
        const chunkText = chunk.text();
        text += chunkText;

        // Update the last message
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            role: 'model',
            text,
          },
        ]);
      }

      //   setMessages((prev) => [
      //     ...prev,
      //     {
      //       role: 'model',
      //       text: response,
      //     },
      //   ]);

      onMessageAdd();
    } catch (error) {
      console.error(error);
      return `Sorry, I'm having trouble understanding you. Could you please rephrase?`;
    }
  }

  return {
    input,
    setInput,
    messages,
    sendMessage,
  };
}

export default useChat;
