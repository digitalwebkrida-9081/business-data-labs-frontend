"use client";
import { useState } from "react";

export default function Newsletter(){

  return (
    <>
    <div className="bg-slate-950 py-1">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-l  mb-2"><span className="text-white">Looking for other datasets ? </span> <span className="text-blue-500 font-bold cursor-pointer" onClick={() => window.location.href = "/contact"}> Contact Us </span></h2>
       
        
      </div>
    </div>  
</>
  );
}
