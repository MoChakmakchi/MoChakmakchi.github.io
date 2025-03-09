document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chatMessages");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");

  // Store message history
  let messageHistory = [];

  // Function to add a message to the chat
  function addMessage(message, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? "user" : "bot"}`;

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.textContent = message;

    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);

    // Add message to history
    messageHistory.push({
      role: isUser ? "user" : "assistant",
      content: message
    });

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Function to handle sending messages
  async function handleSendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, true);
    userInput.value = "";

    const response = await fetch("https://6xpmb1vk-3000.asse.devtunnels.ms/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        message,
        messageHistory: messageHistory.slice(0, -1) // Send all messages except the last one (current message)
      }),
    });

    const data = await response.json();
    addMessage(data.response, false);
    console.log(data);
  }

  // Event listeners
  sendButton.addEventListener("click", handleSendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  });
});
