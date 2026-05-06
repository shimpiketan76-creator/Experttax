/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { 
  Phone, 
  Mail, 
  CheckCircle2, 
  MapPin, 
  MessageSquare, 
  FileText, 
  Utensils, 
  CreditCard, 
  UserCheck, 
  ShieldCheck, 
  Banknote, 
  Building2,
  ChevronRight,
  Menu,
  X,
  Store,
  HardHat,
  Flame,
  Globe2,
  Sprout,
  Coins,
  Calendar,
  Clock,
  User,
  Send,
  Fingerprint,
  Contact2,
  Car,
  Factory,
  Calculator,
  Users2,
  Briefcase,
  Home,
  TrendingUp,
  ShieldAlert,
  UserCircle2,
  FileCheck2,
  FileStack,
  Search,
  Star,
  Languages,
  MessageSquareQuote,
  PenLine,
  Sparkles
} from 'lucide-react';
import { useState, useMemo, type FormEvent, type ChangeEvent, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signOut,
  type User as FirebaseUser 
} from 'firebase/auth';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db, auth } from './lib/firebase';
import { cn } from './lib/utils';
import Logo from './components/Logo';
import ExpiteeChatbot from './components/ExpiteeChatbot';
import AuthModal from './components/AuthModal';

type Language = 'en' | 'hi' | 'mr' | 'gu';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const translations = {
  en: {
    heroTitle: "Expert Tax & Digital Services",
    heroSub: "Fast, Reliable, and Affordable Legal and Digital Solutions in Boisar.",
    bookNow: "Book Service",
    ourServices: "Our Services",
    whyChoose: "Why Choose Us",
    testimonials: "Testimonials",
    contactUs: "Contact Us",
    trustLabel: "Trusted by 500+ Local Businesses",
    footerQuote: "Building trust through transparency and speed.",
    address: "Shop No. 13, Siddhi Vinayak Darshan Bldg, Kashibaiwadi, Pasthal, Boisar, Palghar 401504",
    readyIn: "Ready in",
    payBook: "Pay & Book Now",
    getStarted: "Get Started",
    learnMore: "Learn More",
    viewAll: "View All Services",
    ourTeam: "Our Expert Team",
    quickLinks: "Quick Links",
    catalogSub: "Explore our full range of professional legal, digital, and financial consulting services.",
    bhasha: "Language",
    reviewTitle: "Customer Happiness",
    reviewSub: "AI Review Assistant",
    reviewPrompt: "Write a short note about your experience...",
    polishBtn: "AI Polish Review",
    submitReview: "Submit Review",
    reviewSuccess: "Review Posted Successfully!",
    shareWhatsApp: "Share on WhatsApp",
    reviewPlaceholder: "How was our service? (e.g. GST was fast and team helped a lot)",
    ceoTitle: "CEO's Message",
    ceoName: "Shubhangi Jagtap",
    ceoRole: "CEO & Founder",
    ceoMessage: "Our mission is to empower local businesses in Boisar with simplified legal and digital solutions. We bridge the gap between complex compliances and your business growth with transparency and speed."
  },
  hi: {
    heroTitle: "एक्सपर्ट टैक्स और डिजिटल सर्विसेज",
    heroSub: "बोईसर में तेज़, विश्वसनीय और किफायती कानूनी और डिजिटल समाधान।",
    bookNow: "सेवा बुक करें",
    ourServices: "हमारी सेवाएं",
    whyChoose: "हमें क्यों चुनें",
    testimonials: "प्रशंसापत्र",
    contactUs: "संपर्क करें",
    trustLabel: "500+ स्थानीय व्यवसायों द्वारा विश्वसनीय",
    footerQuote: "पारदर्शिता और गति के माध्यम से विश्वास बनाना।",
    address: "शॉप नंबर 13, सिद्धि विनायक दर्शन बिल्डिंग, काशीबाईवाड़ी, पास्थल, बोईसर, पालघर 401504",
    readyIn: "तैयार होने में",
    payBook: "भुगतान करें और अभी बुक करें",
    getStarted: "शुरू करें",
    learnMore: "और जानें",
    viewAll: "सभी सेवाएं देखें",
    ourTeam: "हमारी विशेषज्ञ टीम",
    quickLinks: "त्वरित लिंक",
    catalogSub: "हमारे पेशेवर कानूनी, डिजिटल और वित्तीय परामर्श सेवाओं की पूरी श्रृंखला देखें।",
    bhasha: "भाषा",
    reviewTitle: "ग्राहक संतुष्टि",
    reviewSub: "AI समीक्षा सहायक",
    reviewPrompt: "अपने अनुभव के बारे में एक छोटा नोट लिखें...",
    polishBtn: "AI समीक्षा पॉलिश करें",
    submitReview: "समीक्षा सबमिट करें",
    reviewSuccess: "समीक्षा सफलतापूर्वक पोस्ट की गई!",
    shareWhatsApp: "व्हाट्सएप पर साझा करें",
    reviewPlaceholder: "हमारी सेवा कैसी थी? (जैसे: जीएसटी तेज़ था और टीम ने बहुत मदद की)",
    ceoTitle: "सीईओ का संदेश",
    ceoName: "शुभांगी जगताप",
    ceoRole: "सीईओ और संस्थापक",
    ceoMessage: "हमारा मिशन बोईसर में स्थानीय व्यवसायों को सरल कानूनी और डिजिटल समाधानों के साथ सशक्त बनाना है। हम पारदर्शिता और गति के साथ जटिल अनुपालनों और आपके व्यवसाय के विकास के बीच की खाई को पाटते हैं।"
  },
  mr: {
    heroTitle: "एक्सपर्ट टॅक्स आणि डिजिटल सर्व्हिसेस",
    heroSub: "बोईसरमध्ये जलद, विश्वसनीय आणि परवडणारे कायदेशीर आणि डिजिटल उपाय.",
    bookNow: "सेवा बुक करा",
    ourServices: "आमच्या सेवा",
    whyChoose: "आम्हाला का निवडावे",
    testimonials: "अभिप्राय",
    contactUs: "संपर्क साधा",
    trustLabel: "500+ स्थानिक व्यवसायांचा विश्वास",
    footerQuote: "पारदर्शकता आणि गतीद्वारे विश्वास निर्माण करणे.",
    address: "शॉप नं. 13, सिद्धी विनायक दर्शन बिल्डिंग, काशीवाडी, पास्थल, बोईसर, पालघर 401504",
    readyIn: "तैयार वेळ",
    payBook: "पेमेंट करा आणि बुक करा",
    getStarted: "सुरू करा",
    learnMore: "अधिक जाणून घ्या",
    viewAll: "सर्व सेवा पहा",
    ourTeam: "आमची तज्ञ टीम",
    quickLinks: "जलद दुवे",
    catalogSub: "आमच्या व्यावसायिक कायदेशीर, डिजिटल आणि आर्थिक सल्लागार सेवांची संपूर्ण श्रेणी पहा.",
    bhasha: "भाषा",
    reviewTitle: "ग्राहक समाधान",
    reviewSub: "AI पुनरावलोकन सहाय्यक",
    reviewPrompt: "तुमच्या अनुभवाबद्दल छोटी नोंद लिहा...",
    polishBtn: "AI पुनरावलोकन पॉलिश करा",
    submitReview: "समीक्षा सबमिट करा",
    reviewSuccess: "समीक्षा यशस्वीरित्या पोस्ट केली!",
    shareWhatsApp: "व्हॉट्सॲपवर शेअर करा",
    reviewPlaceholder: "आमची सेवा कशी होती? (उदा. जीएसटी जलद होता आणि टीमने खूप मदत केली)",
    ceoTitle: "सीईओचा संदेश",
    ceoName: "शुभांगी जगताप",
    ceoRole: "सीईओ आणि संस्थापक",
    ceoMessage: "बोईसरमधील स्थानिक व्यवसायांना सुलभ कायदेशीर आणि डिजिटल उपायांसह सक्षम करणे हे आमचे ध्येय आहे. आम्ही पारदर्शकता आणि गतीसह जटिल कॉम्प्लायन्स आणि तुमच्या व्यवसायातील प्रगती यामधील अंतर भरून काढतो."
  },
  gu: {
    heroTitle: "એક્સપર્ટ ટેક્સ અને ડિજિટલ સર્વિસીસ",
    heroSub: "બોઈસરમાં ઝડપી, વિશ્વસનીય અને સસ્તું કાનૂની અને ડિજિટલ ઉકેલો.",
    bookNow: "સેવા બુક કરો",
    ourServices: "અમારી સેવાઓ",
    whyChoose: "અમને કેમ પસંદ કરો",
    testimonials: "પ્રશંસાપત્ર",
    contactUs: "સંપર્ક કરો",
    trustLabel: "500+ સ્થાનિક વ્યવસાયો દ્વારા વિશ્વસનીય",
    footerQuote: "પારદર્શિતા અને ઝડપ દ્વારા વિશ્વસ કેળવવો.",
    address: "શોપ નંબર 13, સિદ્ધિ વિનાયક દર્શન બિલ્ડિંગ, કાશીબાઈવાડી, પાસ્થલ, બોઈસર, પાલઘર 401504",
    readyIn: "ત્યારે થવામાં",
    payBook: "ચુકવણી કરો અને બુક કરો",
    getStarted: "શરૂ કરો",
    learnMore: "વધારે જાણો",
    viewAll: "બધી સેવાઓ જુઓ",
    ourTeam: "અમારી નિષ્ણાત ટીમ",
    quickLinks: "ઝડપી લિંક્સ",
    catalogSub: "અમારી વ્યાવસાયિક કાનૂની, ડિજિટલ અને નાણાકીય સલાહકાર સેવાઓની સંપૂર્ણ શ્રેણીનું અન્વેષણ કરો.",
    bhasha: "ભાષા",
    reviewTitle: "ગ્રાહક સંતોષ",
    reviewSub: "AI સમીક્ષા સહાયક",
    reviewPrompt: "તમારા અનુભવ વિશે એક નાની નોંધ લખો...",
    polishBtn: "AI સમીક્ષા પોલિશ કરો",
    submitReview: "સમીક્ષા સબમિટ કરો",
    reviewSuccess: "સમીક્ષા સફળતાપૂર્વક પોસ્ટ કરવામાં આવી છે!",
    shareWhatsApp: "વોટ્સએપ પર શેર કરો",
    reviewPlaceholder: "અમારી સેવા કેવી હતી? (દા.ત. GST ઝડપી હતો અને ટીમે ઘણી મદદ કરી)",
    ceoTitle: "CEO નો સંદેશ",
    ceoName: "શુભાંગી જગતાપ",
    ceoRole: "CEO અને સ્થાપક",
    ceoMessage: "અમારું મિશન બોઈસરમાં સ્થાનિક વ્યવસાયોને સરળ કાનૂની અને ડિજિટલ ઉકેલો સાથે સશક્ત બનાવવાનું છે. અમે પારદર્શિતા અને ઝડપ સાથે જટિલ અનુપાલન અને તમારા વ્યવસાયના વિકાસ વચ્ચેનું અંતર ઘટાડીએ છીએ."
  }
};

const serviceCategories = [
  {
    id: 'tax',
    title: 'Tax & Compliance',
    services: [
      {
        title: "GST Registration",
        description: "New GST registration or modification for businesses.",
        image: "https://images.unsplash.com/photo-1554224155-169641357599?auto=format&fit=crop&q=80&w=800",
        icon: FileText,
        color: "text-blue-600",
        bg: "bg-blue-50",
        price: "₹1500",
        delivery: "Same Day"
      },
      {
        title: "FSSAI Registration",
        description: "Basic registration for small food businesses and startups.",
        image: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&q=80&w=800",
        icon: Utensils,
        color: "text-orange-600",
        bg: "bg-orange-50",
        price: "₹1500",
        delivery: "Same Day"
      },
      {
        title: "Income Tax (ITR)",
        description: "Expert filing for Salaried, Business, and Professional returns.",
        image: "https://images.unsplash.com/photo-1613665813446-82a78c44b8fe?auto=format&fit=crop&q=80&w=800",
        icon: Calculator,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        price: "₹2000",
        delivery: "2 Days"
      },
      {
        title: "FSSAI License",
        description: "State or Central license for large food manufacturers or caterers.",
        image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800",
        icon: Utensils,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        price: "₹10000",
        delivery: "10 Days"
      }
    ]
  },
  {
    id: 'business',
    title: 'Business Setup & Licenses',
    services: [
      {
        title: "Udyam (MSME)",
        description: "MSME registration for small and medium enterprises to avail benefits.",
        image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80&w=800",
        icon: Factory,
        color: "text-purple-600",
        bg: "bg-purple-50",
        price: "₹500",
        delivery: "Same Day"
      },
      {
        title: "Gumasta / Shop Act",
        description: "Registration and renewals for all commercial establishments.",
        image: "https://images.unsplash.com/photo-1582733775063-4705371fe03e?auto=format&fit=crop&q=80&w=800",
        icon: Store,
        color: "text-blue-700",
        bg: "bg-blue-50",
        price: "₹500",
        delivery: "Same Day"
      },
      {
        title: "Website Creation",
        description: "Get a professional 5-page business website to grow your online presence.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        icon: Globe2,
        color: "text-blue-600",
        bg: "bg-blue-50",
        price: "₹3000",
        delivery: "7 Days"
      },
      {
        title: "Import Export Code",
        description: "IEC registration for businesses involved in international trade.",
        image: "https://images.unsplash.com/photo-1549413280-9993306db30e?auto=format&fit=crop&q=80&w=800",
        icon: Globe2,
        color: "text-cyan-700",
        bg: "bg-cyan-50",
        price: "₹3000",
        delivery: "Same Day"
      },
      {
        title: "LMPC Certificate",
        description: "Legal Metrology Packaged Commodities certificate for exporters.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
        icon: FileCheck2,
        color: "text-blue-600",
        bg: "bg-blue-50",
        price: "₹3000",
        delivery: "Same Day"
      },
      {
        title: "Company Registration",
        description: "Private Limited, OPC, and Section 8 company incorporation.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
        icon: Building2,
        color: "text-slate-800",
        bg: "bg-slate-100",
        price: "₹6000",
        delivery: "7 Days"
      },
      {
        title: "Partnership / LLP",
        description: "Legal drafting and registration of Partnership firms and LLPs.",
        image: "https://images.unsplash.com/photo-1600880210119-75ee99bbaba1?auto=format&fit=crop&q=80&w=800",
        icon: Users2,
        color: "text-emerald-700",
        bg: "bg-emerald-50",
        price: "₹4500",
        delivery: "5 Days"
      },
      {
        title: "Trade License",
        description: "Commercial trade permits from local authorities and corporations.",
        image: "https://images.unsplash.com/photo-1510444333282-971ef27c4442?auto=format&fit=crop&q=80&w=800",
        icon: Briefcase,
        color: "text-amber-700",
        bg: "bg-amber-50",
        price: "Contact",
        delivery: "10 Days"
      },
      {
        title: "Labour License",
        description: "Compliance for contractors and establishments with labor force.",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
        icon: HardHat,
        color: "text-yellow-700",
        bg: "bg-yellow-50",
        price: "Contact",
        delivery: "15 Days"
      }
    ]
  },
  {
    id: 'identity',
    title: 'Identity & Personal Docs',
    services: [
      {
        title: "PAN Card",
        description: "New PAN applications, corrections, and reprints with minimal documentation.",
        image: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=800",
        icon: CreditCard,
        color: "text-blue-600",
        bg: "bg-blue-50",
        price: "₹350",
        delivery: "2 Days"
      },
      {
        title: "Aadhaar Card Update",
        description: "Correction of Name, DOB, Address, and mobile number linkage.",
        image: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?auto=format&fit=crop&q=80&w=800",
        icon: Fingerprint,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        price: "Contact",
        delivery: "3-5 Days"
      },
      {
        title: "Voter ID",
        description: "Fresh registration, address changes, and card reprints for all citizens.",
        image: "https://images.unsplash.com/photo-1540910419892-f39a62a1bf3d?auto=format&fit=crop&q=80&w=800",
        icon: Contact2,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        price: "₹300",
        delivery: "7-10 Days"
      },
      {
        title: "Passport Assistance",
        description: "Complete support for Fresh, Renewal, and Tatkal passport applications.",
        image: "https://images.unsplash.com/photo-1544333346-ce7b5482436d?auto=format&fit=crop&q=80&w=800",
        icon: Globe2,
        color: "text-sky-600",
        bg: "bg-sky-50",
        price: "₹3000",
        delivery: "15 Days"
      },
      {
        title: "Driving License",
        description: "Learning license, permanent license, and renewal assistance.",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800",
        icon: Car,
        color: "text-slate-700",
        bg: "bg-slate-100",
        price: "₹2500",
        delivery: "30 Days"
      },
      {
        title: "Police Clearance (PCC)",
        description: "PCC documentation for employment and visa requirements.",
        image: "https://images.unsplash.com/photo-1557597774-9d2739f85a9a?auto=format&fit=crop&q=80&w=800",
        icon: ShieldAlert,
        color: "text-red-700",
        bg: "bg-red-50",
        price: "₹500",
        delivery: "5 Days"
      },
      {
        title: "Senior Citizen Card",
        description: "Official registration and benefits card for senior citizens.",
        image: "https://images.unsplash.com/photo-1441613292833-041f8ee33140?auto=format&fit=crop&q=80&w=800",
        icon: UserCircle2,
        color: "text-orange-600",
        bg: "bg-orange-50",
        price: "₹200",
        delivery: "2 Days"
      },
      {
        title: "Income Certificate",
        description: "Hassle-free procurement of official income certificates.",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
        icon: FileCheck2,
        color: "text-cyan-600",
        bg: "bg-cyan-50",
        price: "₹500",
        delivery: "15 Days"
      }
    ]
  },
  {
    id: 'financial',
    title: 'Financial & Insurance',
    services: [
      {
        title: "Business/Personal Loan",
        description: "Financial assistance with low interest rates and fast approval.",
        image: "https://images.unsplash.com/photo-1550565118-3d143c4a33ed?auto=format&fit=crop&q=80&w=800",
        icon: Coins,
        color: "text-cyan-600",
        bg: "bg-cyan-50"
      },
      {
        title: "Home Loan / LAP",
        description: "Property-linked loans and fresh home purchase financing.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
        icon: Home,
        color: "text-slate-600",
        bg: "bg-slate-50"
      },
      {
        title: "Insurance",
        description: "Comprehensive coverage for Life, Health, and Vehicles.",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
        icon: ShieldCheck,
        color: "text-red-600",
        bg: "bg-red-50"
      },
      {
        title: "Investment Planning",
        description: "Strategic planning for wealth growth and tax savings.",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800",
        icon: TrendingUp,
        color: "text-blue-600",
        bg: "bg-blue-50"
      }
    ]
  },
  {
    id: 'extra',
    title: 'General Services',
    services: [
      {
        title: "Document Work",
        description: "All types of drafting, notarization, and legal documentation.",
        image: "https://images.unsplash.com/photo-1586282391129-59a998fd034c?auto=format&fit=crop&q=80&w=800",
        icon: FileStack,
        color: "text-slate-600",
        bg: "bg-slate-50"
      }
    ]
  }
];

const allServices = serviceCategories.flatMap(cat => cat.services);

const features = [
  "Fast Same-Day Service",
  "100% Transparent Process",
  "Expert Legal Advice",
  "Affordable & Trusted"
];

const areas = ["Boisar", "Palghar", "Dahanu", "Tarapur", "Maharashtra"];

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const t = (key: keyof typeof translations['en']) => translations[lang][key] || translations['en'][key];

  const [reviewDraft, setReviewDraft] = useState('');
  const [polishedReview, setPolishedReview] = useState('');
  const [isPolishing, setIsPolishing] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState(false);
  
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [dbReviews, setDbReviews] = useState<{name: string, content: string, rating: number, createdAt: any}[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({
        ...doc.data()
      })) as any[];
      setDbReviews(reviewsData);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error");
    }
  };

  const handleSubmitReview = async () => {
    if ((!reviewDraft.trim() && !polishedReview) || submittedStatus) return;
    
    try {
      const reviewPayload = {
        name: user?.displayName || "Verified Customer",
        content: polishedReview || reviewDraft,
        rating: 5,
        createdAt: serverTimestamp(),
        lang: lang,
        userId: user?.uid || null
      };
      
      await addDoc(collection(db, 'reviews'), reviewPayload);
      setSubmittedStatus(true);
      setReviewDraft('');
      setPolishedReview('');
      setTimeout(() => setSubmittedStatus(false), 5000);
    } catch (error) {
      console.error("Error submitting review");
    }
  };

  const handleAiPolish = async () => {
    if (!reviewDraft.trim() || isPolishing) return;
    setIsPolishing(true);
    try {
      const prompt = `Rewrite the following short customer feedback into a more professional, detailed, and positive review for a business named "EXPERT TAX AND DIGITAL SERVICES" in Boisar. The review should be in ${lang === 'hi' ? 'Hindi' : lang === 'mr' ? 'Marathi' : lang === 'gu' ? 'Gujarati' : 'English'}. Keep it authentic but polished.

Feedback: ${reviewDraft}`;
      
      const result = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      });
      setPolishedReview(result.text || '');
    } catch (error) {
      console.error("AI Polish failed");
    } finally {
      setIsPolishing(false);
    }
  };

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedFlyer, setSelectedFlyer] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const filteredServices = useMemo(() => {
    let result = allServices;
    
    if (activeCategory !== 'all') {
      const category = serviceCategories.find(c => c.id === activeCategory);
      result = category ? category.services : [];
    }
    
    if (searchQuery) {
      result = result.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return result;
  }, [activeCategory, searchQuery]);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });

  const handleBookingSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API call - In a real app, this would save to Firestore
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFormStatus('success');
    setTimeout(() => {
      setFormStatus('idle');
      setBookingData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: ''
      });
    }, 5000);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <Logo size={36} className="sm:w-10 sm:h-10" />
              <div className="flex flex-col justify-center">
                <span className="text-base sm:text-xl font-bold tracking-tight text-blue-900 leading-none">
                  EXPERT TAX
                </span>
                <span className="text-[10px] sm:text-sm font-bold tracking-widest text-emerald-600 uppercase leading-none mt-1">
                  AND DIGITAL SERVICES
                </span>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex bg-slate-100 p-1 rounded-xl items-center gap-1 group/lang relative">
                <div className="flex items-center gap-1 px-2 border-r border-slate-200 mr-1">
                  <Languages size={14} className="text-blue-600" />
                  <span className="text-[10px] font-black uppercase text-slate-500">{t('bhasha')}</span>
                </div>
                {(['en', 'hi', 'mr', 'gu'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={cn(
                      "px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all",
                      lang === l ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <a href="#services" className="text-sm font-medium hover:text-emerald-600 transition-colors">{t('ourServices')}</a>
              <a href="#flyers" className="text-sm font-medium hover:text-emerald-600 transition-colors">Digital Catalog</a>
              <a href="#contact" className="text-sm font-medium hover:text-emerald-600 transition-colors">{t('contactUs')}</a>

              {user ? (
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-[100px]">{user.displayName || user.email?.split('@')[0]}</span>
                    <button 
                      onClick={handleSignOut}
                      className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                  <div className="w-9 h-9 rounded-full border-2 border-slate-100 shadow-sm overflow-hidden bg-blue-100 flex items-center justify-center">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <UserCircle2 size={24} className="text-blue-600" />
                    )}
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                >
                  Login
                </button>
              )}

              <a 
                href="tel:7410129655" 
                className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md active:scale-95"
              >
                <Phone size={16} />
                7410129655
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Menu</span>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-600 hover:text-emerald-600 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-slate-200 px-4 py-6 space-y-4"
          >
            <div className="flex bg-slate-50 p-2 rounded-2xl items-center justify-between mb-4">
              <div className="flex items-center gap-2 pl-2">
                <Languages size={16} className="text-blue-600" />
                <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{t('bhasha')}</span>
              </div>
              <div className="flex gap-2">
                {(['en', 'hi', 'mr', 'gu'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setIsMenuOpen(false); }}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all",
                      lang === l ? "bg-blue-600 text-white shadow-lg" : "bg-white text-slate-500 border border-slate-200"
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {user ? (
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-blue-100 flex items-center justify-center">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <UserCircle2 size={32} className="text-blue-600" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900">{user.displayName || user.email?.split('@')[0]}</span>
                  <button 
                    onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                    className="text-xs font-black uppercase tracking-widest text-red-500"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => { setShowAuthModal(true); setIsMenuOpen(false); }}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-slate-200"
              >
                <UserCircle2 size={24} />
                Access Your Account
              </button>
            )}

            <a href="#services" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">{t('ourServices')}</a>
            <a href="#flyers" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Digital Catalog</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">{t('contactUs')}</a>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a 
                href="tel:7410129655" 
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl font-bold text-sm"
              >
                <Phone size={18} />
                Call
              </a>
              <a 
                href="https://wa.me/917410129655" 
                target="_blank"
                rel="no-referrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl font-bold text-sm"
              >
                <MessageSquare size={18} />
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
                {t('heroTitle')}
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                {t('heroSub')}
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://wa.me/917410129655?text=Hi, I would like to inquire about your expert tax and digital services." 
                  target="_blank"
                  rel="no-referrer"
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2 group active:scale-95"
                >
                  Enquire via WhatsApp
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="tel:7410129655" 
                  className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 flex items-center gap-2 active:scale-95"
                >
                  <Phone size={20} />
                  Call Now
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
            >
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200" 
                alt="Expert Tax Consulting"
                className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent flex items-end p-8">
                <div className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg flex items-center gap-4 border border-white/50">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <CheckCircle2 size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">ISO Certified Expert</div>
                    <div className="text-xs text-slate-500">Government Approved Consultant</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3 text-center">{t('ourServices')}</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-display">Expert Catalog</h3>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto mb-10">
              {t('catalogSub')}
            </p>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto mb-12 space-y-6">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Search for a service (e.g. 'ITR', 'Pan Card', 'Loan')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none text-lg"
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-bold transition-all",
                    activeCategory === 'all' 
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  All Services
                </button>
                {serviceCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "px-6 py-2 rounded-full text-sm font-bold transition-all",
                      activeCategory === cat.id 
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" 
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    )}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <motion.div
                key={service.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -5 }}
                className="group relative flex flex-col h-full bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden hover:shadow-2xl hover:shadow-emerald-200/50 transition-all"
              >
                {/* Service Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className={cn("absolute bottom-4 left-4 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-md transition-colors", service.bg, service.color)}>
                    <service.icon size={24} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-bold group-hover:text-emerald-700 transition-colors leading-tight">{service.title}</h4>
                  </div>
                  
                  {'price' in service && service.price !== 'Contact' && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        const text = `Hi, I want to pay ${service.price} for the ${service.title} service. Please send payment link/UPI details.`;
                        window.open(`https://wa.me/917410129655?text=${encodeURIComponent(text)}`, '_blank');
                      }}
                      className="mb-4 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95 group/pay"
                    >
                      <span className="text-lg font-black">{service.price}</span>
                      <span className="text-[10px] uppercase font-bold border-l border-white/30 pl-2">{t('payBook')}</span>
                    </button>
                  )}

                  <p className="text-slate-500 text-sm leading-relaxed mb-4 group-hover:text-slate-600 transition-colors">
                    {service.description}
                  </p>
                  
                  {'delivery' in service && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mb-6 uppercase tracking-wider">
                        <Clock size={12} className="text-blue-500" />
                        <span>{t('readyIn')}: {service.delivery}</span>
                    </div>
                  )}
                  
                  <div className="mt-auto pt-4 border-t border-slate-50">
                    <a 
                      href={`https://wa.me/917410129655?text=Hi, I am interested in your ${service.title} service. Please guide me.`}
                      target="_blank"
                      rel="no-referrer"
                      className="w-full py-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-sm hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      Book via WhatsApp
                      <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No services found</h3>
              <p className="text-slate-500">Try adjusting your search query or category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Digital Catalog / Flyers Section */}
      <section id="flyers" className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">Promotions</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">Official Service Flyers</h3>
              <p className="text-slate-500 max-w-lg mx-auto">
                Detailed visual guides for our most requested services. Click to view high-resolution details.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Fire NOC Maharashtra", img: "input_file_0.png", desc: "New NOC, Renewal & Compliance" },
              { title: "Passport Services", img: "input_file_1.png", desc: "Fresh, Renewal & Tatkal" },
              { title: "APEDA Registration", img: "input_file_2.png", desc: "Export Development Authority" },
              { title: "FSSAI Food License", img: "input_file_3.png", desc: "Registration & Compliance" },
              { title: "GST Registration", img: "input_file_4.png", desc: "Expert GST Solutions" },
              { title: "PAN & Aadhaar", img: "input_file_5.png", desc: "Correction & Name Change" },
              { title: "Personal Loans", img: "input_file_8.png", desc: "Easy Approval & Low ROI" },
              { title: "Food Business License", img: "input_file_9.png", desc: "Fast FSSAI Registration" },
              { title: "GST Same Day", img: "input_file_10.png", desc: "Quick Business Setup" },
              { title: "Service Overview", img: "input_file_7.png", desc: "One-stop Digital Solution" },
              { title: "Digital Catalog", img: "input_file_6.png", desc: "Our Full Range of Services" },
              { title: "PAN Card Expert", img: "input_file_11.png", desc: "Trusted Documentation" }
            ].map((flyer, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative cursor-pointer overflow-hidden rounded-[2.5rem] bg-white shadow-xl shadow-slate-200/50"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={flyer.img} 
                    alt={flyer.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h4 className="text-xl font-bold mb-1">{flyer.title}</h4>
                  <p className="text-emerald-400 text-sm font-semibold">{flyer.desc}</p>
                  <a 
                    href={`https://wa.me/917410129655?text=Hi, I saw your ${flyer.title} flyer and want to know more about this service.`}
                    target="_blank"
                    rel="no-referrer"
                    className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Send WhatsApp Enquiry <ChevronRight size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-900 rounded-[3rem] p-12 lg:p-20 relative text-white overflow-hidden shadow-3xl">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-5xl font-bold mb-8"
                >
                  Why Partner With Us?
                </motion.h3>
                <div className="space-y-6">
                  {features.map((feature, i) => (
                    <motion.div 
                      key={feature} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 text-lg"
                    >
                      <div className="bg-emerald-500 p-1.5 rounded-full ring-4 ring-emerald-500/20">
                        <CheckCircle2 size={20} className="text-white" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20">
                <h4 className="text-2xl font-bold mb-6">Areas We Serve</h4>
                <div className="flex flex-wrap gap-3">
                  {areas.map((area) => (
                    <span key={area} className="bg-white/20 hover:bg-white/30 transition-colors px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <MapPin size={14} className="text-emerald-400" />
                      {area}
                    </span>
                  ))}
                </div>
                <div className="mt-10 p-6 bg-emerald-500 rounded-3xl text-center">
                  <p className="text-white/90 text-sm mb-4">Ready to simplify your business?</p>
                  <div className="flex flex-col gap-4 items-center">
                    <a href="tel:7410129655" className="text-xl font-bold border-b-2 border-white inline-block hover:opacity-80">
                      Call: 7410129655
                    </a>
                    <a 
                      href="https://wa.me/917410129655?text=Hi, I want to book a service." 
                      target="_blank"
                      rel="no-referrer"
                      className="bg-white text-emerald-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-emerald-50 transition-colors"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Section Header Tweak */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">Get in Touch</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">Book Your Appointment</h3>
              <p className="text-slate-500 max-w-lg mx-auto">
                Select your service and preferred time. Our experts at EXPERT TAX AND DIGITAL SERVICES will confirm your booking shortly.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Booking Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100"
            >
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <User size={16} className="text-blue-600" />
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={bookingData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Phone size={16} className="text-blue-600" />
                      Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 7410129655"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Mail size={16} className="text-blue-600" />
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <FileText size={16} className="text-blue-600" />
                    Select Service
                  </label>
                  <select
                    required
                    name="service"
                    value={bookingData.service}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none"
                  >
                    <option value="">Choose a service...</option>
                    {allServices.map(s => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Calendar size={16} className="text-blue-600" />
                      Preferred Date
                    </label>
                    <input
                      required
                      type="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Clock size={16} className="text-blue-600" />
                      Preferred Time
                    </label>
                    <input
                      required
                      type="time"
                      name="time"
                      value={bookingData.time}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <button
                  disabled={formStatus !== 'idle'}
                  className={cn(
                    "w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 active:scale-95",
                    formStatus === 'success' 
                      ? "bg-emerald-500 text-white" 
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                  )}
                >
                  {formStatus === 'idle' && (
                    <>
                      Book Appointment
                      <Send size={20} />
                    </>
                  )}
                  {formStatus === 'submitting' && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  )}
                  {formStatus === 'success' && (
                    <>
                      <CheckCircle2 size={24} />
                      Booking Successful!
                    </>
                  )}
                </button>
                
                {formStatus === 'success' && (
                  <p className="text-center text-emerald-600 text-sm font-medium animate-pulse">
                    Thank you! We'll contact you shortly to confirm.
                  </p>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-50 flex items-start gap-6 group hover:border-blue-200 transition-colors"
                >
                  <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-slate-900 mb-1">Call Us Directly</h5>
                    <p className="text-slate-500 text-sm mb-3">Speak with our consultants about your needs.</p>
                    <a href="tel:7410129655" className="text-xl font-extrabold text-blue-600 hover:text-blue-700 transition-colors">
                      7410129655
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-50 flex items-start gap-6 group hover:border-emerald-200 transition-colors"
                >
                  <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-slate-900 mb-1">Email Inquiry</h5>
                    <p className="text-slate-500 text-sm mb-3">Submit your documents or detailed queries.</p>
                    <a href="mailto:experttaxndigitalservices@gmail.com" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors break-all">
                      experttaxndigitalservices@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-50 flex items-start gap-6"
                >
                  <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600">
                    <MessageSquare size={28} />
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-slate-900 mb-1">WhatsApp Chat</h5>
                    <p className="text-slate-500 text-sm mb-4">Instant support on your mobile device.</p>
                    <a 
                      href="https://wa.me/917410129655" 
                      target="_blank"
                      rel="no-referrer"
                      className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold hover:bg-emerald-100 transition-colors"
                    >
                      Chat Now
                      <ChevronRight size={16} />
                    </a>
                  </div>
                </motion.div>
              </div>

              <div className="bg-blue-900 p-8 rounded-[2rem] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-800 rounded-full blur-2xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                <h5 className="text-xl font-bold mb-4 relative z-10">Visit Our Office</h5>
                <div className="flex items-start gap-3 text-blue-100 text-sm mb-6 relative z-10">
                  <MapPin size={24} className="text-orange-400 shrink-0" />
                  <p>Shop No. 13, Siddhi Vinayak Darshan Bldg, Kashibaiwadi, Pasthal, Near Sayli Hotel, Pasthal, Boisar, Palghar,<br />Maharashtra - 401504</p>
                </div>
                <div className="pt-4 border-t border-blue-800 text-xs text-blue-300 relative z-10">
                  Working Hours: 10:00 AM - 08:00 PM (Mon-Sat)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Review Assistant Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <Sparkles size={14} />
                <span>{t('reviewSub')}</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight font-display">
                Your Words Matter <br />
                <span className="text-emerald-600">to Our Experts.</span>
              </h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We believe in continuous improvement. Use our AI assistant to help you write a perfect review about your experience with <b>Expert Tax and Digital Services</b>.
              </p>
              
              <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(idx => (
                    <div key={idx} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${idx + 10}`} alt="User" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    +500
                  </div>
                </div>
                <div>
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-sm font-bold text-slate-900">Average 4.9/5 Rating</p>
                  <p className="text-xs text-slate-500 font-medium">From verified local customers</p>
                </div>
              </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 relative"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <PenLine size={16} className="text-blue-600" />
                    {t('reviewPrompt')}
                  </label>
                  <textarea 
                    value={reviewDraft}
                    onChange={(e) => setReviewDraft(e.target.value)}
                    placeholder={t('reviewPlaceholder')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all h-32 resize-none"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={handleAiPolish}
                    disabled={!reviewDraft.trim() || isPolishing}
                    className="w-full bg-slate-900 text-white rounded-2xl py-4 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-xl shadow-slate-200"
                  >
                    {isPolishing ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <Sparkles size={18} className="text-blue-400" />
                    )}
                    {t('polishBtn')}
                  </button>

                  <AnimatePresence>
                    {polishedReview && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 p-6 bg-emerald-50 border border-emerald-100 rounded-3xl relative">
                          <div className="absolute -top-3 left-6 bg-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
                            AI Polished Review
                          </div>
                          <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                            "{polishedReview}"
                          </p>
                          <button 
                            onClick={handleSubmitReview}
                            className="w-full bg-emerald-600 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                          >
                            <MessageSquareQuote size={18} />
                            {t('submitReview')}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {submittedStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-emerald-100 text-emerald-700 rounded-2xl text-center font-bold text-sm border border-emerald-200"
                      >
                        {t('reviewSuccess')}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!polishedReview && reviewDraft.trim() && (
                    <button 
                      onClick={handleSubmitReview}
                      className="w-full bg-slate-100 text-slate-800 rounded-2xl py-4 font-bold flex items-center justify-center gap-3 hover:bg-slate-200 transition-all"
                    >
                      {t('submitReview')} (Without AI Polish)
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 relative shadow-2xl shadow-slate-200 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-10 translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
              {/* Profile Image with Circle Crop */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative mb-12"
              >
                <div className="relative group">
                  {/* Outer glowing ring */}
                  <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                  
                  {/* Image Border/Frame - Square container with rounded-full creates a circle */}
                  <div className="w-64 h-64 md:w-72 md:h-72 aspect-square rounded-full border-[12px] border-slate-800 p-2 bg-gradient-to-br from-slate-700 to-slate-900 shadow-2xl relative overflow-hidden">
                    <img 
                      src="input_file_0.png" 
                      alt={t('ceoName')} 
                      className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-500 text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-[0_15px_35px_-12px_rgba(16,185,129,0.6)] border-4 border-slate-900">
                    {t('ceoTitle')}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                <div className="relative pt-8">
                  <span className="text-8xl text-emerald-500/10 absolute -top-4 left-1/2 -translate-x-1/2 font-serif select-none italic">"</span>
                  <p className="text-2xl md:text-4xl leading-relaxed font-semibold italic text-slate-100 relative z-10 tracking-tight">
                    {t('ceoMessage')}
                  </p>
                  <span className="text-8xl text-emerald-500/10 absolute -bottom-16 left-1/2 -translate-x-1/2 font-serif select-none rotate-180 italic">"</span>
                </div>
                
                <div className="pt-12 border-t border-white/5 flex flex-col items-center">
                  <h4 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                    {t('ceoName')}
                  </h4>
                  <div className="h-1.5 w-16 bg-emerald-500 rounded-full mb-4"></div>
                  <p className="text-emerald-400 text-sm font-black uppercase tracking-[0.4em]">{t('ceoRole')}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Catalog Section */}
      <section id="flyers" className="py-24 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
            >
              <Sparkles size={14} />
              <span>Visual Gallery</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
            >
              Our Digital Catalog
            </motion.h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Explore our comprehensive service posters and banners for quick information on all our professional solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { id: '1', src: "input_file_4.png", title: "Expert Services Overview" },
                  { id: '2', src: "input_file_1.png", title: "GST Registration Guide" },
                  { id: '3', src: "input_file_2.png", title: "PAN & Aadhaar Corrections" },
                  { id: '4', src: "input_file_3.png", title: "Our Comprehensive Solutions" },
                  { id: '5', src: "input_file_5.png", title: "Personal Loan Assistance" },
                  { id: '6', src: "input_file_6.png", title: "FSSAI Food License" },
                  { id: '7', src: "input_file_7.png", title: "Same Day GST Services" },
                  { id: '8', src: "input_file_8.png", title: "Quick Personal Loans" }
                ].map((flyer, i) => (
                  <motion.div
                    key={flyer.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedFlyer(flyer.src)}
                    className="group relative bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer shadow-xl"
                  >
                    <img 
                      src={flyer.src} 
                      alt={flyer.title} 
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-1">{flyer.title}</p>
                      <p className="text-white text-sm font-medium">Click to enlarge</p>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>
      
      {/* Image Modal Lightbox */}
      <AnimatePresence>
        {selectedFlyer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFlyer(null)}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedFlyer(null)}
                className="absolute -top-12 right-0 text-white hover:text-emerald-400 transition-colors bg-white/10 p-2 rounded-full backdrop-blur-md"
              >
                <X size={24} />
              </button>
              <div className="overflow-hidden rounded-3xl shadow-2xl border border-white/10">
                <img 
                  src={selectedFlyer} 
                  className="w-full h-auto"
                  alt="Full Poster"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3"
                >
                    TESTIMONIALS
                </motion.h2>
                <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl font-bold text-slate-900"
                >
                    {t('trustLabel')}
                </motion.h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    ...dbReviews.map(r => ({
                        name: r.name,
                        role: "Verified Business Owner",
                        review: r.content,
                        rating: r.rating,
                        initials: (r.name || "VC").substring(0, 2).toUpperCase(),
                        bg: "bg-emerald-100"
                    })),
                    {
                        name: "Rahul Mehra",
                        role: "Business Owner, Boisar",
                        review: "Fastest GST registration I've seen. Applied in the morning, got regular updates throughout the day. Highly recommended for professionalism.",
                        rating: 5,
                        initials: "RM",
                        bg: "bg-blue-100"
                    },
                    {
                        name: "Priya Singh",
                        role: "Restaurant Owner",
                        review: "Got my FSSAI license and Shop Act done here. Very transparent pricing and they managed everything from documentation to follow-up.",
                        rating: 4,
                        initials: "PS",
                        bg: "bg-emerald-100"
                    },
                    {
                        name: "Amit Patil",
                        role: "Private Consultant",
                        review: "Honest advice on ITR filing. They don't just file, they help you understand how to plan your taxes better for the next year.",
                        rating: 5,
                        initials: "AP",
                        bg: "bg-amber-100"
                    },
                    {
                        name: "Sameer Sheikh",
                        role: "Importer",
                        review: "Excellent service for IEC registration and LMPC. The same-day commitment was actually fulfilled. Great to have this in Pasthal.",
                        rating: 5,
                        initials: "SS",
                        bg: "bg-indigo-100"
                    },
                    {
                        name: "Neha Kulkarni",
                        role: "Home Baker",
                        review: "Very helpful for small home businesses. They guided me through MSME Udyam registration and the support was excellent.",
                        rating: 4,
                        initials: "NK",
                        bg: "bg-rose-100"
                    },
                    {
                        name: "Vikram Dubey",
                        role: "Shop Owner",
                        review: "Reliable and affordable document work. I get all my notarization and legal drafting done here for my various shop branches.",
                        rating: 5,
                        initials: "VD",
                        bg: "bg-slate-200"
                    }
                ].slice(0, 6).map((testimonial, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col"
                    >
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, star) => (
                                <Star key={star} size={14} className={cn(star < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-slate-200")} />
                            ))}
                        </div>
                        <p className="text-slate-600 italic mb-6 leading-relaxed flex-grow">
                            "{testimonial.review}"
                        </p>
                        <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold text-slate-700 shadow-inner", testimonial.bg)}>
                                {testimonial.initials}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                                <p className="text-xs text-slate-500 font-medium">{testimonial.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4">
              <Logo size={48} className="bg-white rounded-full p-1 shadow-lg" />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
                  EXPERT TAX
                </span>
                <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-emerald-500 uppercase leading-none mt-2">
                  AND DIGITAL SERVICES
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm max-w-xs text-center md:text-left">
              Providing professional legal and digital consulting services across Maharashtra since 2018.
            </p>
          </div>
          
          <div className="text-slate-400 text-sm text-center md:text-right">
            <div className="font-bold text-white mb-2 uppercase tracking-widest text-xs">Address</div>
            <p>Shop No. 13, Siddhi Vinayak Darshan Bldg, <br />Kashibaiwadi, Pasthal, Boisar, Palghar 401504</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-xs text-center">
          <p>© 2026 EXPERT TAX AND DIGITAL SERVICES. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      <ExpiteeChatbot 
        language={lang} 
        userName={user?.displayName || (user?.email ? user.email.split('@')[0] : 'Guest')} 
      />

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}
