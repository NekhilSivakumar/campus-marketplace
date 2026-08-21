"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { ShoppingCart, Pencil, Plus, MessageCircle, ArrowDown, Search, Heart } from "lucide-react";

// --- Components ---

const StickyNote = ({ text, className, rotate }) => (
  <motion.div
    initial={{ scale: 0, rotate: 0 }}
    animate={{ scale: 1, rotate: rotate }}
    className={`absolute hidden md:flex items-center justify-center p-4 shadow-md bg-stickyYellow text-ink font-bold text-sm h-20 w-20 text-center leading-tight z-0 ${className}`}
    style={{ borderRadius: "2px" }}
  >
    {text}
  </motion.div>
);

const ChipGroup = ({ options, activeValue, onChange, label }) => (
  <div className="space-y-2">
    {label && <p className="text-xs font-bold uppercase tracking-wider text-ink/60 px-1">{label}</p>}
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
    { id: 3, name: "Casio fx-991EX", category: "Electronics", price: "950", condition: "Like New", desc: "Essential for engineering exams." },
  ]);

  // Filtering State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("All Listings"); // "All Listings" or "My Favourites"
  const [favorites, setFavorites] = useState([]);

  const [formData, setFormData] = useState({ name: "", category: "Books", price: "", condition: "Like New", desc: "" });
  const listingsRef = useRef(null);

  // Persistence for Favourites
  useEffect(() => {
    const stored = localStorage.getItem("campus-favs");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("campus-favs", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const scrollToListings = () => listingsRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { ...formData, id: Date.now() };
    setListings([newItem, ...listings]);
    setFormData({ name: "", category: "Books", price: "", condition: "Like New", desc: "" });
    setTimeout(scrollToListings, 100);
  };

  // Filter Logic
  const filteredListings = listings.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesTab = activeTab === "All Listings" || favorites.includes(item.id);
    return matchesSearch && matchesCategory && matchesTab;
  });

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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="z-10 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tight">
            Sell it. Find it. <br />
            <span className="relative inline-block mt-2">
              Campus only.
              <svg className="absolute -bottom-4 left-0 w-full" viewBox="0 0 300 20" fill="none">
                <motion.path
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }}
                  d="M5 15C50 5 150 5 295 15" stroke="#E63946" strokeWidth="8" strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-bold mb-10 text-ink/80">The student marketplace written in ink.</p>
          <button
            onClick={scrollToListings}
            className="bg-notebookRed text-white px-10 py-5 rounded-full font-black text-lg flex items-center gap-3 hover:scale-105 transition-all shadow-xl"
          >
            Browse listings <ArrowDown size={24} strokeWidth={3} />
          </button>
        </motion.div>
      </section>

      {/* Sell Form */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto bg-paper p-10 rounded-[16px] border-2 border-dashed border-ink/30 shadow-sm relative z-10">
          <h2 className="text-3xl font-black mb-10 flex items-center gap-3">
            List an item <div className="h-1 flex-1 bg-ink/10 rounded-full" />
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <input
              required placeholder="Item Title"
              value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 rounded-[16px] border-2 border-ink bg-transparent focus:ring-4 ring-notebookRed/10 outline-none font-bold"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChipGroup
                label="Category" options={["Books", "Cycles", "Electronics", "Other"]}
                activeValue={formData.category} onChange={(val) => setFormData({ ...formData, category: val })}
              />
              <input
                required type="number" placeholder="Price (₹)"
                value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-4 h-fit rounded-[16px] border-2 border-ink bg-transparent outline-none font-bold mt-6"
              />
            </div>
            <ChipGroup
              label="Condition" options={["Like New", "Good", "Fair"]}
              activeValue={formData.condition} onChange={(val) => setFormData({ ...formData, condition: val })}
            />
            <textarea
              required placeholder="Description" rows="3"
              value={formData.desc} onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              className="w-full p-4 rounded-[16px] border-2 border-ink bg-transparent outline-none font-bold"
            />
            <button type="submit" className="w-full bg-notebookRed text-white p-5 rounded-full font-black text-xl hover:scale-[1.02] transition-all">
              Post to Feed
            </button>
          </form>
        </div>
      </section>

      {/* Listings Grid Header */}
      <section ref={listingsRef} className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex gap-6 mb-6">
              {["All Listings", "My Favourites"].map(tab => (
                <button
                  key={tab} onClick={() => setActiveTab(tab)}
                  className={`text-3xl font-black pb-2 border-b-4 transition-all ${activeTab === tab ? 'border-notebookRed text-ink' : 'border-transparent text-ink/30'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-stickyYellow text-ink font-black px-4 py-1 rounded-full text-lg border-2 border-ink">
                <Counter value={filteredListings.length} />
              </span>
              <p className="font-bold text-ink/60 italic text-xl">Items matching your search</p>
            </div>
          </div>

          <div className="w-full md:w-96 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={20} />
              <input
                type="text" placeholder="Search for books, cycles..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-ink bg-paper shadow-sm outline-none font-bold focus:ring-4 ring-notebookRed/10"
              />
            </div>
            <ChipGroup
              options={["All", "Books", "Cycles", "Electronics", "Other"]}
              activeValue={activeCategory} onChange={setActiveCategory}
            />
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-24">
          <AnimatePresence mode="popLayout">
            {filteredListings.map((item, index) => (
              <motion.div
                key={item.id} layout
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? -1 : 1 }}
                whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
                className="bg-paper border-2 border-ink p-6 rounded-[16px] shadow-[8px_8px_0px_0px_rgba(27,58,92,1)] relative flex flex-col min-h-[400px]"
              >
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-4 left-4 z-20 p-2 rounded-full bg-paper border-2 border-ink hover:scale-110 transition-transform"
                >
                  <Heart size={20} className={favorites.includes(item.id) ? "fill-notebookRed text-notebookRed" : "text-ink"} />
                </button>

                <div className="absolute -top-3 -right-3 bg-stickyYellow border-2 border-ink px-4 py-1 font-black text-xs uppercase shadow-sm transform rotate-6 z-10">
                  {item.category}
                </div>

                <div className="flex-1">
                  <div className="aspect-video bg-gridBlue/20 border-2 border-ink/10 rounded-[12px] mb-6 flex items-center justify-center text-ink/20 italic font-black">
                    IMAGE_PLACEHOLDER
                  </div>
                  <h3 className="text-2xl font-black mb-2 uppercase underline decoration-notebookRed/30">{item.name}</h3>
                  <div className="inline-block bg-ink text-white text-[10px] px-2 py-1 rounded mb-4 font-bold tracking-widest uppercase">
                    {item.condition}
                  </div>
                  <p className="text-ink font-medium leading-relaxed mb-6 line-clamp-3">{item.desc}</p>
                </div>

                <div className="pt-6 border-t-2 border-ink/5 flex items-center justify-between">
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

      <footer className="py-20 border-t-2 border-ink/10 bg-paper/50 backdrop-blur-sm text-center">
        <p className="text-ink font-black text-lg">
          Built live at the <span className="text-notebookRed px-2 underline decoration-wavy underline-offset-4">VinnovateIT Vibe Coding Workshop</span>
        </p>
      </footer>
    </div>
  );
}