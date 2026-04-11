'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaFilter, FaCheckCircle, FaGlobe, FaDatabase, FaEnvelope, FaPhone, FaArrowRight, FaChartLine, FaUserFriends, FaBuilding, FaStar, FaTimes, FaUser, FaDownload } from 'react-icons/fa';
import { MdEmail, MdPhone, MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';
import SearchableDropdown from '../ui/SearchableDropdown';
import staticCategories from '../../data/categories.json';
import { countryCodes } from '../../utils/countryCodes';
import PhoneInputField from '../ui/PhoneInputField';

// Skeleton Loader Component for the Table
const TableSkeleton = () => (
    <div className="overflow-x-auto">
        <table className="table-dark">
            <thead>
                <tr>
                    <th>Name</th>
                    <th className="text-center">Records</th>
                    <th className="text-center">Emails</th>
                    <th className="text-center">Phones</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {[...Array(5)].map((_, i) => (
                    <tr key={i}>
                        <td><div className="h-5 rounded w-3/4 mb-2 animate-shimmer" style={{ background: 'var(--bg-elevated)' }}></div><div className="h-3 rounded w-1/2 animate-shimmer" style={{ background: 'var(--bg-elevated)' }}></div></td>
                        <td className="text-center"><div className="h-4 rounded w-16 mx-auto animate-shimmer" style={{ background: 'var(--bg-elevated)' }}></div></td>
                        <td className="text-center"><div className="h-4 rounded w-12 mx-auto animate-shimmer" style={{ background: 'var(--bg-elevated)' }}></div></td>
                        <td className="text-center"><div className="h-4 rounded w-12 mx-auto animate-shimmer" style={{ background: 'var(--bg-elevated)' }}></div></td>
                        <td className="text-right"><div className="h-8 rounded w-48 ml-auto animate-shimmer" style={{ background: 'var(--bg-elevated)' }}></div></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const B2bdatabase = ({ isSeoPage = false, initialFilters = {} }) => {
    const [datasets, setDatasets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
    const [selectedDatasetForSample, setSelectedDatasetForSample] = useState(null);
    const [purchaseLoading, setPurchaseLoading] = useState(false);
    const [phoneCode, setPhoneCode] = useState('');
    const [samplePhoneCode, setSamplePhoneCode] = useState('');
    const [sampleForm, setSampleForm] = useState({ fullName: '', email: '', phoneNumber: '' });

    const [categories, setCategories] = useState(staticCategories || []);
    const [mergedCats, setMergedCats] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [filters, setFilters] = useState({
        category: initialFilters.category || '',
        country: initialFilters.country || 'United States',
        state: initialFilters.state || '',
        city: initialFilters.city || ''
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCategories, setTotalCategories] = useState(0);
    const ITEMS_PER_PAGE = 20;

    const handleSampleChange = (e) => {
        const { name, value } = e.target;
        setSampleForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSampleDownload = async (e) => {
        e.preventDefault();
        const isPhoneValid = sampleForm.phoneNumber && sampleForm.phoneNumber.replace(/\D/g, '').length >= 8;
        if (!sampleForm.fullName.trim() || !sampleForm.email.trim() || !isPhoneValid) {
            alert("Please fill in all required fields (Name, Email, and a valid Phone number).");
            return;
        }
        setPurchaseLoading(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

            // 1. Submit tracking form (fire-and-forget)
            fetch(`${API_URL}/api/forms/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'sample_request', name: sampleForm.fullName,
                    email: sampleForm.email, phone: sampleForm.phoneNumber,
                    datasetDetails: {
                        ...selectedDatasetForSample,
                        country: selectedDatasetForSample.countryName,
                        state: selectedDatasetForSample.stateName,
                        city: selectedDatasetForSample.cityName,
                    },
                    source: window.location.hostname,
                })
            }).catch(error => { console.error("Error submitting sample request:", error); });

            // 2. Try backend download-sample (serves unmasked manual samples)
            const countryCode = selectedDatasetForSample?.countryCode || 'US';
            const categorySlug = selectedDatasetForSample?.categorySlug || 'business';
            const downloadUrl = `${API_URL}/api/merged/download-sample?country=${countryCode}&category=${encodeURIComponent(categorySlug)}`;
            
            const response = await fetch(downloadUrl);
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${selectedDatasetForSample?.name?.replace(/ /g, '_') || 'Sample'}_Leads.csv`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } else {
                // Fallback: Generate masked Excel from /api/merged/data
                const XLSX = await import('xlsx');
                let dataUrl = `${API_URL}/api/merged/data?country=${countryCode}&category=${encodeURIComponent(categorySlug)}&page=1&limit=5`;
                if (selectedDatasetForSample?.stateName) dataUrl += `&state=${encodeURIComponent(selectedDatasetForSample.stateName)}`;
                if (selectedDatasetForSample?.cityName) dataUrl += `&city=${encodeURIComponent(selectedDatasetForSample.cityName)}`;
                let rows = [];
                try { const dataRes = await fetch(dataUrl); const dataResult = await dataRes.json(); if (dataResult.success) rows = dataResult.data?.data || dataResult.data?.rows || []; } catch (e) { console.error("Fallback fetch failed:", e); }
                const getCol = (cols, pattern) => cols.find(c => pattern.test(c));
                const exportData = (rows.length > 0 ? rows : Array(5).fill(null)).map((row, i) => {
                    if (!row) return { "Business Name": `${selectedDatasetForSample?.category || "Business"} ${i + 1}`, "Address": "Available in Full List", "City": selectedDatasetForSample?.displayLoc?.split(',')[0] || "City", "State": "State", "Country": "Country", "Phone": "Available in Full List (Verified)", "Email": "Available in Full List (Verified)", "Website": "--", "Rating": (4 + Math.random()).toFixed(1), "Reviews": Math.floor(Math.random() * 500) };
                    const cols = Object.keys(row); const nameCol = getCol(cols, /^(name|business|company|title)/i) || cols[0];
                    return { "Business Name": row[nameCol] || `Business ${i+1}`, "Address": "Available in Full List", "City": row[getCol(cols, /^city/i)] || "City", "State": row[getCol(cols, /^(state|province)/i)] || "State", "Country": row[getCol(cols, /^country/i)] || "Country", "Phone": "Available in Full List (Verified)", "Email": "Available in Full List (Verified)", "Website": row[getCol(cols, /^(website|url)/i)] || "--", "Rating": row[getCol(cols, /^(rating|stars)/i)] || (4+Math.random()).toFixed(1), "Reviews": row[getCol(cols, /^(review)/i)] || Math.floor(Math.random()*500) };
                });
                const wb = XLSX.utils.book_new(); const ws = XLSX.utils.json_to_sheet(exportData);
                ws['!cols'] = [{wch:30},{wch:30},{wch:15},{wch:15},{wch:15},{wch:25},{wch:25},{wch:20},{wch:10},{wch:10}];
                XLSX.utils.book_append_sheet(wb, ws, "Sample Leads");
                XLSX.writeFile(wb, `${selectedDatasetForSample?.name?.replace(/ /g, '_') || 'Sample'}_Leads.xlsx`);
            }

            setPurchaseLoading(false);
            setIsSampleModalOpen(false);
            alert("Sample data downloaded successfully!");
        } catch (error) {
            console.error("Error downloading sample:", error);
            setPurchaseLoading(false);
            alert("Failed to download sample data. Please try again.");
        }
    };

    const fetchCountries = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
            const res = await fetch(`${API_URL}/api/merged/countries`);
            const result = await res.json();
            if (result.success && result.data?.countries) {
                const mapped = result.data.countries.map(c => ({ country_name: c.name, name: c.name, code: c.code, totalCategories: c.totalCategories }));
                setCountries(mapped);
            }
        } catch (error) { console.error("Error fetching countries:", error); }
    };

    const fetchStates = async () => {
        if (!filters.country) { setStates([]); return; }
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
            const response = await fetch(`${API_URL}/api/location/states?country=${encodeURIComponent(filters.country)}`);
            const result = await response.json();
            setStates(result.data || []);
        } catch (error) { console.error("Error fetching states:", error); }
    };

    useEffect(() => {
        const initializePage = async () => {
            setLoading(true);
            try { await Promise.all([fetchCountries()]); }
            catch (error) { console.error("Initialization error:", error); }
            finally { if (isSeoPage) { setLoading(false); } }
        };
        initializePage();
    }, []);

    useEffect(() => { if (!isSeoPage) { handleSearch(); } }, [filters, currentPage, countries]);

    useEffect(() => {
        if (filters.country && countries.length > 0) {
            fetchStates();
            const fetchMergedCategories = async () => {
                const countryObj = countries.find(c => (c.country_name || c.name) === filters.country);
                if (!countryObj?.code) return;
                try {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
                    const res = await fetch(`${API_URL}/api/merged/categories?country=${countryObj.code}&limit=10000&domain=${window.location.hostname}`);
                    const result = await res.json();
                    if (result.success && result.data?.categories) {
                        setMergedCats(result.data.categories);
                        setCategories(result.data.categories.map(c => ({ name: c.displayName, _id: c.name })));
                    }
                } catch (error) { console.error('Error fetching merged categories:', error); }
            };
            fetchMergedCategories();
        }
    }, [filters.country, countries]);

    useEffect(() => {
        const fetchCities = async () => {
            if (!filters.state) { setCities([]); return; }
            try {
                const stateObj = states.find(s => s.name === filters.state);
                if (!stateObj) return;
                const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
                const response = await fetch(`${API_URL}/api/location/cities/${stateObj.isoCode}?country=${encodeURIComponent(filters.country)}`);
                const result = await response.json();
                setCities(result.data || []);
            } catch (error) { console.error("Error fetching cities:", error); }
        };
        if (filters.state) fetchCities();
    }, [filters.state, states]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setCurrentPage(1);
        setFilters(prev => ({ ...prev, [name]: value, ...(name === 'country' ? { state: '', city: '' } : {}), ...(name === 'state' ? { city: '' } : {}) }));
    };

    const handleSearch = async () => {
        const { category, country, state, city } = filters;
        setLoading(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
            const countryObj = countries.find(c => (c.country_name || c.name) === country);
            const countryCode = countryObj?.code;
            if (!countryCode) { setDatasets([]); setLoading(false); return; }
            let cats = []; let paginationData = null;
            if (state || city || category) {
                let url = `${API_URL}/api/merged/categories-count?country=${countryCode}&domain=${window.location.hostname}`;
                if (state) url += `&state=${encodeURIComponent(state)}`;
                if (city) url += `&city=${encodeURIComponent(city)}`;
                if (category) { const catObj = categories.find(c => c.name === category); const categorySlug = catObj ? (catObj._id || category) : category; url += `&category=${encodeURIComponent(categorySlug)}`; }
                else { url += `&page=${currentPage}&limit=${ITEMS_PER_PAGE}`; }
                const countRes = await fetch(url); const countResult = await countRes.json();
                if (countResult.success && countResult.data?.categories) {
                    cats = countResult.data.categories; cats = cats.filter(c => c.records > 0);
                    if (countResult.data.pagination && !category) { paginationData = countResult.data.pagination; }
                }
            } else {
                let url = `${API_URL}/api/merged/categories?country=${countryCode}&domain=${window.location.hostname}`;
                url += `&page=${currentPage}&limit=${ITEMS_PER_PAGE}`;
                const catRes = await fetch(url); const catResult = await catRes.json();
                if (catResult.success && catResult.data?.categories) {
                    cats = catResult.data.categories;
                    if (catResult.data.pagination) { paginationData = catResult.data.pagination; }
                }
            }
            if (paginationData) { setTotalPages(paginationData.totalPages); setTotalCategories(paginationData.totalCategories); }
            else { setTotalPages(1); setTotalCategories(cats.length); }
            let displayLoc = country;
            if (state) displayLoc = `${state}, ${country}`;
            if (city) displayLoc = `${city}, ${state}, ${country}`;
            const mappedData = cats.map((cat, idx) => {
                const records = cat.records || 0;
                const emailCount = cat.emails !== undefined ? cat.emails : (cat.hasEmail ? records : 0);
                const phoneCount = cat.phones !== undefined ? cat.phones : (cat.hasPhone ? records : 0);
                
                return { 
                    id: `merged-${countryCode}-${cat.name}-${idx}`, 
                    name: `List Of ${cat.displayName} in ${displayLoc}`, 
                    records: records > 0 ? records.toLocaleString() : '—', 
                    emails: emailCount > 0 ? emailCount.toLocaleString() : '0', 
                    phones: phoneCount > 0 ? phoneCount.toLocaleString() : '0', 
                    full_address: `Last Updated: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`, 
                    price: cat.price ? `$${cat.price}` : '$199', 
                    isDataset: true, 
                    displayLoc, 
                    category: cat.displayName, 
                    categorySlug: cat.name, 
                    countryCode, 
                    countryName: country, 
                    stateName: state || '', 
                    cityName: city || '' 
                };
            });
            setDatasets(mappedData);
        } catch (error) { console.error("Error searching data:", error); setDatasets([]); }
        finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            {/* ═══ HERO SECTION ═══ */}
            <div className="relative pt-24 pb-32 overflow-hidden mesh-gradient" style={{ background: 'var(--bg-primary)' }}>
                <div className="absolute inset-0 dot-pattern" />
                <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center justify-between mb-8">
                    <div className="lg:w-1/2 mb-10 lg:mb-0 animate-fadeInUp">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
                             style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.2)', color: '#818CF8' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            B2B Lead Database
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-6 text-white">
                            Discover authentic, sales-<br />
                            qualified <span className="gradient-text">B2B leads</span>
                        </h1>
                        <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
                            Access millions of businesses with verified emails, phone numbers, and key decision-maker data.
                        </p>
                    </div>
                    <div className="lg:w-1/2 flex justify-center animate-fadeInUp delay-300">
                        <div className="glass-card !p-6 !rounded-2xl max-w-[380px] w-full" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                            {[
                                { label: 'Total Records', value: '10M+', color: '#6366F1' },
                                { label: 'Verified Emails', value: '8.5M+', color: '#22D3EE' },
                                { label: 'Phone Numbers', value: '7.2M+', color: '#10B981' },
                                { label: 'Countries', value: '150+', color: '#F59E0B' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: i < 3 ? '1px solid var(--border-glass)' : 'none' }}>
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

            {/* ═══ MAIN SEARCH & DATA SECTION ═══ */}
            <div className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container mx-auto px-4">
                    {!isSeoPage && (
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-white">Search Our <span className="gradient-text">B2B Datasets</span></h2>
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* SIDEBAR FILTERS */}
                        <div className="lg:w-1/4 lg:sticky lg:top-30 lg:self-start h-fit">
                            <div className="glass-card !p-6 !rounded-2xl">
                                <h3 className="font-bold text-lg mb-5 flex items-center gap-2 text-white">
                                    <FaFilter className="text-indigo-400" /> Filters
                                </h3>
                                <div className="space-y-4">
                                    <SearchableDropdown label="Category" name="category" value={filters.category} onChange={handleFilterChange} options={categories.map(c => c.name)} placeholder="Select Category" />
                                    <SearchableDropdown label="Country" name="country" value={filters.country} onChange={handleFilterChange} options={countries.map(c => c.country_name || c.name)} placeholder="Select Country" />
                                    <SearchableDropdown label="State" name="state" value={filters.state} onChange={handleFilterChange} options={states.map(s => s.name)} placeholder="Select State" disabled={!filters.country} />
                                    <SearchableDropdown label="City" name="city" value={filters.city} onChange={handleFilterChange} options={cities.map(c => c.name)} placeholder="Select City" disabled={!filters.state} />
                                    <button onClick={() => setIsModalOpen(true)} className="w-full mt-4 btn-primary !rounded-xl uppercase tracking-wide text-sm">
                                        Request Custom Database
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* DATA TABLE */}
                        <div className="lg:w-3/4">
                            <div className="glass-card !rounded-2xl overflow-hidden">
                                {loading ? (
                                    <TableSkeleton />
                                ) : datasets.length === 0 ? (
                                    <div className="p-12 text-center text-slate-500">
                                        <p>No complete datasets found for this criteria.</p>
                                        <Link href="/contact" className="text-indigo-400 hover:underline mt-2 inline-block">
                                            Need this data? Contact us to compile it first.
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="table-dark">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th className="text-center">Records</th>
                                                    <th className="text-center"><span className="flex items-center justify-center gap-1"><MdEmail/> Email</span></th>
                                                    <th className="text-center"><span className="flex items-center justify-center gap-1"><MdPhone/> Phone</span></th>
                                                    <th className="text-right"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {datasets.map((item) => (
                                                    <tr key={item.id} className="group">
                                                        <td className="font-medium whitespace-wrap">
                                                            <Link href={item.countryCode ? `/b2b-database/leads-list-of-${(item.categorySlug || "").replace(/_/g, '-')}-in-${(item.countryName || "").toLowerCase().replace(/\s+/g, '-')}` : `/dataset-detail?id=${item.id}&label=${encodeURIComponent(item.displayLoc || "")}`}
                                                                  className="text-[14px] text-slate-300 hover:text-indigo-400 transition font-medium">
                                                                {item.name}
                                                            </Link>
                                                        </td>
                                                        <td className="text-center text-white font-bold text-[14px]">{item.records}</td>
                                                        <td className="text-center text-[14px]">{item.emails}</td>
                                                        <td className="text-center text-[14px]">{item.phones}</td>
                                                        <td className="text-right whitespace-nowrap">
                                                            <div className="flex gap-3 justify-end items-center opacity-80 group-hover:opacity-100 transition-opacity">
                                                                <button onClick={() => { setSelectedDatasetForSample(item); setIsSampleModalOpen(true); }}
                                                                    className="btn-ghost !py-2 !px-4 !rounded-full text-[12px] !border-slate-700 hover:!border-indigo-500 whitespace-nowrap">
                                                                    Sample Leads
                                                                </button>
                                                                <Link href={item.countryCode ? `/b2b-database/leads-list-of-${(item.categorySlug || "").replace(/_/g, '-')}-in-${(item.countryName || "").toLowerCase().replace(/\s+/g, '-')}` : `/dataset-detail?id=${item.id}&label=${encodeURIComponent(item.displayLoc || "")}`}
                                                                    className="btn-primary !py-2 !px-4 !rounded-full text-[12px] whitespace-nowrap">
                                                                    Purchase Leads
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                
                                {/* Pagination */}
                                <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-3" style={{ borderTop: '1px solid var(--border-glass)' }}>
                                    <span className="text-sm text-slate-500">
                                        {totalCategories > 0 && `Showing ${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, totalCategories)} of ${totalCategories} datasets`}
                                    </span>
                                    {totalPages > 1 && (
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                                                className="px-3 py-1.5 text-sm rounded-lg transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-slate-400 hover:text-white hover:bg-white/5" style={{ border: '1px solid var(--border-glass)' }}>
                                                ← Prev
                                            </button>
                                            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                                                let pageNum;
                                                if (totalPages <= 7) pageNum = i + 1;
                                                else if (currentPage <= 4) pageNum = i + 1;
                                                else if (currentPage >= totalPages - 3) pageNum = totalPages - 6 + i;
                                                else pageNum = currentPage - 3 + i;
                                                return (
                                                    <button key={pageNum} onClick={() => setCurrentPage(pageNum)}
                                                        className={`w-9 h-9 text-sm rounded-lg transition cursor-pointer ${currentPage === pageNum ? 'text-white font-bold' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                                                        style={currentPage === pageNum ? { background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', boxShadow: '0 4px 15px var(--glow-primary)' } : { border: '1px solid var(--border-glass)' }}>
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                                                className="px-3 py-1.5 text-sm rounded-lg transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-slate-400 hover:text-white hover:bg-white/5" style={{ border: '1px solid var(--border-glass)' }}>
                                                Next →
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BADGES SECTION */}
                    <div className="mt-24 flex justify-center gap-12 flex-wrap opacity-90 transition-opacity">
                        <img src="images/mid-image.png" alt="Badges" 
                             style={{ filter: 'brightness(1.2) contrast(1.1)', maxWidth: '450px' }} 
                             className="hover:opacity-100 transition-all duration-300" />
                    </div>
                </div>
            </div>

            {/* ═══ LISTS SECTION ═══ */}
            <div className="section-padding" style={{ background: 'var(--bg-primary)' }}>
                <div className="container mx-auto px-4">
                    {/* Continents */}
                    <div className="mb-16">
                        <h3 className="text-2xl md:text-3xl font-black text-center mb-8 text-white">
                            {filters.country ? `Business leads by State in ${filters.country}` : 'Business Leads By Continents'}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm max-w-4xl mx-auto">
                            {['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania'].map(c => (
                                <a key={c} href="#" className="flex items-center gap-2 text-slate-500 text-[14px] font-semibold hover:text-indigo-400 transition">
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-primary)' }}></span>
                                    Business Leads in {c}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Domains */}
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-center mb-8 text-white">
                            Find <span className="gradient-text">B2B Leads</span> Across Different Domains
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-8 text-[14px] max-w-6xl mx-auto">
                            {countries.length > 0 ? (() => {
                                const priorityNames = ['India', 'United States', 'United Kingdom'];
                                const getName = (c) => c.country_name || c.name;
                                const priority = priorityNames.map(name => countries.find(c => getName(c) === name)).filter(Boolean);
                                const rest = countries.filter(c => !priorityNames.includes(getName(c)));
                                const ordered = [...priority, ...rest];
                                return ordered.map((country, i) => {
                                    const countryName = getName(country);
                                    const slug = countryName.toLowerCase().replace(/\s+/g, '-');
                                    const label = `Business Leads in ${countryName} (${totalCategories})`;
                                    return (
                                        <Link key={i} href={`/business-reports/${slug}`} className="flex items-start gap-2 text-slate-500 text-[14px] font-semibold hover:text-indigo-400 transition">
                                            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--accent-primary)' }}></span>
                                            <span>{label}</span>
                                        </Link>
                                    );
                                });
                            })() : (
                                [...Array(24)].map((_, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-slate-700"></span>
                                        <div className="h-3 w-32 rounded animate-shimmer" style={{ background: 'var(--bg-elevated)' }}></div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ STATS / BEYOND LEADS ═══ */}
            <section className="section-padding !pt-10" style={{ background: 'var(--bg-primary)' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                              style={{ background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.2)', color: '#A78BFA' }}>
                            Why Business Data Labs?
                        </span>
                        <h2 className="text-3xl font-black text-white mb-4">Beyond Just <span className="gradient-text">Leads</span></h2>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            Maximize the potential of your marketing, sales, analytics, and operations with exclusive, high-quality leads.
                        </p>
                    </div>

                    <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            { title: 'Close Faster', value: '62%', sub: 'Increase in overall productivity', icon: FaChartLine, gradient: 'linear-gradient(135deg, #6366F1, #4F46E5)' },
                            { title: 'Save Budgets', value: '3x', sub: 'Increase in win rates', icon: FaDatabase, gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' },
                            { title: 'Attract Customers', value: '74%', sub: 'Decrease in marketing spend', icon: FaUserFriends, gradient: 'linear-gradient(135deg, #22D3EE, #06B6D4)' },
                        ].map((card, i) => (
                            <div key={i} className="relative overflow-hidden rounded-2xl p-8 group hover:-translate-y-2 transition-all duration-300"
                                 style={{ background: card.gradient, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
                                <div className="relative z-10">
                                    <h4 className="text-base font-semibold text-white/80 mb-2">{card.title}</h4>
                                    <div className="text-5xl font-black text-white mb-2">{card.value}</div>
                                    <p className="text-sm text-white/60">{card.sub}</p>
                                </div>
                                <card.icon className="absolute bottom-4 right-4 text-white/10 text-8xl group-hover:text-white/20 group-hover:scale-110 transition-all duration-500" />
                            </div>
                        ))}
                    </div>

                    {/* Info Banner */}
                    <div className="mt-20 glass-card !p-10 !rounded-2xl flex flex-col lg:flex-row items-center gap-10 relative overflow-hidden" style={{ background: 'rgba(26, 31, 46, 0.9)' }}>
                        <div className="flex-1 max-w-xl relative z-10">
                            <h3 className="text-2xl font-black text-white mb-4">
                                Harness the Power of <span className="gradient-text">Business Data Labs</span>
                            </h3>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                Our web scraping services collect data and convert it into standardized CSV, Excel, and JSON formats.
                                We deliver accurate, fast data scraping to meet the high-volume needs of enterprises.
                            </p>
                            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-sm">Contact Our Experts Now</Link>
                        </div>
                        {/* Right Visual */}
          <div className="flex-1 flex justify-center relative z-10">
            <div className="grid grid-cols-2 gap-3 max-w-[280px]">
              {[
                { label: 'Verified Emails', value: '8.5M+', color: '#22D3EE' },
                { label: 'Phone Numbers', value: '7.2M+', color: '#10B981' },
                { label: 'Global Coverage', value: '150+', color: '#6366F1' },
                { label: 'Data Accuracy', value: '99.9%', color: '#F59E0B' },
              ].map((item, i) => (
                <div key={i} className="glass-card !p-4 !rounded-xl text-center !border-transparent">
                  <div className="text-lg font-black text-white mb-1">{item.value}</div>
                  <div className="text-[10px] font-semibold" style={{ color: item.color }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

                        <div className="absolute bottom-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-cyan))' }} />
                    </div> 
                </div>
            </section>

            {/* ═══ CUSTOM DATABASE MODAL ═══ */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Request Custom Database</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition p-1 hover:bg-white/10 rounded-lg cursor-pointer"><FaTimes size={18} /></button>
                        </div>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const name = formData.get('name')?.trim(); const email = formData.get('email')?.trim();
                            const phone = phoneCode?.trim(); const message = formData.get('message')?.trim();
                            const isPhoneValid = phone && phone.replace(/\D/g, '').length >= 8;
                            if (!name || !email || !isPhoneValid || !message) { alert("Please fill in all mandatory fields (*)."); return; }
                            const payload = { type: 'custom_database', name, email, phone, message };
                            try {
                                const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
                                const res = await fetch(`${API_URL}/api/forms/submit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, source: window.location.hostname }) });
                                if (res.ok) { alert('Request submitted successfully!'); setIsModalOpen(false); } else { alert('Failed to submit request.'); }
                            } catch (error) { console.error('Submission error:', error); alert('An error occurred.'); }
                        }} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Full Name <span className="text-red-400">*</span></label>
                                <input name="name" required type="text" placeholder="Enter your full name" className="input-dark" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Email <span className="text-red-400">*</span></label>
                                <input name="email" required type="email" placeholder="Enter your email" className="input-dark" />
                            </div>
                            <PhoneInputField value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)} name="phone" label="Phone Number" required />
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Message <span className="text-red-400">*</span></label>
                                <textarea name="message" required placeholder="Describe your data requirements..." className="input-dark min-h-[100px] resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-full btn-primary !rounded-xl uppercase tracking-wide text-sm mt-2 cursor-pointer">Submit Request</button>
                        </form>
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
                            <h3 className="text-xl font-bold text-white mb-2">Download Free Sample</h3>
                            <p className="text-slate-500 text-sm">Enter your details to download the sample list.</p>
                        </div>
                        <form onSubmit={handleSampleDownload} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Full Name <span className="text-red-400">*</span></label>
                                <input type="text" name="fullName" required value={sampleForm.fullName} onChange={handleSampleChange} placeholder="Full Name" className="input-dark" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Email <span className="text-red-400">*</span></label>
                                <input type="email" name="email" required value={sampleForm.email} onChange={handleSampleChange} placeholder="Email Address" className="input-dark" />
                            </div>
                            <PhoneInputField value={sampleForm.phoneNumber} onChange={handleSampleChange} name="phoneNumber" label="Phone Number" required />
                            <button type="submit" disabled={purchaseLoading}
                                className="w-full mt-6 btn-primary !rounded-xl font-bold flex items-center justify-center gap-3 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed !py-4">
                                {purchaseLoading ? <span>Processing...</span> : <><FaDownload className="text-sm" /> DOWNLOAD SAMPLE</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default B2bdatabase;
