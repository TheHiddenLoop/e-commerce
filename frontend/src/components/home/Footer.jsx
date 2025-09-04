import { Instagram, Facebook, Twitter, Youtube, Send } from "lucide-react";
import { useInView } from "react-intersection-observer";

export function Footer() {
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  return (
    <footer ref={ref} className={`bg-bgPrimary text-textPrimary font-poppins px-4 md:px-24 py-16 transition-skin ${inView ? "fade-in" : "opacity-0 translate-y-8"}`}>
      <div className="flex flex-col md:flex-row justify-between gap-12">
        <div className="space-y-4">
          <img src="/logo2.png" alt="CltX Logo" className="h-20 object-cover" />
          <p className="text-sm text-textSecondary max-w-xs">
            CltX — your trusted online store for the best deals, latest fashion,
            and everyday essentials. 
          </p>

          <div className="flex gap-4 mt-4">
            <Facebook className="w-5 h-5 text-textSecondary hover:text-accent cursor-pointer" />
            <Instagram className="w-5 h-5 text-textSecondary hover:text-accent cursor-pointer" />
            <Twitter className="w-5 h-5 text-textSecondary hover:text-accent cursor-pointer" />
            <Youtube className="w-5 h-5 text-textSecondary hover:text-accent cursor-pointer" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-semibold mb-3">Shop</h3>
            <ul className="space-y-2 text-sm text-textSecondary">
              <li>Men’s Clothing</li>
              <li>Women’s Clothing</li>
              <li>Electronics</li>
              <li>Home & Living</li>
              <li>Accessories</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Customer Care</h3>
            <ul className="space-y-2 text-sm text-textSecondary">
              <li>Help Center</li>
              <li>Track Order</li>
              <li>Returns & Refunds</li>
              <li>Shipping Info</li>
              <li>FAQs</li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold mb-3">Subscribe</h3>
            <p className="text-sm text-textSecondary mb-3">
              Get the latest offers and updates straight to your inbox.
            </p>
            <form className="flex items-center bg-bgSecondary border border-border rounded overflow-hidden">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent px-4 py-2 text-sm text-textPrimary placeholder-textSecondary focus:outline-none w-full"
              />
              <button
                type="button"
                className="bg-secondary px-3 py-2 flex items-center justify-center hover:bg-primary transition-skin"
              >
                <Send size={20} className="text-textPrimary" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-6 text-center text-sm text-textSecondary">
        © {new Date().getFullYear()} CltX. All rights reserved.
      </div>
    </footer>
  );
}
