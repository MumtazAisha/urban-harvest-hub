import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
  return (
    <article className="eco-card" aria-labelledby={`item-${item.id}`}>
      {item.image && (
        <img
          src={`/images/${item.image}`}
          alt={item.title}
          className="mb-4 h-48 w-full rounded-2xl object-cover"
          loading="lazy"
        />
      )}

      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-leaf">
        {item.type}
      </p>

      <h3 id={`item-${item.id}`} className="text-xl font-bold text-earth">
        {item.title}
      </h3>

      <p className="mt-2 text-earth/80">{item.description}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-cream px-3 py-1 text-earth">
          {item.category}
        </span>

        <span className="rounded-full bg-cream px-3 py-1 text-earth">
          {item.availability}
        </span>
      </div>

      <p className="mt-4 font-semibold text-earth">
        {item.price === 0 ? "Free" : `Rs. ${item.price}`}
      </p>

      <Link
        to={`/items/${item.type.toLowerCase()}/${item.id}`}
        aria-label={`View details for ${item.title}`}
        className="eco-button mt-4"
      >
        View Details
      </Link>
    </article>
  );
}