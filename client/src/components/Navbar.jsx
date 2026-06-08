import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import NotificationButton from "./NotificationButton";
import { useBookings } from "../context/BookingContext";

export default function Navbar() {
  const { bookings } = useBookings();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-leaf underline underline-offset-4"
      : "text-earth hover:text-leaf dark:text-slate-100 dark:hover:text-green-300";

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-earth/20 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-slate-900">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-3">
          <img
            src="/icons/logo-dark.svg"
            alt="Urban Harvest Hub logo"
            className="h-9 w-9 dark:hidden"
          />

          <img
            src="/icons/logo-light.svg"
            alt="Urban Harvest Hub logo"
            className="hidden h-9 w-9 dark:block"
          />

          <h1 className="font-heading text-2xl font-semibold text-leaf dark:text-white">
            Urban Harvest Hub
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-earth/20 px-3 py-2 text-2xl text-earth md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <div className="hidden items-center gap-5 md:flex">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>
          <NavLink to="/workshops" className={linkClass}>
            Workshops
          </NavLink>
          <NavLink to="/events" className={linkClass}>
            Events
          </NavLink>
          <NavLink to="/booking" className={linkClass}>
            Booking
            {bookings.length > 0 && (
              <span className="ml-1 font-semibold">({bookings.length})</span>
            )}
          </NavLink>
          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>

          <NotificationButton />
          <ThemeToggle />
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-earth/10 bg-white px-4 pb-5 pt-3 shadow-md md:hidden dark:bg-slate-900">
          <div className="flex flex-col gap-4 text-base">
            <NavLink to="/" onClick={closeMenu} className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/products" onClick={closeMenu} className={linkClass}>
              Products
            </NavLink>
            <NavLink to="/workshops" onClick={closeMenu} className={linkClass}>
              Workshops
            </NavLink>
            <NavLink to="/events" onClick={closeMenu} className={linkClass}>
              Events
            </NavLink>
            <NavLink to="/booking" onClick={closeMenu} className={linkClass}>
              Booking
              {bookings.length > 0 && (
                <span className="ml-1 font-semibold">({bookings.length})</span>
              )}
            </NavLink>
            <NavLink to="/admin" onClick={closeMenu} className={linkClass}>
              Admin
            </NavLink>

            <div className="flex flex-wrap gap-3 pt-2">
              <NotificationButton />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}