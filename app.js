const express = require('express');
const cors = require('cors');
const axios = require('axios'); // <-- add this

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = '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';

app.get('/', (req, res) => {
    res.send("✅ Welcome to the Peri Chatbot Backend!");
});

app.post('/chat', async (req, res) => {
    const userInput = req.body.message;

    try {
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: 'mixtral-8x7b-32768', // or any other supported model like llama3-70b
            messages: [{ role: 'user', content: userInput }],
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const botMessage = response.data.choices[0].message.content;
        res.json({ response: botMessage });
    } catch (error) {
        console.error('❌ Error calling Groq API:', error.message);
        res.status(500).json({ response: "Oops! Something went wrong. Try again later." });
    }
});

app.get('/print', (req, res) => {
    console.log("✅ The /print API was called! Printing this message.");
    res.send("✅ Check the console! The /print API was successfully called.");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`✅ Backend hosting is successful, running on http://127.0.0.1:${port}`);
});
