
import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { db, ChatSession, AuthData } from '../db/db';

interface ChatMessageExtended {
  id: number;
  text: string;
  type: 'sent' | 'received' | 'system';
}

const ChatTest: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessageExtended[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const messagesRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef<number>(1);
  const sessionIdRef = useRef<number | null>(null);
  const navigate = useNavigate();

  const getNextId = () => nextIdRef.current++;
  const addMessage = (message: ChatMessageExtended) => {
    setMessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    const loadOrCreateSession = async () => {
      let currentUser;
      const authRecords: AuthData[] = await db.authData.toArray();
      if (authRecords.length > 0) {
        currentUser = authRecords[0].user;
        localStorage.setItem('user', JSON.stringify(currentUser)); 
      } else {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          currentUser = JSON.parse(storedUser);
        } else {
          navigate('/login');
          return;
        }
      }
  
      console.log('Current User:', currentUser);
      const existingSession: ChatSession | undefined = await db.chatSessions
        .where('userId')
        .equals(currentUser._id)
        .first();
  
      if (existingSession) {
        sessionIdRef.current = existingSession.id!;
        setMessages(existingSession.messages || []);
        console.log('Loaded existing chat session for user:', currentUser.id);
      } else {
        const sessionId = await db.chatSessions.add({
          sessionName: 'Chat Session',
          userId: currentUser.id,
          messages: [],
          timestamp: Date.now(),
        });
        sessionIdRef.current = sessionId;
        console.log('Created new chat session for user:', currentUser.id);
      }
    };
  
    loadOrCreateSession();
  }, [navigate]);
  
  useEffect(() => {

    const url = import.meta.env.VITE_API_URL;
    const newSocket: Socket = io(`${url}`);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server!');
      addMessage({ id: getNextId(), text: 'Connected to WebSocket server!', type: 'system' });
    });

    newSocket.on('server_message', (message: string) => {
      console.log('Message from server:', message);
      addMessage({ id: getNextId(), text: message, type: 'received' });
    });

    return () => {
      newSocket.close();
    };
  }, []);
  useEffect(() => {
    const updateSession = async () => {
      if (sessionIdRef.current !== null) {
        try {
          await db.chatSessions.update(sessionIdRef.current, {
            messages: messages,
            timestamp: Date.now(),
          });
          console.log('Chat session updated with', messages.length, 'messages');
        } catch (error) {
          console.error('Failed to update chat session:', error);
        }
      }
    };
    updateSession();
  }, [messages]);

  const sendMessage = () => {
    if (!socket || inputMessage.trim() === '') return;
    socket.emit('client_message', inputMessage);
    addMessage({ id: getNextId(), text: inputMessage, type: 'sent' });
    setInputMessage('');
  };
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (socket) {
      socket.disconnect();
    }
    navigate('/login');
  };

  return (
    <div className="max-w-xl mx-auto my-5 flex flex-col h-[80vh] border border-gray-200 rounded-lg shadow-md bg-white">
      {/* Header */}
      <div className="bg-gray-800 text-white py-2 px-5 font-bold rounded-t-lg">
        <div className="flex items-center justify-between">
          <span>Chat</span>
          <img
            // src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
            src='https://i.pinimg.com/736x/ce/32/c6/ce32c62c5b10c25e0dba7ce29e99d9d4.jpg'
            alt="Logout"
            className="w-6 h-6 cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100" ref={messagesRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 flex flex-col ${
              msg.type === 'sent'
                ? 'items-end'
                : msg.type === 'received'
                ? 'items-start'
                : 'items-center'
            }`}
          >
            {msg.type === 'received' && (
              <span className="text-xs text-gray-600 mb-1">server</span>
            )}
            <div
              className={`max-w-[80%] text-sm px-3 py-2 rounded-full ${
                msg.type === 'sent'
                  ? 'bg-gray-300 text-gray-800'
                  : msg.type === 'received'
                  ? 'bg-white text-gray-800'
                  : 'bg-transparent text-gray-500'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      {/* Input Container */}
      <div className="flex p-4 border-t border-gray-300 bg-white">
        <input
          type="text"
          id="messageInput"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
          className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <button
          id="sendBtn"
          onClick={sendMessage}
          className="ml-3 py-2 px-5 rounded-full bg-gray-800 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatTest;
