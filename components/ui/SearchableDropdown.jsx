
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

        filtered.sort((a, b) => {
            const labelA = (a.label || a).toLowerCase();
            const labelB = (b.label || b).toLowerCase();
            if (labelA === lowerTerm && labelB !== lowerTerm) return -1;
            if (labelB === lowerTerm && labelA !== lowerTerm) return 1;
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
        const found = options.find(o => (o.value || o) === value);
        if (!found) return value;
        return found.label || found;
    };

    return (
        <div className="relative" ref={wrapperRef}>
            {label && <label className="text-xs font-bold uppercase tracking-wider mb-1 block" style={{ color: 'var(--text-muted)' }}>{label}</label>}
            
            <div 
                className={`w-full rounded-xl relative transition-all duration-200 ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-indigo-500/40'}`}
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-glass)' }}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <div className="pl-4 pr-10 py-2.5 text-sm min-h-[40px] flex items-center">
                    {value ? (
                        <span style={{ color: 'var(--text-primary)' }}>{getDisplayValue()}</span>
                    ) : (
                        <span style={{ color: 'var(--text-muted)' }}>{placeholder}</span>
                    )}
                </div>
                
                {/* Clear Button */}
                {value && !disabled && (
                    <div 
                        className="absolute right-8 top-1/2 -translate-y-1/2 p-1 cursor-pointer z-10 transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange({ target: { name, value: '' } });
                            setSearchTerm('');
                        }}
                    >
                        <FaTimes size={12} />
                    </div>
                )}

                <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none" style={{ color: 'var(--text-muted)' }} />
            </div>

            {isOpen && !disabled && (
                <div className="absolute z-50 w-full mt-1.5 rounded-xl shadow-2xl max-h-60 overflow-hidden flex flex-col animate-scaleIn"
                     style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-glass)' }}>
                    <div className="p-2 sticky top-0" style={{ borderBottom: '1px solid var(--border-glass)', background: 'var(--bg-elevated)' }}>
                        <div className="relative">
                            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                            <input 
                                type="text"
                                className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg focus:outline-none transition-all"
                                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)', color: 'var(--text-primary)' }}
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
                                        className="px-4 py-2.5 text-sm cursor-pointer transition-all duration-150"
                                        style={{ 
                                            borderBottom: '1px solid rgba(255,255,255,0.03)',
                                            background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                                            color: isSelected ? '#818CF8' : 'var(--text-secondary)',
                                            fontWeight: isSelected ? 600 : 400
                                        }}
                                        onMouseEnter={(e) => { if(!isSelected) e.target.style.background = 'rgba(255,255,255,0.05)'; }}
                                        onMouseLeave={(e) => { if(!isSelected) e.target.style.background = 'transparent'; }}
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
                                        className="px-4 py-2.5 text-sm cursor-pointer font-medium transition-all"
                                        style={{ color: '#818CF8', borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                                        onMouseEnter={(e) => e.target.style.background = 'rgba(99, 102, 241, 0.08)'}
                                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelect(searchTerm);
                                        }}
                                    >
                                        Use "{searchTerm}"
                                    </div>
                                )}
                                <div className="p-4 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
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
