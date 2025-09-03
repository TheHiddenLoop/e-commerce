import { Category } from "../components/home/Category";
import { Hero } from "../components/home/Hero";
import Shop from "../components/home/Shop";

export function Home() {
  return (
    <>
      <div className="min-h-[calc(100vh-65px)] bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.08)_0%,transparent_50%)] text-textPrimary px-6 md:px-20">
        <Hero />
      </div>
      <div id="shop" className="min-h-[calc(100vh-65px)] bg-bgSecondary px-6 md:px-20 pt-10">
        <Shop />
      </div>
      <div id="categories" className="min-h-[calc(100vh-65px)] bg-[radial-gradient(circle_at_25%_85%,rgba(245,158,11,0.1)_0%,transparent_50%),radial-gradient(circle_at_75%_15%,rgba(244,63,94,0.1)_0%,transparent_50%)] px-6 md:px-20 pt-10">
        <Category />
      </div>
    </>
  );
}
