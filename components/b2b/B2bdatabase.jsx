'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaFilter, FaCheckCircle, FaGlobe, FaDatabase, FaEnvelope, FaPhone, FaArrowRight, FaChartLine, FaUserFriends, FaBuilding, FaStar, FaTimes, FaUser, FaDownload } from 'react-icons/fa';
import { MdEmail, MdPhone, MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';
import SearchableDropdown from '../ui/SearchableDropdown';
// import * as XLSX from 'xlsx'; // Moved to dynamic import
import staticCategories from '../../data/categories.json';
import { countryCodes } from '../../utils/countryCodes';
import PhoneInputField from '../ui/PhoneInputField';

// Skeleton Loader Component for the Table
const TableSkeleton = () => (
    <div className="overflow-x-auto animate-pulse">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-blue-50 text-blue-900 text-xs uppercase font-bold tracking-wider">
                    <th className="p-4 border-b border-blue-100 whitespace-nowrap">Name</th>
                    <th className="p-4 border-b border-blue-100 text-center whitespace-nowrap">Number of Records</th>
                    <th className="p-4 border-b border-blue-100 text-center whitespace-nowrap">Emails</th>
                    <th className="p-4 border-b border-blue-100 text-center whitespace-nowrap">Phones</th>
                    <th className="p-4 border-b border-blue-100"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {[...Array(5)].map((_, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 align-middle">
                            <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                        </td>
                        <td className="p-4 align-middle text-center"><div className="h-4 bg-slate-200 rounded w-16 mx-auto"></div></td>
                        <td className="p-4 align-middle text-center"><div className="h-4 bg-slate-200 rounded w-12 mx-auto"></div></td>
                        <td className="p-4 align-middle text-center"><div className="h-4 bg-slate-200 rounded w-12 mx-auto"></div></td>
                        <td className="p-4 align-middle text-right"><div className="h-8 bg-slate-200 rounded w-48 ml-auto"></div></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const B2bdatabase = ({ isSeoPage = false, initialFilters = {} }) => {
    // State for data and loading
    // State for data and loading
    const [datasets, setDatasets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
    const [selectedDatasetForSample, setSelectedDatasetForSample] = useState(null);
    const [purchaseLoading, setPurchaseLoading] = useState(false);
    const [phoneCode, setPhoneCode] = useState('+1');
    const [samplePhoneCode, setSamplePhoneCode] = useState('+1');
    const [sampleForm, setSampleForm] = useState({ fullName: '', email: '', phoneNumber: '' });


    // Dropdown options
    const [categories, setCategories] = useState(staticCategories || []);
    const [mergedCats, setMergedCats] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    // Filter states
    const [filters, setFilters] = useState({
        category: initialFilters.category || '',
        country: initialFilters.country || 'United States',
        state: initialFilters.state || '',
        city: initialFilters.city || ''
    });

    // Pagination state
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
        const isPhoneValid = sampleForm.phoneNumber && sampleForm.phoneNumber.replace(/\D/g, '').length > 3;
        if (!sampleForm.fullName.trim() || !sampleForm.email.trim() || !isPhoneValid) {
            alert("Please fill in all required fields (Name, Email, and a valid Phone number).");
            return;
        }

        setPurchaseLoading(true);

        try {
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
                    datasetDetails: selectedDatasetForSample,
                    source: window.location.hostname
                })
            });
        } catch (error) {
            console.error("Error submitting sample request:", error);
            // We continue to download even if submission fails, or you can choose to stop.
            // For better UX, maybe we should still let them download but log the error?
        }
        
        // Mock dataset structure if we only have the summary from the list
        // ideally we would fetch the detail or just mock a few rows based on the summary
        
        setTimeout(async () => {
            // Dynamically import XLSX
            const XLSX = await import('xlsx');
            
            // Generate Excel File
            const wb = XLSX.utils.book_new();
            
            // Create Mock/Sample data for Excel 
            // Since we are in the list view, we might not have the full sample array. 
            // We can generate dummy data effectively or use what we have.
            // For now, let's create generic rows since we don't have the `sampleList` array in `datasets` state usually (unless we add it to search mapping)
            const exportData = Array(5).fill(null).map((_, i) => ({
                "Business Name": `${selectedDatasetForSample?.category || 'Business'} ${i+1}`,
                "Address": "Available in Full List",
                "City": selectedDatasetForSample?.displayLoc?.split(',')[0] || 'City',
                "State": "State",
                "Country": "Country",
                "Phone": "Available in Full List (Verified)", 
                "Email": "Available in Full List (Verified)",
                "Website": "Available",
                "Rating": (4 + Math.random()).toFixed(1),
                "Reviews": Math.floor(Math.random() * 500)
            }));

            const ws = XLSX.utils.json_to_sheet(exportData);
            
             const wscols = [
                {wch: 30}, {wch: 30}, {wch: 15}, {wch: 15}, {wch: 15}, 
                {wch: 25}, {wch: 25}, {wch: 20}, {wch: 10}, {wch: 10}
            ];
            ws['!cols'] = wscols;

            XLSX.utils.book_append_sheet(wb, ws, "Sample Leads");
            XLSX.writeFile(wb, `${selectedDatasetForSample?.name?.replace(/ /g, '_') || 'Sample'}_Leads.xlsx`);
            
            setPurchaseLoading(false);
            setIsSampleModalOpen(false);
            alert("Sample data downloaded successfully!");
        }, 1500);
    };

    // Helper functions for fetching dropdown data
    // Categories are now loaded statically

    const fetchCountries = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
            const res = await fetch(`${API_URL}/api/merged/countries`);
            const result = await res.json();
            if (result.success && result.data?.countries) {
                // Map merged countries to the format the dropdowns expect
                const mapped = result.data.countries.map(c => ({
                    country_name: c.name,
                    name: c.name,
                    code: c.code,
                    totalCategories: c.totalCategories
                }));
                setCountries(mapped);
            }
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    const fetchStates = async () => {
        if (!filters.country) {
            setStates([]);
            return;
        }
        try {
            // Backend is currently hardcoded for US states/cities
            const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
            const response = await fetch(`${API_URL}/api/location/states?country=${encodeURIComponent(filters.country)}`);
            const result = await response.json();
            setStates(result.data || []);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    // Initial data fetching on mount
    useEffect(() => {
        const initializePage = async () => {
            setLoading(true);
            try {
                // Fetch essentials in parallel
                await Promise.all([
                    // fetchCategories(), // Removed: using static JSON
                    fetchCountries()
                ]);
            } catch (error) {
                console.error("Initialization error:", error);
            } finally {
                // Only unset loading if it's an SEO page (static), 
                // otherwise handleSearch will take over or we wait for user interaction
                if (isSeoPage) {
                    setLoading(false);
                }
            }
        };

        initializePage();
    }, []);

    // Auto-search when filters or page change
    useEffect(() => {
        if (!isSeoPage) {
            handleSearch();
        }
    }, [filters, currentPage, countries]);

    // Fetch states when country changes
    useEffect(() => {
        if (filters.country && countries.length > 0) {
            fetchStates();
            // Also fetch merged categories for the category dropdown
            const fetchMergedCategories = async () => {
                const countryObj = countries.find(c => (c.country_name || c.name) === filters.country);
                if (!countryObj?.code) return;
                try {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
                    const res = await fetch(`${API_URL}/api/merged/categories?country=${countryObj.code}&limit=10000`);
                    const result = await res.json();
                    if (result.success && result.data?.categories) {
                        setMergedCats(result.data.categories);
                        // Update category dropdown options
                        setCategories(result.data.categories.map(c => ({ name: c.displayName, _id: c.name })));
                    }
                } catch (error) {
                    console.error('Error fetching merged categories:', error);
                }
            };
            fetchMergedCategories();
        }
    }, [filters.country, countries]);

    // Fetch Cities when State changes
    useEffect(() => {
        const fetchCities = async () => {
            if (!filters.state) {
                setCities([]);
                return;
            }
            try {
                const stateObj = states.find(s => s.name === filters.state);
                if (!stateObj) return;

                const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
                const response = await fetch(`${API_URL}/api/location/cities/${stateObj.isoCode}?country=${encodeURIComponent(filters.country)}`);
                const result = await response.json();
                setCities(result.data || []);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        if (filters.state) fetchCities();
    }, [filters.state, states]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setCurrentPage(1); // Reset to page 1 on filter change
        setFilters(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'country' ? { state: '', city: '' } : {}),
            ...(name === 'state' ? { city: '' } : {})
        }));
    };

    const handleSearch = async () => {
        const { category, country, state, city } = filters;
        
        setLoading(true);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
            
            // Find the country code from the selected country name
            const countryObj = countries.find(c => (c.country_name || c.name) === country);
            const countryCode = countryObj?.code;
            
            if (!countryCode) {
                setDatasets([]);
                setLoading(false);
                return;
            }

            let cats = [];
            let paginationData = null;

            // If state, city, or category is selected, use the filtered count endpoint
            if (state || city || category) {
                let url = `${API_URL}/api/merged/categories-count?country=${countryCode}`;
                if (state) url += `&state=${encodeURIComponent(state)}`;
                if (city) url += `&city=${encodeURIComponent(city)}`;
                if (category) {
                     const catObj = categories.find(c => c.name === category);
                     const categorySlug = catObj ? (catObj._id || category) : category;
                     url += `&category=${encodeURIComponent(categorySlug)}`;
                } else {
                     // Add pagination if no specific category is requested
                     url += `&page=${currentPage}&limit=${ITEMS_PER_PAGE}`;
                }

                const countRes = await fetch(url);
                const countResult = await countRes.json();
                
                if (countResult.success && countResult.data?.categories) {
                    cats = countResult.data.categories;
                    // Filter out categories with 0 records
                    cats = cats.filter(c => c.records > 0);
                    // Handle pagination returned from backend
                    if (countResult.data.pagination && !category) {
                        paginationData = countResult.data.pagination;
                    }
                }
            } else {
                // No state/city/category filter — use the fast cached categories endpoint
                let url = `${API_URL}/api/merged/categories?country=${countryCode}`;
                url += `&page=${currentPage}&limit=${ITEMS_PER_PAGE}`;

                const catRes = await fetch(url);
                const catResult = await catRes.json();

                if (catResult.success && catResult.data?.categories) {
                    cats = catResult.data.categories;
                    if (catResult.data.pagination) {
                        paginationData = catResult.data.pagination;
                    }
                }
            }

            // No longer need client-side category filtering since backend does it if category is provided

            // Update pagination
            if (paginationData) {
                setTotalPages(paginationData.totalPages);
                setTotalCategories(paginationData.totalCategories);
            } else {
                setTotalPages(1);
                setTotalCategories(cats.length);
            }

            // Build display location
            let displayLoc = country;
            if (state) displayLoc = `${state}, ${country}`;
            if (city) displayLoc = `${city}, ${state}, ${country}`;

            const mappedData = cats.map((cat, idx) => {
                const records = cat.records || 0;

                return {
                    id: `merged-${countryCode}-${cat.name}-${idx}`,
                    name: `List Of ${cat.displayName} in ${displayLoc}`,
                    records: records > 0 ? records.toLocaleString() : '—',
                    emails: cat.hasEmail ? records.toLocaleString() : '0',
                    phones: cat.hasPhone ? records.toLocaleString() : '0',
                    full_address: `Last Updated: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
                    price: cat.price ? `$${cat.price}` : '$199',
                    isDataset: true,
                    displayLoc: displayLoc,
                    category: cat.displayName,
                    categorySlug: cat.name,
                    countryCode: countryCode,
                    countryName: country,
                    stateName: state || '',
                    cityName: city || ''
                };
            });
            setDatasets(mappedData);

        } catch (error) {
            console.error("Error searching data:", error);
            setDatasets([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans text-slate-800">
            {/* ... (Hero Section remains same) ... */}
            <div className="relative bg-[#030e21] text-white pt-20 pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                     <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#4F46E5" d="M42.7,-62.9C50.9,-52.8,50.1,-34.4,51.7,-19.2C53.4,-4,57.4,8,54,18.7C50.6,29.4,39.8,38.8,28.5,45.6C17.2,52.4,5.4,56.6,-7.1,58.8C-19.6,61,-32.8,61.2,-43.3,54.7C-53.8,48.2,-61.6,35,-65.4,20.9C-69.2,6.8,-69,-8.2,-63.3,-21.3C-57.6,-34.4,-46.4,-45.6,-34.8,-53.9C-23.2,-62.2,-11.6,-67.6,2.2,-71C16,-74.4,32,-75.8,42.7,-62.9Z" transform="translate(100 100)" />
                    </svg>
                </div>

                <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center justify-between mb-8">
                    <div className="lg:w-1/2 mb-10 lg:mb-0">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                            Discover authentic, sales-<br />
                            qualified <span className="text-blue-400">B2B leads</span>
                        </h1>
                        <p className="text-slate-300 text-lg mb-8 max-w-lg">
                            Access millions of businesses with verified emails, phone numbers, and key decision-maker data.
                        </p>
                    </div>
                    
                    <div className="lg:w-1/2 flex justify-center">
                        <div className="p-2 rounded-xl ">
                             <img 
                                src="images/b2b-hero.png" 
                                alt="Dashboard Preview" 
                                className="rounded-lg max-w-full h-auto"
                            />
                        </div>
                    </div>
                </div>

               
            </div>

            {/* --- MAIN SEARCH & DATA SECTION --- */}
            <div className="bg-slate-50 py-16">
                <div className="container mx-auto px-4">
                    {!isSeoPage && (
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-slate-900">Search Our B2B Datasets</h2>
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* SIDEBAR FILTERS (unchanged logic, just rendering) */}
                        <div className="lg:w-1/4 lg:sticky lg:top-30 lg:self-start h-fit">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <FaFilter className="text-blue-600" /> Filters
                                </h3>
                                
                                <div className="space-y-4">
                                    {/* Category Select */}
                                    <div className="relative">
                                        <SearchableDropdown
                                            label="Category"
                                            name="category"
                                            value={filters.category}
                                            onChange={handleFilterChange}
                                            options={categories.map(c => c.name)}
                                            placeholder="Select Category"
                                        />
                                    </div>

                                    {/* Country Select */}
                                    <div className="relative">
                                        <SearchableDropdown
                                            label="Country"
                                            name="country"
                                            value={filters.country}
                                            onChange={handleFilterChange}
                                            options={countries.map(c => c.country_name || c.name)}
                                            placeholder="Select Country"
                                        />
                                    </div>

                                    {/* State Select */}
                                    <div className="relative">
                                        <SearchableDropdown
                                            label="State"
                                            name="state"
                                            value={filters.state}
                                            onChange={handleFilterChange}
                                            options={states.map(s => s.name)}
                                            placeholder="Select State"
                                            disabled={!filters.country}
                                        />
                                    </div>

                                    {/* City Select */}
                                    <div className="relative">
                                        <SearchableDropdown
                                            label="City"
                                            name="city"
                                            value={filters.city}
                                            onChange={handleFilterChange}
                                            options={cities.map(c => c.name)}
                                            placeholder="Select City"
                                            disabled={!filters.state}
                                        />
                                    </div>
                                    
                                    <button 
                                        onClick={() => setIsModalOpen(true)}
                                        className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg uppercase tracking-wide hover:bg-blue-700 transition shadow-lg cursor-pointer"
                                    >
                                        REQUEST CUSTOM DATABASE
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* DATA TABLE */}
                        <div className="lg:w-3/4">
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                {loading ? (
                                    <TableSkeleton />
                                ) : datasets.length === 0 ? (
                                    <div className="p-12 text-center text-slate-500 animate-in fade-in zoom-in duration-300">
                                        <p>No complete datasets found for this criteria.</p>
                                        <Link href="/contact" className="text-blue-600 hover:underline mt-2 inline-block">
                                            Need this data? Contact us to compile it first.
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        <table className="w-full text-left border-collapse">
                                            <thead className="border-b-2 border-slate-100">
                                                <tr className="text-blue-600 text-sm font-semibold">
                                                    <th className="px-6 py-5 text-left whitespace-nowrap">Name</th>
                                                    <th className="px-6 py-5 text-center whitespace-nowrap">Number of records</th>
                                                    <th className="px-6 py-5 text-center whitespace-nowrap"><span className="flex items-center justify-center gap-1"><MdEmail/> Email</span></th>
                                                    <th className="px-6 py-5 text-center whitespace-nowrap"><span className="flex items-center justify-center gap-1"><MdPhone/> Phone</span></th>
                                                    <th className="px-6 py-5 text-right whitespace-nowrap"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100/50">
                                                {datasets.map((item) => (
                                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                                                        <td className="px-3 py-3 font-medium text-slate-500 align-middle whitespace-wrap">
                                                            <Link href={item.countryCode ? `/b2b-database/leads-list-of-${item.categorySlug}-in-${(item.countryName || "").toLowerCase().replace(/\s+/g, '-')}` : `/dataset-detail?id=${item.id}&label=${encodeURIComponent(item.displayLoc || "")}`} className="text-[14px] hover:text-blue-600 transition group-hover:text-blue-600 font-medium">{item.name}</Link>
                                                        </td>
                                                        <td className="px-6 py-5 text-slate-500 text-[14px] text-center align-middle whitespace-nowrap font-bold">{item.records}</td>
                                                        <td className="px-6 py-5 text-slate-500 text-[14px] text-center align-middle whitespace-nowrap">{item.emails}</td>
                                                        <td className="px-6 py-5 text-slate-500 text-[14px] text-center align-middle whitespace-nowrap">{item.phones}</td>
                                                        <td className="px-6 py-5 align-middle whitespace-nowrap text-right">
                                                            <div className="flex gap-3 justify-end items-center opacity-90 group-hover:opacity-100 transition-opacity">
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedDatasetForSample(item);
                                                                        setIsSampleModalOpen(true);
                                                                    }}
                                                                    className="bg-white border border-slate-300 text-slate-700 px-5 py-2 rounded-full font-semibold text-[13px] hover:bg-slate-50 transition cursor-pointer whitespace-nowrap"
                                                                >
                                                                    Sample Leads
                                                                </button>
                                                                <Link 
                                                                    href={item.countryCode ? `/b2b-database/leads-list-of-${item.categorySlug}-in-${(item.countryName || "").toLowerCase().replace(/\s+/g, '-')}` : `/dataset-detail?id=${item.id}&label=${encodeURIComponent(item.displayLoc || "")}`} 
                                                                    className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold text-[13px] hover:bg-blue-700 transition inline-flex items-center justify-center whitespace-nowrap"
                                                                >
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
                                
                                <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
                                    <span className="text-sm text-slate-500">
                                        {totalCategories > 0 && `Showing ${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, totalCategories)} of ${totalCategories} datasets`}
                                    </span>
                                    {totalPages > 1 && (
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); }}
                                                disabled={currentPage === 1}
                                                className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                                            >← Prev</button>
                                            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                                                let pageNum;
                                                if (totalPages <= 7) {
                                                    pageNum = i + 1;
                                                } else if (currentPage <= 4) {
                                                    pageNum = i + 1;
                                                } else if (currentPage >= totalPages - 3) {
                                                    pageNum = totalPages - 6 + i;
                                                } else {
                                                    pageNum = currentPage - 3 + i;
                                                }
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => setCurrentPage(pageNum)}
                                                        className={`w-9 h-9 text-sm rounded-lg transition cursor-pointer ${
                                                            currentPage === pageNum
                                                                ? 'bg-blue-600 text-white font-bold shadow'
                                                                : 'border border-slate-200 hover:bg-slate-50'
                                                        }`}
                                                    >{pageNum}</button>
                                                );
                                            })}
                                            <button
                                                onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); }}
                                                disabled={currentPage === totalPages}
                                                className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                                            >Next →</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BADGES SECTION */}
                    <div className="mt-20 flex justify-center gap-8 flex-wrap">
                        <img src="images/mid-image.png" alt="Badges" />
                    </div>
                </div>
            </div>

            {/* --- LISTS SECTION --- */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    
                    {/* Continents */}
                    <div className="mb-16">
                        <h3 className="text-[32px] font-bold text-center mb-8">
                            {filters.country 
                                ? `Business leads by State in ${filters.country}` 
                                : 'Business Leads By Continents'}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm max-w-4xl mx-auto">
                            {['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania'].map(c => (
                                <a key={c} href="#" className="flex items-center gap-2 text-slate-600 text-[14px] font-semibold hover:text-blue-600 transition">
                                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                                    Business Leads in {c}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Domains */}
                     <div>
                        <h3 className="text-[32px] font-bold text-center mb-8">
                            Find <span className="text-blue-600">B2B Leads</span> Across Different Domains
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-8 text-[14px] text-slate-500 max-w-6xl mx-auto">
                            {/* Generating a long list of domains using all actual countries */}
                            {countries.length > 0 ? (() => {
                                // Priority countries first: India, United States, United Kingdom
                                const priorityNames = ['India', 'United States', 'United Kingdom'];
                                const getName = (c) => c.country_name || c.name;
                                const priority = priorityNames
                                    .map(name => countries.find(c => getName(c) === name))
                                    .filter(Boolean);
                                const rest = countries.filter(c => !priorityNames.includes(getName(c)));
                                const ordered = [...priority, ...rest];

                                return ordered.map((country, i) => {
                                    const countryName = getName(country);
                                    const slug = countryName.toLowerCase().replace(/\s+/g, '-');
                                    const label = `Business Leads in ${countryName} (${totalCategories})`;
                                    return (
                                        <Link key={i} href={`/business-reports/${slug}`} className="flex items-start gap-2 text-slate-500 text-[14px] font-semibold hover:text-blue-600 transition">
                                            <span className="mt-1.5 w-1 h-1 bg-slate-400 rounded-full shrink-0"></span>
                                            <span>{label}</span>
                                        </Link>
                                    );
                                });
                            })() : (
                                [...Array(24)].map((_, i) => (
                                    <div key={i} className="flex items-start gap-2 text-slate-300">
                                        <span className="mt-1.5 w-1 h-1 bg-slate-200 rounded-full shrink-0"></span>
                                        <div className="h-3 w-32 bg-slate-100 rounded animate-pulse"></div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* --- STATS / BEYOND LEADS --- */}
            <section className="py-20 bg-white pt-10">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* Heading */}
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                            Why SmartScrapers?
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold text-gray-900">
                            Beyond Just Leads
                        </h2>
                        <p className="mt-4 text-gray-500 leading-relaxed text-[18px]">
                            Maximize the potential of your marketing, sales, analytics, and operations with exclusive, high-quality leads. Reduce time spent on lead sourcing and focus on high-impact initiatives.
                        </p>
                    </div>

                    {/* Stat Cards */}
                    <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-blue-600 text-white p-8 rounded-xl relative overflow-hidden group">
                           <div className="relative z-10">
                                <h4 className="text-lg font-semibold opacity-90 mb-2">Close Faster</h4>
                                <div className="text-5xl font-bold mb-2">62%</div>
                                <p className="text-[13px] opacity-75">Increase in overall productivity</p>
                           </div>
                           <FaChartLine className="absolute bottom-4 right-4 text-blue-500 text-8xl opacity-30 group-hover:scale-110 transition-transform" />
                        </div>
                         <div className="bg-blue-600 text-white p-8 rounded-xl relative overflow-hidden group">
                           <div className="relative z-10">
                                <h4 className="text-lg font-semibold opacity-90 mb-2">Save Budgets</h4>
                                <div className="text-5xl font-bold mb-2">3x</div>
                                <p className="text-[13px] opacity-75">Increase in win rates</p>
                           </div>
                           <FaDatabase className="absolute bottom-4 right-4 text-blue-500 text-8xl opacity-30 group-hover:scale-110 transition-transform" />
                        </div>
                         <div className="bg-blue-600 text-white p-8 rounded-xl relative overflow-hidden group">
                           <div className="relative z-10">
                                <h4 className="text-lg font-semibold opacity-90 mb-2">Attract Customers</h4>
                                <div className="text-5xl font-bold mb-2">74%</div>
                                <p className="text-[13px] opacity-75">Decrease in marketing spend</p>
                           </div>
                           <FaUserFriends className="absolute bottom-4 right-4 text-blue-500 text-8xl opacity-30 group-hover:scale-110 transition-transform" />
                        </div>
                    </div>

                    {/* Info Banner */}
                    <div className="mt-20 bg-[#F7FAFF] border border-blue-100 rounded-2xl p-10 flex flex-col lg:flex-row items-center gap-10 relative overflow-hidden">
                      
                      {/* Left Content */}
                      <div className="flex-1 max-w-xl">
                        <h3 className="text-2xl font-semibold text-gray-900">
                          Harness the Power of{" "}
                          <span className="text-[#3067FF]">Business Data Labs</span>
                        </h3>

                        <p className="mt-4 text-[#425466] leading-relaxed">
                          Our web scraping services collect data and convert it into standardized
                          CSV, Excel, and JSON formats. We deliver accurate, fast data scraping to
                          meet the high-volume needs of enterprises. These samples illustrate the
                          breadth of our web scraping capabilities across industries. We can extract
                          data for any business sector.
                        </p>

                        <button className="mt-6 inline-flex items-center px-6 py-3 bg-[#3067FF] text-white text-sm font-medium rounded-lg hover:bg-[#254eda] transition cursor-pointer">
                          <Link href="/contact">Contact Our Experts Now</Link>
                        </button>
                      </div>

                      {/* Right Illustration */}
                      <div className="flex-1 flex justify-center">
                        <img
                          src="/images/vector/team-illustration.avif"
                          alt=" Team collaboration"
                          className="w-full max-w-[360px] object-contain"
                        />
                      </div>

                      {/* Bottom Accent Line */}
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-[#3067FF]" />
                    </div>

                </div>
            </section>
            {/* --- CUSTOM DATABASE MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 ">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800">Request custom database</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-500 transition p-1 hover:bg-slate-100 rounded-full">
                                <FaTimes size={20} />
                            </button>
                        </div>
                        
                        {/* Form */}
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const name = formData.get('name')?.trim();
                            const email = formData.get('email')?.trim();
                            const phone = phoneCode?.trim();
                            const message = formData.get('message')?.trim();
                            const isPhoneValid = phone && phone.replace(/\D/g, '').length > 3;

                            if (!name || !email || !isPhoneValid || !message) {
                                alert("Please fill in all mandatory fields (*).");
                                return;
                            }

                            const payload = {
                                type: 'custom_database',
                                name,
                                email,
                                phone,
                                message
                            };

                            try {
                                const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
                                const res = await fetch(`${API_URL}/api/forms/submit`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ ...payload, source: window.location.hostname })
                                });
                                if (res.ok) {
                                    alert('Request submitted successfully!');
                                    setIsModalOpen(false);
                                } else {
                                    alert('Failed to submit request.');
                                }
                            } catch (error) {
                                console.error('Submission error:', error);
                                alert('An error occurred.');
                            }
                        }} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                                <div className="relative">
                                     <span className="absolute left-3 top-3 text-slate-400"><FaUser /></span>
                                    <input name="name" required type="text" placeholder="Enter your full name" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email <span className="text-red-500">*</span></label>
                                <div className="relative">
                                     <span className="absolute left-3 top-3 text-slate-400"><MdEmail size={18} /></span>
                                    <input name="email" required type="email" placeholder="Enter your email" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition" />
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <PhoneInputField
                                    value={phoneCode}
                                    onChange={(e) => setPhoneCode(e.target.value)}
                                    name="phone"
                                    label="Phone Number"
                                    required
                                />
                            </div>

                             <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Message <span className="text-red-500">*</span></label>
                                <textarea name="message" required placeholder="Enter your message" className="w-full px-4 py-3 border border-slate-200 rounded-lg min-h-[100px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition resize-none"></textarea>
                            </div>

                            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3.5 rounded-lg font-bold uppercase tracking-wide transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 mt-2 cursor-pointer">
                                SUBMIT
                            </button>
                        </form>
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
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition cursor-pointer"
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
                                Download Free Sample
                            </h3>
                            <p className="text-slate-500 text-sm">Enter your details to download the sample list.</p>
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
                                    required
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

export default B2bdatabase;
