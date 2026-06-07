import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import { getProducts } from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filteredProducts = products.filter((item) => {
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
      <h1 className="text-3xl font-bold mb-2 text-earth">Products</h1>
      <p className="mb-6 max-w-2xl text-earth/80">
        Explore eco-friendly products designed to support sustainable urban living.
      </p>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ItemCard
              key={`product-${product.id}`}
              item={{ ...product, type: "Product" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}