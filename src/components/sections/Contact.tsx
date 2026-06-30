import React, { useRef, useState } from "react";
import { Mail, MapPin, Send, Loader2, Sparkles, MessageSquareHeart } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import toast from "react-hot-toast";
import { portfolioData } from "../../data/portfolioData";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", subject: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Your name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Your email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error immediately on type
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error("Please fill in all required fields.");
    return;
  }

  setIsSubmitting(true);

  const toastId = toast.loading("Sending message...");

  try {
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      throw new Error(
        "Web3Forms Access Key not found. Check your .env file."
      );
    }

    const form = new FormData();

    form.append("access_key", accessKey);
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("subject", formData.subject);
    form.append("message", formData.message);

    // Prevent spam
    form.append("botcheck", "");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: form,
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Message sent successfully!", {
        id: toastId,
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setErrors({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      throw new Error(data.message);
    }
  } catch (error: any) {
    console.error(error);

    toast.error(error.message || "Failed to send message.", {
      id: toastId,
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 px-6 bg-[#09090B] border-t border-zinc-200/5 dark:border-zinc-800/20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs font-bold font-mono tracking-widest text-blue-500 uppercase block mb-3">
            [ 07 / CONNECT ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Get In Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Details Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                Let's discuss your next project, integration, or opening.
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                I am actively open to Junior Software Engineer openings, contract sprints, or full-stack engineering collaborations. Drop me a line, and let's get building.
              </p>
            </div>

            {/* Direct Details Grid */}
            <div className="space-y-4">
              {/* Mail Box */}
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex items-center gap-4 hover:border-blue-500/20 transition-all">
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg shrink-0">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 font-mono uppercase">Direct Inbox</p>
                  <a href={`mailto:${portfolioData.personalInfo.email}`} className="text-sm font-semibold text-white hover:text-blue-400 transition-colors font-mono">
                    {portfolioData.personalInfo.email}
                  </a>
                </div>
              </div>

              {/* Location Box */}
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex items-center gap-4 hover:border-blue-500/20 transition-all">
                <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg shrink-0">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 font-mono uppercase">Coordinates</p>
                  <p className="text-sm font-semibold text-white font-sans">
                    {portfolioData.personalInfo.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Reply Guarantee Badge */}
            <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-900/80 flex items-start gap-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
              <MessageSquareHeart className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                <strong className="text-emerald-400 font-semibold uppercase font-mono text-[10px] tracking-wide block mb-1">Reply Guarantee</strong>
                I check my mailbox daily and typically respond to recruiters and collaborators within 12-24 hours.
              </p>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7">
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-100/40 dark:bg-zinc-900/30 border border-zinc-200/10 dark:border-zinc-800/80 backdrop-blur-md space-y-5"
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <input
  type="checkbox"
  name="botcheck"
  className="hidden"
  style={{ display: "none" }}
/>
              {/* Name field */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-400 font-mono">
                  Your Full Name <span className="text-blue-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3.5 rounded-xl border bg-white/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                    errors.name ? "border-red-500/50 focus:ring-red-500/20" : "border-zinc-200 dark:border-zinc-800/80 focus:border-blue-500"
                  }`}
                  placeholder="Guruprasad G"
                />
                {errors.name && (
                  <span className="text-[10px] font-semibold text-red-500 tracking-wide font-mono block">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email field */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-400 font-mono">
                  Your Email Address <span className="text-blue-500 font-bold">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3.5 rounded-xl border bg-white/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                    errors.email ? "border-red-500/50 focus:ring-red-500/20" : "border-zinc-200 dark:border-zinc-800/80 focus:border-blue-500"
                  }`}
                  placeholder="recruiter@company.com"
                />
                {errors.email && (
                  <span className="text-[10px] font-semibold text-red-500 tracking-wide font-mono block">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Subject field */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-400 font-mono">
                  Subject <span className="text-blue-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3.5 rounded-xl border bg-white/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                    errors.subject ? "border-red-500/50 focus:ring-red-500/20" : "border-zinc-200 dark:border-zinc-800/80 focus:border-blue-500"
                  }`}
                  placeholder="Opportunity: Software Engineer Role"
                />
                {errors.subject && (
                  <span className="text-[10px] font-semibold text-red-500 tracking-wide font-mono block">
                    {errors.subject}
                  </span>
                )}
              </div>

              {/* Message field */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-400 font-mono">
                  Detailed Message <span className="text-blue-500 font-bold">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3.5 rounded-xl border bg-white/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none ${
                    errors.message ? "border-red-500/50 focus:ring-red-500/20" : "border-zinc-200 dark:border-zinc-800/80 focus:border-blue-500"
                  }`}
                  placeholder="Hello Guruprasad, we viewed your portfolio and are highly impressed with..."
                />
                {errors.message && (
                  <span className="text-[10px] font-semibold text-red-500 tracking-wide font-mono block">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-blue-600 text-white font-bold tracking-wider text-xs uppercase flex items-center justify-center gap-2 shadow-[0_5px_15px_rgba(59,130,246,0.3)] hover:bg-blue-500 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    Transmitting Message...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Transmit Secure Message
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
