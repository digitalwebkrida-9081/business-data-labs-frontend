"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What types of data can Business Data Labs scrape for my business using web scraping services?",
    answer: "Business Data Labs offers web and data scraping services for various data types, including product details, pricing, reviews, contact information, and more.",
  },
  {
    question: "How does Business Data Labs ensure the quality and accuracy of the data obtained through website scraping services?",
    answer: "We use advanced validation checks, manual quality audits, and automated monitoring to ensure accuracy, consistency, and reliability of the scraped data.",
  },
  {
    question: "Can Business Data Labs handle large-scale web scraping projects, such as Real Estate Data Scraping or E-commerce Data Scraping?",
    answer: "Yes, we specialize in handling enterprise-scale scraping projects with high volumes, ensuring speed, scalability, and compliance.",
  },
  {
    question: "How quickly can I expect to receive my scraped data, such as Sales Lead Data or Financial Data Scraping, from Business Data Labs?",
    answer: "Delivery timelines depend on project scope, but most datasets are delivered within a few days, with real-time or scheduled delivery options available.",
  },
  {
    question: "Does Business Data Labs offer customized web scraping solutions, like Recruitment Data Scraping or Social Media Scraping, tailored to my specific business needs?",
    answer: "Absolutely. We provide fully customized scraping solutions tailored to your business goals, industry requirements, and data formats.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center mb-14 pt-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.2)', color: '#818CF8' }}>
            Support
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Got A <span className="gradient-text">Question?</span>
          </h2>
          <p className="mt-2 text-slate-500">Let us help you out!</p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card !rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left transition-all cursor-pointer"
                style={{ background: activeIndex === index ? 'rgba(99, 102, 241, 0.06)' : 'transparent' }}
              >
                <div className="flex gap-4">
                  <span className="font-bold" style={{ color: '#6366F1' }}>
                    {index + 1}.
                  </span>
                  <span className="font-semibold text-white">
                    {faq.question}
                  </span>
                </div>
                <span className="text-xl font-bold shrink-0 ml-4 transition-colors" style={{ color: activeIndex === index ? '#6366F1' : 'var(--text-muted)' }}>
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-5 pl-[3.25rem] text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
