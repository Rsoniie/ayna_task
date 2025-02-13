import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface SignupResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

const Signup: React.FC = () => {
  // Form state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');

    // Basic client-side validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!termsAccepted) {
      setError('Please accept the Terms and Conditions.');
      return;
    }

    try {
      // Replace with your actual signup API endpoint.
      // For example, if you're using Strapi, it might be:
      // 'http://localhost:1337/api/auth/local/register'
      const { data } = await axios.post<SignupResponse>(
        'http://localhost:1337/api/auth/local/register',
        { email, password }
      );

      // Store the token (jwt) returned by the API
      localStorage.setItem('token', data.jwt);

      // Redirect to the home screen after successful signup
      navigate('/home');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Signup failed. Please try again.');
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
          Create an account
        </h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-green-700">
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
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-green-700">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-green-500"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-light text-gray-500">
                I accept the{' '}
                <a className="font-medium text-green-600 hover:underline" href="#">
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Create an account
          </button>
          <p className="text-sm font-light text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-green-600 hover:underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
