import { X } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onClose: () => void;
}

export default function LegalTerms({ onClose }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-[3rem] shadow-2xl relative flex flex-col"
      >
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Terms & Disclaimer</h2>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">Legal Documents</p>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
          <div className="prose prose-slate max-w-none space-y-12">
            
            {/* Disclaimer Section */}
            <section>
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                Disclaimer
              </h3>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p className="font-bold text-slate-900">Welcome to EXPERT TAX AND DIGITAL SERVICES® (“Company”, “we”, “our”, “us”).</p>
                <p>By accessing or using our website, services, consultation, digital assistance, registrations, documentation support, compliance services, taxation services, licensing assistance, or any related communication channels including WhatsApp, email, phone calls, social media, and third-party portals, you agree to the following disclaimer and terms.</p>
                
                <h4 className="font-bold text-slate-900 mt-6 uppercase text-xs tracking-widest">General Information Only</h4>
                <p>All information, guidance, consultation, documentation support, templates, and services provided by EXPERT TAX AND DIGITAL SERVICES are intended solely for general informational and facilitation purposes. We are not a government authority, regulatory body, legal court, or statutory department.</p>
                <p>The Company acts as a private consultancy and service facilitation provider assisting clients with documentation, application filing, compliance support, and digital processing services.</p>

                <h4 className="font-bold text-slate-900 mt-6 uppercase text-xs tracking-widest">No Government Affiliation</h4>
                <p>EXPERT TAX AND DIGITAL SERVICES is an independent private consultancy and is not affiliated, associated, authorized, endorsed by, or officially connected with any government department, ministry, authority, or agency unless expressly stated.</p>
                <p>Government fees, taxes, penalties, approval timelines, verification procedures, and departmental decisions are solely controlled by respective government authorities.</p>

                <h4 className="font-bold text-slate-900 mt-6 uppercase text-xs tracking-widest">No Guaranteed Approval</h4>
                <p>Submission of any application, registration, license, certificate, tax filing, loan processing, digital registration, or compliance filing through our services does not guarantee approval, issuance, eligibility, sanction, or acceptance by any government authority, bank, financial institution, or department.</p>
                <p>Approvals are subject to: Government verification, departmental discretion, eligibility criteria, accuracy of documents, regulatory compliance, and third-party verification processes.</p>
                <p>The Company shall not be held liable for rejection, delay, suspension, cancellation, or additional requirements raised by authorities.</p>
              </div>
            </section>

            {/* Terms Section */}
            <section className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-emerald-600 rounded-full"></span>
                Terms & Conditions
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest text-emerald-600">Client Responsibility</h4>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-2">
                    <li>Providing genuine, accurate, complete, and updated information</li>
                    <li>Submission of valid documents</li>
                    <li>Reviewing applications before approval</li>
                    <li>Maintaining compliance with applicable laws</li>
                    <li>Timely response to departmental notices or queries</li>
                  </ul>
                  <p className="text-xs text-slate-500 italic mt-2">Any legal consequences arising from false, misleading, forged, expired, or incorrect information shall remain the sole responsibility of the client.</p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest text-blue-600">Limitation of Liability</h4>
                  <p className="text-sm text-slate-600">Under no circumstances shall the Company be liable for financial loss, business interruption, penalties, rejection of applications, or delays caused by government server failures or third-party interruptions.</p>
                  <p className="text-sm text-slate-600">All services are provided on a best-effort basis without warranties.</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">No Legal or Financial Liability</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  By using our services, the client expressly agrees that the Company shall not be subjected to legal action, claims, compensation demands, damages, litigation, or disputes arising from service outcomes. Any dispute shall first be attempted to be resolved amicably through mutual communication. Clients waive the right to initiate defamatory legal proceedings against the Company for departmental outcomes beyond the Company’s control.
                </p>
                
                <div className="grid sm:grid-cols-3 gap-4 text-xs font-bold mt-6">
                  <div className="p-4 bg-white rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block mb-1 uppercase text-[8px] tracking-widests">Jurisdiction</span>
                    <span className="text-slate-900 font-black uppercase tracking-tight">Palghar, Maharashtra</span>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block mb-1 uppercase text-[8px] tracking-widests">Email</span>
                    <span className="text-slate-900 font-black tracking-tight lowercase">experttaxndigitalservices@gmail.com</span>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block mb-1 uppercase text-[8px] tracking-widests">Last Updated</span>
                    <span className="text-slate-900 font-black uppercase tracking-tight">May 2024</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Notice */}
            <div className="text-center pb-8 border-t border-slate-100 pt-8">
              <p className="text-slate-400 text-sm font-medium">
                Use of this website and services constitutes full acceptance of these Terms & Conditions and Disclaimer.
              </p>
              <p className="text-slate-900 font-black uppercase tracking-widest mt-2">EXPERT TAX AND DIGITAL SERVICES®</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="p-6 bg-slate-900 flex justify-center">
            <button 
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-blue-900/50 active:scale-95"
            >
                I Understand & Agree
            </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
