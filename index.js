const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const axios=require('axios')
const app = express();
const servers = http.createServer(app);
// const io = new Server(servers);

const port = 5000;
require('dotenv').config()
app.use(express.json());
app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const io = new Server(servers, {
  cors: {
    origin: "*",  // Adjust accordingly to your security requirements
    methods: ["GET", "POST"]
  }
});


servers.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

app.post('/chat', async (req,res)=>{
  if (!req.body) {
    return res.status(400).send('No request body');
}
// console.log(req.body.text,"reqq")

  // const {userInput}= req.body;
   try {
    const apiKey = process.env.APIKEY;  // Replace with your actual API key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

           const postData = {
               "contents": [
                   {
                       "parts": [
                           {
                               "text": req.body?.text  // Using the incoming message from the chat
                           }
                       ]
                   }
              ]
          };

          const response = await axios.post(`${apiUrl}`, postData, {
              headers: {
                  'Content-Type': 'application/json'
              }
           });
           res.json({ reply: response.data });
           console.log(response.reply?.candidates[0].content.parts[0].text,"****")

          }
          catch (error) {
            console.error('Failed to fetch from Gemini AI API:', error);
            res.status(500).send('Failed to fetch response');
        }
          
})

