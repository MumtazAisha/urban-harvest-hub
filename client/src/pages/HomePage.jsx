import { Link } from "react-router-dom";
import { useState } from "react";
import heroImage from "../assets/hero.png";
import WeatherWidget from "../components/WeatherWidget";

export default function HomePage() {

  const [email, setEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  
  async function handleSubscribe(e) {
  e.preventDefault();

  if (!email.includes("@")) {
    setSubscribeMessage("Please enter a valid email address.");
    return;
  }

  setSubscribeMessage("Subscribed successfully! Updates are enabled.");

  if ("Notification" in window) {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      new Notification("Urban Harvest Hub", {
        body: "Thank you for subscribing! You’ll receive updates about new products, workshops, and eco events.",
        icon: "/icons/icon-192.png",
      });
    }
  }

  setEmail("");
}
  return (
    <div className="space-y-16">
      {/* HERO + WEATHER */}
      <section className="relative"> 

        <div className="absolute top-4 right-8">
          <div className="rounded-xl bg-leaf p-4 text-white shadow-lg">
            <WeatherWidget />
          </div>
        </div>     

          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
    <img
      src={heroImage}
      alt="Eco sustainability illustration"
      className="w-full max-w-xl object-contain"
    />

    <h1 className="mt-6 font-heading text-5xl md:text-6xl font-bold text-earth">
      Grow greener habits through products, workshops, and local events.
    </h1>

    <p className="mt-6 max-w-3xl text-lg text-earth/80">
      Urban Harvest Hub connects eco-conscious communities with sustainable
      products, hands-on learning, and local green experiences designed for
      modern city living.
    </p>
  </div>
  
        
      </section>

      {/* COMMUNITY IMPACT */}
      <section>
        <h2 className="mb-6 text-center text-3xl font-bold text-earth dark:text-white">
          Community Impact
        </h2>

        <div className="grid gap-5 md:grid-cols-4">
          <div className="eco-card text-center">
            <p className="text-4xl font-bold text-leaf">500+</p>
            <p className="mt-2">Community Members</p>
          </div>

          <div className="eco-card text-center">
            <p className="text-4xl font-bold text-leaf">75+</p>
            <p className="mt-2">Workshops Hosted</p>
          </div>

          <div className="eco-card text-center">
            <p className="text-4xl font-bold text-leaf">120+</p>
            <p className="mt-2">Eco Products</p>
          </div>

          <div className="eco-card text-center">
            <p className="text-4xl font-bold text-leaf">2.5k</p>
            <p className="mt-2">kg Waste Reduced</p>
          </div>
        </div>
      </section>

      {/* EXPLORE CARDS */}
      <section>
        <h2 className="mb-6 text-center text-3xl font-bold text-earth dark:text-white">
          Explore Urban Harvest
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="eco-card flex flex-col justify-between">
            <div>
              <p className="mb-3 text-4xl"></p>
              <h3 className="text-2xl font-bold text-leaf">Products</h3>
              <p className="mt-3 text-earth/80 dark:text-slate-300">
                Discover sustainable kits and reusable essentials for greener
                homes.
              </p>
            </div>

            <Link to="/products" className="eco-button mt-6 text-center">
              Explore Products
            </Link>
          </div>

          <div className="eco-card flex flex-col justify-between">
            <div>
              <p className="mb-3 text-4xl"></p>
              <h3 className="text-2xl font-bold text-leaf">Workshops</h3>
              <p className="mt-3 text-earth/80 dark:text-slate-300">
                Learn composting, urban gardening, and zero-waste habits.
              </p>
            </div>

            <Link to="/workshops" className="eco-button mt-6 text-center">
              View Workshops
            </Link>
          </div>

          <div className="eco-card flex flex-col justify-between">
            <div>
              <p className="mb-3 text-4xl"></p>
              <h3 className="text-2xl font-bold text-leaf">Events</h3>
              <p className="mt-3 text-earth/80 dark:text-slate-300">
                Join local eco markets and community sustainability activities.
              </p>
            </div>

            <Link to="/events" className="eco-button mt-6 text-center">
              Browse Events
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="rounded-3xl bg-white/70 p-8 shadow-sm dark:bg-slate-900">
        <h2 className="mb-6 text-center text-3xl font-bold text-earth dark:text-white">
          Why Choose Urban Harvest?
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold text-leaf">Accessible Living</h3>
            <p className="mt-2 text-earth/80 dark:text-slate-300">
              Sustainable choices are presented in a simple, beginner-friendly
              way.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-leaf">Community Focused</h3>
            <p className="mt-2 text-earth/80 dark:text-slate-300">
              Events and workshops help people learn, connect, and grow
              together.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-leaf">Practical Impact</h3>
            <p className="mt-2 text-earth/80 dark:text-slate-300">
              Products and experiences are designed to support real eco-friendly
              habits.
            </p>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="eco-card text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-earth dark:text-white">
          Stay Updated
        </h2>

        <p className="mt-3 text-earth/80 dark:text-slate-300">
          Get updates about new products, workshops, eco events, and community
          initiatives.
        </p>

        <form
  onSubmit={handleSubscribe}
  className="mt-6 flex flex-col gap-3 sm:flex-row"
>
  <input
    type="email"
    placeholder="Enter your email"
    aria-label="Newsletter email address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="eco-input"
  />

  <button type="submit" className="eco-button">
    Subscribe
  </button>
</form>

{subscribeMessage && (
  <p className="mt-4 text-sm font-medium text-leaf" role="status">
    {subscribeMessage}
  </p>
)}
      </section>
    </div>
  );
}