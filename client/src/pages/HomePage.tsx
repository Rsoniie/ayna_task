

// import React, { useState, useEffect, useRef } from 'react';
// import { io, Socket } from 'socket.io-client';

// interface ChatMessage {
//   id: number;
//   text: string;
//   type: 'sent' | 'received' | 'system';
// }

// const ChatTest: React.FC = () => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [inputMessage, setInputMessage] = useState<string>('');
//   const messagesRef = useRef<HTMLDivElement>(null);
//   const nextIdRef = useRef<number>(1);

//   const getNextId = () => nextIdRef.current++;

//   // Adds a new message to state
//   const addMessage = (message: ChatMessage) => {
//     setMessages((prev) => [...prev, message]);
//   };

//   // Establish socket connection on component mount
//   useEffect(() => {
//     const newSocket: Socket = io('http://localhost:3001');
//     setSocket(newSocket);

//     newSocket.on('connect', () => {
//       console.log('Connected to WebSocket server!');
//       addMessage({ id: getNextId(), text: 'Connected to WebSocket server!', type: 'system' });
//     });

//     newSocket.on('server_message', (message: string) => {
//       console.log('Message from server:', message);
//       addMessage({ id: getNextId(), text: message, type: 'received' });
//     });

//     return () => {
//       newSocket.close();
//     };
//   }, []);

//   // Handle sending messages
//   const sendMessage = () => {
//     if (!socket || inputMessage.trim() === '') return;
//     socket.emit('client_message', inputMessage);
//     addMessage({ id: getNextId(), text: inputMessage, type: 'sent' });
//     setInputMessage('');
//   };

//   // Auto-scroll to the bottom when messages update
//   useEffect(() => {
//     if (messagesRef.current) {
//       messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
//     }
//   }, [messages]);

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
//     backgroundColor: '#075E54', // WhatsApp-like header color
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
//     backgroundColor: '#ECE5DD', // WhatsApp-like background
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
//     backgroundColor: '#128C7E', // WhatsApp send button color
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
//       <div style={headerStyle}>Chat</div>
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
//             {/* Display the "server" label above received messages */}
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







import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  id: number;
  text: string;
  type: 'sent' | 'received' | 'system';
}

const ChatTest: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const messagesRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef<number>(1);
  const navigate = useNavigate();

  const getNextId = () => nextIdRef.current++;

  // Adds a new message to state
  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  // Establish socket connection on component mount
  useEffect(() => {
    const newSocket: Socket = io('http://localhost:3001');
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

  // Handle sending messages
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

  // Logout handler: remove token and navigate to login
  const handleLogout = () => {
    localStorage.removeItem('token');
    if (socket) {
      socket.disconnect();
    }
    navigate('/login');
  };

  // Styling objects
  const containerStyle: React.CSSProperties = {
    maxWidth: '600px',
    margin: '20px auto',
    fontFamily: 'sans-serif',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: '#075E54', // WhatsApp-like header color
    color: 'white',
    padding: '10px 20px',
    fontSize: '18px',
    fontWeight: 'bold',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  };

  const messagesContainerStyle: React.CSSProperties = {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    backgroundColor: '#ECE5DD', // WhatsApp-like background
  };

  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    outline: 'none',
  };

  const buttonStyle: React.CSSProperties = {
    marginLeft: '10px',
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#128C7E',
    color: 'white',
    cursor: 'pointer',
  };

  // Message bubble styling based on type
  const messageBubbleStyle = (type: 'sent' | 'received' | 'system'): React.CSSProperties => {
    let backgroundColor = '#fff';
    let textColor = '#000';

    if (type === 'sent') {
      backgroundColor = '#DCF8C6';
    } else if (type === 'received') {
      backgroundColor = '#fff';
    } else if (type === 'system') {
      backgroundColor = 'transparent';
      textColor = '#888';
    }

    return {
      backgroundColor,
      color: textColor,
      padding: '8px 12px',
      borderRadius: '20px',
      maxWidth: '80%',
      fontSize: '14px',
      wordWrap: 'break-word',
    };
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span>Chat</span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
            alt="Logout"
            style={{ width: '24px', height: '24px', cursor: 'pointer' }}
            onClick={handleLogout}
          />
        </div>
      </div>
      <div id="messages" style={messagesContainerStyle} ref={messagesRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems:
                msg.type === 'sent'
                  ? 'flex-end'
                  : msg.type === 'received'
                  ? 'flex-start'
                  : 'center',
              marginBottom: '8px',
            }}
          >
            {/* Display the "server" label above received messages */}
            {msg.type === 'received' && (
              <span style={{ fontSize: '10px', color: '#555', marginBottom: '2px' }}>server</span>
            )}
            <div style={messageBubbleStyle(msg.type)}>{msg.text}</div>
          </div>
        ))}
      </div>
      <div style={inputContainerStyle}>
        <input
          type="text"
          id="messageInput"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          style={inputStyle}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button id="sendBtn" onClick={sendMessage} style={buttonStyle}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatTest;
