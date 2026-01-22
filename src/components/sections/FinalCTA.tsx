'use client';

import { ChapterLayout } from '@/components/layout/ChapterLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, Mail, User, MessageSquare, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';

import { useState } from 'react';

export function FinalCTA() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Web3Forms integration
        formData.append("access_key", "67d0a537-0c20-47ef-ba77-fdc3b41160f7");

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                form.reset();
            } else {
                console.error('Web3Forms Error:', result);
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission Error:', error);
            setStatus('error');
        }
    };

    return (
        <ChapterLayout className="bg-transparent py-32" id="contact">
            <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

                {/* Visual Side / Terminal: Command Comms */}
                <div className="flex flex-col justify-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-blue-500 font-mono text-[10px] tracking-[0.5em] uppercase mb-4">Uplink_Encrypted_Protocol</div>
                        <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                            SIGNAL <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-900">TRANSMISSION</span>
                        </h2>
                        <p className="text-lg text-gray-400 mt-8 max-w-md font-mono tracking-tight">
                            READY TO DEPLOY? INITIATE THE HANDSHAKE PROTOCOL TO SYNC YOUR OBJECTIVES WITH OUR CORE ENGINE.
                        </p>
                    </motion.div>

                    <div className="space-y-6 pt-10">
                        <div className="flex items-center gap-4 text-gray-400 font-mono text-sm">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                <Mail className="w-4 h-4" />
                            </div>
                            <span>inculc8.solutions@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400 font-mono text-sm">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                <Terminal className="w-4 h-4" />
                            </div>
                            <span>LOCATION: GLOBAL/REMOTE_OPS</span>
                        </div>
                    </div>

                    <div className="mt-auto opacity-20">
                        <div className="text-[10px] font-mono text-gray-500 space-y-1">
                            <div>INC8_SYSTEM_V3.0.4</div>
                            <div>ENCRYPTED_HANDSHAKE_ESTABLISHED</div>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-gradient-to-b from-white/[0.03] to-transparent rounded-3xl -z-10" />

                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden group min-h-[500px] flex flex-col justify-center">
                        {/* Terminal Scanline Effect */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%] opacity-20" />

                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-6 py-12"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mx-auto mb-8">
                                        <Send className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Transmission Received</h3>
                                    <p className="text-gray-400 font-mono text-xs uppercase tracking-widest leading-relaxed">
                                        Data packets successfully logged. <br /> Our architects will initiate contact shortly.
                                    </p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-white transition-colors pt-8"
                                    >
                                        [ INITIATE_NEW_STREAM ]
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-8 relative z-10"
                                >
                                    <div className="space-y-4">
                                        <div className="flex flex-col space-y-2">
                                            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                                <User className="w-3 h-3 text-cyan-400" /> Identity / Name
                                            </label>
                                            <input
                                                required
                                                name="name"
                                                type="text"
                                                placeholder="COMMANDER_NAME"
                                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white font-mono text-sm focus:outline-none focus:border-cyan-400/50 transition-colors w-full"
                                            />
                                        </div>

                                        <div className="flex flex-col space-y-2">
                                            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                                <Mail className="w-3 h-3 text-cyan-400" /> Communication / Email
                                            </label>
                                            <input
                                                required
                                                name="email"
                                                type="email"
                                                placeholder="OPS@CORP.COM"
                                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white font-mono text-sm focus:outline-none focus:border-cyan-400/50 transition-colors w-full"
                                            />
                                        </div>

                                        <div className="flex flex-col space-y-2">
                                            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                                <MessageSquare className="w-3 h-3 text-cyan-400" /> Transmission / Message
                                            </label>
                                            <textarea
                                                required
                                                name="message"
                                                rows={4}
                                                placeholder="DESCRIBE_PROJECT_SCOPE..."
                                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white font-mono text-sm focus:outline-none focus:border-cyan-400/50 transition-colors w-full resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full group/btn relative bg-white text-black font-black py-5 rounded-xl uppercase text-xs tracking-[0.4em] overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            {status === 'loading' ? 'TRANSMITTING...' : 'INITIATE TRANSMISSION'}
                                            <Send className={cn("w-4 h-4 transition-transform", status === 'loading' ? "animate-pulse" : "group-hover/btn:translate-x-1")} />
                                        </span>
                                    </button>

                                    <div className="flex items-center justify-between pt-4">
                                        <div className="flex gap-2">
                                            <div className={cn("w-1.5 h-1.5 rounded-full transition-colors", status === 'loading' ? "bg-cyan-500 animate-pulse" : "bg-green-500/50")} />
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-500/20" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-500/20" />
                                        </div>
                                        <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                                            {status === 'error' ? 'PROTOCOL_FAILURE' : (status === 'loading' ? 'UPLOADING_VOXELS' : 'AWAITING_INPUT')}
                                        </span>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

        </ChapterLayout>
    );
}
