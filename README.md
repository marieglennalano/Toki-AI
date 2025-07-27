
# 🧠 Toki AI Assistant

Toki is a lightweight, conversational AI assistant inspired by ChatGPT — featuring a clean and modern interface powered by React + Tailwind on the frontend, and connected to Meta's LLaMA 3 model via the Groq API on the backend.

## 🌐 Live Demo

> [Coming Soon – Deploy on Vercel / Render]

---

## 📦 Features

- 🧠 Conversational AI using **LLaMA 3 via Groq API**
- 🎨 Modern UI with **React + Tailwind CSS**
- 🌙 Dark mode toggle
- 🎤 Voice-to-text input (optional)
- 💬 Chat history saved in `localStorage`
- ⚡ Fast backend using **Node.js + Express**

---

## 📁 Project Structure

```
Toki-AI/
├── client/            # React frontend
│   ├── public/
│   └── src/
├── server/            # Node.js backend
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/YOUR_USERNAME/toki-ai.git
cd toki-ai
```

### 2. Install Dependencies

#### Server:
```bash
cd server
npm install
```

#### Client:
```bash
cd ../client
npm install
```

---

### 3. Add `.env` (Server)

Create a `.env` file inside the `server/` folder:

```env
GROQ_API_KEY=your_groq_api_key_here
```

> Get your free API key at: [https://console.groq.com/keys](https://console.groq.com/keys)

---

### 4. Run Locally

#### Backend:
```bash
cd server
nodemon index.js
```

#### Frontend:
```bash
cd client
npm run dev
```

Then visit: [http://localhost:5173](http://localhost:5173)

---

## 📸 Screenshots

> [Insert demo screenshots here]

---

## 🛠 Built With

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Groq API](https://console.groq.com)

---

## 📄 License

MIT © [Marie Glenn](https://github.com/marieglennalano)
