import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const recipes = [
  { title: "Spaghetti with Tomato Sauce", image: "/Homepage/ItalianF.svg" },
  { title: "Pancake", image: "/Homepage/Pancake.svg" },
  { title: "Lasagna", image: "/Homepage/lasagna.svg" },
];

const RecipeCard = () => {
  const cardRef = useRef();

  const scroll = (direction) => {
    const { current } = cardRef;
    if (!current) return;
    const scrollAmount = 300;
    current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-10 lg:max-w-2xl">
      <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full border p-2">
        < FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div
        ref={cardRef}
        className="flex overflow-x-auto gap-4 no-scrollbar scroll-smooth px-10"
      >
        {recipes.map((item, index) => (
          <div key={index} className="min-w-[180px] bg-white rounded-lg border overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
            <div className="text-center p-2 text-sm font-medium">{item.title}</div>
          </div>
        ))}
      </div>

      <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full border p-2">
        < FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default RecipeCard;
