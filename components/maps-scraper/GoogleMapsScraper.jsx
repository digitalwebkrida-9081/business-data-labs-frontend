'use client';

import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaStar, FaExternalLinkAlt, FaGlobe, FaFileExcel, FaFileCode } from 'react-icons/fa';

const GoogleMapsScraper = () => {
    const [formData, setFormData] = useState({
        country: '',
        state: '',
        city: '',
        category: '',
        latitude: '',
        longitude: '',
        radius: 5000
    });
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [files, setFiles] = useState(null);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = async () => {
        const { country, state, city, category } = formData;
        if (!country || !state || !city || !category) {
            setError('Please fill in all fields.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccessMsg('');
        setResults([]);
        setFiles(null);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
            const response = await fetch(`${API_URL}/api/scraper/search-rapid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setResults(data.data || []);
                setFiles(data.files);
                setSuccessMsg(data.message);
            } else {
                setError(data.message || 'Scraping failed');
            }
        } catch (err) {
            setError('An error occurred while fetching data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-800">
            <div className="container mx-auto px-4">
                
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">
                        Google Maps <span className="text-blue-600">Scraper</span>
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Extract business leads by location. Enter details below to fetch and export data.
                    </p>
                </div>

                {/* Search Form */}
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-100 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
                            <input 
                                type="text" 
                                name="country"
                                placeholder="e.g. USA" 
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                value={formData.country}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
                            <input 
                                type="text" 
                                name="state"
                                placeholder="e.g. New York" 
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                value={formData.state}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                            <input 
                                type="text" 
                                name="city"
                                placeholder="e.g. New York" 
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                            <input 
                                type="text" 
                                name="category"
                                placeholder="e.g. Restaurants" 
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                value={formData.category}
                                onChange={handleInputChange}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                    </div>
                    
                    {/* Lat/Long Optional Section */}
                    <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-blue-500"/> 
                            Advanced Location (Optional)
                            <span className="text-xs font-normal text-slate-400 ml-auto">Overrides text location if provided</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-2">Latitude</label>
                                <input 
                                    type="text" 
                                    name="latitude"
                                    placeholder="e.g. 40.7128" 
                                    className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    value={formData.latitude}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-2">Longitude</label>
                                <input 
                                    type="text" 
                                    name="longitude"
                                    placeholder="e.g. -74.0060" 
                                    className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    value={formData.longitude}
                                    onChange={handleInputChange}
                                />
                            </div>
                             <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-2">Radius (Meters)</label>
                                <input 
                                    type="number" 
                                    name="radius"
                                    placeholder="e.g. 5000" 
                                    className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    value={formData.radius}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button 
                            onClick={handleSearch}
                            disabled={loading}
                            className={`px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Scraping...
                                </>
                            ) : (
                                <>
                                    <FaSearch /> Start Scraping
                                </>
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 font-medium">
                            {error}
                        </div>
                    )}

                    {successMsg && (
                        <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg text-sm border border-green-100">
                            <p className="font-bold mb-2">Success! {successMsg}</p>
                            {files && (
                                <div className="flex flex-col gap-2 mt-2">
                                    <div className="flex items-center gap-2">
                                        <FaFileCode className="text-yellow-600"/> 
                                        <span className="font-mono text-xs">{files.json}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaFileExcel className="text-green-600"/> 
                                        <span className="font-mono text-xs">{files.excel}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2 italic">Files are saved on the server at the paths above.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Results Section */}
                {results.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800">Preview Results</h2>
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                                {results.length} Locations Found
                            </span>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-600 text-xs uppercase font-bold tracking-wider">
                                        <th className="p-4 border-b border-slate-200">Business Name</th>
                                        <th className="p-4 border-b border-slate-200">Rating</th>
                                        <th className="p-4 border-b border-slate-200">Address / Info</th>
                                        <th className="p-4 border-b border-slate-200 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {results.map((place, index) => (
                                        <tr key={index} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4 font-medium text-slate-900">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                                        <FaMapMarkerAlt />
                                                    </div>
                                                    {place.name}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1 text-yellow-500 font-medium">
                                                    <FaStar />
                                                    <span className="text-slate-700">{place.rating || 'N/A'}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-slate-500 text-sm max-w-xs truncate">
                                                {place.full_address || place.address || 'N/A'}
                                            </td>
                                            <td className="p-4 text-right">
                                                {place.google_maps_url || place.url ? (
                                                     <a 
                                                     href={place.google_maps_url || place.url} 
                                                     target="_blank" 
                                                     rel="noopener noreferrer"
                                                     className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition"
                                                 >
                                                     View on Maps <FaExternalLinkAlt className="text-xs" />
                                                 </a>
                                                ) : <span className="text-xs text-slate-400">No Link</span>}
                                               
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Empty State / Initial Placeholder */}
                {!loading && results.length === 0 && !error && !successMsg && (
                    <div className="text-center py-20 opacity-50">
                        <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl text-slate-300">
                            <FaGlobe />
                        </div>
                        <p className="text-slate-400">Enter location details to start scraping...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoogleMapsScraper;
