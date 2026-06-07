import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import { getEvents } from "../services/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  const filteredEvents = events.filter((item) => {
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
        Events
      </h1>

      <p className="mb-6 max-w-2xl text-earth/80 dark:text-slate-300">
        Discover local eco events, markets, and community sustainability
        activities.
      </p>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <ItemCard
              key={`event-${event.id}`}
              item={{ ...event, type: "Event" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}