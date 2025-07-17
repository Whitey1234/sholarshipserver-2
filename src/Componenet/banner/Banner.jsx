// HomeSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import banner1 from '../../assets/group-diverse-grads-throwing-caps-up-sky.jpg'
import banner2 from '../../assets/group-five-african-college-students-spending-time-together-campus-university-yard-black-afro-friends-studying-education-theme.jpg'
import banner3 from '../../assets/javier-trueba-iQPr1XkF5F0-unsplash.jpg'
import banner4 from '../../assets/mikael-kristenson-3aVlWP-7bg8-unsplash.jpg'


const slides = [
  {
    id: 1,
    image: banner1, // Replace with scholarship-relevant images
    title: 'Unlock Your Future',
    buttonText: 'Apply Now',
    link: '/apply'
  },
  {
    id: 2,
    image: banner2,
    title: 'Get Financial Support for Education',
    buttonText: 'View Scholarships',
    link: '/scholarships'
  },
  {
    id: 3,
    image: banner3,
    title: 'We Believe in You',
    buttonText: 'Join Our Program',
    link: '/register'
  },
  {
    id: 4,
    image: banner4,
    title: 'Scholarships for Everyone',
    buttonText: 'Explore More',
    link: '/programs'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
    title: 'Make Your Dreams a Reality',
    buttonText: 'Start Today',
    link: '/contact'
  },
];

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 my-12">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="rounded-xl shadow-md"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-[400px] bg-cover bg-center flex flex-col justify-center items-center text-white"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/30 shadow-lg p-6 rounded-xl text-center">
                <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                <a href={slide.link} className="btn btn-primary">
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
