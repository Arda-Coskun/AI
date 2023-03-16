// Set up OpenAI API variables
const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const API_KEY = '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'; // Replace with your OpenAI API key
const HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`
};
// List of bot responses
const botResponses = [
  'I am sorry, I did not understand.',
  'Can you please rephrase your question?',
  'I am not sure I can answer that.',
  'Could you provide more context?',
  'Let me think about that...',
  'Hmm, interesting question.',
  'I need more information to answer that.',
  'I am still learning, but I will do my best to assist you.',
];

// Function to add a new message to the chat log
function addMessage(message, sender) {
  const messageElem = document.createElement('p');
  messageElem.textContent = message;
  messageElem.classList.add(sender);
  log.appendChild(messageElem);
  log.scrollTop = log.scrollHeight;
}

// Function to generate a random bot response
function generateBotResponse() {
  return botResponses[Math.floor(Math.random() * botResponses.length)];
}

// Function to handle the form submission
async function handleSubmit(e) {
  e.preventDefault();
  const userInput = input.value.trim();
  
  // If user input is not empty
  if (userInput !== '') {
    addMessage(userInput, 'user');
    
    // Prepare API request data
    const prompt = `User: ${userInput}\nBot: `;
    const data = JSON.stringify({
      prompt: prompt,
      max_tokens: 50,
      temperature: 0.7
    });
    
    // Call OpenAI API
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: data
      });
      const { choices } = await response.json();
      const botResponse = choices[0].text.trim();
      addMessage(botResponse, 'bot');
    } catch (error) {
      console.log(error);
      addMessage(generateBotResponse(), 'bot');
    }
    
    input.value = '';
  }
}

// Display welcome message on page load
addMessage(welcomeMessage.textContent, 'bot');

// Event listener for form submission
form.addEventListener('submit', handleSubmit);

// Event listener for clear button
clearButton.addEventListener('click', () => {
  log.innerHTML = '';
  addMessage(welcomeMessage.textContent, 'bot');
});