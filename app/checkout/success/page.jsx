'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaSpinner, FaDownload, FaExclamationCircle } from 'react-icons/fa';

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const datasetId = searchParams.get('dataset_id');

    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Verifying your payment and preparing your data...');

    useEffect(() => {
        if (!sessionId || !datasetId) {
            setStatus('error');
            setMessage('Invalid checkout session. Missing required parameters.');
            return;
        }

        const verifyAndDownload = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
                const response = await fetch(`${API_URL}/api/stripe/verify-session-and-download`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ session_id: sessionId, dataset_id: datasetId })
                });

                if (response.ok) {
                    setStatus('success');
                    setMessage('Payment verified successfully! Your download should start automatically.');
                    
                    // Trigger download
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${datasetId}.xlsx`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                } else {
                    const errorData = await response.json();
                    setStatus('error');
                    setMessage(errorData.message || 'Payment verification failed. Please contact support.');
                }
            } catch (error) {
                console.error('Verification error:', error);
                setStatus('error');
                setMessage('An error occurred while preparing your download. Please contact support.');
            }
        };

        verifyAndDownload();
    }, [sessionId, datasetId]);

    return (
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full text-center border border-slate-100">
            {status === 'verifying' && (
                <div className="flex flex-col items-center">
                    <FaSpinner className="text-4xl text-blue-500 animate-spin mb-6" />
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Processing Payment...</h2>
                    <p className="text-slate-500">{message}</p>
                </div>
            )}

            {status === 'success' && (
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <FaCheckCircle className="text-5xl text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">Payment Successful!</h2>
                    <p className="text-slate-600 mb-8">{message}</p>
                    
                    <div className="bg-slate-50 p-6 rounded-xl w-full border border-slate-100 mb-8 text-left">
                        <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><FaDownload className="text-blue-500"/> Download Instructions</h3>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                            Your dataset file should start downloading automatically. If it didn't, we've also securely logged your purchase. Check your email for a receipt.
                        </p>
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        <Link href="/" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition w-full">
                            Return to Home
                        </Link>
                    </div>
                </div>
            )}

            {status === 'error' && (
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <FaExclamationCircle className="text-5xl text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Something went wrong</h2>
                    <p className="text-slate-600 mb-8">{message}</p>
                    
                    <Link href="/b2b" className="bg-slate-800 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-900 transition w-full">
                        Browse Other Datasets
                    </Link>
                </div>
            )}
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Suspense fallback={
                <div className="text-center p-12">
                     <FaSpinner className="text-4xl text-blue-500 animate-spin mx-auto mb-4" />
                     <p>Loading...</p>
                </div>
            }>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
