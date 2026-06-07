import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import { getWorkshops } from "../services/api";

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getWorkshops().then(setWorkshops);
  }, []);

  const filteredWorkshops = workshops.filter((item) => {
  const categoryMatch =
  selectedCategory === "All"
    ? true
    : selectedCategory === "Available"
    ? item.availability
    : item.category.toLowerCase() === selectedCategory.toLowerCase();

    const searchValue = searchTerm.toLowerCase();

    const searchMatch =
      item.title.toLowerCase().includes(searchValue) ||
      item.category.toLowerCase().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue);

    return categoryMatch && searchMatch;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-earth dark:text-white">
        Workshops
      </h1>

      <p className="mb-6 max-w-2xl text-earth/80 dark:text-slate-300">
        Join practical workshops on urban gardening, composting, and
        sustainable living.
      </p>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredWorkshops.length === 0 ? (
        <p>No workshops found.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorkshops.map((workshop) => (
            <ItemCard
              key={`workshop-${workshop.id}`}
              item={{ ...workshop, type: "Workshop" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}