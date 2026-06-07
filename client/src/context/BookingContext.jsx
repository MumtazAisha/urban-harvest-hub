import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  function addBooking(item) {
    const alreadyBooked = bookings.some((booking) => booking.id === item.id);

    if (!alreadyBooked) {
      setBookings([...bookings, item]);
    }
  }

  function removeBooking(id) {
    setBookings(bookings.filter((booking) => booking.id !== id));
  }

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        removeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}