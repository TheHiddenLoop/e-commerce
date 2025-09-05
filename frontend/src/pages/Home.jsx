import { Category } from "../components/home/Category";
import Contact from "../components/home/Contact";
import { Footer } from "../components/home/Footer";
import { Hero } from "../components/home/Hero";
import Shop from "../components/home/Shop";
import TestimonialSection from "../components/home/Testimonial";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productSlice";
import { useEffect } from "react";
import { selectProduct } from "../features/products/productSelectors";

export function Home() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProducts());
  },[])

  return (
    <>
      <div className="min-h-[calc(100vh-65px)] bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.08)_0%,transparent_50%)] text-textPrimary px-6 md:px-20">
        <Hero />
      </div>
      <div id="shop" className="min-h-[calc(100vh-65px)] bg-bgSecondary px-6 md:px-20 pt-10">
        <Shop />
      </div>
      <div id="categories" className="min-h-[calc(90vh-65px)] bg-[radial-gradient(circle_at_25%_85%,rgba(245,158,11,0.1)_0%,transparent_50%),radial-gradient(circle_at_75%_15%,rgba(244,63,94,0.1)_0%,transparent_50%)] px-6 md:px-20 pt-10">
        <Category />
      </div>
      <div id="categories" className="min-h-[calc(100vh-65px)] bg-[radial-gradient(circle_at_20%_70%,rgba(124,58,237,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_30%,rgba(217,70,239,0.1)_0%,transparent_50%)] px-6 md:px-20 pt-10">
        <TestimonialSection />
      </div>
      <div id="support" className="min-h-[calc(100vh-65px)] bg-[radial-gradient(circle_at_10%_90%,rgba(45,212,191,0.1)_0%,transparent_50%),radial-gradient(circle_at_90%_10%,rgba(6,182,212,0.1)_0%,transparent_50%)] px-6 md:px-20 pt-10">
        <Contact />
      </div>
      <div id="about" className=" bg-[radial-gradient(circle_at_10%_90%,rgba(45,212,191,0.1)_0%,transparent_50%),radial-gradient(circle_at_90%_10%,rgba(6,182,212,0.1)_0%,transparent_50%)]">
        <Footer />
      </div>
    </>
  );
}
