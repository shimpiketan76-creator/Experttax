import { useState } from 'react';
import { Calculator, Percent, IndianRupee, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function GSTCalculator() {
  const [amount, setAmount] = useState<string>('');
  const [rate, setRate] = useState<number>(18);
  const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive');

  const gstRates = [5, 12, 18, 28];

  const calculate = () => {
    const amt = parseFloat(amount) || 0;
    if (type === 'exclusive') {
      const gst = (amt * rate) / 100;
      return {
        gstAmount: gst,
        total: amt + gst,
        cgst: gst / 2,
        sgst: gst / 2
      };
    } else {
      const gst = amt - (amt * (100 / (100 + rate)));
      return {
        gstAmount: gst,
        total: amt,
        cgst: gst / 2,
        sgst: gst / 2,
        original: amt - gst
      };
    }
  };

  const result = calculate();

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
          <Percent size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">GST Calculator</h3>
          <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">Interactive Tool</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Original Amount (₹)</label>
          <div className="relative">
            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 5000"
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">GST Rate (%)</label>
            <select
              value={rate}
              onChange={(e) => setRate(parseInt(e.target.value))}
              className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900 appearance-none"
            >
              {gstRates.map(r => <option key={r} value={r}>{r}%</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Tax Type</label>
            <div className="flex bg-slate-50 p-1 rounded-2xl">
              <button
                onClick={() => setType('exclusive')}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${type === 'exclusive' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}
              >
                + GST
              </button>
              <button
                onClick={() => setType('inclusive')}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${type === 'inclusive' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}
              >
                In GST
              </button>
            </div>
          </div>
        </div>

        <motion.div 
          initial={false}
          className="mt-8 p-6 bg-slate-900 rounded-3xl text-white space-y-4 shadow-2xl shadow-blue-900/20"
        >
          <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span>{type === 'inclusive' ? 'Base Amount' : 'GST Amount'}</span>
            <span className="text-white text-lg">₹{(type === 'inclusive' ? result.original! : result.gstAmount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span>CGST / SGST</span>
            <span className="text-white">₹{result.cgst.toFixed(2)} each</span>
          </div>
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xl font-black tracking-tight">Total Amount</span>
            <span className="text-3xl font-black text-blue-400">₹{result.total.toFixed(2)}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
