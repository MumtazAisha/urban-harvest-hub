export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = ["All", "Food", "Lifestyle", "Education", "Available", ];

  return (
    <div className="mb-6">
      <p className="mb-2 font-medium text-earth">Filter by category</p>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter items by category"
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            aria-pressed={selectedCategory === category}
            className={`rounded-full border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-offset-2 ${
              selectedCategory === category
                ? "border-leaf bg-leaf text-white"
                : "border-earth/30 bg-white text-earth hover:border-leaf"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}