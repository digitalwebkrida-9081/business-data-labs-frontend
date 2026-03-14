'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaFilter, FaCheckCircle, FaGlobe, FaDatabase, FaEnvelope, FaPhone, FaArrowRight, FaChartLine, FaUserFriends, FaBuilding } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import WhyChoose from '../WhyChoose';
import staticCategories from '../../data/categories.json';

const Locationreport = ({ initialCountrySlug = null }) => {
    const router = useRouter();
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('United States');
    const [datasets, setDatasets] = useState([]);
    const [categories, setCategories] = useState(staticCategories || []);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;
    const [loading, setLoading] = useState(true);

    // Fetch Countries & Categories
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
                const [countryRes] = await Promise.all([
                    fetch(`${API_URL}/api/country/get-countries`)
                ]);

                const countryResult = await countryRes.json();
                
                const fetchedCountries = countryResult.success ? (countryResult.data || []) : [];
                setCountries(fetchedCountries);
                // Categories now loaded statically

                // Handle initial slug logic
                if (initialCountrySlug && fetchedCountries.length > 0) {
                    // Try to find exact match or fuzzy match
                    const decodedSlug = decodeURIComponent(initialCountrySlug).replace(/-/g, ' ');
                    const foundCountry = fetchedCountries.find(c => 
                        (c.country_name || c.name).toLowerCase() === decodedSlug.toLowerCase()
                    );
                    
                    if (foundCountry) {
                        const countryName = foundCountry.country_name || foundCountry.name;
                        setSelectedCountry(countryName);
                        setCountrySearchQuery(countryName); 
                    }
                }

            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };
        fetchData();
    }, [initialCountrySlug]); // valid dependency

    // Fetch Datasets when country changes
    React.useEffect(() => {
        const fetchDatasets = async () => {
            setLoading(true);
            try {
                const query = selectedCountry ? `?country=${encodeURIComponent(selectedCountry)}` : '';
                const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
                const response = await fetch(`${API_URL}/api/scraper/dataset/search${query}`);
                const result = await response.json();
                
                if (result.success) {
                    setDatasets(result.datasets || result.data || []);
                } else {
                    setDatasets([]);
                }
            } catch (error) {
                console.error("Error fetching datasets:", error);
                setDatasets([]);
            } finally {
                setLoading(false);
            }
        };

        if (selectedCountry) {
            fetchDatasets();
        }
    }, [selectedCountry]);
    
    // Update URL when country changes (user interaction)
    const handleCountryChange = (countryName) => {
        setSelectedCountry(countryName);
        setCountrySearchQuery(countryName);
        setIsCountryDropdownOpen(false);
        
        // Update URL
        const slug = countryName.toLowerCase().replace(/\s+/g, '-');
        router.push(`/smartscraper/business-reports/${slug}`);
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // Country Search State
    const [countrySearchQuery, setCountrySearchQuery] = useState('United States');
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

    // Filter Categories
    const filteredCategories = categories.filter(cat => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Filter Countries
    const filteredCountries = countries.filter(c => 
        (c.country_name || c.name).toLowerCase().includes(countrySearchQuery.toLowerCase())
    );

    // Pagination Calculation (based on filtered results)
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    return (
        <div className="bg-white min-h-screen font-sans text-slate-800">
            {/* --- HERO SECTION --- */}
            <div className="relative bg-[#0a1f44] text-white pt-24 pb-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-3/4 h-full pointer-events-none">
                     <svg className="absolute right-0 top-0 h-full w-auto opacity-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                        <circle cx="200" cy="200" r="250" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                    </svg>
                </div>

                <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:w-1/2 mb-12 lg:mb-0">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                            We have compiled a list of well-<br />
                            known websites for <span className="text-blue-400">web<br /> scraping</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
                            A detailed list of businesses with email and phone lists across different domains.
                        </p>
                    </div>
                    
                    {/* Hero Illustration - Using the specific card look from the image */}
                    <div className="lg:w-1/2 flex justify-center relative">
                        {/* Blue Blob Background */}
                        <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full transform scale-75"></div>
                        
                        <div className="text-slate-800 p-4 rounded-xl relative z-10 max-w-sm w-full">
                            <img src="/images/location-hero.png" alt="Hero-img" />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- BADGES / ACCOLADES --- */}
            <div className="container mx-auto px-4 -mt-16 relative z-20">
                <div className="flex flex-wrap justify-center gap-6">
                     <img src="/images/mid-image.png" alt="" />
                </div>
            </div>

            {/* --- DIRECTORY SECTION --- */}
            <div className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-slate-900">
                            List of websites for your <span className="text-blue-600">web scraping & data extraction</span> needs
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block text-center">Search Category</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Type to search categories..." 
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setCurrentPage(1); 
                                            setIsDropdownOpen(true);
                                        }}
                                        onFocus={() => setIsDropdownOpen(true)}
                                        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500"
                                    />
                                    <MdKeyboardArrowDown className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                    
                                    {/* Custom Dropdown List */}
                                    {isDropdownOpen && (
                                        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                            {filteredCategories.length > 0 ? (
                                                filteredCategories.map((cat, idx) => (
                                                    <div 
                                                        key={idx}
                                                        className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer text-slate-700"
                                                        onClick={() => {
                                                            setSearchQuery(cat.name);
                                                            setIsDropdownOpen(false);
                                                            setCurrentPage(1);
                                                        }}
                                                    >
                                                        {cat.name}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-2 text-sm text-slate-400 italic">No categories found</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 relative">
                                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block text-center">Select Country</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Type to search countries..." 
                                        value={countrySearchQuery}
                                        onChange={(e) => {
                                            setCountrySearchQuery(e.target.value);
                                            setIsCountryDropdownOpen(true);
                                        }}
                                        onFocus={() => setIsCountryDropdownOpen(true)}
                                        onBlur={() => setTimeout(() => setIsCountryDropdownOpen(false), 200)}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500"
                                    />
                                    <MdKeyboardArrowDown className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                                    
                                    {/* Custom Country Dropdown List */}
                                    {isCountryDropdownOpen && (
                                        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                            {filteredCountries.length > 0 ? (
                                                filteredCountries.map((c, idx) => {
                                                     const countryName = c.country_name || c.name;
                                                     return (
                                                        <div 
                                                            key={idx}
                                                            className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer text-slate-700"
                                                            onClick={() => {
                                                                handleCountryChange(countryName);
                                                            }}
                                                        >
                                                            {countryName}
                                                        </div>
                                                     );
                                                })
                                            ) : (
                                                <div className="px-4 py-2 text-sm text-slate-400 italic">No countries found</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                         <div className="text-center text-slate-500 py-10">Loading datasets...</div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-y-2 gap-x-8 text-xs text-slate-600 max-w-6xl mx-auto mb-12">
                            {currentCategories.length > 0 ? (
                                currentCategories.map((category) => {
                                    // Find if there's a dataset for this category
                                    const matchedDataset = datasets.find(d => d.category === category.name);
                                    
                                    // Link text format
                                    const linkText = `Business Leads for ${category.name} in ${selectedCountry || 'Country'}`;

                                    return (
                                        <div key={category._id || category.id} className="flex items-center gap-2 py-1 text-[14px]">
                                            <span className={`w-1 h-1 rounded-full shrink-0 ${matchedDataset ? 'bg-slate-800' : 'bg-slate-300'}`}></span>
                                            {matchedDataset ? (
                                                <a href={`/b2b/${matchedDataset.id}`} className="hover:text-blue-600 hover:underline truncate text-slate-700 font-medium">
                                                    {linkText}
                                                </a>
                                            ) : (
                                                <span className="text-slate-400 truncate cursor-not-allowed" title="Data not currently available">
                                                    {linkText}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-3 text-center text-slate-400 italic">
                                    No categories found matching "{searchQuery}"
                                </div>
                            )}
                        </div>
                    )}

                    {/* Pagination - Dynamic Sliding */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                             <button 
                                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-400 text-sm disabled:opacity-50 hover:bg-slate-200 transition"
                             >
                                <MdKeyboardArrowLeft/>
                             </button>
                             
                             {(() => {
                                 const maxButtons = 5;
                                 let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
                                 let endPage = startPage + maxButtons - 1;
                                 
                                 if (endPage > totalPages) {
                                     endPage = totalPages;
                                     startPage = Math.max(1, endPage - maxButtons + 1);
                                 }
                                 
                                 const pages = [];
                                 for (let i = startPage; i <= endPage; i++) {
                                     pages.push(i);
                                 }
                                 
                                 return pages.map(number => (
                                     <button 
                                        key={number} 
                                        onClick={() => setCurrentPage(number)}
                                        className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition ${
                                            currentPage === number 
                                            ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20' 
                                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                        }`}
                                     >
                                        {number}
                                     </button>
                                 ));
                             })()}

                             <button 
                                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-400 text-sm disabled:opacity-50 hover:bg-slate-200 transition"
                             >
                                <MdKeyboardArrowRight/>
                             </button>
                        </div>
                    )}
                </div>
            </div>

            {/* --- Why Choose Us --- */}
            <WhyChoose/>
        </div>
    );
};

export default Locationreport;
