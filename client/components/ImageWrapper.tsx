"use client";

/*
export default function ImageWrapper ({ img1, img2, img3, img4 }: any) {
    return (
        <div><img src={img1} alt="..." /></div>
    )
}
*/

import { useState, useEffect } from 'react';

export default function ImageWrapper({ img1, img2, img3, img4 }: any) {
    const images = [img1, img2, img3, img4];
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
        return () => clearInterval(interval); // Clean up on component unmount
    }, []);

    return (
        <div className="relative w-full max-w-lg mx-auto">
            <div className="overflow-hidden relative h-64">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Slide ${index}`}
                        className={`absolute inset-0 w-full h-full object-contain transition-transform duration-500 ease-in-out ${index === currentIndex ? 'translate-x-0' : 'translate-x-full'}`}
                        style={{
                            transform: `translateX(${(index - currentIndex) * 100}%)`,
                        }}
                    />
                ))}
            </div>
            {/* Left Button */}
            <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 transparent text-white p-2 rounded-full shadow-md hover:bg-gray-800"
            >
                &#10094; {/* Left arrow */}
            </button>
            {/* Right Button */}
            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 transparent text-white p-2 rounded-full shadow-md hover:bg-gray-800"
            >
                &#10095; {/* Right arrow */}
            </button>
        </div>
    );
}
