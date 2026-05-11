import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { FileText, Clock, User, Phone, CheckCircle2 } from 'lucide-react';

export default function AdminApplications() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApps(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading applications...</div>;

  return (
    <div className="space-y-4">
      {apps.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No applications yet</p>
        </div>
      ) : (
        apps.map((app) => (
          <div key={app.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  {app.serviceType}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">
                  {new Date(app.createdAt?.seconds * 1000).toLocaleDateString()}
                </span>
              </div>
              <h4 className="font-black text-slate-900 text-lg">{app.name}</h4>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-1"><Phone size={14} /> {app.phone}</span>
                {app.email && <span className="flex items-center gap-1"><User size={14} /> {app.email}</span>}
              </div>
              {app.message && (
                <p className="text-sm text-slate-600 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {app.message}
                </p>
              )}
            </div>
            <div className="shrink-0 flex items-center">
               <span className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100">
                  New Application
               </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
