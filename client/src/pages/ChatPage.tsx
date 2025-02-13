
// import React, { useState, useEffect, useRef } from 'react';
// import { io, Socket } from 'socket.io-client';
// import { useNavigate } from 'react-router-dom';
// import { db, ChatMessage, ChatSession, AuthData } from '../db/db';

// interface ChatMessageExtended {
//   id: number;
//   text: string;
//   type: 'sent' | 'received' | 'system';
// }

// const ChatTest: React.FC = () => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [messages, setMessages] = useState<ChatMessageExtended[]>([]);
//   const [inputMessage, setInputMessage] = useState<string>('');
//   const messagesRef = useRef<HTMLDivElement>(null);
//   const nextIdRef = useRef<number>(1);
//   const sessionIdRef = useRef<number | null>(null);
//   const navigate = useNavigate();

//   const getNextId = () => nextIdRef.current++;

//   // Adds a new message to state
//   const addMessage = (message: ChatMessageExtended) => {
//     setMessages((prev) => [...prev, message]);
//   };

//   // Load auth data and then load or create a chat session for this user
//   useEffect(() => {
//     const loadOrCreateSession = async () => {
//       const authRecords: AuthData[] = await db.authData.toArray();
//       if (authRecords.length === 0) {
//         // If no user is logged in, redirect to login.
//         navigate('/login');
//         return;
//       }
//       const currentUser = authRecords[0].user;

//       // Check for an existing session for this user
//       const existingSession: ChatSession | undefined = await db.chatSessions
//         .where('userId')
//         .equals(currentUser.id)
//         .first();

//       if (existingSession) {
//         sessionIdRef.current = existingSession.id!;
//         setMessages(existingSession.messages || []);
//         console.log('Loaded existing chat session for user:', currentUser.id);
//       } else {
//         // If none exists, create a new session for the user.
//         const sessionId = await db.chatSessions.add({
//           sessionName: 'Chat Session',
//           userId: currentUser.id,
//           messages: [],
//           timestamp: Date.now(),
//         });
//         sessionIdRef.current = sessionId;
//         console.log('Created new chat session for user:', currentUser.id);
//       }
//     };

//     loadOrCreateSession();
//   }, [navigate]);

//   // Establish socket connection on component mount
//   useEffect(() => {
//     const newSocket: Socket = io('http://localhost:3001');
//     setSocket(newSocket);

//     newSocket.on('connect', () => {
//       console.log('Connected to WebSocket server!');
//       addMessage({
//         id: getNextId(),
//         text: 'Connected to WebSocket server!',
//         type: 'system',
//       });
//     });

//     newSocket.on('server_message', (message: string) => {
//       console.log('Message from server:', message);
//       addMessage({ id: getNextId(), text: message, type: 'received' });
//     });

//     return () => {
//       newSocket.close();
//     };
//   }, []);

//   // Save chat history to local DB whenever messages change
//   useEffect(() => {
//     const updateSession = async () => {
//       if (sessionIdRef.current !== null) {
//         try {
//           await db.chatSessions.update(sessionIdRef.current, {
//             messages: messages,
//             timestamp: Date.now(),
//           });
//           console.log('Chat session updated with', messages.length, 'messages');
//         } catch (error) {
//           console.error('Failed to update chat session:', error);
//         }
//       }
//     };
//     updateSession();
//   }, [messages]);

//   const sendMessage = () => {
//     if (!socket || inputMessage.trim() === '') return;
//     socket.emit('client_message', inputMessage);
//     addMessage({ id: getNextId(), text: inputMessage, type: 'sent' });
//     setInputMessage('');
//   };

//   useEffect(() => {
//     if (messagesRef.current) {
//       messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
//     }
//   }, [messages]);


//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     if (socket) {
//       socket.disconnect();
//     }
//     navigate('/login');
//   };

//   // Styling objects
//   const containerStyle: React.CSSProperties = {
//     maxWidth: '600px',
//     margin: '20px auto',
//     fontFamily: 'sans-serif',
//     border: '1px solid #ddd',
//     borderRadius: '8px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//     display: 'flex',
//     flexDirection: 'column',
//     height: '80vh',
//   };

//   const headerStyle: React.CSSProperties = {
//     backgroundColor: '#075E54',
//     color: 'white',
//     padding: '10px 20px',
//     fontSize: '18px',
//     fontWeight: 'bold',
//     borderTopLeftRadius: '8px',
//     borderTopRightRadius: '8px',
//   };

//   const messagesContainerStyle: React.CSSProperties = {
//     flex: 1,
//     padding: '10px',
//     overflowY: 'auto',
//     backgroundColor: '#ECE5DD',
//   };

//   const inputContainerStyle: React.CSSProperties = {
//     display: 'flex',
//     padding: '10px',
//     borderTop: '1px solid #ddd',
//     backgroundColor: '#f9f9f9',
//   };

//   const inputStyle: React.CSSProperties = {
//     flex: 1,
//     padding: '10px',
//     borderRadius: '20px',
//     border: '1px solid #ccc',
//     outline: 'none',
//   };

//   const buttonStyle: React.CSSProperties = {
//     marginLeft: '10px',
//     padding: '10px 20px',
//     borderRadius: '20px',
//     border: 'none',
//     backgroundColor: '#128C7E',
//     color: 'white',
//     cursor: 'pointer',
//   };

//   // Message bubble styling based on type
//   const messageBubbleStyle = (type: 'sent' | 'received' | 'system'): React.CSSProperties => {
//     let backgroundColor = '#fff';
//     let textColor = '#000';

//     if (type === 'sent') {
//       backgroundColor = '#DCF8C6';
//     } else if (type === 'received') {
//       backgroundColor = '#fff';
//     } else if (type === 'system') {
//       backgroundColor = 'transparent';
//       textColor = '#888';
//     }

//     return {
//       backgroundColor,
//       color: textColor,
//       padding: '8px 12px',
//       borderRadius: '20px',
//       maxWidth: '80%',
//       fontSize: '14px',
//       wordWrap: 'break-word',
//     };
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={headerStyle}>
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//           <span>Chat</span>
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
//             alt="Logout"
//             style={{ width: '24px', height: '24px', cursor: 'pointer' }}
//             onClick={handleLogout}
//           />
//         </div>
//       </div>
//       <div id="messages" style={messagesContainerStyle} ref={messagesRef}>
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems:
//                 msg.type === 'sent'
//                   ? 'flex-end'
//                   : msg.type === 'received'
//                   ? 'flex-start'
//                   : 'center',
//               marginBottom: '8px',
//             }}
//           >
//             {msg.type === 'received' && (
//               <span style={{ fontSize: '10px', color: '#555', marginBottom: '2px' }}>server</span>
//             )}
//             <div style={messageBubbleStyle(msg.type)}>{msg.text}</div>
//           </div>
//         ))}
//       </div>
//       <div style={inputContainerStyle}>
//         <input
//           type="text"
//           id="messageInput"
//           placeholder="Type a message..."
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           style={inputStyle}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               sendMessage();
//             }
//           }}
//         />
//         <button id="sendBtn" onClick={sendMessage} style={buttonStyle}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatTest;


// src/components/ChatTest.tsx
import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { db, ChatMessage, ChatSession, AuthData } from '../db/db';

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

  // Add a new message to state
  const addMessage = (message: ChatMessageExtended) => {
    setMessages((prev) => [...prev, message]);
  };

  // Load auth data and then load or create a chat session for this user
  useEffect(() => {
    const loadOrCreateSession = async () => {
      const authRecords: AuthData[] = await db.authData.toArray();
      if (authRecords.length === 0) {
        // No user is logged in, redirect to login.
        navigate('/login');
        return;
      }
      const currentUser = authRecords[0].user;

      // Check for an existing session for this user
      const existingSession: ChatSession | undefined = await db.chatSessions
        .where('userId')
        .equals(currentUser.id)
        .first();

      if (existingSession) {
        sessionIdRef.current = existingSession.id!;
        setMessages(existingSession.messages || []);
        console.log('Loaded existing chat session for user:', currentUser.id);
      } else {
        // Create a new session if none exists.
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

  // Establish socket connection on mount
  
  useEffect(() => {

    const url = import.meta.env.VITE_SOCKET_API;
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

  // Save chat history to local DB whenever messages change
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

  // Auto-scroll to the bottom when messages update
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
