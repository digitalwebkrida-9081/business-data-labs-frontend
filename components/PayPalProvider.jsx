"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PayPalProvider({ children }) {
    const initialOptions = {
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
        currency: "USD",
        intent: "capture",
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            {children}
        </PayPalScriptProvider>
    );
}
