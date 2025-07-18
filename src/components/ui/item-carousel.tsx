"use client"

import React, { ReactNode } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import {
    Autoplay,
    EffectCoverflow,
    Navigation,
    Pagination,
} from "swiper/modules"

interface ItemCarouselProps {
    children: ReactNode[]
    autoplayDelay?: number
    showPagination?: boolean
    showNavigation?: boolean
}

export const ItemCarousel: React.FC<ItemCarouselProps> = ({
    children,
    autoplayDelay = 5000,
    showPagination = true,
    showNavigation = true,
}) => {
    const css = `
  .swiper {
    width: 100%;
    padding-bottom: 60px;
    padding-top: 60px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 450px;
    height: 450px;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  
  .swiper-pagination-bullet {
    background: white;
    opacity: 0.5;
  }
  
  .swiper-pagination-bullet-active {
    background: #10b981;
    opacity: 1;
  }
  
  .swiper-button-next, .swiper-button-prev {
    color: white;
  }
  `
    return (
        <div className="w-full h-full">
            <style>{css}</style>
            <div className="w-full h-full">
                <Swiper
                    spaceBetween={40}
                    autoplay={{
                        delay: autoplayDelay,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={children.length > 3}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                    }}
                    pagination={showPagination ? {
                        clickable: true,
                    } : false}
                    navigation={showNavigation}
                    modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {children.map((child, index) => (
                        <SwiperSlide key={index} className="max-w-lg">
                            {child}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}