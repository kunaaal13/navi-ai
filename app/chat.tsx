import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import getAIResponse, { Message } from '~/lib/gemini';

function Chat() {
  const listRef = useRef<FlatList>(null);
  const viewRef = useRef<View>(null);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  async function sendMessage() {
    if (input === '') return;

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        text: input,
      },
    ]);

    setInput('');
    scrollToBottom();

    // Get a response from the AI
    try {
      let response = await getAIResponse(input, messages);

      // Simulate typing add word by word with a delay of 100ms
      const words = response.split(' ');
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: '...',
        },
      ]);

      let temp = '';

      for (let i = 0; i < words.length; i++) {
        setTimeout(() => {
          temp += words[i] + ' ';
          // Replace the last message with the new one
          setMessages((prev) => [
            ...prev.slice(0, prev.length - 1),
            {
              role: 'model',
              text: temp,
            },
          ]);
          scrollToBottom();
        }, i * 100);
      }

      scrollToBottom();
    } catch (error) {
      console.error(error);
      return `Sorry, I'm having trouble understanding you. Could you please rephrase?`;
    }
  }

  function scrollToBottom() {
    listRef.current?.scrollToEnd();
  }

  return (
    <SafeAreaView className="flex-1 bg-black w-full items-center">
      {/* Chats */}
      <View ref={viewRef} className="flex-1 bg-black w-full pb-5" style={{ padding: 20 }}>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          ref={listRef}
          renderItem={({ item }) => (
            <View
              className={`${item.role === 'user' ? 'bg-blue-700' : 'bg-gray-600'} px-3 py-4 rounded-xl mb-5`}
              style={{
                alignSelf: item.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '75%',
              }}>
              <Text
                className="text-white text-xl"
                style={{
                  fontFamily: 'Geist-Medium',
                }}>
                {item.text}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Input */}
      <View
        className="bg-black rounded-2xl border border-white p-5 flex flex-row items-center justify-between"
        style={{
          width: '90%',
        }}>
        <TextInput
          className="text-white bg-black border-none outline-none text-xl placeholder:text-xl flex-1 mr-2 placeholder:text-slate-300"
          style={{
            fontFamily: 'Geist-Medium',
          }}
          placeholder="Hello"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity className="" onPress={sendMessage}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Chat;
