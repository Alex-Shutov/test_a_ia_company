"use client";

import { useState } from "react";
import Image from "next/image";
export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [currIndex, setCurrIndex] = useState(0);
  const image = images[currIndex];

  if (!image) {
    return (
      <div className="grid aspect-4/5 place-items-center rounded-xl bg-zinc-100">
        Нет фото
      </div>
    );
  }

  function moveNext() {
    setCurrIndex((prev) => prev + 1);
  }

  function movePrev() {
    setCurrIndex((prev) => prev - 1);
  }

  return (
    <>
      <div className="relative aspect-5/4   overflow-hidden rounded-xl bg-white">
        <div
          className="flex flex-row h-full transition-transform duration-400 ease-out"
          style={{ transform: `translateX(${-currIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div
              key={`${img}-${index}`}
              aria-hidden={index !== currIndex}
              className="relative h-full w-full shrink-0"
            >
              <Image
                src={img}
                alt={`${name} — фото ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Предыдущее фото"
              disabled={currIndex === 0}
              onClick={() => setCurrIndex((prev) => Math.max(0, prev - 1))}
              className={`absolute top-1/2 p-4 flex flex-row justify-center rounded-full bg-white text-xl text-zinc-950 shadow-lg hover:outline left-3`}
            >
              ←
            </button>

            <button
              type="button"
              aria-label="Следующее фото"
              disabled={currIndex === images.length - 1}
              onClick={() =>
                setCurrIndex((prev) => Math.min(images.length - 1, prev + 1))
              }
              className={`absolute top-1/2 p-4 flex flex-row justify-center rounded-full bg-white text-xl text-zinc-950 shadow-lg hover:outline right-3`}
            >
              →
            </button>
            <span aria-live="polite">
              {currIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>
    </>
  );
}
