"use client";

import Link from "next/link";
import { useState } from "react";
import { IoCall, IoMail } from "react-icons/io5";
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

  const [selected, setSelected] = useState(countryCodes[0]);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-linear-to-r from-[#020617] via-[#020617] to-[#0a1f44] py-28">
        {/* Subtle wave pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.15),transparent_40%)]" />

        <div className="relative max-w-6xl mx-auto px-6 text-white">
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-blue-400 border border-blue-400/30 rounded-full px-4 py-1 mb-6">
            <span>Home</span>
            <span className="text-gray-400">–</span>
            <span className="text-white">Contact Us</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
            Let’s Connecting With Data Scraper Hub.
          </h1>

          {/* Scroll Indicator */}
          <div className="mt-12 flex justify-center">
            <div className="w-7 h-12 rounded-full border border-white/40 flex justify-center">
              <span className="w-1.5 h-3 bg-white/80 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM SECTION ================= */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* LEFT INFO CARD */}
            <div className="bg-[#f4f7ff] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Contact Us
              </h3>

              <p className="text-gray-500 text-sm mb-10">
                Feel free to contact us from below details information
              </p>

              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
                    <IoCall className="text-[##3067FF]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Phone</p>
                    <p className="text-sm text-gray-500">+61 414 003 350</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
                    <IoMail className="text-[##3067FF]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Email Address
                    </p>
                    <p className="text-sm text-gray-500">
                      businessdatalabs@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Contact Us For a Free Quote
              </h2>

              <p className="text-sm text-gray-500 mb-10 max-w-2xl">
                By submitting this form, I confirm that I have read and
                understood Business Data Labs’s{" "}
                <span className="text-blue-600 cursor-pointer">
                  <Link href="/privacy-policy">Privacy Statement</Link>
                </span>
                .
              </p>

              <form
                className="space-y-8"
                onSubmit={async (e) => {
                  e.preventDefault();
                  
                  const name = `${formData.firstName} ${formData.lastName}`.trim();
                  const email = formData.email?.trim();
                  const phone = formData.phone?.trim();
                  const message = formData.message?.trim();

                  const isPhoneValid = phone && phone.replace(/\D/g, '').length > 3;

                  if (!formData.firstName.trim() || !formData.lastName.trim() || !email || !isPhoneValid || !message) {
                    alert("Please fill in all mandatory fields (*).");
                    return;
                  }

                  const payload = {
                    type: "contact_form",
                    name: name,
                    email: email,
                    phone: phone,
                    message: message,
                  };

                  try {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
                    const res = await fetch(`${API_URL}/api/forms/submit`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ ...payload, source: window.location.hostname }),
                    });
                    if (res.ok) {
                      alert("Message sent successfully!");
                      // Reset form if needed
                    } else {
                      alert("Failed to send message.");
                    }
                  } catch (error) {
                    console.error("Submission error:", error);
                    alert("An error occurred.");
                  }
                }}
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter first name"
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter last name"
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <PhoneInputField
                      value={formData.phone}
                      onChange={handleChange}
                      name="phone"
                      label="Phone Number"
                      required={true}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows="5"
                    name="message"
                    placeholder="Enter your message..."
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-medium px-8 py-3 rounded-md cursor-pointer"
                >
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
