'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    FaSearch, FaFilter, FaCheckCircle, FaGlobe, FaDatabase, FaEnvelope, 
    FaPhone, FaArrowRight, FaChartLine, FaUserFriends, FaBuilding,
    FaStar, FaDownload, FaLock, FaMapMarkerAlt, FaUser, FaTimes, FaShoppingCart
} from 'react-icons/fa';
import { MdEmail, MdPhone, MdKeyboardArrowRight, MdKeyboardArrowDown, MdVerified, MdLocationOn } from 'react-icons/md';
import PhoneInputField from '../ui/PhoneInputField';

const B2bDomainLeads = ({ country = "United States" }) => {
    const [dataset, setDataset] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phoneNumber: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handlePurchase = (e) => {
        e.preventDefault();
        alert(`Purchase initiated for ${form.fullName}. This is a simulation.`);
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Simulate fetching data for the specific country/domain
                await new Promise(resolve => setTimeout(resolve, 800));
                
                const simulatedData = {
                    id: 'domain-' + country.toLowerCase().replace(/\s+/g, '-'),
                    category: 'Businesses',
                    location: country,
                    records: (Math.floor(Math.random() * 100) + 50) + ",000",
                    totalRecords: (Math.floor(Math.random() * 100) + 50) + ",000",
                    emailCount: (Math.floor(Math.random() * 80) + 20) + ",000",
                    price: "$299",
                    lastUpdate: new Date().toLocaleDateString(),
                    sampleList: Array.from({ length: 10 }, (_, j) => ({
                        name: `Business Store ${j + 1}`,
                        address: `${Math.floor(Math.random() * 999) + 1} Main St`,
                        city: 'Major City',
                        state: 'State',
                        country: country,
                        email: 'available',
                        phone: 'available',
                        rating: (Math.random() * 2 + 3).toFixed(1),
                        reviews: Math.floor(Math.random() * 100).toString()
                    }))
                };
                setDataset(simulatedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching domain leads data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [country]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading B2B leads for {country}...</div>;
    }

    if (!dataset) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">Data not available for {country}.</div>;
    }

    return (
        <div className="bg-white min-h-screen font-sans text-slate-800">
            {/* --- HERO SECTION --- (From B2bdatabase.jsx) */}
            <div className="relative bg-[#0a1f44] text-white pt-20 pb-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                     <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#4F46E5" d="M42.7,-62.9C50.9,-52.8,50.1,-34.4,51.7,-19.2C53.4,-4,57.4,8,54,18.7C50.6,29.4,39.8,38.8,28.5,45.6C17.2,52.4,5.4,56.6,-7.1,58.8C-19.6,61,-32.8,61.2,-43.3,54.7C-53.8,48.2,-61.6,35,-65.4,20.9C-69.2,6.8,-69,-8.2,-63.3,-21.3C-57.6,-34.4,-46.4,-45.6,-34.8,-53.9C-23.2,-62.2,-11.6,-67.6,2.2,-71C16,-74.4,32,-75.8,42.7,-62.9Z" transform="translate(100 100)" />
                    </svg>
                </div>

                <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:w-1/2 mb-10 lg:mb-0">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                            Discover authentic, sales-<br />
                            qualified <span className="text-blue-400">B2B leads in {country}</span>
                        </h1>
                        <p className="text-slate-300 text-lg mb-8 max-w-lg">
                            Access verified emails, phone numbers, and key decision-maker data for businesses across {country}.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 mb-8 text-sm">
                            <div className="flex items-center gap-2 text-green-400">
                                <FaCheckCircle /> <span>{dataset.totalRecords} Phone verified listings</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-400">
                                <FaCheckCircle /> <span>{dataset.emailCount} Email verified stores</span>
                            </div>
                        </div>

                         <div className="flex gap-4">
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition shadow-lg shadow-blue-600/30 cursor-pointer"
                            >
                                <FaDownload /> Buy {country} Dataset
                            </button>
                        </div>
                    </div>
                    
                    <div className="lg:w-1/2 flex justify-center">
                        <div className="p-2 rounded-xl ">
                             <img 
                                src="/images/b2b-hero.png" 
                                alt="Dashboard Preview" 
                                className="rounded-lg shadow-lg max-w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- LOGO BAR --- (From B2bDatasetDetail.jsx) */}
            <div className="bg-[#0f2a5a] py-6 border-b border-white/10">
                <div className="container mx-auto px-4 flex justify-between items-center opacity-40 grayscale filter gap-8 overflow-x-auto">
                     <span className="text-white font-bold text-xl">Walmart</span>
                     <span className="text-white font-bold text-xl">JLL</span>
                     <span className="text-white font-bold text-xl">Citi</span>
                     <span className="text-white font-bold text-xl">KPMG</span>
                     <span className="text-white font-bold text-xl">Kroger</span>
                </div>
            </div>

            {/* --- DATA TABLE SECTION --- (From B2bDatasetDetail.jsx) */}
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
                                     <th className="p-3 whitespace-nowrap">Email</th>
                                     <th className="p-3 whitespace-nowrap">Phone</th>
                                     <th className="p-3 whitespace-nowrap">Rating (0-5)</th>
                                     <th className="p-3 whitespace-nowrap">Reviews</th>
                                     <th className="p-3 whitespace-nowrap text-center">Action</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 {dataset.sampleList.map((row, idx) => (
                                     <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition">
                                         <td className="p-3 font-medium text-slate-700">{row.name}</td>
                                         <td className="p-3 text-slate-500 truncate max-w-[150px]">{row.address}</td>
                                         <td className="p-3 text-slate-500">{row.city}</td>
                                         <td className="p-3 text-slate-500">{row.state}</td>
                                         <td className="p-3 text-slate-500">{row.country}</td>
                                         <td className="p-3 text-slate-500 flex items-center gap-1"><MdEmail className="text-blue-400"/> {row.email ? 'Available' : '--'}</td>
                                         <td className="p-3 text-slate-500 flex items-center gap-1"><MdPhone className="text-green-500"/> {row.phone ? 'Available' : '--'}</td>
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
                                 onClick={() => setIsModalOpen(true)}
                                 className="bg-white border border-slate-300 text-slate-700 px-6 py-2 rounded text-sm font-bold hover:bg-slate-50 transition cursor-pointer">
                                    Request Sample
                                </button>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>

            {/* --- VALUE PROPOSITION SECTION --- (From B2bDatasetDetail.jsx) */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-bold text-slate-900">How Business Data Labs Helps Your Business Grow</h2>
                        <p className="text-slate-500 mt-2">Strategic advantages of using our curated B2B datasets.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm mb-6 text-2xl text-blue-600">
                                <FaEnvelope />
                            </div>
                            <h3 className="font-bold text-lg mb-3">Re-target Campaigns</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Reach the right inbox at the right time with verified data.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm mb-6 text-2xl text-purple-600">
                                <FaLock />
                            </div>
                            <h3 className="font-bold text-lg mb-3">Cold Calling Impact</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Connect directly with decision makers using verified phone numbers.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm mb-6 text-2xl text-green-600">
                                <FaMapMarkerAlt />
                            </div>
                            <h3 className="font-bold text-lg mb-3">Geographic Targeting</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Precise location data for targeted regional outreach.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- STATS SECTION --- (From B2bDatasetDetail.jsx) */}
            <div className="py-16 bg-slate-50">
                 <div className="container mx-auto px-4 border-b border-slate-200 pb-16">
                     <div className="text-center mb-12">
                         <h2 className="text-2xl font-bold">Leads breakdown for {country}</h2>
                         <p className="text-slate-500 mt-2">Total of {dataset.totalRecords} verified records available.</p>
                     </div>
                     
                     <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                            <div className="text-blue-600 text-4xl mb-4 flex justify-center"><FaPhone/></div>
                            <h4 className="font-bold text-slate-700 mb-2">Verified Phone Numbers</h4>
                            <div className="text-5xl font-black text-slate-800 mb-4">{dataset.totalRecords}</div>
                        </div>
                         <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                            <div className="text-blue-600 text-4xl mb-4 flex justify-center"><MdEmail/></div>
                            <h4 className="font-bold text-slate-700 mb-2">Verified Email Addresses</h4>
                            <div className="text-5xl font-black text-slate-800 mb-4">{dataset.emailCount}</div>
                        </div>
                     </div>
                 </div>

                 {/* Unlock Monthly Insights */}
                 <div className="container mx-auto px-4 py-16 text-center">
                     <h2 className="text-2xl font-bold mb-8">Unlock Monthly Insights for Explosive Growth</h2>
                     <div className="space-y-4 max-w-2xl mx-auto">
                         <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-sm font-medium text-slate-600">
                             Fresh data delivered every 30 days to keep your pipeline full.
                         </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-sm font-medium text-slate-600">
                             Track competitors and analyze market saturation in real-time.
                         </div>
                     </div>
                 </div>
            </div>

            {/* --- SPECIAL FEATURES --- (From B2bDatasetDetail.jsx) */}
            <div className="bg-blue-50/50 py-16">
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

            {/* --- LISTS SECTION --- (From B2bdatabase.jsx) */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-center mb-8">
                            Business leads by State in {country}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm max-w-4xl mx-auto">
                            {['Alabama', 'California', 'Florida', 'Georgia', 'Illinois', 'New York', 'Texas'].map(c => (
                                <Link key={c} href="#" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition">
                                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                                    Business Leads in {c}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- STATS / BEYOND LEADS --- (From B2bdatabase.jsx) */}
            <div className="bg-slate-50 py-16">
                 <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                         <h3 className="text-2xl font-bold mb-4">Beyond Just Leads</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-blue-600 text-white p-8 rounded-xl relative overflow-hidden group">
                           <div className="relative z-10">
                                <h4 className="text-lg font-medium opacity-90 mb-2">Close Faster</h4>
                                <div className="text-5xl font-bold mb-2">62%</div>
                           </div>
                           <FaChartLine className="absolute bottom-4 right-4 text-blue-500 text-8xl opacity-30 group-hover:scale-110 transition-transform" />
                        </div>
                         <div className="bg-blue-600 text-white p-8 rounded-xl relative overflow-hidden group">
                           <div className="relative z-10">
                                <h4 className="text-lg font-medium opacity-90 mb-2">Save Budgets</h4>
                                <div className="text-5xl font-bold mb-2">3x</div>
                           </div>
                           <FaDatabase className="absolute bottom-4 right-4 text-blue-500 text-8xl opacity-30 group-hover:scale-110 transition-transform" />
                        </div>
                         <div className="bg-blue-600 text-white p-8 rounded-xl relative overflow-hidden group">
                           <div className="relative z-10">
                                <h4 className="text-lg font-medium opacity-90 mb-2">Attract Customers</h4>
                                <div className="text-5xl font-bold mb-2">74%</div>
                           </div>
                           <FaUserFriends className="absolute bottom-4 right-4 text-blue-500 text-8xl opacity-30 group-hover:scale-110 transition-transform" />
                        </div>
                    </div>
                 </div>
            </div>

            {/* --- CTA SECTION --- (From B2bdatabase.jsx) */}
            <div className="bg-white py-20 border-b border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="bg-slate-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="md:w-2/3">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">
                                Harness the Power of <span className="text-blue-600">Business Data Labs</span>
                            </h2>
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                Our web scraping services collect data and convert it into standardized CSV, Excel, and JSON formats.
                            </p>
                            <button className="bg-blue-600 text-white px-8 py-3.5 rounded-lg font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer">
                                <Link href="/contact">Contact Our Experts Now </Link>
                            </button>
                        </div>
                        <div className="md:w-1/3 flex justify-center">
                            <div className="relative">
                                <img src="/images/vector/team-illustration.png" alt="team-illustration" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- PURCHASE MODAL --- (From B2bDatasetDetail.jsx) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                        <div className="flex justify-center mb-6">
                            <img src="/images/logo.jpg" alt="logo" className='w-10 ' />
                            <div className="flex items-center gap-2 text-slate-900 font-bold text-2xl ml-2">
                                Data Scraper Hub
                            </div>
                        </div>
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                Purchase lead list for <span className="text-blue-600">{country}</span> ({dataset.price})
                            </h3>
                            <p className="text-slate-500 text-sm">Fill in the below details</p>
                        </div>
                        <form onSubmit={handlePurchase} className="space-y-4">
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
                                <FaShoppingCart className="text-sm" />
                                BUY NOW
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default B2bDomainLeads;
