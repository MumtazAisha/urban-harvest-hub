export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <label className="mb-6 block">
      <span className="mb-2 block font-medium text-earth">
        Search products
      </span>

      <input
        type="search"
        placeholder="Search by title, category, or description..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search products by title, category, or description"
        className="eco-input"
      />
    </label>
  );
}