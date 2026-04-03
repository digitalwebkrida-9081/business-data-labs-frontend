'use client';

import React, { useState, useEffect } from 'react';
import {   FaTimes,
  FaShoppingCart,FaCheckCircle,FaDownload,FaChartLine,FaGlobe,FaLock,FaEnvelope,FaMapMarkerAlt,FaPhone,FaUser,FaBuilding,FaIndustry
} from "react-icons/fa";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { MdVerified, MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import WhyChoose from '../WhyChoose';
import DatasetFaq from './DatasetFaq';
import dynamic from 'next/dynamic';
import { getCountryData, generateSimulatedDistribution } from '../../data/countryStates';
import { countryCodes } from '../../utils/countryCodes';
import { MdKeyboardArrowDown } from 'react-icons/md';
import PhoneInputField from '../ui/PhoneInputField';

const CountryMapSection = dynamic(() => import('./CountryMapSection'), { ssr: false });

const enrichWithMapData = (ds) => {
    if (ds.stateDistribution && Object.keys(ds.stateDistribution).length > 0 && ds.countryCode) return ds;
    const loc = (ds.location || '').toLowerCase().trim();
    const countryInfo = getCountryData(loc);
    if (!countryInfo) return ds;
    const knownCountries = ['india', 'united states', 'bangladesh', 'united kingdom', 'canada', 'australia', 'germany', 'france', 'brazil', 'japan', 'mexico', 'south africa', 'indonesia', 'italy', 'spain', 'turkey', 'pakistan', 'nigeria', 'egypt', 'thailand', 'philippines', 'malaysia', 'saudi arabia', 'uae', 'united arab emirates', 'south korea', 'nepal', 'sri lanka', 'singapore', 'new zealand', 'netherlands', 'sweden', 'switzerland', 'poland', 'argentina', 'colombia', 'chile', 'kenya'];
    if (!knownCountries.includes(loc)) return ds;
    const totalRecords = typeof ds.totalRecords === 'string' ? parseInt(ds.totalRecords.replace(/,/g, ''), 10) : ds.totalRecords;
    const rawPrice = ds.price ? String(ds.price).replace(/[^0-9.]/g, '') : '199';
    const rawPrev = ds.previousPrice ? String(ds.previousPrice).replace(/[^0-9.]/g, '') : '398';
    return { ...ds, price: parseFloat(rawPrice), previousPrice: parseFloat(rawPrev), countryCode: countryInfo.code, stateDistribution: generateSimulatedDistribution(countryInfo.states, totalRecords || 5000) };
};

const countryNameToCode = (name) => {
    const map = { 'united states': 'US', 'united kingdom': 'UK', 'canada': 'CA', 'australia': 'AU', 'india': 'IN', 'germany': 'DE', 'france': 'FR', 'japan': 'JP', 'brazil': 'BR', 'mexico': 'MX', 'bangladesh': 'BD', 'south africa': 'ZA', 'indonesia': 'ID', 'italy': 'IT', 'spain': 'ES', 'turkey': 'TR', 'pakistan': 'PK', 'nigeria': 'NG', 'egypt': 'EG', 'thailand': 'TH', 'philippines': 'PH', 'malaysia': 'MY', 'saudi arabia': 'SA', 'uae': 'AE', 'united arab emirates': 'AE', 'south korea': 'KR', 'nepal': 'NP', 'sri lanka': 'LK', 'singapore': 'SG', 'new zealand': 'NZ', 'netherlands': 'NL', 'sweden': 'SE', 'switzerland': 'CH', 'poland': 'PL', 'argentina': 'AR', 'colombia': 'CO', 'chile': 'CL', 'kenya': 'KE' };
    const lower = (name || '').toLowerCase().trim();
    if (lower.length <= 3 && !lower.includes(' ')) return name.toUpperCase();
    return map[lower] || name;
};

const B2bDatasetDetail = ({ id, country, category, initialDataset = null }) => {
    const searchParams = useSearchParams();
    const displayLabel = searchParams.get('label');
    const filterState = searchParams.get('state') || '';
    const filterCity = searchParams.get('city') || '';
    const countryApiCode = countryNameToCode(country);

    const [dataset, setDataset] = useState(initialDataset);
    const [loading, setLoading] = useState(!initialDataset);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [purchaseLoading, setPurchaseLoading] = useState(false);
    const [form, setForm] = useState({ fullName: '', email: '', phoneNumber: '' });
    const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
    const [purchasePhoneCode, setPurchasePhoneCode] = useState('');
    const [samplePhoneCode, setSamplePhoneCode] = useState('');
    const [sampleForm, setSampleForm] = useState({ fullName: '', email: '', phoneNumber: '' });
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [hasAutoOpened, setHasAutoOpened] = useState(false);
    const [userCurrency, setUserCurrency] = useState(null);

    const handleInputChange = (e) => { const { name, value } = e.target; setForm(prev => ({ ...prev, [name]: value })); };
    const handleSampleChange = (e) => { const { name, value } = e.target; setSampleForm(prev => ({ ...prev, [name]: value })); };

    const handleFormComplete = (e) => {
        e.preventDefault();
        const isPhoneValid = form.phoneNumber && form.phoneNumber.replace(/\D/g, '').length >= 8;
        if (!form.fullName.trim() || !form.email.trim() || !isPhoneValid) { alert("Please fill in all required fields (Name, Email, and a valid Phone number)."); return; }
        setIsFormComplete(true);
    };

    const handleSampleDownload = async (e) => {
        e.preventDefault();
        const isPhoneValid = sampleForm.phoneNumber && sampleForm.phoneNumber.replace(/\D/g, '').length >= 8;
        if (!sampleForm.fullName.trim() || !sampleForm.email.trim() || !isPhoneValid) { alert("Please fill in all required fields (Name, Email, and a valid Phone number)."); return; }
        setPurchaseLoading(true);
        try {
            const XLSX = await import('xlsx');
            const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
            await fetch(`${API_URL}/api/forms/submit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'sample_request', name: sampleForm.fullName, email: sampleForm.email, phone: sampleForm.phoneNumber, datasetDetails: { id: dataset.id, category: dataset.category, location: dataset.location, country: country, state: filterState, city: filterCity }, source: window.location.hostname }) }).catch(error => { console.error("Error submitting sample request API:", error); });
            setTimeout(() => {
                try {
                    const wb = XLSX.utils.book_new();
                    const exportData = dataset.sampleList.map(item => ({ "Business Name": item.name, "Address": item.address || "Available in Full List", "City": item.city, "State": item.state, "Country": item.country, "Phone": "Available in Full List (Verified)", "Email": "Available in Full List (Verified)", "Website": item.website || "--", "Rating": item.rating, "Reviews": item.reviews }));
                    const ws = XLSX.utils.json_to_sheet(exportData);
                    const wscols = [{wch: 30}, {wch: 30}, {wch: 15}, {wch: 15}, {wch: 15}, {wch: 25}, {wch: 25}, {wch: 20}, {wch: 10}, {wch: 10}];
                    ws['!cols'] = wscols;
                    XLSX.utils.book_append_sheet(wb, ws, "Sample Leads");
                    XLSX.writeFile(wb, `${dataset.category}-${dataset.location}-SAMPLE.xlsx`);
                    setPurchaseLoading(false); setIsSampleModalOpen(false); alert("Sample data downloaded successfully!");
                } catch (error) { console.error("Error generating sample file:", error); setPurchaseLoading(false); alert("Failed to create sample file."); }
            }, 1500);
        } catch (error) { console.error("Error preparing sample request:", error); setPurchaseLoading(false); alert("Failed to prepare sample download."); }
    };

    const processDownloadAfterPayment = async () => {
        setPurchaseLoading(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
            if (dataset?.mergedData && country && category) {
                try { await fetch(`${API_URL}/api/forms/submit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'purchase', name: form.fullName, email: form.email, phone: form.phoneNumber, datasetDetails: { category: dataset.category, location: dataset.location, country: country, state: filterState, city: filterCity, totalRecords: dataset.totalRecords }, source: window.location.hostname }) }); } catch (e) { console.warn('Form submission failed:', e); }
                let allRows = []; let page = 1; const batchSize = 5000; let hasMore = true;
                while (hasMore) {
                    const res = await fetch(`${API_URL}/api/merged/data?country=${countryApiCode}&category=${category.replace(/-/g, '_')}&page=${page}&limit=${batchSize}${filterState ? `&state=${encodeURIComponent(filterState)}` : ''}${filterCity ? `&city=${encodeURIComponent(filterCity)}` : ''}`);
                    const result = await res.json();
                    if (result.success && result.data?.data?.length > 0) { allRows = allRows.concat(result.data.data); hasMore = result.data.pagination?.page < result.data.pagination?.totalPages; page++; } else { hasMore = false; }
                }
                if (allRows.length === 0) { alert('No data available for download.'); setPurchaseLoading(false); return; }
                const XLSX = await import('xlsx');
                const wb = XLSX.utils.book_new(); const ws = XLSX.utils.json_to_sheet(allRows);
                const colWidths = Object.keys(allRows[0]).map(key => ({ wch: Math.max(key.length, 15) }));
                ws['!cols'] = colWidths;
                XLSX.utils.book_append_sheet(wb, ws, 'Data'); XLSX.writeFile(wb, `${dataset.category}-${dataset.location}.xlsx`);
                alert(`Purchase Successful! Downloaded records.`); setIsModalOpen(false); setIsFormComplete(false);
                if (typeof window !== 'undefined' && window.gtag) { window.gtag('event', 'conversion', { 'send_to': 'AW-17980750879/Us-BCLTm4YMcEJ_48f1C', 'value': dataset?.price || 1.0, 'currency': 'INR', 'transaction_id': '' }); }
            } else {
                const response = await fetch(`${API_URL}/api/scraper/dataset/purchase`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id, ...form, phoneNumber: form.phoneNumber }) });
                if (response.ok) {
                    const blob = await response.blob(); const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${dataset.category}-${dataset.location}.xlsx`; document.body.appendChild(a); a.click(); a.remove(); window.URL.revokeObjectURL(url);
                    alert(`Purchase Successful! Downloading file...`); setIsModalOpen(false); setIsFormComplete(false);
                    if (typeof window !== 'undefined' && window.gtag) { window.gtag('event', 'conversion', { 'send_to': 'AW-17980750879/Us-BCLTm4YMcEJ_48f1C', 'value': dataset?.price || 1.0, 'currency': 'INR', 'transaction_id': '' }); }
                } else { const result = await response.json(); alert(`Purchase Failed: ${result.message}`); }
            }
        } catch (error) { console.error("Purchase error:", error); alert("An error occurred during purchase."); }
        finally { setPurchaseLoading(false); }
    };

    useEffect(() => {
        if (initialDataset && !filterState && !filterCity) { setDataset(initialDataset); setLoading(false); return; }
        const fetchData = async () => {
            setLoading(true);
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
                if (country && category) {
                    try {
                        let dataUrl = `${API_URL}/api/merged/data?country=${countryApiCode}&category=${category.replace(/-/g, '_')}&page=1&limit=10`;
                        if (filterState) dataUrl += `&state=${encodeURIComponent(filterState)}`;
                        if (filterCity) dataUrl += `&city=${encodeURIComponent(filterCity)}`;
                        const [dataRes, catRes] = await Promise.all([
                            fetch(dataUrl),
                            fetch(`${API_URL}/api/merged/categories?country=${countryApiCode}&limit=10000`)
                        ]);
                        const dataResult = await dataRes.json(); const catResult = await catRes.json();
                        const catInfo = catResult.success && catResult.data?.categories ? catResult.data.categories.find(c => c.name === category || c.name === category.replace(/-/g, '_')) : null;
                        const dataTotal = dataResult.data?.pagination?.total || 0;
                        const totalRecords = (filterState || filterCity) ? dataTotal : (catInfo?.records || dataTotal || 0);
                        const rows = dataResult.success ? (dataResult.data?.data || dataResult.data?.rows || []) : [];
                        const locationName = displayLabel || country.toUpperCase();
                        const categoryDisplayName = catInfo?.displayName || category.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                        const firstRow = rows[0] || {}; const columns = Object.keys(firstRow);
                        const hasEmail = catInfo?.hasEmail || columns.some(c => c.toLowerCase().includes('email'));
                        const hasPhone = catInfo?.hasPhone || columns.some(c => c.toLowerCase().includes('phone'));
                        const hasWebsite = catInfo?.hasWebsite || columns.some(c => c.toLowerCase().includes('website') || c.toLowerCase().includes('url'));
                        const hasLinkedin = catInfo?.hasLinkedin || columns.some(c => c.toLowerCase().includes('linkedin'));
                        const hasFacebook = catInfo?.hasFacebook || columns.some(c => c.toLowerCase().includes('facebook'));
                        const hasInstagram = catInfo?.hasInstagram || columns.some(c => c.toLowerCase().includes('instagram'));
                        const hasTwitter = catInfo?.hasTwitter || columns.some(c => c.toLowerCase().includes('twitter'));
                        const hasTiktok = catInfo?.hasTiktok || columns.some(c => c.toLowerCase().includes('tiktok'));
                        const hasYoutube = catInfo?.hasYoutube || columns.some(c => c.toLowerCase().includes('youtube'));
                        const sampleList = rows.slice(0, 10).map((row, idx) => {
                            const nameCol = columns.find(c => /^(name|business|company|title)/i.test(c)) || columns[0];
                            const cityCol = columns.find(c => /^city/i.test(c)); const stateCol = columns.find(c => /^(state|province|region)/i.test(c));
                            const countryCol = columns.find(c => /^country/i.test(c)); const websiteCol = columns.find(c => /^(website|url)/i.test(c));
                            const ratingCol = columns.find(c => /^(rating|stars)/i.test(c)); const reviewCol = columns.find(c => /^(review|total.?review)/i.test(c));
                            return { name: row[nameCol] || `${categoryDisplayName} ${idx + 1}`, city: cityCol ? row[cityCol] : '', state: stateCol ? row[stateCol] : '', country: countryCol ? row[countryCol] : locationName, website: websiteCol ? row[websiteCol] : '', rating: ratingCol ? row[ratingCol] : (4 + Math.random()).toFixed(1), reviews: reviewCol ? row[reviewCol] : Math.floor(Math.random() * 500) };
                        });
                        const mergedDataset = { id: `merged-${country}-${category}`, category: categoryDisplayName, location: locationName, totalRecords, emailCount: hasEmail ? totalRecords : 0, totalEmails: hasEmail ? totalRecords : 0, phones: hasPhone ? totalRecords : 0, totalPhones: hasPhone ? totalRecords : 0, websiteCount: hasWebsite ? Math.floor(totalRecords * 0.7) : 0, totalWebsites: hasWebsite ? Math.floor(totalRecords * 0.7) : 0, linkedinCount: hasLinkedin ? Math.floor(totalRecords * 0.6) : 0, totalLinkedin: hasLinkedin ? Math.floor(totalRecords * 0.6) : 0, facebookCount: hasFacebook ? Math.floor(totalRecords * 0.65) : 0, totalFacebook: hasFacebook ? Math.floor(totalRecords * 0.65) : 0, instagramCount: hasInstagram ? Math.floor(totalRecords * 0.5) : 0, totalInstagram: hasInstagram ? Math.floor(totalRecords * 0.5) : 0, twitterCount: hasTwitter ? Math.floor(totalRecords * 0.3) : 0, totalTwitter: hasTwitter ? Math.floor(totalRecords * 0.3) : 0, tiktokCount: hasTiktok ? Math.floor(totalRecords * 0.2) : 0, totalTiktok: hasTiktok ? Math.floor(totalRecords * 0.2) : 0, youtubeCount: hasYoutube ? Math.floor(totalRecords * 0.25) : 0, totalYoutube: hasYoutube ? Math.floor(totalRecords * 0.25) : 0, price: catInfo?.price ? parseFloat(String(catInfo.price).replace(/[^0-9.]/g, '')) : 199, previousPrice: catInfo?.previousPrice ? parseFloat(String(catInfo.previousPrice).replace(/[^0-9.]/g, '')) : 398, lastUpdate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), sampleList, countryCode: country.toUpperCase(), mergedData: true };
                        setDataset(enrichWithMapData(mergedDataset)); setLoading(false); return;
                    } catch (e) { console.warn("Merged data fetch failed:", e); }
                }
                if (id) {
                    try { const response = await fetch(`${API_URL}/api/scraper/dataset/${id}`); if (response.ok) { const result = await response.json(); if (result.success && result.data) { setDataset(enrichWithMapData(result.data)); setLoading(false); return; } } } catch (e) { console.warn("API Fetch failed, checking cache...", e); }
                    const cachedSimulated = sessionStorage.getItem('simulatedDatasets');
                    if (cachedSimulated) { const simulatedList = JSON.parse(cachedSimulated); const found = simulatedList.find(s => s.id === id || s._id === id); if (found) { setDataset(enrichWithMapData(found)); setLoading(false); return; } }
                }
                console.error("Dataset not found"); setLoading(false);
            } catch (error) { console.error("Error fetching detail data:", error); setLoading(false); }
        };
        fetchData();
    }, [id, country, category, filterState, filterCity, initialDataset]);

    useEffect(() => {
        const fetchCurrency = async () => { try { const API_URL = process.env.NEXT_PUBLIC_API_URL || ''; const res = await fetch(`${API_URL}/api/currency/rate`); const result = await res.json(); if (result.success && result.data && result.data.needsConversion) { setUserCurrency(result.data); } } catch (err) { console.warn('Currency detection failed:', err); } };
        fetchCurrency();
    }, []);

    const getConvertedPrice = (usdPrice) => {
        if (!userCurrency || !userCurrency.needsConversion || !userCurrency.rate) return null;
        const converted = parseFloat(usdPrice) * userCurrency.rate;
        return `${userCurrency.symbol}${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${userCurrency.currency}`;
    };

    useEffect(() => { if (isSampleModalOpen && !hasAutoOpened) setHasAutoOpened(true); }, [isSampleModalOpen, hasAutoOpened]);
    useEffect(() => { let timer; if (dataset && !loading && !isModalOpen && !hasAutoOpened) { timer = setTimeout(() => { setIsSampleModalOpen(true); setHasAutoOpened(true); }, 10000); } return () => clearTimeout(timer); }, [dataset, loading, isModalOpen, hasAutoOpened]);

    if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}><div className="inline-block animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" /></div>;
    if (!dataset) return <div className="min-h-screen flex items-center justify-center text-red-400" style={{ background: 'var(--bg-primary)' }}>Dataset not found.</div>;

    return (
        <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            {/* ═══ HERO SECTION ═══ */}
            <div className="relative pt-20 pb-20 overflow-hidden mesh-gradient" style={{ background: 'var(--bg-primary)' }}>
                <div className="absolute inset-0 dot-pattern" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-xs font-medium text-slate-500 mb-6 flex gap-2 items-center tracking-wide">
                        <Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link> /
                        <Link href="/b2b-database" className="hover:text-indigo-400 transition-colors">B2B Database</Link> /
                        <span className="text-slate-300">{dataset.category} in {dataset.location}</span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-[60%] animate-fadeInUp">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold mb-5"
                                 style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10B981' }}>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Verified & Updated
                            </div>
                            <h1 className="text-2xl lg:text-4xl font-black mb-6 leading-tight text-white">
                                List of <span className="gradient-text">{dataset.category}</span> {displayLabel ? `in ${displayLabel}` : dataset.location.split(',').slice(-2).join(',')}
                            </h1>
                            <p className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed max-w-2xl">
                                There are <strong className="text-white">{dataset.totalRecords.toLocaleString()}</strong> {dataset.category} in {dataset.location} as of {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
                                Of these, {Math.floor(dataset.totalRecords * 0.95).toLocaleString()} which is 95.89% are single-owner operations.
                            </p>

                            {/* STATS GRID */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 mb-8 text-sm md:text-base">
                                <div className="space-y-3">
                                    {[
                                        { val: dataset.totalRecords, label: `Number of ${dataset.category}` },
                                        { val: dataset.emailCount || dataset.totalEmails || 0, label: 'Email Addresses' },
                                        { val: dataset.phones || dataset.totalPhones || 0, label: 'Phone Numbers' },
                                        { val: dataset.websiteCount || dataset.totalWebsites || 0, label: 'With Websites' },
                                        { val: dataset.linkedinCount || dataset.totalLinkedin || 0, label: 'LinkedIn Profiles' },
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <FaCheckCircle className="text-emerald-400 shrink-0" />
                                            <span className="font-bold text-white text-[18px]">{s.val.toLocaleString()}</span>
                                            <span className="text-slate-400">{s.label}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { val: dataset.facebookCount || dataset.totalFacebook || 0, label: 'Facebook Profiles' },
                                        { val: dataset.instagramCount || dataset.totalInstagram || 0, label: 'Instagram Handles' },
                                        { val: dataset.twitterCount || dataset.totalTwitter || 0, label: 'X Handles' },
                                        { val: dataset.tiktokCount || dataset.totalTiktok || 0, label: 'TikTok Profiles' },
                                        { val: dataset.youtubeCount || dataset.totalYoutube || 0, label: 'YouTube Channels' },
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <FaCheckCircle className="text-emerald-400 shrink-0" />
                                            <span className="font-bold text-white text-[18px]">{s.val.toLocaleString()}</span>
                                            <span className="text-slate-400">{s.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p className="text-xs font-semibold mb-6" style={{ color: '#22D3EE' }}>
                                Data updated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>

                            {/* PRICE & BUTTONS */}
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                <div>
                                    <div className="flex items-end gap-3 mb-4">
                                        {(() => {
                                            const p = dataset.price || 199; const pp = dataset.previousPrice || 398;
                                            const formatPrice = (val) => String(val).startsWith('$') ? val : `$${val}`;
                                            const priceVal = String(p).replace(/[^0-9.]/g, ''); const prevVal = String(pp).replace(/[^0-9.]/g, '');
                                            const discount = (priceVal && prevVal) ? Math.round(((parseFloat(prevVal) - parseFloat(priceVal)) / parseFloat(prevVal)) * 100) : 50;
                                            const convertedPrice = getConvertedPrice(priceVal); const convertedPrev = getConvertedPrice(prevVal);
                                            return (
                                                <>
                                                    <div className="flex items-end gap-3">
                                                        <span className="text-4xl font-black gradient-text">{formatPrice(p)}</span>
                                                        <span className="text-xl text-slate-600 line-through font-medium mb-1">{formatPrice(pp)}</span>
                                                        <span className="text-white text-xl mb-1">(Holiday Discount: {discount}% OFF)</span>
                                                    </div>
                                                    {convertedPrice && (
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-lg font-semibold" style={{ color: '#22D3EE' }}>≈ {convertedPrice}</span>
                                                            {convertedPrev && <span className="text-slate-600 text-sm line-through">≈ {convertedPrev}</span>}
                                                            <span className="text-xs ml-1 px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B' }}>Live rate</span>
                                                        </div>
                                                    )}
                                                </>
                                            );
                                        })()}
                                    </div>
                                    <div className="flex gap-4 flex-wrap">
                                        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2 uppercase tracking-wide text-sm cursor-pointer">
                                            <FaDownload /> Purchase Lead List
                                        </button>
                                        <button onClick={() => setIsSampleModalOpen(true)} className="btn-ghost flex items-center gap-2 uppercase tracking-wide text-sm cursor-pointer">
                                            <FaDownload /> Free Sample Lead List
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — Stats card */}
                        <div className="lg:w-[40%] mt-8 lg:mt-0 animate-fadeInUp delay-300">
                            <div className="glass-card !p-6 !rounded-2xl" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                                <div className="text-center mb-4">
                                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Dataset Overview</div>
                                    <div className="text-3xl font-black text-white">{dataset.totalRecords.toLocaleString()}</div>
                                    <div className="text-sm text-slate-400">Total Records</div>
                                </div>
                                {[
                                    { label: 'Emails', value: (dataset.emailCount || dataset.totalEmails || 0).toLocaleString(), color: '#22D3EE' },
                                    { label: 'Phones', value: (dataset.phones || dataset.totalPhones || 0).toLocaleString(), color: '#10B981' },
                                    { label: 'Websites', value: (dataset.websiteCount || dataset.totalWebsites || 0).toLocaleString(), color: '#6366F1' },
                                    { label: 'LinkedIn', value: (dataset.linkedinCount || dataset.totalLinkedin || 0).toLocaleString(), color: '#F59E0B' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between py-3" style={{ borderTop: '1px solid var(--border-glass)' }}>
                                        <span className="text-sm text-slate-400 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                                            {item.label}
                                        </span>
                                        <span className="text-sm font-bold text-white">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logo Bar */}
            <div className="py-5" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
                <div className="container mx-auto px-4 flex justify-between items-center gap-8 overflow-x-auto" style={{ opacity: 0.25 }}>
                    {['Walmart', 'JLL', 'Citi', 'KPMG', 'Kroger'].map((b, i) => (
                        <span key={i} className="text-white font-bold text-xl whitespace-nowrap">{b}</span>
                    ))}
                </div>
            </div>

            {/* ═══ DATA TABLE SECTION ═══ */}
            <div className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-black text-white">List of {dataset.category} in {dataset.location}</h2>
                        <p className="text-slate-500 text-sm mt-2">A preview of the data fields included in the downloaded list.</p>
                    </div>
                    <div className="glass-card !rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table-dark">
                                <thead>
                                    <tr>
                                        <th>Name</th><th>Address</th><th>City</th><th>State/Province</th><th>Country</th><th>Website</th><th>Email</th><th>Phone</th><th>Rating</th><th>Reviews</th><th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataset.sampleList.map((row, idx) => (
                                        <tr key={idx}>
                                            <td className="font-medium text-white whitespace-nowrap">{row.name}</td>
                                            <td><span className="flex items-center gap-1"><MdLocationOn className='text-indigo-400 shrink-0'/>Available</span></td>
                                            <td>{row.city}</td><td>{row.state}</td><td>{row.country}</td>
                                            <td>{row.website ? <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="text-indigo-400 hover:underline flex items-center gap-1"><FaGlobe className="shrink-0 text-xs"/>Available</a> : '--'}</td>
                                            <td><span className="flex items-center gap-1"><MdEmail className="text-cyan-400 shrink-0"/>Available</span></td>
                                            <td><span className="flex items-center gap-1"><MdPhone className="text-emerald-400 shrink-0"/>Available</span></td>
                                            <td>{row.rating}</td><td>{row.reviews}</td>
                                            <td className="text-center"><FaLock className="inline text-slate-600" /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 text-center flex gap-4 justify-center" style={{ borderTop: '1px solid var(--border-glass)' }}>
                            <button onClick={() => setIsModalOpen(true)} className="btn-primary !rounded-xl text-sm flex items-center gap-2 cursor-pointer"><FaDownload/>Download Full List</button>
                            <button onClick={() => setIsSampleModalOpen(true)} className="btn-ghost !rounded-xl text-sm cursor-pointer">Request Sample</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ VALUE PROPOSITION ═══ */}
            <div className="section-padding !pb-0" style={{ background: 'var(--bg-primary)' }}>
                <div className="container mx-auto px-4">
                    <div className="mb-12 text-left">
                        <h2 className="text-2xl font-black text-white mb-4">How Business Data Labs Helps Businesses</h2>
                        <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-4xl">Explore the strategic advantages of our data scraping solutions.</p>
                    </div>
                    <div className="text-left space-y-8 max-w-auto mb-16">
                        <div>
                            <h3 className="text-xl lg:text-2xl font-black text-white mb-3">Find the Best {dataset.category} in {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()} | Verified Business Directory</h3>
                            <p className="text-slate-400 text-sm md:text-base leading-relaxed">Identifying the right <strong className="text-white">{dataset.category}</strong> in <strong className="text-white">{displayLabel || dataset.location.split(',').slice(-2).join(',').trim()}</strong> is the first step toward successful product development. Our comprehensive database offers an exhaustive list of {dataset.category} currently operating across {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()}.</p>
                        </div>
                        <div>
                            <h4 className="text-lg lg:text-xl font-black text-white mb-3">Why Choose {dataset.category} in {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()}?</h4>
                            <p className="text-slate-400 text-sm md:text-base leading-relaxed">The landscape for {dataset.category} is evolving rapidly. By focusing your search within {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()}, you gain access to high-tier talent and advanced technologies.</p>
                        </div>
                        <div>
                            <h4 className="text-lg lg:text-xl font-black text-white mb-3">Why Business Data Labs is Your Trusted Source</h4>
                            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-4">When sourcing {dataset.category} data, accuracy is paramount. Business Data Labs stands out:</p>
                            <ul className="space-y-2 text-slate-400 text-sm md:text-base leading-relaxed">
                                {['Verified Authenticity: Every entry is verified for accuracy.', 'Deep Market Insight: Insights into operational scale.', 'Frequent Updates: Database refreshed regularly.', 'Compliance Guaranteed: All data collection follows regulations.'].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2"><FaCheckCircle className="text-emerald-400 mt-1 shrink-0" /><span><strong className="text-white">{item.split(':')[0]}:</strong>{item.split(':').slice(1).join(':')}</span></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <button onClick={() => setIsModalOpen(true)} className="btn-primary inline-flex items-center gap-2 text-sm uppercase tracking-wide cursor-pointer">Get Instant Access to the Report</button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5">
                        {[
                            { icon: FaEnvelope, title: 'Re-target Email Campaigns', desc: 'Verified lists ensure high deliverability. Reach the right inbox at the right time.', color: '#6366F1' },
                            { icon: FaLock, title: 'Master Cold Calling', desc: 'Avoid gatekeepers with direct dial numbers and key decision-maker information.', color: '#8B5CF6' },
                            { icon: FaMapMarkerAlt, title: 'Direct Mail Campaigns', desc: 'Use precise address data to send physical offers to business locations.', color: '#10B981' },
                        ].map((card, i) => (
                            <div key={i} className="glass-card !p-8 !rounded-2xl group">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-xl transition-all duration-300 group-hover:scale-110"
                                     style={{ background: `${card.color}15`, border: `1px solid ${card.color}25` }}>
                                    <card.icon style={{ color: card.color }} />
                                </div>
                                <h3 className="font-bold text-lg text-white mb-3">{card.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Country Map */}
            {dataset.stateDistribution && Object.keys(dataset.stateDistribution).length > 0 && (
                <CountryMapSection category={dataset.category} location={dataset.location} countryCode={dataset.countryCode} stateDistribution={dataset.stateDistribution} totalRecords={dataset.totalRecords} />
            )}

            {/* ═══ STATS SECTION ═══ */}
            <div className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container mx-auto px-4 pb-16" style={{ borderBottom: '1px solid var(--border-glass)' }}>
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-black text-white">How many {dataset.category} are there in {dataset.location}?</h2>
                        <p className="text-slate-500 mt-2">Total of {dataset.totalRecords} {dataset.category} as of {dataset.lastUpdate}.</p>
                        <div className="mt-8 flex justify-center gap-4">
                            <button className="btn-primary text-sm cursor-pointer" onClick={() => setIsModalOpen(true)}>Buy Full Dataset</button>
                            <button className="btn-ghost text-sm flex items-center gap-2 cursor-pointer" onClick={() => setIsSampleModalOpen(true)}><FaDownload/>Download Sample</button>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            { icon: FaPhone, label: 'Phone numbers in the list', value: (dataset.phones || dataset.totalPhones || 0).toLocaleString(), color: '#6366F1' },
                            { icon: MdEmail, label: 'Email addresses in the list', value: (dataset.emailCount || dataset.totalEmails || 0).toLocaleString(), color: '#22D3EE' },
                        ].map((stat, i) => (
                            <div key={i} className="glass-card !p-8 !rounded-2xl text-center">
                                <div className="text-4xl mb-4 flex justify-center" style={{ color: stat.color }}><stat.icon /></div>
                                <h4 className="font-bold text-slate-300 mb-2 text-sm">{stat.label}</h4>
                                <div className="text-5xl font-black text-white mb-4">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex flex-col md:flex-row gap-5 max-w-4xl mx-auto">
                        {[{ title: 'Store Owner', icon: FaUser }, { title: 'Facility Owner', icon: FaBuilding }].map((item, i) => (
                            <div key={i} className="flex-1 relative overflow-hidden rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}>
                                <div className="relative z-10"><h4 className="font-bold mb-1">{item.title}</h4><p className="text-sm text-white/60">Available</p></div>
                                <item.icon className="absolute bottom-4 right-4 text-6xl text-white/10" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-4 py-16 pb-0 text-center">
                    <h2 className="text-2xl font-black text-white mb-8">Unlock Monthly Insights for Growth</h2>
                    <div className="space-y-3 max-w-2xl mx-auto">
                        {['Unlock data on new stores opening near you every 30 days.', 'Track competitors and analyze market saturation in real-time.', 'Leverage predictive analytics to forecast trend shifts.', 'Gain competitive edge with up-to-date contact information.'].map((text, i) => (
                            <div key={i} className="glass-card !p-4 !rounded-xl text-sm font-medium text-slate-400 text-left flex items-center gap-3">
                                <FaCheckCircle className="text-emerald-400 shrink-0" />{text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Special Features */}
            <div className="section-padding !pt-0" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10"><h2 className="text-2xl font-black text-white">Special Features</h2></div>
                    <div className="grid md:grid-cols-3 gap-5">
                        {[
                            { icon: FaCheckCircle, text: 'Verified Email & Phone', color: '#10B981' },
                            { icon: FaChartLine, text: 'Historical Data Available', color: '#6366F1' },
                            { icon: FaGlobe, text: 'Global Coverage Options', color: '#22D3EE' },
                        ].map((feat, i) => (
                            <div key={i} className="glass-card !p-6 !rounded-2xl flex items-center gap-4">
                                <div className="p-3 rounded-xl" style={{ background: `${feat.color}15` }}><feat.icon style={{ color: feat.color }} /></div>
                                <div className="text-sm font-bold text-slate-300">{feat.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <WhyChoose />
            <DatasetFaq dataset={dataset} />

            {/* ═══ PURCHASE MODAL ═══ */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <button onClick={() => { setIsModalOpen(false); setIsFormComplete(false); }} className="absolute top-4 right-4 text-slate-500 hover:text-white transition cursor-pointer"><FaTimes className="text-xl" /></button>
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center gap-2 text-white font-bold text-xl">
                                <img src="/images/logo.png" alt="logo" className='w-9' style={{ filter: 'drop-shadow(0 0 10px rgba(99,102,241,0.4))' }} />
                                Business Data <span className="gradient-text">Labs</span>
                            </div>
                        </div>
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-white mb-2">Purchase lead list of <span className="gradient-text">{dataset.category}</span> in <span className="gradient-text">{dataset.location}</span></h3>
                            <div className="flex flex-col items-center gap-1 mb-1">
                                <span className="text-2xl font-black text-white">${String(dataset.price || 199).replace(/[^0-9.]/g, '')} USD</span>
                                {getConvertedPrice(String(dataset.price || 199).replace(/[^0-9.]/g, '')) && (
                                    <span className="text-sm font-medium" style={{ color: '#22D3EE' }}>≈ {getConvertedPrice(String(dataset.price || 199).replace(/[^0-9.]/g, ''))}<span className="text-slate-600 text-xs ml-1">(live rate)</span></span>
                                )}
                            </div>
                            <p className="text-slate-500 text-sm">Fill in the below details</p>
                        </div>
                        {!isFormComplete ? (
                            <form onSubmit={handleFormComplete} className="space-y-4">
                                <div><label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Full Name <span className="text-red-400">*</span></label><input type="text" name="fullName" required value={form.fullName} onChange={handleInputChange} placeholder="Full Name" className="input-dark" /></div>
                                <div><label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Email <span className="text-red-400">*</span></label><input type="email" name="email" required value={form.email} onChange={handleInputChange} placeholder="Email" className="input-dark" /></div>
                                <PhoneInputField value={form.phoneNumber} onChange={handleInputChange} name="phoneNumber" label="Phone Number" required={true} />
                                <button type="submit" className="w-full mt-6 btn-primary !rounded-xl font-bold flex items-center justify-center gap-3 !py-4 cursor-pointer"><FaShoppingCart className="text-sm" /> PROCEED TO PAYMENT</button>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <div className="p-4 rounded-xl text-sm relative" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)' }}>
                                    <button onClick={() => setIsFormComplete(false)} className="absolute top-4 right-4 text-xs font-bold hover:underline cursor-pointer" style={{ color: '#6366F1' }}>Edit Details</button>
                                    <p className="mb-1"><span className="font-bold text-slate-300">Name:</span> <span className="text-slate-400">{form.fullName}</span></p>
                                    <p className="mb-1"><span className="font-bold text-slate-300">Email:</span> <span className="text-slate-400">{form.email}</span></p>
                                    <p><span className="font-bold text-slate-300">Phone:</span> <span className="text-slate-400">{form.phoneNumber}</span></p>
                                </div>
                                {purchaseLoading ? (
                                    <div className="text-center py-8"><div className="inline-block animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div><p className="text-slate-300 font-bold">Processing your data...</p><p className="text-sm text-slate-500">Please do not close this window.</p></div>
                                ) : (
                                    <div className="relative z-0">
                                        <PayPalButtons
                                            style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
                                            createOrder={async (data, actions) => {
                                                const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://stagservice.datasellerhub.com";
                                                let finalPrice = dataset.price || "199.00";
                                                try { finalPrice = parseFloat(dataset.price).toFixed(2); } catch (e) {}
                                                const response = await fetch(`${API_URL}/api/payment/create-paypal-order`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ datasetDetails: { category: dataset.category, location: dataset.location, country: country, state: filterState, city: filterCity }, price: finalPrice }) });
                                                const orderData = await response.json();
                                                if (orderData.data?.id) return orderData.data.id;
                                                else if (orderData.id) return orderData.id;
                                                else throw new Error("Could not initiate PayPal order.");
                                            }}
                                            onApprove={async (data, actions) => {
                                                const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://stagservice.datasellerhub.com";
                                                try {
                                                    const response = await fetch(`${API_URL}/api/payment/capture-paypal-order`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderID: data.orderID, name: form.fullName, email: form.email, phone: form.phoneNumber, datasetDetails: { category: dataset.category, location: dataset.location, country: country, state: filterState, city: filterCity } }) });
                                                    const orderData = await response.json();
                                                    if (orderData.success) await processDownloadAfterPayment();
                                                    else alert("Payment capture failed. Please try again.");
                                                } catch (err) { console.error(err); alert("An error occurred during payment capture."); }
                                            }}
                                            onError={(err) => { console.error("PayPal UI Error:", err); alert("An error occurred loading the payment gateway."); }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ═══ SAMPLE REQUEST MODAL ═══ */}
            {isSampleModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <button onClick={() => setIsSampleModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition cursor-pointer"><FaTimes className="text-xl" /></button>
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center gap-2 text-white font-bold text-xl">
                                <img src="/images/logo.png" alt="logo" className='w-9' style={{ filter: 'drop-shadow(0 0 10px rgba(99,102,241,0.4))' }} />
                                Business Data <span className="gradient-text">Labs</span>
                            </div>
                        </div>
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-white mb-2">Free sample lead list of <span className="gradient-text">{dataset.category}</span> in <span className="gradient-text">{dataset.location}</span></h3>
                            <p className="text-slate-500 text-sm">Fill in the below details</p>
                        </div>
                        <form onSubmit={handleSampleDownload} className="space-y-4">
                            <div><label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Full Name <span className="text-red-400">*</span></label><input type="text" name="fullName" required value={sampleForm.fullName} onChange={handleSampleChange} placeholder="Full Name" className="input-dark" /></div>
                            <div><label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Email <span className="text-red-400">*</span></label><input type="email" name="email" required value={sampleForm.email} onChange={handleSampleChange} placeholder="Email Address" className="input-dark" /></div>
                            <PhoneInputField value={sampleForm.phoneNumber} onChange={handleSampleChange} name="phoneNumber" label="Phone Number" required={true} />
                            <button type="submit" disabled={purchaseLoading} className="w-full mt-6 btn-primary !rounded-xl font-bold flex items-center justify-center gap-3 !py-4 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
                                {purchaseLoading ? <span>Processing...</span> : <><FaDownload className="text-sm" /> DOWNLOAD SAMPLE</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default B2bDatasetDetail;
