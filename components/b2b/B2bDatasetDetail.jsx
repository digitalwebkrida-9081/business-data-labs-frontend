'use client';

import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaStar, FaDownload, FaChartLine, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaBuilding, FaUser, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { MdVerified, MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import WhyChoose from '../WhyChoose';
import DatasetFaq from './DatasetFaq';
// import * as XLSX from 'xlsx'; // Moved to dynamic import
import dynamic from 'next/dynamic';
import { getCountryData, generateSimulatedDistribution } from '../../data/countryStates';
import { countryCodes } from '../../utils/countryCodes';
import { MdKeyboardArrowDown } from 'react-icons/md';
import PhoneInputField from '../ui/PhoneInputField';

const CountryMapSection = dynamic(() => import('./CountryMapSection'), { ssr: false });

// Enrich dataset with simulated state distribution if backend didn't provide one
// Only for COUNTRY-level datasets (not state or city level)
const enrichWithMapData = (ds) => {
    // If backend already provided real state distribution data, use it
    if (ds.stateDistribution && Object.keys(ds.stateDistribution).length > 0 && ds.countryCode) {
        return ds;
    }
    // Only generate simulated data for country-level locations
    // Country-level = location is JUST a country name (e.g. "INDIA", "UNITED STATES")
    // State-level = "GUJARAT INDIA", City-level = "MUMBAI MAHARASHTRA INDIA" — skip these
    const loc = (ds.location || '').toLowerCase().trim();
    const countryInfo = getCountryData(loc);
    if (!countryInfo) return ds;

    // Exact match check: the normalized location must match a known country name exactly
    const knownCountries = [
        'india', 'united states', 'bangladesh', 'united kingdom', 'canada',
        'australia', 'germany', 'france', 'brazil', 'japan', 'mexico',
        'south africa', 'indonesia', 'italy', 'spain', 'turkey', 'pakistan',
        'nigeria', 'egypt', 'thailand', 'philippines', 'malaysia', 'saudi arabia',
        'uae', 'united arab emirates', 'south korea', 'nepal', 'sri lanka',
        'singapore', 'new zealand', 'netherlands', 'sweden', 'switzerland',
        'poland', 'argentina', 'colombia', 'chile', 'kenya'
    ];
    if (!knownCountries.includes(loc)) return ds; // Not a country-only location, skip

    const totalRecords = typeof ds.totalRecords === 'string'
        ? parseInt(ds.totalRecords.replace(/,/g, ''), 10)
        : ds.totalRecords;
    
    // Parse prices for calculation
    const rawPrice = ds.price ? String(ds.price).replace(/[^0-9.]/g, '') : '199';
    const rawPrev = ds.previousPrice ? String(ds.previousPrice).replace(/[^0-9.]/g, '') : '398';
    
    return {
        ...ds,
        price: parseFloat(rawPrice),
        previousPrice: parseFloat(rawPrev),
        countryCode: countryInfo.code,
        stateDistribution: generateSimulatedDistribution(countryInfo.states, totalRecords || 5000)
    };
};

// Map full country names to country codes (backend expects codes like 'US', not 'United States')
const countryNameToCode = (name) => {
    const map = {
        'united states': 'US', 'united kingdom': 'UK', 'canada': 'CA',
        'australia': 'AU', 'india': 'IN', 'germany': 'DE',
        'france': 'FR', 'japan': 'JP', 'brazil': 'BR', 'mexico': 'MX',
        'bangladesh': 'BD', 'south africa': 'ZA', 'indonesia': 'ID',
        'italy': 'IT', 'spain': 'ES', 'turkey': 'TR', 'pakistan': 'PK',
        'nigeria': 'NG', 'egypt': 'EG', 'thailand': 'TH',
        'philippines': 'PH', 'malaysia': 'MY', 'saudi arabia': 'SA',
        'uae': 'AE', 'united arab emirates': 'AE', 'south korea': 'KR',
        'nepal': 'NP', 'sri lanka': 'LK', 'singapore': 'SG',
        'new zealand': 'NZ', 'netherlands': 'NL', 'sweden': 'SE',
        'switzerland': 'CH', 'poland': 'PL', 'argentina': 'AR',
        'colombia': 'CO', 'chile': 'CL', 'kenya': 'KE'
    };
    const lower = (name || '').toLowerCase().trim();
    // If it's already a short code (2-3 chars), return as-is
    if (lower.length <= 3 && !lower.includes(' ')) return name.toUpperCase();
    return map[lower] || name;
};

const B2bDatasetDetail = ({ id, country, category, initialDataset = null }) => {
    const searchParams = useSearchParams();
    const displayLabel = searchParams.get('label');
    const filterState = searchParams.get('state') || '';
    const filterCity = searchParams.get('city') || '';
    // Resolve country to code for API calls (e.g. "United States" -> "US")
    const countryApiCode = countryNameToCode(country);

    const [dataset, setDataset] = useState(initialDataset);
    const [loading, setLoading] = useState(!initialDataset);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [purchaseLoading, setPurchaseLoading] = useState(false);
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phoneNumber: ''
    });
    const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
    const [purchasePhoneCode, setPurchasePhoneCode] = useState('+1');
    const [samplePhoneCode, setSamplePhoneCode] = useState('+1');
    const [sampleForm, setSampleForm] = useState({
        fullName: '',
        email: '',
        phoneNumber: ''
    });
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [hasAutoOpened, setHasAutoOpened] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSampleChange = (e) => {
        const { name, value } = e.target;
        setSampleForm(prev => ({ ...prev, [name]: value }));
    };

    const handleStripeCheckout = async (e) => {
        e.preventDefault();
        setPurchaseLoading(true);
        setIsFormComplete(true);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
        let finalPrice = dataset.price || 199;
        
        try {
            const response = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: dataset.id,
                    email: form.email,
                    fullName: form.fullName,
                    phoneNumber: form.phoneNumber,
                    datasetName: `List of ${dataset.category} in ${dataset.location}`,
                    price: finalPrice,
                    successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&dataset_id=${dataset.id}`,
                    cancelUrl: window.location.href
                }),
            });
            const data = await response.json();
            if (data.success && data.url) {
                window.location.href = data.url; // Redirect to Stripe
            } else {
                console.error("Stripe Error:", data);
                alert("Could not initiate Stripe checkout. Please try again.");
                setPurchaseLoading(false);
                setIsFormComplete(false);
            }
        } catch (error) {
            console.error("Stripe Error:", error);
            alert("Payment gateway connection error.");
            setPurchaseLoading(false);
            setIsFormComplete(false);
        }
    };

    const handleSampleDownload = async (e) => {
        e.preventDefault();
        // Simulate processing
        setPurchaseLoading(true); // Reuse loading state or create new one if needed

        try {
            // Dynamically import XLSX
            const XLSX = await import('xlsx');
            
            // Submit to Backend
            const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
            await fetch(`${API_URL}/api/forms/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'sample_request',
                    name: sampleForm.fullName,
                    email: sampleForm.email,
                    phone: sampleForm.phoneNumber,
                    datasetDetails: {
                         id: dataset.id,
                         category: dataset.category,
                         location: dataset.location
                    }
                })
            }).catch(error => {
                console.error("Error submitting sample request API:", error);
                // We can continue generating the file even if tracking fails.
            });
            
            setTimeout(() => {
                try {
                    // Generate Excel File
                    const wb = XLSX.utils.book_new();
                    
                    // Create data for Excel with masked/hidden fields
                    const exportData = dataset.sampleList.map(item => ({
                        "Business Name": item.name,
                        "Address": item.address || "Available in Full List",
                        "City": item.city,
                        "State": item.state,
                        "Country": item.country,
                        "Phone": "Available in Full List (Verified)", // Masked
                        "Email": "Available in Full List (Verified)", // Masked
                        "Website": item.website ? "Available" : "--",
                        "Rating": item.rating,
                        "Reviews": item.reviews
                    }));

                    const ws = XLSX.utils.json_to_sheet(exportData);
                    
                    // Adjust column widths
                    const wscols = [
                        {wch: 30}, // Name
                        {wch: 30}, // Address
                        {wch: 15}, // City
                        {wch: 15}, // State
                        {wch: 15}, // Country
                        {wch: 25}, // Phone
                        {wch: 25}, // Email
                        {wch: 20}, // Website
                        {wch: 10}, // Rating
                        {wch: 10}  // Reviews
                    ];
                    ws['!cols'] = wscols;

                    XLSX.utils.book_append_sheet(wb, ws, "Sample Leads");
                    
                    // Download file
                    XLSX.writeFile(wb, `${dataset.category}-${dataset.location}-SAMPLE.xlsx`);
                    
                    setPurchaseLoading(false);
                    setIsSampleModalOpen(false);
                    alert("Sample data downloaded successfully!");
                } catch (error) {
                    console.error("Error generating sample file:", error);
                    setPurchaseLoading(false);
                    alert("Failed to create sample file.");
                }
            }, 1500);

        } catch (error) {
            console.error("Error preparing sample request:", error);
            setPurchaseLoading(false);
            alert("Failed to prepare sample download.");
        }
    };

    const processDownloadAfterPayment = async () => {
        setPurchaseLoading(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

            // ===== MERGED DATA: download from merged API =====
            if (dataset?.mergedData && country && category) {
                // 1. Submit form for tracking
                try {
                    await fetch(`${API_URL}/api/forms/submit`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            type: 'purchase',
                            name: form.fullName,
                            email: form.email,
                            phone: form.phoneNumber,
                            datasetDetails: {
                                category: dataset.category,
                                location: dataset.location,
                                country: country,
                                totalRecords: dataset.totalRecords
                            }
                        })
                    });
                } catch (e) {
                    console.warn('Form submission failed:', e);
                }

                // 2. Fetch all data from merged API (in batches)
                let allRows = [];
                let page = 1;
                const batchSize = 5000;
                let hasMore = true;

                while (hasMore) {
                    const res = await fetch(`${API_URL}/api/merged/data?country=${countryApiCode}&category=${category}&page=${page}&limit=${batchSize}${filterState ? `&state=${encodeURIComponent(filterState)}` : ''}${filterCity ? `&city=${encodeURIComponent(filterCity)}` : ''}`);
                    const result = await res.json();
                    
                    if (result.success && result.data?.data?.length > 0) {
                        allRows = allRows.concat(result.data.data);
                        hasMore = result.data.pagination?.page < result.data.pagination?.totalPages;
                        page++;
                    } else {
                        hasMore = false;
                    }
                }

                if (allRows.length === 0) {
                    alert('No data available for download.');
                    setPurchaseLoading(false);
                    return;
                }

                // Dynamically import XLSX
                const XLSX = await import('xlsx');

                // 3. Generate Excel file
                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.json_to_sheet(allRows);
                
                // Auto-fit column widths
                const colWidths = Object.keys(allRows[0]).map(key => ({
                    wch: Math.max(key.length, 15)
                }));
                ws['!cols'] = colWidths;

                XLSX.utils.book_append_sheet(wb, ws, 'Data');
                XLSX.writeFile(wb, `${dataset.category}-${dataset.location}.xlsx`);

                alert(`Purchase Successful! Downloaded records.`);
                setIsModalOpen(false);
                setIsFormComplete(false);

                // Setup Google Ads Conversion Tracking
                if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'conversion', {
                        'send_to': 'AW-17980750879/Us-BCLTm4YMcEJ_48f1C',
                        'value': dataset?.price || 1.0,
                        'currency': 'INR',
                        'transaction_id': ''
                    });
                }
            } else {
                // ===== OLD DATA: use existing purchase API =====
                // The backend handles XLSX generation for the old API, 
                // but if we were doing it clientside, we'd import it here too.
                const response = await fetch(`${API_URL}/api/scraper/dataset/purchase`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: id,
                        ...form,
                        phoneNumber: form.phoneNumber
                    })
                });
                
                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${dataset.category}-${dataset.location}.xlsx`; 
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);

                    alert(`Purchase Successful! Downloading file...`);
                    setIsModalOpen(false);
                    setIsFormComplete(false);

                    // Setup Google Ads Conversion Tracking
                    if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'conversion', {
                            'send_to': 'AW-17980750879/Us-BCLTm4YMcEJ_48f1C',
                            'value': dataset?.price || 1.0,
                            'currency': 'INR',
                            'transaction_id': ''
                        });
                    }
                } else {
                    const result = await response.json();
                    alert(`Purchase Failed: ${result.message}`);
                }
            }
        } catch (error) {
            console.error("Purchase error:", error);
            alert("An error occurred during purchase.");
        } finally {
            setPurchaseLoading(false);
        }
    };

    useEffect(() => {
        // If we already have the initial dataset from SSR and no filters are applied, don't refetch
        if (initialDataset && !filterState && !filterCity) {
            setDataset(initialDataset);
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

                // ===== MERGED DATA: fetch by country + category =====
                if (country && category) {
                    try {
                        // Fetch sample data rows + category info in parallel
                        // Build data URL with optional state/city filters
                        let dataUrl = `${API_URL}/api/merged/data?country=${countryApiCode}&category=${category}&page=1&limit=10`;
                        if (filterState) dataUrl += `&state=${encodeURIComponent(filterState)}`;
                        if (filterCity) dataUrl += `&city=${encodeURIComponent(filterCity)}`;

                        const [dataRes, catRes] = await Promise.all([
                            fetch(dataUrl),
                            fetch(`${API_URL}/api/merged/categories?country=${countryApiCode}&limit=1000`)
                        ]);
                        
                        const dataResult = await dataRes.json();
                        const catResult = await catRes.json();

                        // Find this category's info
                        const catInfo = catResult.success && catResult.data?.categories
                            ? catResult.data.categories.find(c => c.name === category)
                            : null;

                        // Use filtered data total when state/city is set, otherwise use category total
                        const dataTotal = dataResult.data?.pagination?.total || 0;
                        const totalRecords = (filterState || filterCity) ? dataTotal : (catInfo?.records || dataTotal || 0);
                        const rows = dataResult.success ? (dataResult.data?.data || dataResult.data?.rows || []) : [];
                        const locationName = displayLabel || country.toUpperCase();
                        const categoryDisplayName = catInfo?.displayName || category.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

                        // Detect field columns from the data
                        const firstRow = rows[0] || {};
                        const columns = Object.keys(firstRow);
                        const hasEmail = catInfo?.hasEmail || columns.some(c => c.toLowerCase().includes('email'));
                        const hasPhone = catInfo?.hasPhone || columns.some(c => c.toLowerCase().includes('phone'));
                        const hasWebsite = catInfo?.hasWebsite || columns.some(c => c.toLowerCase().includes('website') || c.toLowerCase().includes('url'));
                        const hasLinkedin = catInfo?.hasLinkedin || columns.some(c => c.toLowerCase().includes('linkedin'));
                        const hasFacebook = catInfo?.hasFacebook || columns.some(c => c.toLowerCase().includes('facebook'));
                        const hasInstagram = catInfo?.hasInstagram || columns.some(c => c.toLowerCase().includes('instagram'));
                        const hasTwitter = catInfo?.hasTwitter || columns.some(c => c.toLowerCase().includes('twitter'));
                        const hasTiktok = catInfo?.hasTiktok || columns.some(c => c.toLowerCase().includes('tiktok'));
                        const hasYoutube = catInfo?.hasYoutube || columns.some(c => c.toLowerCase().includes('youtube'));

                        // Map rows to sample list format
                        const sampleList = rows.slice(0, 10).map((row, idx) => {
                            const nameCol = columns.find(c => /^(name|business|company|title)/i.test(c)) || columns[0];
                            const cityCol = columns.find(c => /^city/i.test(c));
                            const stateCol = columns.find(c => /^(state|province|region)/i.test(c));
                            const countryCol = columns.find(c => /^country/i.test(c));
                            const websiteCol = columns.find(c => /^(website|url)/i.test(c));
                            const ratingCol = columns.find(c => /^(rating|stars)/i.test(c));
                            const reviewCol = columns.find(c => /^(review|total.?review)/i.test(c));
                            
                            return {
                                name: row[nameCol] || `${categoryDisplayName} ${idx + 1}`,
                                city: cityCol ? row[cityCol] : '',
                                state: stateCol ? row[stateCol] : '',
                                country: countryCol ? row[countryCol] : locationName,
                                website: websiteCol ? row[websiteCol] : '',
                                rating: ratingCol ? row[ratingCol] : (4 + Math.random()).toFixed(1),
                                reviews: reviewCol ? row[reviewCol] : Math.floor(Math.random() * 500)
                            };
                        });

                        // Build dataset object matching the existing template
                        const mergedDataset = {
                            id: `merged-${country}-${category}`,
                            category: categoryDisplayName,
                            location: locationName,
                            totalRecords: totalRecords,
                            emailCount: hasEmail ? totalRecords : 0,
                            totalEmails: hasEmail ? totalRecords : 0,
                            phones: hasPhone ? totalRecords : 0,
                            totalPhones: hasPhone ? totalRecords : 0,
                            websiteCount: hasWebsite ? Math.floor(totalRecords * 0.7) : 0,
                            totalWebsites: hasWebsite ? Math.floor(totalRecords * 0.7) : 0,
                            linkedinCount: hasLinkedin ? Math.floor(totalRecords * 0.6) : 0, totalLinkedin: hasLinkedin ? Math.floor(totalRecords * 0.6) : 0,
                            facebookCount: hasFacebook ? Math.floor(totalRecords * 0.65) : 0, totalFacebook: hasFacebook ? Math.floor(totalRecords * 0.65) : 0,
                            instagramCount: hasInstagram ? Math.floor(totalRecords * 0.5) : 0, totalInstagram: hasInstagram ? Math.floor(totalRecords * 0.5) : 0,
                            twitterCount: hasTwitter ? Math.floor(totalRecords * 0.3) : 0, totalTwitter: hasTwitter ? Math.floor(totalRecords * 0.3) : 0,
                            tiktokCount: hasTiktok ? Math.floor(totalRecords * 0.2) : 0, totalTiktok: hasTiktok ? Math.floor(totalRecords * 0.2) : 0,
                            youtubeCount: hasYoutube ? Math.floor(totalRecords * 0.25) : 0, totalYoutube: hasYoutube ? Math.floor(totalRecords * 0.25) : 0,
                            price: catInfo?.price ? parseFloat(String(catInfo.price).replace(/[^0-9.]/g, '')) : 199,
                            previousPrice: catInfo?.previousPrice ? parseFloat(String(catInfo.previousPrice).replace(/[^0-9.]/g, '')) : 398,
                            lastUpdate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                            sampleList: sampleList,
                            countryCode: country.toUpperCase(),
                            mergedData: true
                        };

                        setDataset(enrichWithMapData(mergedDataset));
                        setLoading(false);
                        return;
                    } catch (e) {
                        console.warn("Merged data fetch failed:", e);
                    }
                }

                // ===== OLD DATA: fetch by ID =====
                if (id) {
                    try {
                        const response = await fetch(`${API_URL}/api/scraper/dataset/${id}`);
                        if (response.ok) {
                            const result = await response.json();
                            if (result.success && result.data) {
                                 setDataset(enrichWithMapData(result.data));
                                 setLoading(false);
                                 return;
                            }
                        }
                    } catch (e) {
                        console.warn("API Fetch failed, checking cache...", e);
                    }

                    // Fallback to Simulated/Session Data
                    const cachedSimulated = sessionStorage.getItem('simulatedDatasets');
                    if (cachedSimulated) {
                        const simulatedList = JSON.parse(cachedSimulated);
                        const found = simulatedList.find(s => s.id === id || s._id === id);
                        if (found) {
                            setDataset(enrichWithMapData(found));
                            setLoading(false);
                            return;
                        }
                    }
                }
                
                // If all fail:
                console.error("Dataset not found");
                setLoading(false);
            } catch (error) {
                console.error("Error fetching detail data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id, country, category, filterState, filterCity, initialDataset]);

    // Track if sample modal has been opened manually or automatically
    useEffect(() => {
        if (isSampleModalOpen && !hasAutoOpened) {
            setHasAutoOpened(true);
        }
    }, [isSampleModalOpen, hasAutoOpened]);

    // Auto-open sample popup with delay after dataset loads
    useEffect(() => {
        let timer;
        if (dataset && !loading && !isModalOpen && !hasAutoOpened) {
            timer = setTimeout(() => {
                setIsSampleModalOpen(true);
                setHasAutoOpened(true);
            }, 10000); // 10 second delay
        }
        return () => clearTimeout(timer);
    }, [dataset, loading, isModalOpen, hasAutoOpened]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading dataset details...</div>;
    }

    if (!dataset) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">Dataset not found.</div>;
    }

    return (
      
            <div className="bg-white min-h-screen font-sans text-slate-800">
            {/* --- HERO SECTION --- */}
            <div className="bg-[#05051a] text-white pt-15 pb-20 relative overflow-hidden font-sans">
                <div className="container mx-auto px-4 relative z-10">
                    {/* Breadcrumb */}
                    <div className="text-xs font-medium text-slate-400 mb-6 flex gap-2 items-center tracking-wide">
                         <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link> / 
                         <Link href="/b2b" className="hover:text-blue-400 transition-colors">B2B Database</Link> / 
                         <span className="text-slate-200">{dataset.category} in {dataset.location}</span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* LEFT CONTENT */}
                        <div className="lg:w-[60%]">
                            <h1 className="text-2xl lg:text-4xl font-bold mb-6 leading-tight">
                                List of <span className="font-bold text-blue-500">{dataset.category}</span> {displayLabel ? `in ${displayLabel}` : dataset.location.split(',').slice(-2).join(',')}
                            </h1>
                            
                            <p className="text-slate-300 text-sm md:text-base mb-8 leading-relaxed">
                                There are <strong className="text-white">{dataset.totalRecords.toLocaleString()}</strong> {dataset.category} in {dataset.location} as of {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}. 
                                Of these locations, {Math.floor(dataset.totalRecords * 0.95).toLocaleString()} {dataset.category} which is 95.89% of all {dataset.category} in {dataset.location} are single-owner operations.
                                The top three states with the most {dataset.category} are populated below. Average age of {dataset.category} in {dataset.location} is 3 years and 10 months.
                            </p>

                            {/* STATS GRID */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 mb-8 text-sm md:text-base">
                                 {/* Column 1 - Core Data */}
                                 <div className="space-y-3">
                                     <div className="flex items-center gap-3">
                                         <FaCheckCircle className="text-green-500 shrink-0"/>
                                         <span className="font-bold text-white text-[18px]">{dataset.totalRecords.toLocaleString()}</span>
                                         <span className="text-slate-300">Number of {dataset.category}</span>
                                     </div>
                                     <div className="flex items-center gap-3">
                                         <FaCheckCircle className="text-green-500 shrink-0"/>
                                         <span className="font-bold text-white text-[18px]">{(dataset.emailCount || dataset.totalEmails || 0).toLocaleString()}</span>
                                         <span className="text-slate-300 hover:text-white cursor-pointer hover:underline decoration-slate-500 underline-offset-4">Email Addresses</span>
                                     </div>
                                     <div className="flex items-center gap-3">
                                         <FaCheckCircle className="text-green-500 shrink-0"/>
                                         <span className="font-bold text-white text-[18px]">{(dataset.phones || dataset.totalPhones || 0).toLocaleString()}</span>
                                         <span className="text-slate-300 hover:text-white cursor-pointer hover:underline decoration-slate-500 underline-offset-4">Phone Numbers</span>
                                     </div>
                                     <div className="flex items-center gap-3">
                                         <FaCheckCircle className="text-green-500 shrink-0"/>
                                         <span className="font-bold text-white text-[18px]">{(dataset.websiteCount || dataset.totalWebsites || 0).toLocaleString()}</span>
                                         <span className="text-slate-300 hover:text-white cursor-pointer hover:underline decoration-slate-500 underline-offset-4">With Websites</span>
                                     </div>
                                     <div className="flex items-center gap-3">
                                         <FaCheckCircle className="text-green-500 shrink-0"/>
                                         <span className="font-bold text-white text-[18px]">{(dataset.linkedinCount || dataset.totalLinkedin || 0).toLocaleString()}</span>
                                         <span className="text-slate-300 hover:text-white cursor-pointer hover:underline decoration-slate-500 underline-offset-4">LinkedIn Profiles</span>
                                     </div>
                                 </div>

                                 {/* Column 2 - Social Media */}
                                 <div className="space-y-3">
                                     <div className="flex items-center gap-3">
                                         <FaCheckCircle className="text-green-500 shrink-0"/>
                                         <span className="font-bold text-white text-[18px]">{(dataset.facebookCount || dataset.totalFacebook || 0).toLocaleString()}</span>
                                         <span className="text-slate-300 hover:text-white cursor-pointer hover:underline decoration-slate-500 underline-offset-4">Facebook Profiles</span>
                                     </div>
                                     <div className="flex items-center gap-3">
                                         <FaCheckCircle className="text-green-500 shrink-0"/>
                                         <span className="font-bold text-white text-[18px]">{(dataset.instagramCount || dataset.totalInstagram || 0).toLocaleString()}</span>
                                         <span className="text-slate-300 hover:text-white cursor-pointer hover:underline decoration-slate-500 underline-offset-4">Instagram Handles</span>
                                     </div>
                                     <div className="flex items-center gap-3">
                                         <FaCheckCircle className="text-green-500 shrink-0"/>
                                         <span className="font-bold text-white text-[18px]">{(dataset.twitterCount || dataset.totalTwitter || 0).toLocaleString()}</span>
                                         <span className="text-slate-300 hover:text-white cursor-pointer hover:underline decoration-slate-500 underline-offset-4">X Handles</span>
                                     </div>
                                     <div className="flex items-center gap-3">
                                         <FaCheckCircle className="text-green-500 shrink-0"/>
                                         <span className="font-bold text-white text-[18px]">{(dataset.tiktokCount || dataset.totalTiktok || 0).toLocaleString()}</span>
                                         <span className="text-slate-300 hover:text-white cursor-pointer hover:underline decoration-slate-500 underline-offset-4">TikTok Profiles</span>
                                     </div>
                                     <div className="flex items-center gap-3">
                                         <FaCheckCircle className="text-green-500 shrink-0"/>
                                         <span className="font-bold text-white text-[18px]">{(dataset.youtubeCount || dataset.totalYoutube || 0).toLocaleString()}</span>
                                         <span className="text-slate-300 hover:text-white cursor-pointer hover:underline decoration-slate-500 underline-offset-4">YouTube Channels</span>
                                     </div>
                                 </div>
                            </div>

                            <p className="text-blue-400 text-xs font-semibold mb-6">
                                Data updated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>

                            {/* PRICE & BUTTONS */}
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                <div>
                                    <div className="flex items-end gap-3 mb-4">
                                        {(() => {
                                            const p = dataset.price || 199;
                                            const pp = dataset.previousPrice || 398;
                                            const formatPrice = (val) => String(val).startsWith('$') ? val : `$${val}`;
                                            const priceVal = String(p).replace(/[^0-9.]/g, '');
                                            const prevVal = String(pp).replace(/[^0-9.]/g, '');
                                            // Calculate discount if both are parseable numbers
                                            const discount = (priceVal && prevVal) 
                                                ? Math.round(((parseFloat(prevVal) - parseFloat(priceVal)) / parseFloat(prevVal)) * 100)
                                                : 50;
                                            
                                            return (
                                                <>
                                                    <span className="text-4xl font-extrabold text-blue-500">{formatPrice(p)}</span>
                                                    <span className="text-xl text-slate-500 line-through font-medium mb-1">{formatPrice(pp)}</span>
                                                    <span className="text-white text-xl mb-1">(Holiday Discount: {discount}% OFF)</span>
                                                </>
                                            );
                                        })()}
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => setIsModalOpen(true)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded font-bold flex items-center gap-2 transition uppercase tracking-wide cursor-pointer"
                                        >
                                            <FaDownload /> Purchase Lead List
                                        </button>
                                        <button 
                                            onClick={() => setIsSampleModalOpen(true)}
                                            className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-3.5 rounded font-bold flex items-center gap-2 transition uppercase tracking-wide border border-white cursor-pointer"
                                        >
                                            <FaDownload /> Free Sample Lead List
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT CONTENT (VIDEO) */}
                        <div className="lg:w-[40%] mt-8 lg:mt-0">
                            <div className="rounded-xl overflow-hidden shadow-2xl ">
                                {/* Simulated YouTube Embed */}
                                <img src="/images/b2b-hero.png" alt="Hero banner" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             {/* Logo Bar */}
            <div className="bg-[#0f2a5a] py-6 border-b border-white/10">
                <div className="container mx-auto px-4 flex justify-between items-center opacity-40 grayscale filter gap-8 overflow-x-auto">
                    {/* Reusing logos or placeholders */}
                     <span className="text-white font-bold text-xl">Walmart</span>
                     <span className="text-white font-bold text-xl">JLL</span>
                     <span className="text-white font-bold text-xl">Citi</span>
                     <span className="text-white font-bold text-xl">KPMG</span>
                     <span className="text-white font-bold text-xl">Kroger</span>
                </div>
            </div>

            {/* --- DATA TABLE SECTION --- */}
            <div className="bg-[#0a1f44] py-16">
                 <div className="container mx-auto px-4">
                     <div className="text-center mb-10">
                         <h2 className="text-2xl font-bold text-white">List of {dataset.category} in {dataset.location}</h2>
                         <p className="text-slate-400 text-sm mt-2">A preview of the data fields included in the downloaded list.</p>
                     </div>

                     <div className="bg-white rounded-lg overflow-hidden shadow-2xl overflow-x-auto">
                         <table className="w-full text-left text-xs md:text-sm">
                             <thead className="bg-blue-50 text-blue-900 font-bold uppercase border-b border-blue-100">
                                 <tr>
                                     <th className="p-3 whitespace-nowrap">Name</th>
                                     <th className="p-3 whitespace-nowrap">Address</th>
                                     <th className="p-3 whitespace-nowrap">City</th>
                                     <th className="p-3 whitespace-nowrap">State/Province</th>
                                     <th className="p-3 whitespace-nowrap">Country</th>
                                     <th className="p-3 whitespace-nowrap">Website</th>
                                     <th className="p-3 whitespace-nowrap">Email</th>
                                     <th className="p-3 whitespace-nowrap">Phone</th>
                                     <th className="p-3 whitespace-nowrap">Rating</th>
                                     <th className="p-3 whitespace-nowrap">Reviews</th>
                                     <th className="p-3 whitespace-nowrap text-center">Action</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 {dataset.sampleList.map((row, idx) => (
                                     <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition">
                                         <td className="p-3 font-medium text-slate-700">{row.name}</td>
                                         <td className="p-3 text-slate-500 flex items-center gap-1 overflow-hidden text-ellipsis max-w-[200px]"><MdLocationOn className='text-blue-500 shrink-0'/>{'Avaliable'}</td>
                                         <td className="p-3 text-slate-500">{row.city}</td>
                                         <td className="p-3 text-slate-500">{row.state}</td>
                                         <td className="p-3 text-slate-500">{row.country}</td>
                                         <td className="p-3 text-slate-500 max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">
                                            {row.website ? (
                                                <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="text-blue-600 hover:underline flex items-center gap-1">
                                                    <FaGlobe className="shrink-0 text-xs"/> {'Available'}
                                                </a>
                                            ) : '--'}
                                         </td>
                                         <td className="p-3 text-slate-500 flex items-center gap-1 overflow-hidden text-ellipsis max-w-[200px]"><MdEmail className="text-blue-300 shrink-0"/> {'Available'}</td>
                                         <td className="p-3 text-slate-500"><span className="flex items-center gap-1"><MdPhone className="text-green-500 shrink-0"/> {'Available'}</span></td>
                                         <td className="p-3 text-slate-500">{row.rating}</td>
                                         <td className="p-3 text-slate-500">{row.reviews}</td>
                                         <td className="p-3 text-center">
                                             <FaLock className="inline text-slate-300" />
                                         </td>
                                     </tr>
                                 ))}
                             </tbody>
                         </table>
                         <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
                             <div className="flex gap-4 justify-center">
                                <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-blue-600 text-white px-6 py-2 rounded text-sm font-bold shadow-md hover:bg-blue-700 transition cursor-pointer">
                                    <FaDownload className="inline mr-2"/> Download Full List
                                </button>
                                 <button
                                 onClick={() => setIsSampleModalOpen(true)}
                                 className="bg-white border border-slate-300 text-slate-700 px-6 py-2 rounded text-sm font-bold hover:bg-slate-50 transition cursor-pointer">
                                    Request Sample
                                </button>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>

            {/* --- VALUE PROPOSITION SECTION --- */}
            <div className="py-20 pb-0 bg-white">
                <div className="container mx-auto px-4">
                    <div className="mb-12 text-left">
                        <h2 className="text-2xl lg:text-2xl font-bold text-slate-900 mb-4">How DataSellerHub Data Services Helps Businesses</h2>
                        <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-4xl">Explore the strategic advantages of our data scraping solutions for your business.</p>
                    </div>
                    
                    <div className="text-left space-y-8 max-w-auto mb-16">
                        <div>
                            <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 block border-none pb-0">Find the Best {dataset.category} in {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()} | Verified Business Directory</h3>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed">Are you searching for a reliable partner to handle your business needs? Identifying the right <strong>{dataset.category}</strong> in <strong>{displayLabel || dataset.location.split(',').slice(-2).join(',').trim()}</strong> is the first step toward successful product development and innovation. Our comprehensive database offers an exhaustive list of {dataset.category} currently operating across {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()}, providing you with the exact contact points needed to move your project forward.</p>
                        </div>
                        
                        <div>
                            <h4 className="text-lg lg:text-xl font-bold text-slate-900 mb-3">Why Choose {dataset.category} in {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()}?</h4>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed">The landscape for {dataset.category} is evolving rapidly. By focusing your search on {dataset.category} within {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()}, you gain access to high-tier engineering talent and advanced additive manufacturing technologies. The {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()} market is known for its strict quality controls, making {dataset.category} in this region some of the most dependable in the global market.</p>
                        </div>
                        
                        <div>
                            <h4 className="text-lg lg:text-xl font-bold text-slate-900 mb-3">Why DataSellerHub is Your Trusted Source for {dataset.category} Data</h4>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">When it comes to sourcing a list of {dataset.category} in {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()}, data accuracy is paramount. DataSellerHub stands out as the industry leader for several reasons:</p>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm md:text-base leading-relaxed">
                                <li><strong>Verified Authenticity:</strong> Unlike automated scrapers, DataSellerHub ensures that every entry for {dataset.category} in {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()} is verified for accuracy, reducing bounce rates in your outreach.</li>
                                <li><strong>Deep Market Insight:</strong> We don&apos;t just provide names; our {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()} report offers deep insights into the operational scale of these {dataset.category}.</li>
                                <li><strong>Frequent Updates:</strong> The {dataset.category} sector in {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()} changes fast. DataSellerHub refreshes its database regularly to reflect new company formations and contact changes.</li>
                                <li><strong>Compliance Guaranteed:</strong> Our data collection for {dataset.category} in {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()} follows all local data protection regulations, ensuring your marketing remains ethical and legal.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg lg:text-xl font-bold text-slate-900 mb-3">Strategic Benefits of our {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()} {dataset.category} Report</h4>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">Acquiring our detailed report on {dataset.category} in {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()} allows your business to:</p>
                            <ol className="list-decimal pl-6 space-y-2 text-slate-600 text-sm md:text-base leading-relaxed">
                                <li><strong>Accelerate Procurement:</strong> Instantly find {dataset.category} in {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()} that match your specific material requirements (Resin, Metal, Carbon Fiber).</li>
                                <li><strong>Competitor Analysis:</strong> Map out where the top {dataset.category} are located throughout {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()} to identify market gaps.</li>
                                <li><strong>Direct Outreach:</strong> Connect directly with decision-makers at {dataset.category} across {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()} without gatekeepers.</li>
                            </ol>
                        </div>

                        <div>
                            <h4 className="text-lg lg:text-xl font-bold text-slate-900 mb-3">Maximize Your ROI in the {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()} Market</h4>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">Investing in a high-quality list of {dataset.category} is an investment in your company&apos;s growth. Whether you are selling software to {dataset.category} or looking to outsource your production to {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()}, our data provides the foundation for success.</p>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">Stop wasting time with outdated spreadsheets. Trust DataSellerHub to provide the most authentic, up-to-date, and actionable list of {dataset.category} in {displayLabel || dataset.location.split(',').slice(-2).join(',').trim()} available on the market today.</p>
                            <div><button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm md:text-base font-bold transition uppercase tracking-wide cursor-pointer shadow-lg shadow-blue-500/20 inline-flex items-center gap-2">Get Instant Access to the {dataset.category} Report</button></div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm mb-6 text-2xl text-blue-600">
                                <FaEnvelope />
                            </div>
                            <h3 className="font-bold text-lg mb-3">Re-target Your Email Campaigns</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Our verified lists ensure high deliverability rates. Reach the right inbox at the right time. Segment your lists and personalize content for maximum engagement and conversion.
                            </p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm mb-6 text-2xl text-purple-600">
                                <FaLock />
                            </div>
                            <h3 className="font-bold text-lg mb-3">Master Your Cold Calling Impact</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Avoid gatekeepers with direct dial numbers. Our data includes key decision-maker information, empowering your sales team to have more meaningful conversations.
                            </p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm mb-6 text-2xl text-green-600">
                                <FaMapMarkerAlt />
                            </div>
                            <h3 className="font-bold text-lg mb-3">Hack Your Direct Mail Campaigns</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Physical mail is making a comeback. Use our precise address data to send physical offers, samples, or brochures directly to business locations in specific regions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- COUNTRY MAP SECTION --- */}
            {dataset.stateDistribution && Object.keys(dataset.stateDistribution).length > 0 && (
                <CountryMapSection
                    category={dataset.category}
                    location={dataset.location}
                    countryCode={dataset.countryCode}
                    stateDistribution={dataset.stateDistribution}
                    totalRecords={dataset.totalRecords}
                />
            )}

            {/* --- STATS SECTION --- */}
            <div className="py-16 bg-slate-50">
                 <div className="container mx-auto px-4 border-b border-slate-200 pb-16">
                     <div className="text-center mb-12">
                         <h2 className="text-2xl font-bold">How many List of {dataset.category} are there in the {dataset.location}?</h2>
                         <p className="text-slate-500 mt-2">There are a total of {dataset.totalRecords} {dataset.category} stores in {dataset.location} as of {dataset.lastUpdate}.</p>
                         
                         <div className="mt-8 flex justify-center gap-4">
                             <button className="bg-blue-600 text-white px-6 py-2 rounded font-bold text-sm cursor-pointer" onClick={() => setIsModalOpen(true)}>Buy Full Dataset</button>
                             <button className="bg-slate-800 text-white px-6 py-2 rounded font-bold text-sm flex items-center gap-2 cursor-pointer" onClick={() => setIsSampleModalOpen(true)}><FaDownload/> Download Sample</button>
                         </div>
                     </div>
                     
                     <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                            <div className="text-blue-600 text-4xl mb-4 flex justify-center"><FaPhone/></div>
                            <h4 className="font-bold text-slate-700 mb-2">Number of phone numbers in the list</h4>
                            <div className="text-5xl font-black text-slate-800 mb-4">{(dataset.phones || dataset.totalPhones || 0).toLocaleString()}</div>
                            <button className="text-xs uppercase font-bold border border-slate-300 px-4 py-1 rounded text-slate-500">View Data Availability</button>
                        </div>
                         <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                            <div className="text-blue-600 text-4xl mb-4 flex justify-center"><MdEmail/></div>
                            <h4 className="font-bold text-slate-700 mb-2">Number of email addresses in the list</h4>
                            <div className="text-5xl font-black text-slate-800 mb-4">{(dataset.emailCount || dataset.totalEmails || 0).toLocaleString()}</div>
                            <button className="text-xs uppercase font-bold border border-slate-300 px-4 py-1 rounded text-slate-500">View Data Availability</button>
                        </div>
                     </div>

                     <div className="mt-12 flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
                         <div className="flex-1 bg-linear-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white relative overflow-hidden">
                             <div className="relative z-10">
                                 <h4 className="font-bold mb-1">Store Owner</h4>
                                 <p className="text-sm opacity-80">Available</p>
                             </div>
                             <FaUser className="absolute bottom-4 right-4 text-6xl opacity-20" />
                         </div>
                          <div className="flex-1 bg-linear-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white relative overflow-hidden">
                             <div className="relative z-10">
                                 <h4 className="font-bold mb-1">Facility Owner</h4>
                                 <p className="text-sm opacity-80">Available</p>
                             </div>
                             <FaBuilding className="absolute bottom-4 right-4 text-6xl opacity-20" />
                         </div>
                     </div>
                 </div>

                 {/* Unlock Monthly Insights */}
                 <div className="container mx-auto px-4 py-16 pb-0 text-center">
                     <h2 className="text-2xl font-bold mb-8">Unlock Monthly Insights for Market Analysis and Explosive Growth</h2>
                     <div className="space-y-4 max-w-2xl mx-auto">
                         <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-sm font-medium text-slate-600">
                             Unlock data on new clothing stores opening near you every 30 days.
                         </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-sm font-medium text-slate-600">
                             Track competitors and analyze market saturation in real-time.
                         </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-sm font-medium text-slate-600">
                             Leverage predictive analytics to forecast trend shifts in your locale.
                         </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-sm font-medium text-slate-600">
                             Gain competitive edge with up-to-date contact information.
                         </div>
                     </div>
                 </div>
            </div>

            {/* --- SPECIAL FEATURES --- */}
            <div className="bg-blue-50/50 py-16 pt-0">
                 <div className="container mx-auto px-4">
                     <div className="text-center mb-10">
                         <h2 className="text-2xl font-bold">Special Features</h2>
                     </div>
                     <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl flex items-center gap-4 shadow-sm">
                            <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><FaCheckCircle/></div>
                            <div className="text-xs font-bold text-slate-600">Verified Email & Phone</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl flex items-center gap-4 shadow-sm">
                            <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><FaChartLine/></div>
                            <div className="text-xs font-bold text-slate-600">Historical Data Available</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl flex items-center gap-4 shadow-sm">
                            <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><FaGlobe/></div>
                            <div className="text-xs font-bold text-slate-600">Global Coverage Options</div>
                        </div>
                     </div>
                 </div>
            </div>
            <div>
                <WhyChoose />
            </div>

            {/* --- DYNAMIC FAQ SECTION --- */}
            <DatasetFaq dataset={dataset} />
            
            {/* Reusing existing footer or relying on Layout for Footer */}
            {/* --- PURCHASE MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
                        {/* Close button */}
                        <button 
                            onClick={() => { setIsModalOpen(false); setIsFormComplete(false); }}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
                        >
                            <FaTimes className="text-xl" />
                        </button>

                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center gap-2 text-slate-900 font-bold text-2xl">
                                {/* <div className="w-8 h-8 bg-gradient-to-tr from-orange-400 to-purple-600 rounded-full flex items-center justify-center">
                                    <div className="w-4 h-4 bg-white rounded-full"></div>
                                </div> */}
                                <img src="/images/logo.png" alt="logo" className='w-10 ' />
                                Business Data Labs
                            </div>
                        </div>

                        {/* Title */}
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                Purchase lead list of <span className="text-blue-600">{dataset.category}</span> in <span className="text-blue-600">{dataset.location}</span> ({dataset.price})
                            </h3>
                            <p className="text-slate-500 text-sm">Fill in the below details</p>
                        </div>

                        {/* Form */}
                        {!isFormComplete ? (
                            <form onSubmit={handleStripeCheckout} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="fullName"
                                        required
                                        value={form.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Full Name"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        required
                                        value={form.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <PhoneInputField
                                        value={form.phoneNumber}
                                        onChange={handleInputChange}
                                        name="phoneNumber"
                                        label="Phone Number"
                                        required={true}
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full mt-6 bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition shadow-xl shadow-slate-900/20 group cursor-pointer"
                                >
                                    <div className="w-8 h-8 bg-slate-700/50 rounded flex items-center justify-center group-hover:bg-slate-700 transition">
                                        <FaShoppingCart className="text-sm" />
                                    </div>
                                    PROCEED TO PAYMENT
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <div className="text-center py-8">
                                    <div className="inline-block animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
                                    <p className="text-slate-600 font-bold">Redirecting to Secure Checkout...</p>
                                    <p className="text-sm text-slate-500">Please wait while we transfer you to Stripe.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- SAMPLE REQUEST MODAL --- */}
            {isSampleModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
                        {/* Close button */}
                        <button 
                            onClick={() => setIsSampleModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
                        >
                            <FaTimes className="text-xl" />
                        </button>

                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center gap-2 text-slate-900 font-bold text-2xl">
                                <img src="/images/logo.png" alt="logo" className='w-10 ' />
                                Business Data Labs
                            </div>
                        </div>

                        {/* Title */}
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                Free sample lead list of <span className="text-blue-600">{dataset.category}</span> in <span className="text-blue-600">{dataset.location}</span>
                            </h3>
                            <p className="text-slate-500 text-sm">Fill in the below details</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSampleDownload} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    value={sampleForm.fullName}
                                    onChange={handleSampleChange}
                                    placeholder="Full Name"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    value={sampleForm.email}
                                    onChange={handleSampleChange}
                                    placeholder="Email Address"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <div>
                                <PhoneInputField
                                    value={sampleForm.phoneNumber}
                                    onChange={handleSampleChange}
                                    name="phoneNumber"
                                    label="Phone Number"
                                    required={true}
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={purchaseLoading}
                                className="w-full mt-6 bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition shadow-xl shadow-slate-900/20 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {purchaseLoading ? (
                                    <span>Processing...</span>
                                ) : (
                                    <>
                                    <div className="w-8 h-8 bg-slate-700/50 rounded flex items-center justify-center group-hover:bg-slate-700 transition">
                                        <FaDownload className="text-sm" />
                                    </div>
                                    DOWNLOAD SAMPLE
                                    </>
                                )} 
                            </button>
                        </form>
                    </div>
                </div>
            )}
            </div>
        
    );
};

export default B2bDatasetDetail;
