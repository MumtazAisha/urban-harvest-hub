import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItemByType } from "../services/api";
import { useBookings } from "../context/BookingContext";

export default function ItemDetails() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { addBooking } = useBookings();

  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getItemByType(type, id)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setItem({
            ...data,
            type: type.charAt(0).toUpperCase() + type.slice(1),
          });
        }
      })
      .catch(() => {
        setError("Unable to load item details.");
      });
  }, [type, id]);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!item) {
    return <p>Loading item details...</p>;
  }

  function handleBooking() {
    addBooking(item);
    setSuccessMessage("Added to bookings");
  } 

  return (
    <section className="eco-card max-w-3xl mx-auto">
      {item.image && (
        <img
          src={`/images/${item.image}`}
          alt={item.title}
          className="mb-6 h-80 w-full rounded-3xl object-cover"
        />
      )}

      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-leaf">
        {item.type}
      </p>

      <h1 className="mb-4 text-3xl font-bold text-earth dark:text-white">
        {item.title}
      </h1>

      <p className="mb-4 text-earth/80 dark:text-slate-300">
        {item.description}
      </p>

      <p className="mb-2">
        <strong>Category:</strong> {item.category}
      </p>

      <p className="mb-2">
        <strong>Availability:</strong> {item.availability}
      </p>

      <p className="mb-4">
        <strong>Price:</strong>{" "}
        {item.price === 0 ? "Free" : `Rs. ${item.price}`}
      </p>

      <button
        type="button"
        onClick={handleBooking}
        aria-label={`Book or register for ${item.title}`}
        className="eco-button"
      >
        Book / Register
      </button>
    </section>
  );
}