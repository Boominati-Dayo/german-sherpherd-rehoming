import Link from "next/link";
import { Home, Search, PawPrint } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-forest-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <span className="text-[150px] sm:text-[200px] font-black text-brand-orange-600/20 leading-none">
            404
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
          Page Not Found
        </h1>
        
        <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off. Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange-700 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-orange-800 transition-all"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            href="/puppies"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-black uppercase tracking-wider rounded-full hover:bg-white/10 transition-all"
          >
            <PawPrint className="w-5 h-5" />
            View Puppies
          </Link>
        </div>
      </div>
    </div>
  );
}