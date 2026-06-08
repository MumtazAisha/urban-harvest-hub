import { useState } from "react";
import { useBookings } from "../context/BookingContext";

export default function Booking() {
  const { bookings, removeBooking, increaseQuantity, decreaseQuantity } =
    useBookings();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const totalAmount = bookings.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity || 1),
    0
  );

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
    <section className="mx-auto min-h-screen w-full max-w-6xl rounded-[2rem] bg-[#7eb870] px-4 py-10 sm:px-6 md:rounded-[3rem] md:px-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-earth dark:text-white">
          Your Bookings
        </h1>

        <p className="mx-auto mt-2 max-w-xl text-earth/80 dark:text-slate-300">
          Review selected workshops, events, or products and submit your booking
          request.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="mx-auto flex min-h-[360px] w-full max-w-md items-center justify-center rounded-[2rem] bg-[#7eb870] px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center text-earth shadow-md">
            <p className="text-lg leading-relaxed">
              No bookings yet. Select an event, workshop, or product to
              register.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="w-full rounded-3xl bg-white p-5 shadow-md sm:p-6">
            {bookings.map((booking) => (
              <div
                key={`${booking.type}-${booking.id}`}
                className="border-b border-earth/20 py-4 last:border-b-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-earth">
                      {booking.title}
                    </h2>

                    <p className="text-earth/70">{booking.type}</p>

                    {booking.type === "Product" && (
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(booking.id, booking.type)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-earth/20 font-bold text-earth"
                          aria-label={`Decrease quantity for ${booking.title}`}
                        >
                          -
                        </button>

                        <span className="font-semibold text-earth">
                          {booking.quantity || 1}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(booking.id, booking.type)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-earth/20 font-bold text-earth"
                          aria-label={`Increase quantity for ${booking.title}`}
                        >
                          +
                        </button>
                      </div>
                    )}

                    <p className="mt-3 font-bold text-earth">
                      {booking.price === 0
                        ? "Free"
                        : `Rs. ${
                            Number(booking.price) * Number(booking.quantity || 1)
                          }`}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeBooking(booking.id, booking.type)}
                    aria-label={`Remove ${booking.title} from bookings`}
                    className="rounded-full border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 flex items-center justify-between border-t border-earth/30 pt-4">
              <p className="text-xl font-bold text-earth">TOTAL</p>

              <p className="text-xl font-bold text-earth">
                Rs. {totalAmount}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="form-card w-full"
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
          </form>
        </div>
      )}
    </section>
  );
}