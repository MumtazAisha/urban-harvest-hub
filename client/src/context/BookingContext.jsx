import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  function addBooking(item) {
    setBookings((currentBookings) => {
      const existingItem = currentBookings.find(
        (booking) => booking.id === item.id && booking.type === item.type
      );

      if (existingItem) {
        if (item.type === "Product") {
          return currentBookings.map((booking) =>
            booking.id === item.id && booking.type === item.type
              ? { ...booking, quantity: booking.quantity + 1 }
              : booking
          );
        }

        return currentBookings;
      }

      return [
        ...currentBookings,
        {
          ...item,
          quantity: item.type === "Product" ? 1 : 1,
        },
      ];
    });
  }

  function increaseQuantity(id, type) {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === id && booking.type === type && booking.type === "Product"
          ? { ...booking, quantity: booking.quantity + 1 }
          : booking
      )
    );
  }

  function decreaseQuantity(id, type) {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === id && booking.type === type && booking.type === "Product"
          ? { ...booking, quantity: Math.max(1, booking.quantity - 1) }
          : booking
      )
    );
  }

  function removeBooking(id, type) {
    setBookings((currentBookings) =>
      currentBookings.filter(
        (booking) => !(booking.id === id && booking.type === type)
      )
    );
  }

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        increaseQuantity,
        decreaseQuantity,
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