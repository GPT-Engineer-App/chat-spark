import { Box, Button, Input, VStack, Text, HStack, Avatar, IconButton, useToast } from "@chakra-ui/react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleSendMessage = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Cannot send empty message.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "You",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <VStack spacing={4} p={5}>
      <HStack width="100%" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          Chat App
        </Text>
        <Avatar icon={<FaUserCircle />} />
      </HStack>
      <Box width="100%" height="500px" bg="gray.100" overflowY="auto" p={3}>
        {messages.map((message) => (
          <Box key={message.id} alignSelf={message.sender === "You" ? "flex-end" : "flex-start"} bg="teal.100" p={3} borderRadius="lg" maxWidth="70%">
            <Text fontSize="sm">{message.text}</Text>
            <Text fontSize="xs" opacity={0.6}>
              {message.time}
            </Text>
          </Box>
        ))}
      </Box>
      <HStack width="100%">
        <Input placeholder="Type a message..." value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} />
        <IconButton icon={<FaPaperPlane />} onClick={handleSendMessage} aria-label="Send message" />
      </HStack>
    </VStack>
  );
};

export default Index;
