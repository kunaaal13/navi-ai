import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Message {
  sender: 'user' | 'AI';
  text: string;
}

const initialMessages: Message[] = [
  {
    sender: 'AI',
    text: 'Hello there',
  },
  {
    sender: 'user',
    text: 'Hello',
  },
  {
    sender: 'AI',
    text: 'How are you doing today?',
  },
];

function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const listRef = useRef<FlatList>(null);

  function sendMessage() {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: 'user',
        text: input,
      },
    ]);

    // clear input
    setInput('');

    // simulate streaming AI response add words every second to the last message
    const response = 'Hello AI';
    const lastMessage = messages[messages.length - 1];

    // Scroll to the bottom
    listRef.current?.scrollToEnd();
  }
  return (
    <SafeAreaView className="flex-1 bg-black w-full items-center">
      {/* Chats */}
      <View className="flex-1 bg-black w-full" style={{ padding: 20 }}>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          ref={listRef}
          renderItem={({ item }) => (
            <View
              className={`${item.sender === 'user' ? 'bg-blue-700' : 'bg-gray-600'} px-3 py-4 rounded-xl mb-5`}
              style={{
                alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
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
