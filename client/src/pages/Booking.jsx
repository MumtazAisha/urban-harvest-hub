import { useState } from "react";
import { useBookings } from "../context/BookingContext";

export default function Booking() {
  const { bookings, removeBooking } = useBookings();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (bookings.length === 0) {
      newErrors.bookings = "Please select at least one item before submitting.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setMessage("Booking request submitted successfully.");
      setFormData({ name: "", email: "" });
    } else {
      setMessage("");
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center rounded-[50px] py-12 bg-[#7eb870]"> 
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-earth dark:text-white">
          Your Bookings
        </h1>

        <p className="mt-2 max-w-2xl mx-auto text-earth/80 dark:text-slate-300">
          Review selected workshops, events, or products and submit your booking
          request.
        </p>
      </div>

      {bookings.length === 0 ? (
        <p className="mb-8 mx-auto w-full max-w-2xl  rounded-lg border border-earth/20 bg-white p-4 text-center text-earth">
          No bookings yet. Select an event, workshop, or product to register.
        </p>
      ) : (
        <div className="mb-8 grid w-full gap-4 md:grid-cols-2">
          {bookings.map((booking) => (
            <article key={booking.id} className="eco-card">
              <h2 className="text-xl font-bold text-earth">{booking.title}</h2>
              <p className="text-earth/80">{booking.type}</p>
              <p className="text-earth/80">{booking.category}</p>
              <p className="font-semibold text-earth">
                {booking.price === 0 ? "Free" : `Rs. ${booking.price}`}
              </p>

              <button
                type="button"
                onClick={() => removeBooking(booking.id)}
                aria-label={`Remove ${booking.title} from bookings`}
                className="mt-3 rounded-lg border border-red-500 px-3 py-2 text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Remove
              </button>
            </article>
          ))}
        </div>
      )}
    {bookings.length > 0 && (
      <form
        onSubmit={handleSubmit}
        className="form-card"
        aria-label="Booking request form"
      >
        <h2 className="form-title">Complete Booking</h2>

        <label>
          <span>Full name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="soft-input"
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </label>

        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="soft-input"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </label>

        {errors.bookings && <p className="form-error">{errors.bookings}</p>}

        <button type="submit" className="form-button">
          Submit Booking
        </button>

        {message && (
          <div className="form-success" role="status">
            {message}
          </div>
        )}
      </form> )}
    </section>
  );
}