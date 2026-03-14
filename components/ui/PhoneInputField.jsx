'use client';

import React from 'react';
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
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-800 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="phone-input-container">
                <PhoneInput
                    defaultCountry="in"
                    value={value}
                    onChange={(phone) => onChange({ target: { name, value: phone } })}
                    placeholder={placeholder}
                    inputClassName="w-full !rounded-md !border !border-gray-200 !px-4 !py-3 !text-sm focus:!ring-2 focus:!ring-blue-500 !outline-none !h-auto"
                    countrySelectorStyleProps={{
                        buttonClassName: "!bg-gray-50 !border !border-gray-200 !rounded-l-md !px-3 !py-3 !h-auto !flex !items-center !justify-center",
                        buttonContentClassName: "!flex !items-center !gap-1"
                    }}
                    containerClassName="!flex !w-full"
                />
            </div>
            <style jsx global>{`
                .react-international-phone-input-container {
                    width: 100% !important;
                }
                .react-international-phone-input {
                    width: 100% !important;
                    border-radius: 0 0.375rem 0.375rem 0 !important;
                    border-left: none !important;
                }
                .react-international-phone-country-selector-button {
                    border-right: none !important;
                }
            `}</style>
        </div>
    );
};

export default PhoneInputField;
