import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function Register({ onSwitchToLogin }) {
  const [form, setForm] = useState({
    nama: '',
    email : '',
    password: '',
    no_hp: '',
  });

  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {register} = useAuth();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});

  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register(form);
      alert("Register success, please login");
      onSwitchToLogin();
    } catch (err) {
      setError(err.response?.data?.message || "Register failed, try again")
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
          <span className="text-orange-400 tracking-widest uppercase font-semibold text-xs">2AMSTAGE MEMBERSHIP</span>
          <h2 className="text-3xl font-black mt-2 tracking-tight">BUAT AKUN</h2>
          <p className="text-gray-400 text-sm mt-1">Dapatkan akses instan ke sistem kuota real-time.</p>
        </div>

        <form onSubmit={handleSubmitRegister} className="space-y-5">
          <div>
            <label className="block text-xs uppercase font-mono text-gray-400 mb-2">Nama Lengkap</label>
            <input 
              name="nama"
              type="text" 
              value={form.nama}
              onChange={handleChange}
              required
              placeholder="Nama Anda"
              className="w-full bg-[#0B0C10]/80 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-mono text-gray-400 mb-2">Email</label>
            <input 
              name="email"
              type="email" 
              value={form.email}
              onChange={handleChange}
              required
              placeholder="nama@domain.com"
              className="w-full bg-[#0B0C10]/80 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-mono text-gray-400 mb-2">No HP</label>
            <input 
              name="no_hp"
              type="tel" 
              value={form.no_hp}
              onChange={handleChange}
              required
              placeholder="08123456789"
              className="w-full bg-[#0B0C10]/80 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-mono text-gray-400 mb-2">Password</label>
            <input 
              name="password"
              type="password" 
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Min. 8 karakter"
              className="w-full bg-[#0B0C10]/80 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button 
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading ..." : "Register"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-8">
          Sudah punya akun?{' '}
          <button 
            onClick={onSwitchToLogin}
            className="text-orange-400 font-semibold hover:underline ml-1"
          >
            Masuk di sini
          </button>
        </p>
      </motion.div>
    </div>
  );
} 