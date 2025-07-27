import React from 'react';

function App() {
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 p-4">
        <h1 className="text-2xl font-bold mb-4">Toki-AI</h1>
        <button className="w-full py-2 px-4 bg-blue-500 text-white rounded">
          + New Chat
        </button>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          {/* Messages will go here */}
          <p className="text-gray-500 text-center mt-10">No messages yet</p>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t bg-gray-100">
          <form className="flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded mr-2"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
