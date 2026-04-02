"use client";

import Link from "next/link";
import { useState } from "react";
import { IoCall, IoMail } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { countryCodes } from "../../utils/countryCodes";
import PhoneInputField from "../ui/PhoneInputField";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative overflow-hidden mesh-gradient pt-32 pb-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="absolute inset-0 dot-pattern" />
        
        <div className="relative max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
               style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.2)', color: '#818CF8' }}>
            <span>Home</span>
            <span className="text-slate-600">—</span>
            <span className="text-white">Contact Us</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-black leading-tight max-w-3xl text-white animate-fadeInUp">
            Let's Connect With{" "}
            <span className="gradient-text">Business Data Labs</span>
          </h1>
          <p className="mt-4 text-slate-400 text-lg max-w-xl animate-fadeInUp delay-200">
            Get in touch with our data experts for a free quote and discover how we can transform your business with actionable data.
          </p>

          {/* Scroll Indicator */}
          <div className="mt-12 flex justify-center animate-fadeInUp delay-400">
            <div className="w-7 h-12 rounded-full flex justify-center" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
              <span className="w-1.5 h-3 rounded-full mt-2 animate-bounce" style={{ background: 'var(--accent-primary)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT FORM SECTION ═══ */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT INFO CARD */}
            <div className="glass-card !p-8 !rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-3">Contact Info</h3>
              <p className="text-slate-500 text-sm mb-10">
                Feel free to reach out through any of these channels
              </p>

              <div className="space-y-6">
                {/* Phone */}
                <a href="tel:+61414003350" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all duration-300 group-hover:scale-110"
                       style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                    <IoCall className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Phone</p>
                    <p className="text-sm text-slate-500 group-hover:text-indigo-400 transition-colors">+61 414 003 350</p>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:businessdatalabs@gmail.com" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all duration-300 group-hover:scale-110"
                       style={{ background: 'rgba(34, 211, 238, 0.1)', border: '1px solid rgba(34, 211, 238, 0.15)' }}>
                    <IoMail className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Email Address</p>
                    <p className="text-sm text-slate-500 group-hover:text-cyan-400 transition-colors">businessdatalabs@gmail.com</p>
                  </div>
                </a>
              </div>

              {/* Quick stats */}
              <div className="mt-10 pt-6 space-y-3" style={{ borderTop: '1px solid var(--border-glass)' }}>
                {[
                  { label: 'Response Time', value: '< 2 hrs', color: '#10B981' },
                  { label: 'Client Satisfaction', value: '99%', color: '#6366F1' },
                  { label: 'Active Clients', value: '500+', color: '#22D3EE' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{stat.label}</span>
                    <span className="text-xs font-bold" style={{ color: stat.color }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-black text-white mb-2">
                Contact Us For a <span className="gradient-text">Free Quote</span>
              </h2>

              <p className="text-sm text-slate-500 mb-10 max-w-2xl">
                By submitting this form, I confirm that I have read and
                understood Business Data Labs's{" "}
                <Link href="/privacy-policy" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  Privacy Statement
                </Link>.
              </p>

              <form
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const name = `${formData.firstName} ${formData.lastName}`.trim();
                  const email = formData.email?.trim();
                  const phone = formData.phone?.trim();
                  const message = formData.message?.trim();
                  const isPhoneValid = phone && phone.replace(/\D/g, '').length >= 8;
                  if (!formData.firstName.trim() || !formData.lastName.trim() || !email || !isPhoneValid || !message) {
                    alert("Please fill in all mandatory fields (*).");
                    return;
                  }
                  const payload = { type: "contact_form", name, email, phone, message };
                  try {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
                    const res = await fetch(`${API_URL}/api/forms/submit`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ ...payload, source: window.location.hostname }),
                    });
                    if (res.ok) { alert("Message sent successfully!"); }
                    else { alert("Failed to send message."); }
                  } catch (error) { console.error("Submission error:", error); alert("An error occurred."); }
                }}
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">First Name <span className="text-red-400">*</span></label>
                    <input type="text" name="firstName" placeholder="Enter first name" onChange={handleChange} className="input-dark" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Last Name <span className="text-red-400">*</span></label>
                    <input type="text" name="lastName" placeholder="Enter last name" onChange={handleChange} className="input-dark" />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Email Address <span className="text-red-400">*</span></label>
                    <input type="email" name="email" placeholder="Enter email" onChange={handleChange} className="input-dark" />
                  </div>
                  <PhoneInputField value={formData.phone} onChange={handleChange} name="phone" label="Phone Number" required={true} placeholder="Enter phone number" />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Your Message <span className="text-red-400">*</span></label>
                  <textarea rows="5" name="message" placeholder="Enter your message..." onChange={handleChange} className="input-dark resize-none" />
                </div>

                {/* Button */}
                <button type="submit" className="btn-primary text-sm font-bold uppercase tracking-wide cursor-pointer">
                  Contact Us Now!
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
