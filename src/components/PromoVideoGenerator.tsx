import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, VideoGenerationReferenceType } from "@google/genai";

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

import { 
  Play, 
  Video, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  MousePointer2, 
  Sparkles,
  Download,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Service {
  title: string;
  description: string;
}

interface PromoVideoGeneratorProps {
  serviceCategories: {
    title: string;
    services: Service[];
  }[];
}

const PromoVideoGenerator: React.FC<PromoVideoGeneratorProps> = ({ serviceCategories }) => {
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<string>('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pollingRef = useRef<boolean>(false);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const has = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(has);
      } else {
        setHasApiKey(false);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const generatePromoVideo = async () => {
    if (!selectedService) return;
    
    setIsGenerating(true);
    setGenerationProgress('Starting video generation...');
    setGeneratedVideoUrl(null);
    setError(null);
    pollingRef.current = true;

    try {
      const apiKey = (process.env as any).API_KEY || (process.env as any).GEMINI_API_KEY;
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `A professional cinematic promotional video for "${selectedService.title}". ${selectedService.description}. High quality, 4k, professional lighting, corporate aesthetics, minimalist and modern design. No text, purely visual and atmospheric.`;

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-lite-generate-preview',
        prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      const loadingMessages = [
        "Analyzing service details...",
        "Crafting visual storyboard...",
        "Synthesizing high-quality frames...",
        "Applying cinematic lighting...",
        "Rendering final video...",
        "Optimizing for playback..."
      ];

      let messageIndex = 0;
      const messageInterval = setInterval(() => {
        if (pollingRef.current && messageIndex < loadingMessages.length - 1) {
          messageIndex++;
          setGenerationProgress(loadingMessages[messageIndex]);
        }
      }, 8000);

      // Poll for completion
      while (!operation.done && pollingRef.current) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation });
      }

      clearInterval(messageInterval);

      if (!pollingRef.current) return;

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      
      if (downloadLink) {
        setGenerationProgress('Fetching video...');
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': apiKey,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch the generated video.');

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setGeneratedVideoUrl(url);
      } else {
        throw new Error('Video generation failed or timed out.');
      }

    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("not found")) {
        setHasApiKey(false);
        setError("API Key session expired. Please select your API key again.");
      } else {
        setError(err.message || "An unexpected error occurred during generation.");
      }
    } finally {
      setIsGenerating(false);
      pollingRef.current = false;
    }
  };

  return (
    <section id="promo-video" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4"
          >
            <Sparkles size={14} />
            <span>AI Powered Video Generation</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Generate Promo Videos with Veo</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Experience the future of marketing. Select any of our services and let our advanced AI 
            create a high-quality cinematic promotional video for you in seconds.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Controls Side */}
          <div className="space-y-8">
            {!hasApiKey ? (
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Info className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">API Key Required</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      To use high-quality video generation via Veo, you need to select a valid Google Cloud API key with billing enabled.
                    </p>
                    <a 
                      href="https://ai.google.dev/gemini-api/docs/billing" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-blue-400 hover:underline text-sm inline-flex items-center gap-1"
                    >
                      Learn more about billing
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleSelectKey}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 group"
                >
                  <MousePointer2 size={20} className="group-hover:translate-x-1 transition-transform" />
                  Select API Key
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-3 ml-1">Select Service to Promote</label>
                  <div className="relative group">
                    <select
                      className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white transition-all cursor-pointer"
                      onChange={(e) => {
                        const [catIdx, servIdx] = e.target.value.split('-').map(Number);
                        setSelectedService(serviceCategories[catIdx].services[servIdx]);
                      }}
                      defaultValue=""
                    >
                      <option value="" disabled>Choose a service...</option>
                      {serviceCategories.map((category, catIdx) => (
                        <optgroup key={catIdx} label={category.title} className="bg-slate-900">
                          {category.services.map((service, servIdx) => (
                            <option key={`${catIdx}-${servIdx}`} value={`${catIdx}-${servIdx}`}>
                              {service.title}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <Play size={18} className="rotate-90" />
                    </div>
                  </div>
                </div>

                {selectedService && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl"
                  >
                    <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">Selected Focus</p>
                    <p className="text-slate-300 text-sm italic">"{selectedService.description}"</p>
                  </motion.div>
                )}

                <button
                  disabled={!selectedService || isGenerating}
                  onClick={generatePromoVideo}
                  className={cn(
                    "w-full font-bold py-5 px-6 rounded-2xl transition-all flex items-center justify-center gap-3",
                    selectedService && !isGenerating 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] text-white" 
                      : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                  )}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      <span>{generationProgress}</span>
                    </>
                  ) : (
                    <>
                      <Video size={24} />
                      <span>Generate Promo Video</span>
                    </>
                  )}
                </button>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                    <AlertCircle size={18} className="shrink-0" />
                    <p>{error}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Preview Side */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group">
            {generatedVideoUrl ? (
              <>
                <video 
                  src={generatedVideoUrl} 
                  controls 
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                />
                <div className="absolute top-4 right-4 z-20">
                  <a 
                    href={generatedVideoUrl} 
                    download={`promo-${selectedService?.title.toLowerCase().replace(/\s+/g, '-')}.mp4`}
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white transition-colors flex items-center gap-2 text-sm font-bold"
                  >
                    <Download size={18} />
                    Download
                  </a>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div 
                      key="generating"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="space-y-6"
                    >
                      <div className="relative">
                        <div className="w-24 h-24 border-4 border-blue-500/20 rounded-full animate-pulse mx-auto" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 className="text-blue-500 animate-spin" size={40} />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">Generating Masterpiece</h4>
                        <p className="text-slate-400 text-sm">Veo is dreaming up your video. This usually takes 2-3 minutes.</p>
                      </div>
                      <div className="w-full max-w-xs mx-auto h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-blue-500"
                          animate={{ 
                            width: ["0%", "100%"],
                            transition: { duration: 120, ease: "linear" }
                          }}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-700/50">
                        <Video size={40} className="text-slate-600" />
                      </div>
                      <h4 className="text-2xl font-bold">Video Preview</h4>
                      <p className="text-slate-500 max-w-xs mx-auto">
                        Once generated, your high-quality promotional video will appear here.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            {/* Gloss Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent" />
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            {
              icon: <Sparkles className="text-emerald-500" />,
              title: "AI Creativity",
              desc: "Powered by Google's latest Veo model for stunning cinematic results."
            },
            {
              icon: <CheckCircle2 className="text-blue-500" />,
              title: "Instant Download",
              desc: "Get your MP4 file ready for social media or your next presentation."
            },
            {
              icon: <Video className="text-purple-500" />,
              title: "720p Resolution",
              desc: "Crystal clear video generation optimized for web and mobile sharing."
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-900/30 border border-slate-800/50 p-6 rounded-2xl hover:border-slate-700 transition-colors"
            >
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h5 className="font-bold mb-2">{feature.title}</h5>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoVideoGenerator;
