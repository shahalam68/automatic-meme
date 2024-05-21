import useUserStore from '@/store/login-store';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useUserStore((state) => state.login);
  const router = useRouter();


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username === 'codecamp' && password === '123') {
      login(username);
      router.push('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex mt-12 justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 mb-3 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Please Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-yellow-700 focus:border-yellow-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-yellow-700 focus:border-yellow-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-700 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
