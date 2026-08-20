"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { ShoppingCart, Pencil, Plus, MessageCircle, ArrowDown } from "lucide-react";

// --- Custom UI Components ---

const StickyNote = ({ text, className, rotate }) => (
  <motion.div
    initial={{ scale: 0, rotate: 0 }}
    animate={{ scale: 1, rotate: rotate }}
    className={`absolute hidden md:flex items-center justify-center p-4 shadow-md bg-stickyYellow text-ink font-bold text-sm h-20 w-20 text-center leading-tight ${className}`}
    style={{ borderRadius: "2px" }}
  >
    {text}
  </motion.div>
);

const ChipGroup = ({ options, activeValue, onChange, label }) => (
  <div className="space-y-2">
    <p className="text-xs font-bold uppercase tracking-wider text-ink/60 px-1">{label}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded-full border-2 font-bold transition-all ${activeValue === opt
              ? "bg-notebookRed border-notebookRed text-white"
              : "bg-transparent border-ink text-ink hover:bg-ink/5"
            }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const Counter = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  useEffect(() => {
    const animation = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return animation.stop;
  }, [value, count]);
  return <motion.span>{rounded}</motion.span>;
};

export default function CampusMarketplace() {
  const [listings, setListings] = useState([
    { id: 1, name: "Cracking the Coding Interview", category: "Books", price: "650", condition: "Good", desc: "No markings, 6th edition." },
    { id: 2, name: "Road MTB Cycle", category: "Cycles", price: "4500", condition: "Fair", desc: "21-speed, works well." },
    { id: 3, name: "Casio fx-991EX", category: "Electronics", price: "950", condition: "Like New", desc: "Essential for exams." },
  ]);

  const [formData, setFormData] = useState({ name: "", category: "Books", price: "", condition: "Like New", desc: "" });
  const listingsRef = useRef(null);

  const scrollToListings = () => listingsRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { ...formData, id: Date.now() };
    setListings([newItem, ...listings]);
    setFormData({ name: "", category: "Books", price: "", condition: "Like New", desc: "" });
    setTimeout(scrollToListings, 100);
  };

  return (
    <div className="min-h-screen text-ink font-sans selection:bg-stickyYellow selection:text-ink"
      style={{
        backgroundColor: "#FAFBFC",
        backgroundImage: `linear-gradient(#C9E2F5 1px, transparent 1px), linear-gradient(90deg, #C9E2F5 1px, transparent 1px)`,
        backgroundSize: "30px 30px",
        backgroundAttachment: "fixed"
      }}>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-paper border-b border-ink/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">
          <Pencil className="text-notebookRed" size={24} strokeWidth={3} />
          CAMPUS_VIBE
        </div>
        <button className="p-2 hover:bg-ink/5 rounded-full transition-colors relative">
          <ShoppingCart size={24} />
          <span className="absolute -top-1 -right-1 bg-notebookRed text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-paper">
            {listings.length}
          </span>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <StickyNote text="2nd-hand ✓" rotate="-10deg" className="top-20 left-[15%]" />
        <StickyNote text="No fees" rotate="12deg" className="top-40 right-[20%]" />
        <StickyNote text="Pickup today" rotate="-5deg" className="bottom-40 left-[25%]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tight">
            Sell it. Find it. <br />
            <span className="relative inline-block mt-2">
              Campus only.
              <svg className="absolute -bottom-4 left-0 w-full" viewBox="0 0 300 20" fill="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  d="M5 15C50 5 150 5 295 15"
                  stroke="#E63946"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-bold mb-10 text-ink/80">The student marketplace written in ink.</p>
          <button
            onClick={scrollToListings}
            className="bg-notebookRed text-white px-10 py-5 rounded-full font-black text-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-notebookRed/20"
          >
            Browse listings <ArrowDown size={24} strokeWidth={3} />
          </button>
        </motion.div>
      </section>

      {/* Sell Form */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto bg-paper p-10 rounded-[16px] border-2 border-dashed border-ink/30 shadow-sm">
          <div className="mb-10">
            <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
              List an item <div className="h-1 flex-1 bg-ink/10 rounded-full" />
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-ink/60 px-1">Item Title</p>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Lab Coat, Engineering Graphics kit..."
                  className="w-full p-4 rounded-[16px] border-2 border-ink bg-transparent focus:ring-4 ring-notebookRed/10 outline-none font-bold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChipGroup
                  label="Category"
                  options={["Books", "Cycles", "Electronics", "Other"]}
                  activeValue={formData.category}
                  onChange={(val) => setFormData({ ...formData, category: val })}
                />
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/60 px-1">Price (₹)</p>
                  <input
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    className="w-full p-4 rounded-[16px] border-2 border-ink bg-transparent focus:ring-4 ring-notebookRed/10 outline-none font-bold"
                  />
                </div>
              </div>

              <ChipGroup
                label="Condition"
                options={["Like New", "Good", "Fair"]}
                activeValue={formData.condition}
                onChange={(val) => setFormData({ ...formData, condition: val })}
              />

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-ink/60 px-1">Description</p>
                <textarea
                  required
                  rows="3"
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full p-4 rounded-[16px] border-2 border-ink bg-transparent focus:ring-4 ring-notebookRed/10 outline-none font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-notebookRed text-white p-5 rounded-full font-black text-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Plus size={24} strokeWidth={3} /> Post to Feed
            </button>
          </form>
        </div>
      </section>

      {/* Listings Grid */}
      <section ref={listingsRef} className="py-24 px-6 max-w-7xl mx-auto min-h-screen">
        <div className="mb-16">
          <h2 className="text-5xl font-black mb-4">Live Listings</h2>
          <div className="flex items-center gap-3">
            <span className="bg-stickyYellow text-ink font-black px-4 py-1 rounded-full text-lg border-2 border-ink">
              <Counter value={listings.length} />
            </span>
            <p className="font-bold text-ink/60 italic text-xl">Items found on campus today</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {listings.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  rotate: index % 2 === 0 ? -1.5 : 1.5
                }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
                className="bg-paper border-2 border-ink p-6 rounded-[16px] shadow-[8px_8px_0px_0px_rgba(27,58,92,1)] relative flex flex-col min-h-[400px]"
              >
                {/* Yellow Tag */}
                <div className="absolute -top-3 -right-3 bg-stickyYellow border-2 border-ink px-4 py-1 font-black text-xs uppercase shadow-sm transform rotate-6">
                  {item.category}
                </div>

                <div className="flex-1">
                  <div className="aspect-square bg-gridBlue/20 border-2 border-ink/10 rounded-[12px] mb-6 flex items-center justify-center text-ink/20 italic font-black">
                    PHOTO_ATTACHED
                  </div>
                  <h3 className="text-2xl font-black mb-2 leading-tight uppercase underline decoration-notebookRed/30">{item.name}</h3>
                  <div className="inline-block bg-ink text-white text-[10px] px-2 py-1 rounded mb-4 font-bold tracking-widest uppercase">
                    {item.condition}
                  </div>
                  <p className="text-ink font-medium leading-relaxed mb-6">{item.desc}</p>
                </div>

                <div className="pt-6 border-t-2 border-ink/5 flex items-center justify-between mt-auto">
                  <span className="text-3xl font-black text-notebookRed italic">₹{item.price}</span>
                  <button className="bg-paper border-2 border-ink px-6 py-2 rounded-full font-black hover:bg-ink hover:text-white transition-all flex items-center gap-2">
                    <MessageCircle size={18} /> Chat
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t-2 border-ink/10 bg-paper/50 backdrop-blur-sm text-center">
        <p className="text-ink font-black text-lg tracking-tight">
          Built live at the <span className="text-notebookRed px-2 underline decoration-wavy underline-offset-4">VinnovateIT Vibe Coding Workshop</span>
        </p>
      </footer>
    </div>
  );
}