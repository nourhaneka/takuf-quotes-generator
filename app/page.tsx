"use client";

import { useState } from "react";
import Image from "next/image";

type Quote = {
  quote: string;
  author: string;
};

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-4 text-center mt-auto">
      <p>© 2025 مولد الاقتباسات العشوائية. جميع الحقوق محفوظة.</p>
    </footer>
  );
};

export default function Home() {
  const [quoteData, setQuoteData] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const response = await fetch("/quotesList.json");
      if (!response.ok) {
        throw new Error("Failed to load quotes.");
      }

      const quotes: Quote[] = await response.json();
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuoteData(randomQuote);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Logo positioned at the top */}
      <div className="absolute top-0 left-0 right-0 flex justify-center pt-6 z-10">
        <Image
          src="/تكيفlogo_ابيض_-removebg-preview.png"
          alt="تكيف Logo"
          width={100}
          height={80}
        />
      </div>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 text-white px-4 pt-24 pb-8 relative">
        {/* Title positioned 5px below the logo */}
        <h1 className="absolute top-[150px] text-3xl font-extrabold text-white text-center mb-4 z-40">
          مولد الاقتباسات العشوائية
        </h1>

        {/* Button positioned 5px below the title */}
        <button
          onClick={fetchQuotes}
          className="absolute top-[205px] bg-white text-blue-500 px-4 py-1 text-2xl rounded-4xl font-semibold hover:bg-yellow-300 hover:text-white transition h-15 min-w-[100px] flex items-center justify-center mb-4 z-20"
          disabled={loading}
        >
          {loading ? "جارِ التحميل..." : "احصل على اقتباس"}
        </button>

        {/* Quote Display with adjusted position */}
        <div className="mt-[130px] text-4xl text-center max-w-lg flex items-center justify-center">
          {quoteData && !loading ? (
            <p>
              {quoteData.quote} <br />
              <strong className="text-yellow-500 text-3xl">{quoteData.author} -</strong>
            </p>
          ) : (
            <p className="text-gray-300">اضغط على الزر للحصول على اقتباس</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
