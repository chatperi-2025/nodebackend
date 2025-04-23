const express = require('express');
const cors = require('cors');
const app = express();

// Use CORS for handling cross-origin requests
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Default route to check if the backend is working
app.get('/', (req, res) => {
    res.send("✅ Welcome to the Peri Chatbot Backend!");
});

// Function to get a bot response based on user input
function getBotResponse(userInput) {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        return "Hey there! 👋";
    } else if (lowerInput.includes('how are you')) {
        return "I'm doing great, thanks for asking!";
    } else if (lowerInput.includes('your name')) {
        return "I'm Peri, your friendly chatbot.";
    } else if (lowerInput.includes('bye')) {
        return "Goodbye! Take care!";
    } else {
        return "I'm not sure how to respond to that.";
    }
}

// Chat endpoint to receive user messages and send bot responses
app.post('/chat', (req, res) => {
    const userInput = req.body.message;
    const botResponse = getBotResponse(userInput);
    res.json({ response: botResponse });
});

// New /print endpoint to print a message when called
app.get('/print', (req, res) => {
    console.log("✅ The /print API was called! Printing this message.");
    res.send("✅ Check the console! The /print API was successfully called.");
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`✅ Backend hosting is successful, running on http://127.0.0.1:${port}`);
});
