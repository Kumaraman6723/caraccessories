import React from "react";
import { Link } from "react-router-dom";

function GarageBuildsPage() {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-5 text-sm text-white/80">
        <header>
          <p className="text-xs font-semibold tracking-[0.3em] text-[#f97316] uppercase">
            Garage Builds
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Build ideas for your next project
          </h1>
        </header>
        <p>
          Not sure where to start? Use these simple build templates as inspiration. Each setup
          mixes parts from the Banty store that work well together in the real world.
        </p>

        <div className="grid gap-4 md:grid-cols-3 text-xs">
          <div className="space-y-2 rounded-2xl border border-white/10 bg-black/60 p-4">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#22d3ee] uppercase">
              Daily Street
            </p>
            <ul className="space-y-1 text-white/75">
              <li>• Alcantara wheel cover</li>
              <li>• Ceramic detailing kit</li>
              <li>• Subtle bumper lip</li>
            </ul>
          </div>
          <div className="space-y-2 rounded-2xl border border-white/10 bg-black/60 p-4">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#f97316] uppercase">
              Night Runner
            </p>
            <ul className="space-y-1 text-white/75">
              <li>• Neon underglow kit</li>
              <li>• Smoked LED tail lamps</li>
              <li>• Interior ambient lighting</li>
            </ul>
          </div>
          <div className="space-y-2 rounded-2xl border border-white/10 bg-black/60 p-4">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-emerald-300 uppercase">
              Track Ready
            </p>
            <ul className="space-y-1 text-white/75">
              <li>• Carbon street spoiler</li>
              <li>• Deep dish alloys</li>
              <li>• Performance brake pads</li>
            </ul>
          </div>
        </div>

        <p>
          Build your own combo in the{" "}
          <Link to="/collections" className="text-[#22d3ee] hover:text-[#f97316]">
            Collections
          </Link>{" "}
          page, then add pieces you like directly from{" "}
          <Link to="/shop" className="text-[#22d3ee] hover:text-[#f97316]">
            Shop
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export default GarageBuildsPage;


