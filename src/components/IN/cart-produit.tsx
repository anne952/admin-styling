import React, { useMemo, useState, useEffect } from "react";

interface CartProduitProps {
  image?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  title: string;
  price?: number;
  prixPromo?: number;
  description: string;
  onDelete?: () => void;
}

export default function CartProduit({
  image,
  image1,
  image2,
  image3,
  title,
  description,
  price,
  prixPromo,
  onDelete,
}: CartProduitProps) {
  const images = useMemo(
    () => [image, image1, image2, image3].filter(Boolean) as string[],
    [image, image1, image2, image3]
  );

  const [current, setCurrent] = useState(0);
  const [currentSrc, setCurrentSrc] = useState("/image/placeholder.jpg");

  useEffect(() => {
    if (images.length > 0 && images[current]) {
      setCurrentSrc(images[current]);
    } else {
      setCurrentSrc("/image/placeholder.jpg");
    }
  }, [images, current]);



  const goPrev = () =>
    setCurrent((idx) =>
      images.length ? (idx - 1 + images.length) % images.length : 0
    );

  const goNext = () =>
    setCurrent((idx) => (images.length ? (idx + 1) % images.length : 0));

  let imgSrc = "/image/placeholder.jpg";
  try {
    imgSrc = typeof currentSrc === 'string' ? currentSrc.replace('https://', 'http://') : currentSrc;
  } catch (e) {
    console.error('Erreur de traitement de l\'image:', e);
  }

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {images.length > 0 && (
        <div className="relative w-full">
          <div className="relative h-44 overflow-hidden rounded-lg md:h-92">
            <img
              src={imgSrc}
              onError={() => setCurrentSrc("/image/placeholder.jpg")}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
              alt={title}
            />
          </div>

          {/* Indicateurs */}
          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`w-3 h-3 rounded-full ${
                  idx === current ? "bg-white" : "bg-gray-400"
                }`}
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>

          {/* Boutons précédent/suivant */}
          <button type="button" onClick={goPrev} className="absolute top-0 start-0">
            ◀
          </button>
          <button type="button" onClick={goNext} className="absolute top-0 end-0">
            ▶
          </button>
        </div>
      )}

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 text-gray-700 dark:text-gray-400">{description}</p>
        <p className="mb-1 text-gray-700 dark:text-gray-400">{price} €</p>
        {prixPromo && (
          <p className="mb-3 text-gray-500 line-through">{prixPromo} €</p>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
          >
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
}
