import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="text-center">
        {/* Spinner animation */}
        <div className="inline-block relative w-20 h-20">
          <div className="absolute border-4 border-blue-500 rounded-full animate-spin w-full h-full border-t-transparent"></div>
          <div className="absolute border-4 border-blue-300 rounded-full animate-spin w-3/4 h-3/4 border-t-transparent left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animation-delay-100"></div>
          <div className="absolute border-4 border-blue-200 rounded-full animate-spin w-1/2 h-1/2 border-t-transparent left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animation-delay-200"></div>
        </div>

        {/* Optional loading text with fade animation */}
        <p className="mt-4 text-gray-600 font-medium animate-pulse">
          Loading...
        </p>

        {/* Alternative dot wave animation */}
        <div className="flex justify-center mt-6 space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce animation-delay-100"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
        </div>
      </div>
    </div>
  );
}
