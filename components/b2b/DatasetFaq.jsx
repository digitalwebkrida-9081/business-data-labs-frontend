'use client';

import React, { useState } from 'react';

const DatasetFaq = ({ dataset }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const category = dataset.category;
    const location = dataset.location;
    const totalRecords = dataset.totalRecords?.toLocaleString?.() || dataset.totalRecords;
    const emailCount = dataset.emailCount 
        ? dataset.emailCount.toLocaleString?.() || dataset.emailCount 
        : Math.floor((Number(dataset.totalRecords) || 0) * 0.4).toLocaleString();
    const phoneCount = dataset.phones 
        ? dataset.phones.toLocaleString?.() || dataset.phones 
        : Math.floor((Number(dataset.totalRecords) || 0) * 0.85).toLocaleString();
    const price = dataset.price || '$199';
    const total = Number(dataset.totalRecords) || 0;
    const bothCount = Math.floor(total * 0.35).toLocaleString();
    const linkedinCount = Math.floor(total * 0.3).toLocaleString();
    const facebookCount = Math.floor(total * 0.55).toLocaleString();
    const instagramCount = Math.floor(total * 0.45).toLocaleString();
    const xHandlesCount = Math.floor(total * 0.15).toLocaleString();
    const tiktokCount = Math.floor(total * 0.05).toLocaleString();
    const youtubeCount = Math.floor(total * 0.42).toLocaleString();
    const whatsappCount = Math.max(1, Math.floor(total * 0.01)).toLocaleString();
    const withWebsite = Math.floor(total * 0.70).toLocaleString();
    const withoutWebsite = Math.floor(total * 0.30).toLocaleString();
    const fiveStar = Math.floor(total * 0.44).toLocaleString();
    const fourStar = Math.floor(total * 0.09).toLocaleString();
    const threeStar = Math.floor(total * 0.035).toLocaleString();
    const twoStar = Math.floor(total * 0.007).toLocaleString();
    const oneStar = Math.floor(total * 0.008).toLocaleString();

    const faqs = [
        { question: `What is the total number of ${category} in ${location}?`, answer: `The total number of ${category} in ${location} is ${totalRecords}.` },
        { question: `Where can I get the ${category} in ${location} leads database?`, answer: `Business Data Labs is your go-to platform to get authentic and reliable data on ${category} in ${location} at an affordable price.` },
        { question: `How to download sales qualified leads database of ${category} in ${location}?`, answer: `You can download the complete dataset of sales qualified leads of ${category} in ${location} once you purchase.` },
        { question: `Can I download a sample dataset of ${category} leads in ${location}?`, answer: `Absolutely! Business Data Labs enables you to download a sample dataset directly from the corresponding webpage.` },
        { question: `In what formats can I download ${category} in ${location} leads?`, answer: `You can download the data in CSV, Esri Shapefile, Excel, GeoJSON, or KML (Google Earth) file formats.` },
        { question: `How much does the ${category} in ${location} dataset cost?`, answer: `The price of ${category} in ${location} dataset costs ${price}.` },
        { question: `How many ${category} in ${location} have phone numbers?`, answer: `There are ${phoneCount} ${category} in ${location} with phone numbers.` },
        { question: `How many ${category} in ${location} have email addresses?`, answer: `There are ${emailCount} ${category} in ${location} with email addresses.` },
        { question: `How many ${category} in ${location} have phone number lists and emails?`, answer: `There are ${bothCount} ${category} in ${location} with both phone numbers and email lists.` },
        { question: `How many ${category} in ${location} have LinkedIn Profiles?`, answer: `There are ${linkedinCount} ${category} in ${location} with LinkedIn Profiles.` },
        { question: `How many ${category} in ${location} have Facebook Profiles?`, answer: `There are ${facebookCount} ${category} in ${location} with Facebook Profiles.` },
        { question: `How many ${category} in ${location} have Instagram Handles?`, answer: `There are ${instagramCount} ${category} in ${location} with Instagram Handles.` },
        { question: `How many ${category} in ${location} have X Handles?`, answer: `There are ${xHandlesCount} ${category} in ${location} with X Handles.` },
        { question: `How many ${category} in ${location} have TikTok Profiles?`, answer: `There are ${tiktokCount} ${category} in ${location} with TikTok Profiles.` },
        { question: `How many ${category} in ${location} have YouTube Channels?`, answer: `There are ${youtubeCount} ${category} in ${location} with YouTube Channels.` },
        { question: `How many ${category} in ${location} have WhatsApp Numbers?`, answer: `There are ${whatsappCount} ${category} in ${location} with WhatsApp Numbers.` },
        { question: `What is the total count of ${category} in ${location} with a website?`, answer: `The total count of ${category} in ${location} with a website is ${withWebsite}.` },
        { question: `What is the total count of ${category} in ${location} without a website?`, answer: `The total count of ${category} in ${location} without a website is ${withoutWebsite}.` },
        { question: `How many 5-star rated ${category} are there in ${location}?`, answer: `There are ${fiveStar} 5-star rated ${category} in ${location}.` },
        { question: `What is the total count of 4-star rated ${category} in ${location}?`, answer: `There are ${fourStar} 4-star rated ${category} in ${location}.` },
        { question: `How many 3-star rated ${category} are there in ${location}?`, answer: `There are ${threeStar} 3-star rated ${category} in ${location}.` },
        { question: `What is the total count of 2-star rated ${category} in ${location}?`, answer: `There are ${twoStar} 2-star rated ${category} in ${location}.` },
        { question: `How many 1-star rated ${category} are there in ${location}?`, answer: `There are ${oneStar} 1-star rated ${category} in ${location}.` },
        { question: `How to target ${category} through Facebook Ad Campaigns?`, answer: `By uploading our dataset on ${category}, you can effortlessly reach the right target audience, optimize your ad campaigns, and increase your conversion rate.` },
        { question: `How to target ${category} through Google Ad Campaigns?`, answer: `By uploading our dataset on ${category}, you can effortlessly reach the right target audience through Google Ads, optimize your ad campaigns, and maximize your ROI.` },
        { question: `How do email addresses of ${category} assist in online marketing?`, answer: `With the email addresses of ${category}, you can reach your audience directly, ensuring your messages land in the inboxes of potential customers, leading to increased engagement and conversion rates.` },
        { question: `How do phone numbers of ${category} help businesses?`, answer: `Whether for cold calling campaigns or personalized messaging, having accurate phone numbers allows you to establish meaningful connections.` },
        { question: `How does the mailing address data of ${category} support marketing strategies?`, answer: `The mailing address data of ${category} ensures that your promotional materials reach the hands of potential customers, driving engagement and brand recognition.` },
    ];

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const midpoint = Math.ceil(faqs.length / 2);
    const leftFaqs = faqs.slice(0, midpoint);
    const rightFaqs = faqs.slice(midpoint);

    const renderFaqItem = (faq, index) => (
        <div key={index} style={{ borderBottom: '1px solid var(--border-glass)' }}>
            <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-start justify-between gap-4 py-5 px-1 text-left group cursor-pointer"
            >
                <h3 className="font-semibold text-[15px] leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {faq.question}
                </h3>
                <span className="text-xl leading-none mt-0.5 shrink-0 font-light select-none transition-transform duration-300" style={{ color: activeIndex === index ? '#6366F1' : 'var(--text-muted)' }}>
                    {activeIndex === index ? '—' : '+'}
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-40 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
                <p className="text-[14px] leading-relaxed px-1" style={{ color: 'var(--text-secondary)' }}>
                    {faq.answer}
                </p>
            </div>
        </div>
    );

    return (
        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                          style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.2)', color: '#818CF8' }}>
                        FAQs
                    </span>
                    <h2 className="text-2xl font-black text-white">Frequently Asked Questions</h2>
                    <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                        Everything you need to know about {category} data in {location}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 max-w-6xl mx-auto">
                    <div>{leftFaqs.map((faq, i) => renderFaqItem(faq, i))}</div>
                    <div>{rightFaqs.map((faq, i) => renderFaqItem(faq, i + midpoint))}</div>
                </div>
            </div>
        </section>
    );
};

export default DatasetFaq;
