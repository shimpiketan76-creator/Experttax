import { useState } from 'react';
import { Calculator, TrendingUp, IndianRupee, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState<string>('');
  
  const calculateTax = () => {
    const grossIncome = parseFloat(income) || 0;
    const stdDeduction = 75000;
    const taxableIncome = Math.max(0, grossIncome - stdDeduction);
    
    // Slab wise calculation (New Regime FY 24-25)
    // 0-3L: 0%
    // 3-7L: 5% (max 20k)
    // 7-10L: 10% (max 30k)
    // 10-12L: 15% (max 30k)
    // 12-15L: 20% (max 60k)
    // Above 15L: 30%
    
    let tax = 0;
    if (taxableIncome > 1500000) {
      tax += (taxableIncome - 1500000) * 0.3;
      tax += 60000 + 30000 + 30000 + 20000; // sum of lower slabs
    } else if (taxableIncome > 1200000) {
      tax += (taxableIncome - 1200000) * 0.2;
      tax += 30000 + 30000 + 20000;
    } else if (taxableIncome > 1000000) {
      tax += (taxableIncome - 1000000) * 0.15;
      tax += 30000 + 20000;
    } else if (taxableIncome > 700000) {
      tax += (taxableIncome - 700000) * 0.1;
      tax += 20000;
    } else if (taxableIncome > 300000) {
      tax += (taxableIncome - 300000) * 0.05;
    }

    // Rebate u/s 87A (New Regime - No tax up to 7L total income)
    if (grossIncome <= 700000) {
        tax = 0;
    }

    const cess = tax * 0.04;
    const totalTax = tax + cess;

    return {
      tax,
      cess,
      totalTax,
      stdDeduction
    };
  };

  const res = calculateTax();

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
          <Calculator size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Income Tax Calculator</h3>
          <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">FY 2024-25 (New Regime)</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Annual Gross Income (₹)</label>
          <div className="relative">
            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g. 800000"
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900"
            />
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3 text-blue-800">
          <ShieldCheck className="shrink-0" size={20} />
          <p className="text-xs font-medium leading-relaxed">
            Standard deduction of ₹75,000 is automatically applied for FY 2024-25. 
            Rebate u/s 87A applies for income up to ₹7,00,000.
          </p>
        </div>

        <motion.div 
          initial={false}
          className="mt-8 p-6 bg-slate-900 rounded-3xl text-white space-y-4 shadow-2xl shadow-emerald-900/20"
        >
          <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span>Deductions Applied</span>
            <span className="text-white">₹{res.stdDeduction.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span>Base Tax</span>
            <span className="text-white">₹{res.tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span>Health & Edu Cess (4%)</span>
            <span className="text-white">₹{res.cess.toLocaleString()}</span>
          </div>
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xl font-black tracking-tight">Total Payable Tax</span>
            <span className="text-3xl font-black text-emerald-400">₹{res.totalTax.toLocaleString()}</span>
          </div>
        </motion.div>
        
        <p className="text-[10px] text-center text-slate-400 font-medium">
          Note: This is an estimation. For precise filing, please consult our experts.
        </p>
      </div>
    </div>
  );
}
