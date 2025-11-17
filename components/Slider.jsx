'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import './slider.css'

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        '/Slider1.jpg',
        '/Slider2.jpg',
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [slides.length])

    const goToSlide = (index) => {
        setCurrentSlide(index)
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    return (
        <div className="slider-container">
            <div className="slider-wrapper">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slider-slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        <Image
                            src={slide}
                            alt={`Slide ${index + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            <button className="slider-btn slider-btn-prev" onClick={prevSlide}>
                &#10094;
            </button>
            <button className="slider-btn slider-btn-next" onClick={nextSlide}>
                &#10095;
            </button>

            <div className="slider-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    )
}