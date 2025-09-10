import React, { useMemo, useState } from "react";

interface cartProduitProps {
  image1: string;
    image2?: string;
    image3?: string;
    image?: string;
  title: string;
  price?: number;
  prixPromo?: number;
  description: string;
  onDelete?: () => void;
}

export default function CartProduit({ image1, image2, image3,image, title, description, price, prixPromo, onDelete }: cartProduitProps) {
  const images = useMemo(() => [image, image1, image2, image3].filter(Boolean) as string[], [image, image1, image2, image3]);
  const [current, setCurrent] = useState(0);

  const goPrev = () => {
    setCurrent((idx) => (images.length ? (idx - 1 + images.length) % images.length : 0));
  };

  const goNext = () => {
    setCurrent((idx) => (images.length ? (idx + 1) % images.length : 0));
  };

  return (
    <div>
      

<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        
{images.length > 0 && (
<div id="default-carousel" className="relative w-full">
    {/* Carousel wrapper */}
    <div className="relative h-44 overflow-hidden rounded-lg md:h-92">
        <img src={images[current]} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={title}/>
    </div>
    {/* Slider indicators */}
    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((_, idx) => (
          <button key={idx} type="button" className={`w-3 h-3 rounded-full ${idx === current ? 'bg-white' : 'bg-gray-400'}`} aria-current={idx === current} aria-label={`Slide ${idx+1}`} onClick={() => setCurrent(idx)}></button>
        ))}
    </div>
    {/* <!-- Slider controls --> */}
    <button type="button" onClick={goPrev} className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" onClick={goNext} className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
</div>
)}
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{price}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-through">{prixPromo}</p>
        <button type="button" onClick={onDelete} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Supprimer
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
    </div>
</div>

    </div>
  );
}