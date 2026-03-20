import React from 'react';
import Link from 'next/link';
import { FaTimesCircle } from 'react-icons/fa';

export default function CheckoutCancelPage({ searchParams }) {
    // Next.js page components get searchParams asynchronously in app router or via props depending on configuration
    // We'll safely access it visually 
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-100">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaTimesCircle className="text-5xl text-red-500" />
                </div>
                
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Payment Cancelled</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    Your Stripe checkout session was cancelled. You have not been charged.
                </p>
                
                <div className="flex flex-col gap-3">
                    <Link href="/" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition w-full">
                        Return to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
