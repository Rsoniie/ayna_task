
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { db } from '../db/db';

// interface SignupResponse {
//   jwt: string;
//   user: {
//     id: number;
//     username: string;
//     email: string;
//   };
// }

// const Signup: React.FC = () => {
//   const [username, setUsername] = useState<string>(''); // Added username state
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [confirmPassword, setConfirmPassword] = useState<string>('');
//   const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();
//     setError('');

//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }
//     if (!termsAccepted) {
//       setError('Please accept the Terms and Conditions.');
//       return;
//     }

//     try {
//       // Replace with your actual endpoint. The payload now includes username.
//       const { data } = await axios.post<SignupResponse>(
//         'http://localhost:1337/api/auth/local/register',
//         { username, email, password }
//       );

//       // Clear any previous auth data and store the new data locally
//       await db.authData.clear();
//       await db.authData.add({
//         token: data.jwt,
//         user: data.user,
//       });

//       navigate('/chat');
//     } catch (err: any) {
//       if (axios.isAxiosError(err)) {
//         setError(err.response?.data?.message || 'Signup failed. Please try again.');
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
//           Create an account
//         </h1>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {/* Username field added */}
//           <div>
//             <label htmlFor="username" className="block mb-2 text-sm font-medium text-green-700">
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//               id="username"
//               placeholder="yourusername"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block mb-2 text-sm font-medium text-green-700">
//               Your email
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               placeholder="name@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
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
//           <div>
//             <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-green-700">
//               Confirm password
//             </label>
//             <input
//               type="password"
//               name="confirmPassword"
//               id="confirmPassword"
//               placeholder="••••••••"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
//             />
//           </div>
//           <div className="flex items-start">
//             <div className="flex items-center h-5">
//               <input
//                 id="terms"
//                 type="checkbox"
//                 checked={termsAccepted}
//                 onChange={(e) => setTermsAccepted(e.target.checked)}
//                 className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-green-500"
//                 required
//               />
//             </div>
//             <div className="ml-3 text-sm">
//               <label htmlFor="terms" className="font-light text-gray-500">
//                 I accept the{' '}
//                 <a className="font-medium text-green-600 hover:underline" href="#">
//                   Terms and Conditions
//                 </a>
//               </label>
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
//           >
//             Create an account
//           </button>
//           <p className="text-sm font-light text-gray-500">
//             Already have an account?{' '}
//             <a href="/login" className="font-medium text-green-600 hover:underline">
//               Login here
//             </a>
//           </p>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Signup;



// src/components/Signup.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { db } from '../db/db';

interface SignupResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>(''); 
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!termsAccepted) {
      setError('Please accept the Terms and Conditions.');
      return;
    }

    try {
      // Replace with your actual endpoint. The payload now includes username.
      const url = import.meta.env.VITE_API_URL;
      const { data } = await axios.post<SignupResponse>(
        `${url}/auth/signup`,
        { username, email, password }
      );

      // Clear any previous auth data and store the new data locally
      await db.authData.clear();
      await db.authData.add({
        token: data.jwt,
        user: data.user,
      });

      navigate('/chat');
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Signup failed. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

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
          <h1 className="text-2xl font-semibold text-gray-800">Create an account</h1>
        </div>
        {error && <p className="mb-4 text-center text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="yourusername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-1">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          {/* Password */}
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
          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
            >
              {showConfirmPassword ? (
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
          {/* Terms */}
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="h-4 w-4 text-gray-600 focus:ring-gray-300 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I accept the{' '}
              <a href="#" className="font-medium text-gray-800 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
          >
            Create an account
          </button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium hover:underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;

