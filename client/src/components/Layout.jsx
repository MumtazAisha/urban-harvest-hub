import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-cream text-earth dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <main className="w-full max-w-[1800px] mx-auto px-12 py-8">
        {children}
      </main>

      <footer className="mt-16 border-t border-earth/20 py-8 text-center dark:border-white/10">
        <p className="font-semibold">© 2026 Urban Harvest Hub</p>
        <p className="text-sm opacity-70">
          Sustainable living for modern eco-conscious communities.
        </p>
      </footer>
    </div>
  );
}