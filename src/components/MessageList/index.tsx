import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { styles } from "./styles";
import { Message, MessageProps } from "../Message";
import { api } from "../../services/api";
export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);
  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<MessageProps[]>("/messages/last3");
      setCurrentMessages(messagesResponse.data);
    }

    fetchMessages();
  }, []);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((message) => (
        <Message data={message} key={message.id} />
      ))}
    </ScrollView>
  );
}
