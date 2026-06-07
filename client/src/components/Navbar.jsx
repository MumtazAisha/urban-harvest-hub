import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import NotificationButton from "./NotificationButton";

export default function Navbar() {
    const linkClass = ({ isActive }) =>
        isActive
            ? "font-semibold text-leaf underline underline-offset-4"
            : "text-earth hover:text-leaf";

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-earth/20 dark:bg-slate-900 dark:border-white/10">
            <nav
                className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4"
                aria-label="Main navigation"
            >
                <div className="flex items-center gap-3">
  <img
    src="/icons/logo-dark.svg"
    alt="Urban Harvest Hub logo"
    className="h-10 w-10 dark:hidden"
  />

  <img
    src="/icons/logo-light.svg"
    alt="Urban Harvest Hub logo"
    className="hidden h-10 w-10 dark:block"
  />

  <h1 className="font-heading text-2xl font-semibold text-leaf dark:text-white">
    Urban Harvest Hub
  </h1>
</div>

                <div className="flex flex-wrap gap-4 text-sm md:text-base">
                    <NavLink to="/" className={linkClass}>Home</NavLink>
                    <NavLink to="/products" className={linkClass}>Products</NavLink>
                    <NavLink to="/workshops" className={linkClass}>Workshops</NavLink>
                    <NavLink to="/events" className={linkClass}>Events</NavLink>
                    <NavLink to="/booking" className={linkClass}>Booking</NavLink>
                    <NavLink to="/admin" className={linkClass}>Admin</NavLink>
                </div>
                <NotificationButton />
                <ThemeToggle />
            </nav>
        </header>
    );
}