
function sendMessage() {
  const userInput = document.getElementById('userInput').value;
  const responseContainer = document.getElementById('response');

  responseContainer.innerText = `Bot: Typing.......`
  fetch('/chat', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: userInput })
  })
  .then(response => response.json())
  .then(data => {
      //  displayMessage(data.reply?.candidates[0].content.parts[0].text, 'user');
      responseContainer.innerText = `Bot: ${data.reply?.candidates[0].content.parts[0].text}`;
  })
  .catch(error => {
      console.error('Error:', error);
      responseContainer.innerText = 'Error: Could not talk to bot';
  });
}

