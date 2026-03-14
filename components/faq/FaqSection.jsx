"use client";

import { useState } from "react";

const faqs = [
  {
    question:
      "What types of data can Business Data Labs scrape for my business using web scraping services?",
    answer:
      "Business Data Labs offers web and data scraping services for various data types, including product details, pricing, reviews, contact information, and more.",
  },
  {
    question:
      "How does Business Data Labs ensure the quality and accuracy of the data obtained through website scraping services?",
    answer:
      "We use advanced validation checks, manual quality audits, and automated monitoring to ensure accuracy, consistency, and reliability of the scraped data.",
  },
  {
    question:
      "Can Business Data Labs handle large-scale web scraping projects, such as Real Estate Data Scraping or E-commerce Data Scraping?",
    answer:
      "Yes, we specialize in handling enterprise-scale scraping projects with high volumes, ensuring speed, scalability, and compliance.",
  },
  {
    question:
      "How quickly can I expect to receive my scraped data, such as Sales Lead Data or Financial Data Scraping, from Business Data Labs?",
    answer:
      "Delivery timelines depend on project scope, but most datasets are delivered within a few days, with real-time or scheduled delivery options available.",
  },
  {
    question:
      "Does Business Data Labs offer customized web scraping solutions, like Recruitment Data Scraping or Social Media Scraping, tailored to my specific business needs?",
    answer:
      "Absolutely. We provide fully customized scraping solutions tailored to your business goals, industry requirements, and data formats.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Got A Question?
          </h2>
          <p className="mt-2 text-gray-500">
            Let us help you out!
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition"
              >
                <div className="flex gap-4">
                  <span className="font-semibold text-gray-800">
                    {index + 1}.
                  </span>
                  <span className="font-medium text-gray-800">
                    {faq.question}
                  </span>
                </div>

                <span className="text-xl font-bold text-gray-600">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* Answer */}
              {activeIndex === index && (
                <div className="px-6 pb-5 pl-[3.25rem] text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
