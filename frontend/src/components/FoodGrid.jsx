import React from "react";
import { useNavigate } from "react-router-dom";

function FoodGrid({ title, items = [] }) {
  const navigate = useNavigate();

  return (
    <div className="my-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl font-semibold text-center mb-6">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/category/${item.slug}`)}
            className="cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-[200px] object-cover rounded-lg shadow-md"
            />
            <p className="mt-3 font-semibold text-center text-lg text-gray-600 underline">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodGrid;
