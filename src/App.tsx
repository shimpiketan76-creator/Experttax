/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
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
  Compass,
  Zap,
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
  Percent,
  FilePlus2,
  ShieldQuestion
} from 'lucide-react';
import { useState, useMemo, type FormEvent, type ChangeEvent } from 'react';
import { cn } from './lib/utils';
import Logo from './components/Logo';

// New Components
import GSTCalculator from './components/calculators/GSTCalculator';
import IncomeTaxCalculator from './components/calculators/IncomeTaxCalculator';
import LegalTerms from './components/legal/LegalTerms';
import SelfFilingForm from './components/forms/SelfFilingForm';

type Language = 'en' | 'hi' | 'mr' | 'gu';

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
        image: "https://lh3.googleusercontent.com/d/1q_yIpX7lSiyBbaDsTrHRs0feacsmAXGR",
        icon: FileText,
        color: "text-blue-600",
        bg: "bg-blue-50",
        price: "₹1500",
        delivery: "Same Day"
      },
      {
        title: "FSSAI Registration",
        description: "Basic registration for small food businesses and startups.",
        image: "https://lh3.googleusercontent.com/d/1AxuQ-bB0pFnth-yQTvI-2HugPvuFpUbx",
        icon: Utensils,
        color: "text-orange-600",
        bg: "bg-orange-50",
        price: "₹1500",
        delivery: "Same Day"
      },
      {
        title: "Income Tax (ITR)",
        description: "Expert filing for Salaried, Business, and Professional returns.",
        image: "https://lh3.googleusercontent.com/d/1hjBxDCromMcpYjUvZ-8E9uC4kXl5IvO2",
        icon: Calculator,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        price: "₹2000",
        delivery: "2 Days"
      },
      {
        title: "FSSAI License",
        description: "State or Central license for large food manufacturers or caterers.",
        image: "https://lh3.googleusercontent.com/d/1AxuQ-bB0pFnth-yQTvI-2HugPvuFpUbx",
        icon: Utensils,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        price: "₹10000",
        delivery: "10 Days"
      },
      {
        title: "PTRC & PTEC",
        description: "Professional Tax Registration and Enrollment for employers and professionals.",
        image: "https://lh3.googleusercontent.com/d/1c8jpxq-xiRT12grOICqiEHu-fh3_y1S3",
        icon: FileStack,
        color: "text-blue-600",
        bg: "bg-blue-50",
        price: "₹1500",
        delivery: "Same Day"
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
        image: "https://lh3.googleusercontent.com/d/14XMRkHPS3uPMZ93fyfgDYXew7h9HtEpH",
        icon: Factory,
        color: "text-purple-600",
        bg: "bg-purple-50",
        price: "₹500",
        delivery: "Same Day"
      },
      {
        title: "Gumasta / Shop Act",
        description: "Registration and renewals for all commercial establishments.",
        image: "https://lh3.googleusercontent.com/d/1RcoaywGXMn_dKLBua3z4YP8qmBBbRJLF",
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
        image: "https://lh3.googleusercontent.com/d/1rosnKqaT8kN5PeXr1ODApUg0VRRY3Rw2",
        icon: Globe2,
        color: "text-cyan-700",
        bg: "bg-cyan-50",
        price: "₹3000",
        delivery: "Same Day"
      },
      {
        title: "LMPC Certificate",
        description: "Legal Metrology Packaged Commodities certificate for exporters.",
        image: "https://lh3.googleusercontent.com/d/1bJLZ7klwRY-S2mi4nxgArMxVjFk5Dudb",
        icon: FileCheck2,
        color: "text-blue-600",
        bg: "bg-blue-50",
        price: "₹3000",
        delivery: "Same Day"
      },
      {
        title: "ISO Certification",
        description: "Expert assistance for ISO 9001, 14001, and other quality standard certifications.",
        image: "https://lh3.googleusercontent.com/d/1G7RE1MH0ormChyUiaXlFt0F9cSBkpB_B",
        icon: ShieldCheck,
        color: "text-blue-700",
        bg: "bg-blue-50",
        price: "₹3000",
        delivery: "5 Days"
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
        image: "https://lh3.googleusercontent.com/d/1kz4VTyvNOThuH5LiD7vG3dq017Vw82ij",
        icon: Users2,
        color: "text-emerald-700",
        bg: "bg-emerald-50",
        price: "₹4500",
        delivery: "5 Days"
      },
      {
        title: "Trade License",
        description: "Commercial trade permits from local authorities and corporations.",
        image: "https://lh3.googleusercontent.com/d/1dUijPJYFXKpA9eh7VfjHr5KQfOBbVfZg",
        icon: Briefcase,
        color: "text-amber-700",
        bg: "bg-amber-50",
        price: "Contact",
        delivery: "10 Days"
      },
      {
        title: "Labour License",
        description: "Compliance for contractors and establishments with labor force.",
        image: "https://lh3.googleusercontent.com/d/1BaHzhiLXMndOkvxzVvJA9mX6F_dlDkK9",
        icon: HardHat,
        color: "text-yellow-700",
        bg: "bg-yellow-50",
        price: "Contact",
        delivery: "15 Days"
      },
      {
        title: "APEDA Registration",
        description: "Registration with Agricultural and Processed Food Products Export Development Authority.",
        image: "https://lh3.googleusercontent.com/d/10B_VFzAo9SRfrauvP4BYAJUtcKQeXO7G",
        icon: Sprout,
        color: "text-emerald-700",
        bg: "bg-emerald-50",
        price: "₹10000",
        delivery: "10 Days"
      },
      {
        title: "Fire NOC",
        description: "Fire Safety No Objection Certificate for commercial and residential buildings.",
        image: "https://lh3.googleusercontent.com/d/1Mv91_tgVeFWYRJHnaJ9eZGSnBM2dV19X",
        icon: Flame,
        color: "text-red-600",
        bg: "bg-red-50",
        price: "Contact",
        delivery: "20 Days"
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
        image: "https://lh3.googleusercontent.com/d/17rIgROFxZXpL8kW45IdMZwUKBp8ZbzFy",
        icon: CreditCard,
        color: "text-blue-600",
        bg: "bg-blue-50",
        price: "₹350",
        delivery: "2 Days"
      },
      {
        title: "Aadhaar Card Update",
        description: "Correction of Name, DOB, Address, and mobile number linkage.",
        image: "https://lh3.googleusercontent.com/d/1s_-425xkI9h-PYB0pdnJkFtg6-4l2ECH",
        icon: Fingerprint,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        price: "Contact",
        delivery: "3-5 Days"
      },
      {
        title: "Voter ID",
        description: "Fresh registration, address changes, and card reprints for all citizens.",
        image: "https://lh3.googleusercontent.com/d/1O5WE3Psk8Dr2CJSVbpLEL3b5g2ucx2NJ",
        icon: Contact2,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        price: "₹300",
        delivery: "7-10 Days"
      },
      {
        title: "Passport Assistance",
        description: "Complete support for Fresh, Renewal, and Tatkal passport applications.",
        image: "https://lh3.googleusercontent.com/d/1ju4C3jlFHQIxgtx_QhKyspJN7dZdNbga",
        icon: Globe2,
        color: "text-sky-600",
        bg: "bg-sky-50",
        price: "₹3000",
        delivery: "15 Days"
      },
      {
        title: "Driving License",
        description: "Learning license, permanent license, and renewal assistance.",
        image: "https://lh3.googleusercontent.com/d/1SUYzDcdou60Y_GvXk3rbjfE93lDwbelz",
        icon: Car,
        color: "text-slate-700",
        bg: "bg-slate-100",
        price: "₹2500",
        delivery: "30 Days"
      },
      {
        title: "Police Clearance (PCC)",
        description: "PCC documentation for employment and visa requirements.",
        image: "https://lh3.googleusercontent.com/d/1yigassitfsEiG4zvKXS94JQEMkz403ql",
        icon: ShieldAlert,
        color: "text-red-700",
        bg: "bg-red-50",
        price: "₹500",
        delivery: "5 Days"
      },
      {
        title: "Senior Citizen Card",
        description: "Official registration and benefits card for senior citizens.",
        image: "https://lh3.googleusercontent.com/d/1PSREeR-1IpNhe1NXS9DQqhoNlcbjh4cj",
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
      },
      {
        title: "Digital Signature (DSC)",
        description: "Class 3 DSC for GST, ITR, and e-Tendering with tokens.",
        image: "https://lh3.googleusercontent.com/d/1R_cVadKKV-KLQ6dh3LQEBSJk9nqMkwhE",
        icon: PenLine,
        color: "text-purple-600",
        bg: "bg-purple-50",
        price: "₹1500",
        delivery: "Same Day"
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
        image: "https://lh3.googleusercontent.com/d/1FOK02VF3Rk0i311nAIAuucOzsAtUjeU1",
        icon: Coins,
        color: "text-cyan-600",
        bg: "bg-cyan-50"
      },
      {
        title: "Home Loan / LAP",
        description: "Property-linked loans and fresh home purchase financing.",
        image: "https://lh3.googleusercontent.com/d/1x03yP8o2GQlTi872xBOj0aCF3BD1Lu66",
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
        image: "https://lh3.googleusercontent.com/d/1hfywzxKvfQeQSLWqARhSpnixxhnDa6UN",
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
        image: "https://lh3.googleusercontent.com/d/1T-erJiLiSdX3DWZCHpPXIEqk7YmtBQ0A",
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
  const [submittedStatus, setSubmittedStatus] = useState(false);
  
  const [dbReviews] = useState<{name: string, content: string, rating: number, createdAt: string}[]>([
    {
      name: "Rahul Sharma",
      content: "Excellent service! Got my GST registration done in just one day. Very professional team.",
      rating: 5,
      createdAt: "2024-03-15"
    },
    {
      name: "Priya Patil",
      content: "Expert team for FSSAI registration. They handled everything transparently and quickly.",
      rating: 5,
      createdAt: "2024-03-10"
    },
    {
      name: "Amit Gupta",
      content: "Best place in Boisar for ITR filing and business consulting. Highly recommended!",
      rating: 5,
      createdAt: "2024-03-05"
    }
  ]);

  const handleSubmitReview = async () => {
    if (!reviewDraft.trim() || submittedStatus) return;
    
    // Static behavior: just show success message
    setSubmittedStatus(true);
    setReviewDraft('');
    setTimeout(() => setSubmittedStatus(false), 5000);
  };

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedFlyer, setSelectedFlyer] = useState<string | null>(null);
  const [showLegal, setShowLegal] = useState(false);
  const [activeCalculator, setActiveCalculator] = useState<'gst' | 'tax'>('gst');

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
              <a href="#services" className="text-sm font-medium hover:text-emerald-600 transition-colors uppercase tracking-widest text-[10px] font-black">{t('ourServices')}</a>
              <a href="#calculators" className="text-sm font-medium hover:text-emerald-600 transition-colors uppercase tracking-widest text-[10px] font-black">Free Tools</a>
              <a href="#enquiry" className="text-sm font-medium hover:text-emerald-600 transition-colors uppercase tracking-widest text-[10px] font-black">Apply Now</a>
              <a href="#contact" className="text-sm font-medium hover:text-emerald-600 transition-colors uppercase tracking-widest text-[10px] font-black">{t('contactUs')}</a>

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

            <a href="#services" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">{t('ourServices')}</a>
            <a href="#enquiry" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Apply Now</a>
            <a href="#calculators" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Tools</a>
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
                <div 
                  className="relative h-48 w-full overflow-hidden cursor-pointer"
                  onClick={() => {
                    const text = `Hi, I am interested in your ${service.title} service. Please guide me.`;
                    window.open(`https://wa.me/917410129655?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                >
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
                    <h4 
                      className="text-xl font-bold group-hover:text-emerald-700 transition-colors leading-tight cursor-pointer"
                      onClick={() => {
                        const text = `Hi, I am interested in your ${service.title} service. Please guide me.`;
                        window.open(`https://wa.me/917410129655?text=${encodeURIComponent(text)}`, '_blank');
                      }}
                    >
                      {service.title}
                    </h4>
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



      {/* Digital Catalog / Gallery Section */}
      <section id="gallery" className="py-24 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
            >
              <FileCheck2 size={14} />
              <span>Service Gallery</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight font-display"
            >
              Our Service <span className="text-emerald-500">Portfolio</span>
            </motion.h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Below are our service banners. To use your own images, upload them to the AI Studio file explorer and update the filenames in the code.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { id: '1', src: "https://lh3.googleusercontent.com/d/1AxuQ-bB0pFnth-yQTvI-2HugPvuFpUbx", title: "FSSAI Food License" },
                  { id: '2', src: "https://lh3.googleusercontent.com/d/1GpyB0-ciiUznnwbiecTk6c-gmzPGAc6j", title: "GST Registration" },
                  { id: '3', src: "https://lh3.googleusercontent.com/d/1ju4C3jlFHQIxgtx_QhKyspJN7dZdNbga", title: "Passport Services" },
                  { id: '4', src: "https://lh3.googleusercontent.com/d/1RcoaywGXMn_dKLBua3z4YP8qmBBbRJLF", title: "Shop Act License" },
                  { id: '5', src: "https://lh3.googleusercontent.com/d/1HL_8t8X6P-wKLQy7xfied5wANEIgWNp2", title: "Income Tax Filing" },
                  { id: '6', src: "https://lh3.googleusercontent.com/d/17rIgROFxZXpL8kW45IdMZwUKBp8ZbzFy", title: "PAN Card Services" },
                  { id: '7', src: "https://lh3.googleusercontent.com/d/14XMRkHPS3uPMZ93fyfgDYXew7h9HtEpH", title: "MSME Udyam" },
                  { id: '8', src: "https://lh3.googleusercontent.com/d/1R_cVadKKV-KLQ6dh3LQEBSJk9nqMkwhE", title: "Digital Signature" },
                  { id: '10', src: "https://lh3.googleusercontent.com/d/1rosnKqaT8kN5PeXr1ODApUg0VRRY3Rw2", title: "IEC Code (Import Export)" },
                  { id: '11', src: "https://lh3.googleusercontent.com/d/1bJLZ7klwRY-S2mi4nxgArMxVjFk5Dudb", title: "LMPC Certificate" },
                  { id: '12', src: "https://lh3.googleusercontent.com/d/1kz4VTyvNOThuH5LiD7vG3dq017Vw82ij", title: "Partnership Deed" },
                  { id: '13', src: "https://lh3.googleusercontent.com/d/1fNgjt-nrsMXv9y81FjzLsRZA5LoOwy9Q", title: "Food Business Services" },
                  { id: '14', src: "https://lh3.googleusercontent.com/d/1dUijPJYFXKpA9eh7VfjHr5KQfOBbVfZg", title: "Trade License" },
                  { id: '15', src: "https://lh3.googleusercontent.com/d/1SUYzDcdou60Y_GvXk3rbjfE93lDwbelz", title: "Driving License" },
                  { id: '16', src: "https://lh3.googleusercontent.com/d/1PSREeR-1IpNhe1NXS9DQqhoNlcbjh4cj", title: "Senior Citizen Card" },
                  { id: '17', src: "https://lh3.googleusercontent.com/d/1O5WE3Psk8Dr2CJSVbpLEL3b5g2ucx2NJ", title: "Voter ID" },
                  { id: '18', src: "https://lh3.googleusercontent.com/d/1s_-425xkI9h-PYB0pdnJkFtg6-4l2ECH", title: "Aadhaar Correction" },
                  { id: '19', src: "https://lh3.googleusercontent.com/d/10B_VFzAo9SRfrauvP4BYAJUtcKQeXO7G", title: "APEDA Registration" },
                  { id: '20', src: "https://lh3.googleusercontent.com/d/1Mv91_tgVeFWYRJHnaJ9eZGSnBM2dV19X", title: "Fire NOC" },
                  { id: '21', src: "https://lh3.googleusercontent.com/d/1FOK02VF3Rk0i311nAIAuucOzsAtUjeU1", title: "Personal Loan" },
                  { id: '22', src: "https://lh3.googleusercontent.com/d/1x03yP8o2GQlTi872xBOj0aCF3BD1Lu66", title: "Home Loan" },
                  { id: '23', src: "https://lh3.googleusercontent.com/d/1c8jpxq-xiRT12grOICqiEHu-fh3_y1S3", title: "PTRC & PTEC" },
                  { id: '24', src: "https://lh3.googleusercontent.com/d/1BaHzhiLXMndOkvxzVvJA9mX6F_dlDkK9", title: "Labour License" },
                  { id: '25', src: "https://lh3.googleusercontent.com/d/1yigassitfsEiG4zvKXS94JQEMkz403ql", title: "Police Clearance (PCC)" },
                  { id: '26', src: "https://lh3.googleusercontent.com/d/1T-erJiLiSdX3DWZCHpPXIEqk7YmtBQ0A", title: "Document Work" },
                  { id: '27', src: "https://lh3.googleusercontent.com/d/108Y_aG8q9ClUgLL3LN42dETTZ_2cin-m", title: "Legal Drafting" },
                  { id: '28', src: "https://lh3.googleusercontent.com/d/1hfywzxKvfQeQSLWqARhSpnixxhnDa6UN", title: "Investment Planning" },
                  { id: '29', src: "https://lh3.googleusercontent.com/d/1G7RE1MH0ormChyUiaXlFt0F9cSBkpB_B", title: "ISO Certificate Expert" }
                ].map((flyer, i) => (
                  <motion.div
                    key={flyer.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => {
                      setSelectedFlyer(flyer.src);
                      const text = `Hi, I am interested in the ${flyer.title} service I saw in your gallery. Please guide me.`;
                      setTimeout(() => {
                        window.open(`https://wa.me/917410129655?text=${encodeURIComponent(text)}`, '_blank');
                      }, 1000); // Small delay to let user see the image first as requested ("image need to show and redirected")
                    }}
                    className="group relative bg-slate-800 rounded-2xl sm:rounded-[2rem] overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer shadow-xl"
                  >
                    <img 
                      src={flyer.src} 
                      alt={flyer.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 aspect-video"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/800x450?text=Upload+Your+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 sm:p-6 text-center">
                      <p className="text-emerald-400 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1">{flyer.title}</p>
                      <p className="text-white text-[10px] sm:text-sm font-medium">View Full Image</p>
                    </div>
                  </motion.div>
                ))}
          </div>
          
          <div className="mt-16 text-center">
            <a 
              href="https://wa.me/917410129655?text=Hi, I want to know more about your services."
              target="_blank"
              rel="no-referrer"
              className="inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/40"
            >
              Contact Us on WhatsApp
              <ChevronRight size={18} />
            </a>
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



      {/* Application / Enquiry Form Section */}
      <section id="enquiry" className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 px-4 py-2 rounded-full text-sm font-bold tracking-wide border border-blue-500/30">
                <FilePlus2 size={16} />
                <span>Instant Self-Filing</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                Submit Your <span className="text-blue-400">Application</span> Instantly
              </h2>
              <p className="text-xl text-blue-100/70 leading-relaxed max-w-lg font-medium">
                Save time by filling out your details online. Our experts will review your application and contact you for documentation.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Select from 30+ services",
                  "Secure document processing",
                  "Dedicated expert assigned within 2 hours",
                  "Status updates on WhatsApp"
                ].map(item => (
                  <li key={item} className="flex items-center gap-4 text-blue-100/80 font-bold">
                    <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <SelfFilingForm 
                services={allServices} 
                onSuccess={() => setFormStatus('success')} 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calculators & Tools Section */}
      <section id="calculators" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-base font-black text-blue-600 uppercase tracking-widest mb-4">Financial Tools</h2>
            <h3 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Simplified <span className="text-blue-600">Calculators</span> for Your Business
            </h3>
            <p className="mt-6 text-slate-600 font-medium leading-relaxed">
              Plan your finances with our easy-to-use tools. Accurate estimates for GST and Income Tax in seconds.
            </p>

            <div className="flex bg-slate-100 p-2 rounded-3xl mt-12 inline-flex items-center justify-center border border-slate-200">
              <button 
                onClick={() => setActiveCalculator('gst')}
                className={cn(
                  "px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-2",
                  activeCalculator === 'gst' ? "bg-white text-blue-600 shadow-xl" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <Percent size={16} />
                GST Calculator
              </button>
              <button 
                onClick={() => setActiveCalculator('tax')}
                className={cn(
                  "px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-2",
                  activeCalculator === 'tax' ? "bg-white text-emerald-600 shadow-xl" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <Calculator size={16} />
                Tax Calculator
              </button>
            </div>
          </div>

          <div className="max-w-xl mx-auto">
            <AnimatePresence mode="wait">
              {activeCalculator === 'gst' ? (
                <motion.div
                  key="gst"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <GSTCalculator />
                </motion.div>
              ) : (
                <motion.div
                  key="tax"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <IncomeTaxCalculator />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 skew-x-[-12deg] translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 relative flex justify-center lg:justify-start"
            >
              <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-8 border-white shadow-2xl shadow-slate-200">
                <img 
                  src="https://lh3.googleusercontent.com/d/1YbyzidFE5QHS9BE-vseLNzVdoZvIJmZh" 
                  alt="CEO" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-blue-600 p-4 sm:p-6 rounded-2xl text-white shadow-xl shadow-blue-200 z-20">
                <div className="text-2xl font-black mb-0.5">10+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Years EXP</div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-8 space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold tracking-wide">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                CEO Message
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
                Our Commitment to <br/>
                <span className="text-blue-600">Your Business Growth</span>
              </h2>

              <div className="relative">
                <span className="absolute -top-10 -left-10 text-8xl text-slate-100 font-serif leading-none italic pointer-events-none">"</span>
                <p className="text-xl sm:text-2xl text-slate-600 font-medium leading-relaxed italic relative z-10">
                  Work will be guaranteed, trust on us. We will do best-in-class services. Having so many satisfied customers, our goal is to simplify complex compliances so you can focus on building your dreams.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                {[
                  { title: "Guaranteed Work", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
                  { title: "Best-in-Class Support", icon: Compass, color: "text-blue-600", bg: "bg-blue-50" },
                  { title: "Trusted by Many", icon: Users2, color: "text-orange-600", bg: "bg-orange-50" },
                  { title: "Expert Guidance", icon: Zap, color: "text-purple-600", bg: "bg-purple-50" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className={cn("p-3 rounded-xl", item.bg, item.color)}>
                      <item.icon size={24} />
                    </div>
                    <span className="font-bold text-slate-800">{item.title}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-[2px] bg-blue-600 rounded-full"></div>
                  <div>
                    <div className="text-xl font-black text-slate-900">Shubhangi Jagtap</div>
                    <div className="text-sm font-bold text-blue-600">Founder & CEO</div>
                    <div className="text-slate-500 font-bold tracking-widest text-[10px] uppercase mt-1">Expert Tax & Digital Services</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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

      {/* Areas Served & SEO Section */}
      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-wider">Areas We Serve</h3>
              <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                {["All India", "Boisar", "Palghar", "Dahanu", "Manor", "Vasai", "Virar", "Jawhar", "Saphale", "Kelve", "Boisar East", "Boisar West", "Umroli", "Maharashtra", "Gujarat", "Nashik", "Pune", "Solapur", "Mumbai", "Madhya Pradesh"].map(area => (
                  <span key={area} className="bg-white border border-slate-200 px-3 py-1 rounded-full">{area}</span>
                ))}
              </div>
              <p className="mt-4 text-slate-500 text-sm italic">
                Providing affordable service and competitive prices at low cost since 2018. Apply now or enquire now for instant services and instant satisfaction.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-wider">Our Commitment</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-100 text-emerald-600 p-1 rounded-md mt-1">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">Affordable Solutions</h5>
                    <p className="text-xs text-slate-500">Competitive price models designed for small businesses across Maharashtra and Gujarat.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-600 p-1 rounded-md mt-1">
                    <Zap size={16} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">Instant Services</h5>
                    <p className="text-xs text-slate-500">Fastest processing times in Palghar and Boisar. We value your time.</p>
                  </div>
                </div>
              </div>
            </div>
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
            <button onClick={() => setShowLegal(true)} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => setShowLegal(true)} className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => setShowLegal(true)} className="hover:text-white transition-colors">Disclaimer</button>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      <AnimatePresence>
        {showLegal && (
          <LegalTerms onClose={() => setShowLegal(false)} />
        )}
      </AnimatePresence>
      {/* Expitee WhatsApp Floating Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.a
          href="https://wa.me/917410129655?text=Hi Expitee, I need assistance with your services."
          target="_blank"
          rel="no-referrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-3 bg-emerald-600 text-white pl-4 pr-6 py-4 rounded-full shadow-2xl shadow-emerald-200/50 hover:bg-emerald-700 transition-all group"
        >
          <div className="bg-white/20 p-2 rounded-full">
            <MessageSquare size={24} className="animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 leading-none">Chat with</span>
            <span className="text-lg font-bold leading-tight">Expitee</span>
          </div>
        </motion.a>
      </div>
      {/* Image Modal Lightbox */}
      <AnimatePresence>
        {selectedFlyer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFlyer(null)}
            className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedFlyer(null)}
                className="absolute -top-12 sm:-top-16 right-0 text-white hover:text-emerald-400 transition-colors bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/10"
              >
                <X size={28} />
              </button>
              <div className="overflow-hidden rounded-3xl shadow-3xl border border-white/10 bg-slate-900">
                <img 
                  src={selectedFlyer} 
                  className="w-full h-auto max-h-[80vh] object-contain"
                  alt="Full Service Flyer"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-6 flex justify-center">
                <a 
                  href={`https://wa.me/917410129655?text=Hi, I am interested in the service shown in this flyer: ${selectedFlyer}`}
                  target="_blank"
                  rel="no-referrer"
                  className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 shadow-xl shadow-emerald-500/20"
                >
                  <MessageSquare size={18} />
                  Enquire about this Service
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
