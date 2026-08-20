"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { Book, Bike, Cpu, PlusCircle, ShoppingBag, ArrowDown } from "lucide-react";

// --- Components ---

const ConditionBadge = ({ condition }) => {
  const colors = {
    "Like New": "bg-emerald-100 text-emerald-700",
    "Good": "bg-blue-100 text-blue-700",
    "Fair": "bg-amber-100 text-amber-700",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors[condition]}`}>
      {condition}
    </span>
  );
};

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
    {
      id: 1,
      name: "Cracking the Coding Interview (6th Ed)",
      category: "Books",
      price: "650",
      condition: "Good",
      desc: "Barely used, helpful for technical placements. No markings inside.",
    },
    {
      id: 2,
      name: "Hercules Roadeo MTB Cycle",
      category: "Cycles",
      price: "4500",
      condition: "Fair",
      desc: "21-speed gears, front suspension. Needs minor brake tuning.",
    },
    {
      id: 3,
      name: "Casio fx-991EX Classwiz",
      category: "Electronics",
      price: "950",
      condition: "Like New",
      desc: "Essential for engineering exams. Solar powered, 1 year old.",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    category: "Books",
    price: "",
    condition: "Like New",
    desc: "",
  });

  const listingsRef = useRef(null);

  const scrollToListings = () => {
    listingsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      id: Date.now(),
    };
    setListings([newItem, ...listings]);
    setFormData({ name: "", category: "Books", price: "", condition: "Like New", desc: "" });

    // Smooth scroll to the top of listings after a tiny delay for React to render
    setTimeout(() => {
      scrollToListings();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1A2B48] font-sans selection:bg-emerald-200">

      {/* 1. Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Sell it. Find it. <span className="text-emerald-600">Campus only.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            The exclusive student marketplace for your college essentials. Trusted, local, and zero hassle.
          </p>
          <button
            onClick={scrollToListings}
            className="bg-[#1A2B48] text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-200 mx-auto"
          >
            Browse listings <ArrowDown size={20} />
          </button>
        </motion.div>
      </section>

      {/* 2. Sell an Item Form */}
      <section className="py-20 px-6 bg-white border-y border-slate-100">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">List a new item</h2>
            <p className="text-slate-500">Turn your clutter into cash instantly.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Item name (e.g. Blue Mountain Bike)"
                className="w-full p-4 rounded-xl border border-slate-200 bg-[#FDFCF8] focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="p-4 rounded-xl border border-slate-200 bg-[#FDFCF8] focus:outline-none"
                >
                  <option>Books</option>
                  <option>Cycles</option>
                  <option>Electronics</option>
                  <option>Other</option>
                </select>
                <input
                  required
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price (₹)"
                  className="p-4 rounded-xl border border-slate-200 bg-[#FDFCF8] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="p-4 rounded-xl border border-slate-200 bg-[#FDFCF8] focus:outline-none"
              >
                <option>Like New</option>
                <option>Good</option>
                <option>Fair</option>
              </select>
              <textarea
                required
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                placeholder="Short description..."
                rows="3"
                className="w-full p-4 rounded-xl border border-slate-200 bg-[#FDFCF8] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-md"
            >
              <PlusCircle size={20} /> Post Listing
            </button>
          </form>
        </div>
      </section>

      {/* 3. Listings Grid */}
      <section ref={listingsRef} className="py-20 px-6 max-w-6xl mx-auto min-h-screen">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Live Listings</h2>
            <p className="text-slate-500 flex items-center gap-2">
              <span className="inline-flex items-center justify-center bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-sm">
                <Counter value={listings.length} />
              </span>
              items available currently
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {listings.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                {/* Photo Placeholder */}
                <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                    {item.category === "Books" && <Book size={80} />}
                    {item.category === "Cycles" && <Bike size={80} />}
                    {item.category === "Electronics" && <Cpu size={80} />}
                    {item.category === "Other" && <ShoppingBag size={80} />}
                  </div>
                  <span className="text-slate-400 font-medium z-10">{item.category} Photo</span>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl leading-tight">{item.name}</h3>
                    <ConditionBadge condition={item.condition} />
                  </div>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <span className="text-2xl font-black text-emerald-600">₹{item.price}</span>
                    <button className="text-sm font-bold bg-slate-50 hover:bg-[#1A2B48] hover:text-white px-4 py-2 rounded-lg transition-colors">
                      Message Seller
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-slate-400 font-medium">
          Built live at the <span className="text-[#1A2B48]">VinnovateIT Vibe Coding Workshop</span>
        </p>
      </footer>
    </div>
  );
}