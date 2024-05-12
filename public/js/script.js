const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.querySelector('button').addEventListener('click', () => {
    recognition.start();
  });

recognition.addEventListener('speechstart', () => {
    console.log('Speech has been detected.');
});
recognition.addEventListener('result', (e) => {
    let last = e.results.length - 1;
    let text = e.results[last][0].transcript;
  
    console.log('Confidence: ' + e.results[0][0].confidence , text);
  
    // We will use the Socket.IO here later…
  });
  