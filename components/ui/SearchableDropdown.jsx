
import React, { useState, useEffect, useRef } from 'react';
import { MdKeyboardArrowDown, MdSearch } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';

const SearchableDropdown = ({ 
    options = [], 
    value, 
    onChange, 
    placeholder = "Select...", 
    disabled = false,
    label,
    name
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const lowerTerm = searchTerm.toLowerCase();
        const filtered = options.filter(option => 
            (option.label || option).toLowerCase().includes(lowerTerm)
        );

        // Sort results: Exact match > Starts with > Contains
        filtered.sort((a, b) => {
            const labelA = (a.label || a).toLowerCase();
            const labelB = (b.label || b).toLowerCase();

            // 1. Exact match
            if (labelA === lowerTerm && labelB !== lowerTerm) return -1;
            if (labelB === lowerTerm && labelA !== lowerTerm) return 1;

            // 2. Starts with
            const aStarts = labelA.startsWith(lowerTerm);
            const bStarts = labelB.startsWith(lowerTerm);
            if (aStarts && !bStarts) return -1;
            if (bStarts && !aStarts) return 1;

            return 0; 
        });

        setFilteredOptions(filtered);
    }, [searchTerm, options]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSelect = (optionValue) => {
        onChange({ target: { name, value: optionValue } });
        setIsOpen(false);
        setSearchTerm('');
    };

    const getDisplayValue = () => {
        if (!value) return "";
        // If options are objects { label, value }, find match. If strings, use value.
        const found = options.find(o => (o.value || o) === value);
        if (!found) return value;
        return found.label || found;
    };

    return (
        <div className="relative" ref={wrapperRef}>
            {label && <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">{label}</label>}
            
            <div 
                className={`w-full border border-slate-300 rounded-lg bg-white relative ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <div className="pl-4 pr-10 py-2 text-sm min-h-[38px] flex items-center">
                    {value ? (
                        <span className="text-slate-800">{getDisplayValue()}</span>
                    ) : (
                        <span className="text-slate-400">{placeholder}</span>
                    )}
                </div>
                
                {/* Clear Button */}
                {value && !disabled && (
                    <div 
                        className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-500 p-1 cursor-pointer z-10 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange({ target: { name, value: '' } });
                            setSearchTerm('');
                        }}
                    >
                        <FaTimes size={14} />
                    </div>
                )}

                <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg pointer-events-none" />
            </div>

            {isOpen && !disabled && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-hidden flex flex-col">
                    <div className="p-2 border-b border-slate-100 sticky top-0 bg-white">
                        <div className="relative">
                            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text"
                                className="w-full pl-9 pr-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-blue-400"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                autoFocus
                            />
                        </div>
                    </div>
                    
                    <div className="overflow-y-auto flex-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, idx) => {
                                const optValue = option.value || option;
                                const optLabel = option.label || option;
                                const isSelected = optValue === value;
                                return (
                                    <div 
                                        key={idx}
                                        className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-blue-50 transition border-b border-slate-50 last:border-0 ${isSelected ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600'}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelect(optValue);
                                        }}
                                    >
                                        {optLabel}
                                    </div>
                                );
                            })
                        ) : (
                            <>
                                {searchTerm && (
                                    <div 
                                        className="px-4 py-2.5 text-sm cursor-pointer hover:bg-blue-50 transition text-blue-600 font-medium border-b border-slate-50"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelect(searchTerm);
                                        }}
                                    >
                                        Use "{searchTerm}"
                                    </div>
                                )}
                                <div className="p-4 text-center text-xs text-slate-400">
                                    No options found
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchableDropdown;
