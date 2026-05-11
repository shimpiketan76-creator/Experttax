import React, { useState } from 'react';
import { Send, User, Phone, Mail, FileText, CheckCircle2, ChevronRight, HardHat, FileStack } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

interface Props {
  services: { title: string }[];
  onSuccess: () => void;
}

export default function SelfFilingForm({ services, onSuccess }: Props) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    message: '',
    businessType: 'Individual'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Static simulation for now - Will connect to Firebase once ready
    await new Promise(r => setTimeout(r, 2000));
    
    setIsSubmitting(false);
    onSuccess();
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-slate-100">
      {/* Decorative background */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Apply for Service</h3>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Self Filing Registration</p>
          </div>
          <div className="flex gap-2">
            {[1, 2].map((s) => (
              <div 
                key={s} 
                className={cn(
                  "w-10 h-2 rounded-full transition-all duration-500",
                  step >= s ? "bg-blue-600" : "bg-slate-200"
                )} 
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-semibold"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-semibold"
                        placeholder="+91 0000000000"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-semibold"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.name || !formData.phone}
                    className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next Step
                    <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 ml-1">Select Service</label>
                  <div className="relative">
                    <FileStack className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select 
                      required
                      value={formData.serviceType}
                      onChange={e => setFormData({...formData, serviceType: e.target.value})}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-semibold appearance-none"
                    >
                      <option value="">Choose a service...</option>
                      {services.map(s => (
                        <option key={s.title} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 ml-1">Business Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Individual', 'Business/LLP'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({...formData, businessType: type})}
                        className={cn(
                          "py-4 rounded-2xl font-bold transition-all border-2",
                          formData.businessType === type 
                            ? "bg-blue-50 border-blue-500 text-blue-700 shadow-lg shadow-blue-100" 
                            : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 ml-1">Requirement Details</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-semibold resize-none"
                    placeholder="Tell us what you need..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-white border border-slate-200 text-slate-600 py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting || !formData.serviceType}
                    className="flex-[2] bg-emerald-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-xl shadow-emerald-200"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Submit Enquiry
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400">
          <ShieldCheck size={16} />
          <p className="text-[10px] font-bold uppercase tracking-widest">Secure & Confidential Processing</p>
        </div>
      </div>
    </div>
  );
}
function ShieldCheck({ size }: { size: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
