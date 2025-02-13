
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
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


  const handleforget = () => {
    alert("This feature is not available yet");
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <img
            className="w-12 h-12 mb-2"
            // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            src='https://cdn.worldvectorlogo.com/logos/wechat-black.svg'
            alt="logo"
          />
          <h1 className="text-2xl font-semibold text-gray-800">Sign in</h1>
        </div>
        {error && <p className="mb-4 text-center text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="identifier" className="block text-gray-600 mb-1">
              Email or Username
            </label>
            <input
              type="text"
              name="identifier"
              id="identifier"
              placeholder="Enter your email or username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-gray-600 mb-1">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.959 9.959 0 013.141-7.07m1.428 1.428A7.953 7.953 0 003 9c0 4.418 3.582 8 8 8a7.953 7.953 0 005.642-2.569m-1.429-1.428L19.07 19.07M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-gray-600 focus:ring-gray-300 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a onClick={handleforget} className="text-sm text-gray-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors">
            Sign in
          </button>
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <a href="/signup" className="font-medium hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
