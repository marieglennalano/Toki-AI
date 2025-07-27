# 🤖 Toki AI Assistant

Toki is a sleek, voice-enabled AI assistant powered by Groq + LLaMA3. Designed with a ChatGPT-like experience, it supports real-time conversations, chat history, and dark mode — all within a clean React + Tailwind CSS interface.

![Toki Banner](https://via.placeholder.com/1200x400?text=Toki+AI+Assistant)

---

## 🚀 Live Demo

> Coming Soon or [Run Locally](#getting-started)

---

## ✨ Features

- 🎤 Voice Recognition (Speech-to-Text)
- 💬 Chat interface with LLaMA 3 via Groq API
- 🌓 Light & Dark Mode toggle
- 🕓 Recent Chats saved via `localStorage`
- ⚡ Blazing-fast inference powered by Groq
- 🎨 Responsive UI with Tailwind CSS
- 🧠 Smart assistant personality (ChatGPT-like)

---

## 🧱 Tech Stack

| Frontend      | Backend     | API / Model |
|---------------|-------------|-------------|
| React + Vite  | Node.js + Express | Groq API (LLaMA3) |
| Tailwind CSS  | CORS, Fetch | JSON REST API |

---

## 📁 Project Structure

```bash
Toki-AI/
├── client/              # React frontend (Vite)
│   ├── components/      # ChatBox, Sidebar, Toggle, etc.
│   ├── assets/          # Icons, images
│   ├── App.jsx          
│   └── main.jsx
├── server/              # Express backend
│   └── index.js
├── .env                 # Groq API key
└── README.md
```

---

## 🔐 Setup Environment

1. **Create `.env` file in `/server`**:

```env
GROQ_API_KEY=your_groq_api_key_here
```

> You can obtain a free Groq API key from: https://console.groq.com/

---

## 🛠️ Getting Started

### Clone and install:

```bash
git clone https://github.com/your-username/toki-ai.git
cd toki-ai
```

### Setup Backend:

```bash
cd server
npm install
node index.js   # or use nodemon
```

### Setup Frontend:

```bash
cd ../client
npm install
npm run dev
```

### Test API (Optional via Postman)

POST to `http://localhost:5000/api/chat`  
with JSON body:
```json
{
  "message": "Hello, what can you do?"
}
```

---

## 📷 Screenshots

> Add your screenshots here!

---

## 🧠 How It Works

Toki takes your message from the frontend, sends it to your Express server, which relays it to Groq’s hosted LLaMA3 model. The model returns a smart, human-like response, which is then displayed in the chatbox.

---

## 📌 Future Plans

- 🗂️ Chat history persistence (backend)
- 🧑‍💼 Authentication
- 🌍 Multi-language support
- 📱 PWA version

---

## 🧑‍💻 Author

**Marie Glenn Alano**  
[LinkedIn](https://www.linkedin.com/in/marie-glenn-alano-4aab99118/)  
📍 Cavite, Philippines

---

## 🪪 License

MIT © 2025

---

## 🌟 Star This Project

If you like this project, consider giving it a ⭐ on GitHub!
