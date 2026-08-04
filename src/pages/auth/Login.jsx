import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function Login({ onSwitchToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {login} = useAuth();

    const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = await login(email, password);
      onLoginSuccess(user); 
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed, Please check your email/password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-gradient-to-b from-[#1F2833]/80 to-[#151B24]/90 p-8 rounded-2xl border border-gray-800 shadow-2xl backdrop-blur-xl"
      >
        <div className="text-center mb-8">
          <span className="text-orange-400 tracking-widest uppercase font-semibold text-xs">2AMSTAGE ACCESS</span>
          <h2 className="text-3xl font-black mt-2 tracking-tight">MASUK AKUN</h2>
          <p className="text-gray-400 text-sm mt-1">Lanjutkan war tiket impianmu dengan aman.</p>
        </div>

        <form onSubmit={handleSubmitLogin} className="space-y-5">
          <div>
            <label className="block text-xs uppercase font-mono text-gray-400 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="nama@domain.com"
              className="w-full bg-[#0B0C10]/80 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-mono text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-[#0B0C10]/80 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button 
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-8">
          Belum punya akun?{' '}
          <button 
            onClick={onSwitchToRegister}
            className="text-orange-400 font-semibold hover:underline ml-1"
          >
            Daftar di sini
          </button>
        </p>
      </motion.div>
    </div>
  );
}