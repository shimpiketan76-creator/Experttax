import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Mail, 
  Lock, 
  ArrowRight,
  AlertCircle,
  Chrome
} from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      console.error("Auth error");
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err: any) {
      console.error("Google sign-in error");
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h3>
                <p className="text-slate-500 text-sm">
                  {mode === 'login' 
                    ? 'Sign in to access your tax and digital records' 
                    : 'Join us for fast and reliable legal services'}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-2xl flex gap-3 text-red-600 text-sm">
                  <AlertCircle size={18} className="shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider px-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider px-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-4 text-slate-500 font-bold tracking-widest">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-3 border border-slate-200 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors font-medium text-slate-700"
                >
                  <Chrome size={20} className="text-blue-500" />
                  Google Account
                </button>
              </div>

              <p className="mt-8 text-center text-sm text-slate-500">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  {mode === 'login' ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
