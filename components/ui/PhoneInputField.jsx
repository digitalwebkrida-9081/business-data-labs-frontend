'use client';

import React, { useState, useEffect } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

/**
 * A reusable phone input field with flags and country-specific validation/masking.
 * Uses react-international-phone under the hood.
 */
const PhoneInputField = ({ 
    value, 
    onChange, 
    name = "phone", 
    label = "Phone Number", 
    required = false,
    className = "",
    placeholder = "Enter phone number"
}) => {
    const [country, setCountry] = useState(null);

    // Detect user's country code based on IP address on mount
    useEffect(() => {
        const detectCountry = async () => {
            try {
                // Try ipapi.co first
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                if (data.country_code) {
                    setCountry(data.country_code.toLowerCase());
                    return;
                }
            } catch (error) {
                try {
                    // Fallback to ip-api.com
                    const response = await fetch('http://ip-api.com/json');
                    const data = await response.json();
                    if (data.countryCode) {
                        setCountry(data.countryCode.toLowerCase());
                        return;
                    }
                } catch (e) {}
            }
            // Final fallback to India if all else fails
            setCountry('in');
        };
        detectCountry();
    }, []);

    // Helper to check if the phone number is valid enough to be considered "complete"
    const isPhoneNumberValid = (phone) => {
        if (!phone) return false;
        const digitsOnly = phone.replace(/\D/g, '');
        return digitsOnly.length >= 8; 
    };

    if (!country) {
        return (
            <div className={`w-full ${className}`}>
                 {label && (
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )}
                <div className="w-full h-[50px] bg-slate-50 animate-pulse rounded-md border border-gray-100"></div>
            </div>
        );
    }

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className={`phone-input-container relative group`}>
                <PhoneInput
                    key={country}
                    defaultCountry={country}
                    value={value}
                    forceDialCode={true}
                    onChange={(phone) => onChange({ target: { name, value: phone } })}
                    placeholder={placeholder}
                    inputClassName="w-full !rounded-r-md !border !border-glass !px-4 !py-3 !text-sm focus:!ring-2 focus:!ring-indigo-500/30 !outline-none !h-auto !transition-all !bg-elevated !text-white"
                    countrySelectorStyleProps={{
                        buttonClassName: "!border !border-glass !rounded-l-md !px-3 !py-3 !h-auto !flex !items-center !justify-center transition-colors",
                        buttonContentClassName: "!flex !items-center !gap-1"
                    }}
                    containerClassName="!flex !w-full shadow-sm rounded-md"
                />
                
                {/* Hidden input for native browser validation */}
                {required && (
                    <input
                        type="text"
                        value={isPhoneNumberValid(value) ? value : ""}
                        required
                        readOnly
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: "50%",
                            width: "1px",
                            height: "1px",
                            opacity: 0,
                            pointerEvents: "none",
                        }}
                        tabIndex={-1}
                        onInvalid={(e) => e.target.setCustomValidity('Please enter a valid, complete phone number.')}
                        onInput={(e) => e.target.setCustomValidity('')}
                    />
                )}
            </div>
            <style jsx global>{`
                .react-international-phone-input-container {
                    width: 100% !important;
                }
                .react-international-phone-input {
                    width: 100% !important;
                    background-color: var(--bg-elevated) !important;
                    border-radius: 0 12px 12px 0 !important;
                    border: 1px solid var(--border-glass) !important;
                    border-left: none !important;
                    color: white !important;
                }
                .react-international-phone-country-selector-button {
                    background-color: var(--bg-elevated) !important;
                    border: 1px solid var(--border-glass) !important;
                    border-right: none !important;
                    border-radius: 12px 0 0 12px !important;
                    padding: 0 12px !important;
                }
                .react-international-phone-country-selector-button:focus-within {
                    z-index: 10;
                    border-color: var(--accent-primary) !important;
                }
                .react-international-phone-input:focus {
                    border-color: var(--accent-primary) !important;
                    box-shadow: 0 0 0 3px var(--glow-primary) !important;
                }
            `}</style>
        </div>
    );
};

export default PhoneInputField;

