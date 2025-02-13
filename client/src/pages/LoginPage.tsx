

// // src/components/Login.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { db } from '../db/db';

// interface LoginResponse {
//   token: string;
//   user: {
//     id: number;
//     username: string;
//     email: string;
//   };
// }

// const Login: React.FC = () => {
//   const [identifier, setIdentifier] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();
//     setError('');

//     try {
//       // Replace with your actual endpoint
//       const { data } = await axios.post<LoginResponse>(
//         'http://localhost:1337/api/auth/local/',
//         { identifier, password }
//       );

//       // Clear any previous auth data and store the new data locally
//       await db.authData.clear();
//       await db.authData.add({
//         token: data.token,
//         user: data.user,
//       });

//       navigate('/chat');
//     } catch (err: any) {
//       if (axios.isAxiosError(err)) {
//         setError(err.response?.data?.message || 'Login failed. Please try again.');
//       } else {
//         setError('An unexpected error occurred.');
//       }
//     }
//   };

//   return (
//     <section className="bg-green-50 min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow">
//         <a href="#" className="flex items-center justify-center mb-6 text-2xl font-semibold text-green-700">
//           <img
//             className="w-8 h-8 mr-2"
//             src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
//             alt="logo"
//           />
//           ChatGreen
//         </a>
//         <h1 className="text-xl font-bold leading-tight tracking-tight text-green-700">
//           Sign in to your account
//         </h1>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="identifier" className="block mb-2 text-sm font-medium text-green-700">
//               Email or Username
//             </label>
//             <input
//               type="text"
//               name="identifier"
//               id="identifier"
//               placeholder="your-email-or-username"
//               value={identifier}
//               onChange={(e) => setIdentifier(e.target.value)}
//               required
//               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block mb-2 text-sm font-medium text-green-700">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember"
//                 type="checkbox"
//                 className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-green-500"
//               />
//               <label htmlFor="remember" className="ml-2 text-sm text-green-700">
//                 Remember me
//               </label>
//             </div>
//             <a href="#" className="text-sm font-medium text-green-600 hover:underline">
//               Forgot password?
//             </a>
//           </div>
//           <button
//             type="submit"
//             className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
//           >
//             Sign in
//           </button>
//           <p className="text-sm font-light text-gray-500">
//             Don’t have an account yet?{' '}
//             <a href="/signup" className="font-medium text-green-600 hover:underline">
//               Sign up
//             </a>
//           </p>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Login;




// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { db } from '../db/db';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');

    try {
      // Replace with your actual endpoint
      const { data } = await axios.post<LoginResponse>(
        'http://localhost:1337/api/auth/local/',
        { identifier, password }
      );

      // Clear any previous auth data and store the new data locally
      await db.authData.clear();
      await db.authData.add({
        token: data.token,
        user: data.user,
      });

      navigate('/chat');
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <section className="bg-green-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow">
        <a href="#" className="flex items-center justify-center mb-6 text-2xl font-semibold text-green-700">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          ChatGreen
        </a>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-green-700">
          Sign in to your account
        </h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="identifier" className="block mb-2 text-sm font-medium text-green-700">
              Email or Username
            </label>
            <input
              type="text"
              name="identifier"
              id="identifier"
              placeholder="your-email-or-username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-green-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-green-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-green-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm font-medium text-green-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500">
            Don’t have an account yet?{' '}
            <a href="/signup" className="font-medium text-green-600 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
