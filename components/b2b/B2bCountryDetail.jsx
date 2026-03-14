'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaGlobe, FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import WhyChoose from '../WhyChoose';

import { getCountryData } from '../../data/countryStates';
import staticCategories from '../../data/categories.json';

const B2bCountryDetail = ({ countrySlug }) => {
    const router = useRouter();
    const [countryName, setCountryName] = useState('');
    const [states, setStates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAllStates, setShowAllStates] = useState(false);
    const [checkingState, setCheckingState] = useState(null); // Track which state is being checked
    const [searchTerm, setSearchTerm] = useState('');

    // Initial Data Fetching
    useEffect(() => {
        const fetchData = async () => {
             setLoading(true);
            try {
                // 1. Get Country Name from Slug
                const formattedCountryName = decodeURIComponent(countrySlug).replace(/-/g, ' ');
                setCountryName(formattedCountryName);

                // 2. Show states INSTANTLY from static data (no network wait)
                const staticCountry = getCountryData(formattedCountryName);
                if (staticCountry) {
                    setStates(staticCountry.states.map((name, i) => ({ name, isoCode: `S${i}` })));
                    setLoading(false); // Unblock UI immediately
                }

                // 3. Show categories INSTANTLY from static JSON (first 48 items)
                if (staticCategories && staticCategories.length > 0) {
                    setCategories(staticCategories.slice(0, 48));
                }

                // 4. Fetch categories and API states in PARALLEL
                const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
                const countryCodeToUse = staticCountry ? staticCountry.code : 'US';
                const [catRes, statesRes] = await Promise.all([
                    fetch(`${API_URL}/api/merged/categories?country=${countryCodeToUse}&limit=200`),
                    fetch(`${API_URL}/api/location/states?country=${encodeURIComponent(formattedCountryName)}`)
                ]);

                const catResult = await catRes.json();
                if (catResult.success && catResult.data) {
                    if (catResult.data.categories) {
                        setCategories(catResult.data.categories);
                    } else if (Array.isArray(catResult.data)) {
                        setCategories(catResult.data);
                    }
                }

                const statesResult = await statesRes.json();
                if (statesResult.success && statesResult.data?.length > 0) {
                    setStates(statesResult.data); // Replace with richer API data
                }

            } catch (error) {
                console.error("Error loading country details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (countrySlug) {
            fetchData();
        }
    }, [countrySlug]);

    // Handle State Click
    const handleStateClick = async (stateName) => {
        setCheckingState(stateName);
        try {
            // Check if there is data for this state
            const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
            const response = await fetch(`${API_URL}/api/scraper/dataset/search?country=${encodeURIComponent(countryName)}&state=${encodeURIComponent(stateName)}`);
            const result = await response.json();

            if (result.success && result.datasets && result.datasets.length > 0) {
                // Found specific data, go to the first dataset (most relevant)
                const datasetId = result.datasets[0].id;
                const label = result.datasets[0].location || `${stateName}, ${countryName}`;
                router.push(`/dataset-detail?id=${datasetId}&label=${encodeURIComponent(label)}`);
            } else {
                // No specific dataset found, fall back to general search
                router.push(`/b2b-database?country=${encodeURIComponent(countryName)}&state=${encodeURIComponent(stateName)}`);
            }
        } catch (error) {
            console.error("Error checking state data:", error);
            // Fallback on error
            router.push(`/b2b-database?country=${encodeURIComponent(countryName)}&state=${encodeURIComponent(stateName)}`);
        } finally {
            setCheckingState(null);
        }
    };

    // Capitalize for display
    const displayName = countryName.replace(/\b\w/g, l => l.toUpperCase());
    const countryCodeData = getCountryData(displayName);
    const countryCode = countryCodeData ? countryCodeData.code.toUpperCase() : '';

    return (
        <div className="bg-white min-h-screen font-sans text-slate-800">
            {/* HERO SECTION */}
            <div className="relative bg-[#030e21] text-white pt-16 pb-20 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* LEFT CONTENT */}
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <div className="text-xs font-semibold text-blue-400 mb-4 tracking-wider uppercase">
                                <Link href="/" className="hover:text-blue-300 transition">Home</Link> / <Link href="/b2b-database" className="hover:text-blue-300 transition">B2B Database</Link> / {displayName}
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                                    {displayName}
                                </span> <br className="hidden lg:block"/> Business Reports
                            </h1>
                            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Access comprehensive B2B leads, verified company data, and market insights for {displayName}. 
                                Drill down by state or explore top industry categories to fuel your growth.
                            </p>
                            
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                                    <FaGlobe className="text-blue-400" />
                                    <span className="text-sm font-medium">{states.length} States Covered</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                                    <FaChevronDown className="text-emerald-400" />
                                    <span className="text-sm font-medium">{categories.length}+ Industries</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CONTENT (Vector/Image) */}
                        <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
                            {/* Decorative blobs */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
                            <div className="absolute bottom-0 left-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl -z-10"></div>
                            
                            <img 
                                src="/images/b2b-loc.png" 
                                alt={`${displayName} Business Data`} 
                                className="max-w-full h-80 drop-shadow-lg animate-in slide-in-from-right duration-700 opacity-90 transition-opacity mix-blend-screen pointer-events-none select-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* --- SECTION 1: STATES (Collapsible) --- */}
                <div className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900">
                        Business Leads by State in <span className="text-blue-600">{displayName}</span>
                    </h2>

                    {loading ? (
                        <div className="text-center py-8">Loading states...</div>
                    ) : states.length > 0 ? (
                        <div className="max-w-5xl mx-auto">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {(showAllStates ? states : states.slice(0, 12)).map((state, idx) => (
                                    <div 
                                        key={idx} 
                                        onClick={() => handleStateClick(state.name)}
                                        className={`flex items-center gap-2 p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition group cursor-pointer ${checkingState === state.name ? 'opacity-70 pointer-events-none' : ''}`}
                                    >
                                        {checkingState === state.name ? (
                                            <div className="w-2 h-2 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"></div>
                                        ) : (
                                            <span className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors"></span>
                                        )}
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 truncate">{state.name}</span>
                                    </div>
                                ))}
                            </div>

                            {states.length > 12 && (
                                <div className="text-center mt-8">
                                    <button 
                                        onClick={() => setShowAllStates(!showAllStates)}
                                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
                                    >
                                        {showAllStates ? (
                                            <>Show Less <FaChevronUp /></>
                                        ) : (
                                            <>Show All {states.length} States <FaChevronDown /></>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                         <div className="text-center text-slate-500 italic">No state data available for this country.</div>
                    )}
                </div>

                {/* --- SECTION 2: DOMAINS (Categories) --- */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900">
                        Find B2B Leads In <span className="text-blue-600">{displayName}</span> Across Different Domains
                    </h2>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto mb-10 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder={`Search ${categories.length} categories...`}
                            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:placeholder-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-8">
                        {categories
                            .filter(cat => {
                                const catName = cat.displayName || cat.name || '';
                                return catName.toLowerCase().includes(searchTerm.toLowerCase());
                            })
                            .map((cat, idx) => {
                             // Random number simulation for "social proof" feel, or could use real counts if available
                            const randomNum = Math.floor(Math.random() * 5000) + 1000; 
                            const catDisplayName = cat.displayName || cat.name;
                            const categorySlug = cat.displayName ? cat.name : (cat.name || '').replace(/\s+/g, '_');
                            const targetHref = countryCode 
                                ? `/b2b-database/leads-list-of-${categorySlug}-in-${displayName.toLowerCase().replace(/\s+/g, '-')}`
                                : `/b2b-database?country=${encodeURIComponent(displayName)}&category=${encodeURIComponent(catDisplayName)}`;
                                
                            return (
                                <Link 
                                    key={idx}
                                    href={targetHref}
                                    className="flex items-start gap-2 text-slate-500 hover:text-blue-600 transition group text-[14px]"
                                >
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-slate-400 group-hover:bg-blue-500 rounded-full shrink-0"></span>
                                    <span className="font-medium">
                                        {catDisplayName} Leads in {displayName}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div>
                <WhyChoose />
            </div>
        </div>
    );
};

export default B2bCountryDetail;
