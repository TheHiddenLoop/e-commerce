import { useEffect, useState } from "react";
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { CartCard } from "../components/CartCard";
import { OrderSummary } from "../components/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { allCart } from "../features/cart/cartSlice";
import { selectCart, selectCardStatus } from "../features/cart/cartSelectors";
import { removeCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

export const Cart = () => {
  const cartProducts = useSelector(selectCart);
  const dispatch = useDispatch();

  const normalizeCart = (items) =>
    items.map((item) => ({
      id: item.product._id,
      name: item.product.name,
      image: item.product.images?.[0] || "",
      price: item.price,
      originalPrice: item.product.originalPrice || item.price,
      quantity: item.quantity,
      brand: item.product.brand,
      category: item.product.category,
      inStock: item.product.stock > 0,
      stock: item.product.stock,
      colors: item.product.colors || [],
      sizes: item.product.sizes || [],
      selectedColor: item.product.colors?.[0] || "",
      selectedSize: item.product.sizes?.[0] || ""
    }));
    
    
  const [cartItems, setCartItems] = useState(normalizeCart(cartProducts.items || []));

  useEffect(() => {
    dispatch(allCart());
  }, [dispatch]);

  useEffect(() => {
    if (cartProducts?.items) {
      setCartItems(normalizeCart(cartProducts.items));
    }
  }, [cartProducts]);

  const handleQuantityChange = (productId, newQuantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleVariantChange = (productId, variants) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === productId ? { ...item, ...variants } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
  dispatch(removeCart({ cartId: cartProducts._id, productId }));
  };


  const handleCheckout = () => {
  const order = {
    subtotal,
    savings,
    shipping,
    tax,
    total,
    itemCount: cartItems.length,
    products: cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      brand: item.brand,
      category: item.category,
      price: item.price,
      originalPrice: item.originalPrice,
      quantity: item.quantity,
      stock: item.stock,
      selectedColor: item.selectedColor || null,
      selectedSize: item.selectedSize || null,
      availableColors: item.colors,
      availableSizes: item.sizes,
      lineTotal: item.price * item.quantity,
    })),
  };

  console.log("Checkout Payload:", order);
};



  const handleContinueShopping = () => {
    console.log("Continue shopping");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.inStock ? item.price * item.quantity : 0),
    0
  );
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice * item.quantity),
    0
  );

  const savings = originalTotal - subtotal;
  const shipping = subtotal > 1000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;
  
  return (
    <section className="bg-[radial-gradient(circle_at_25%_85%,rgba(245,158,11,0.1)_0%,transparent_50%),radial-gradient(circle_at_75%_15%,rgba(244,63,94,0.1)_0%,transparent_50%)] py-8 antialiased md:py-16 min-h-[calc(100vh-65px)]">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="flex items-center gap-2 mb-6">
          <ShoppingCart className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-textPrimary sm:text-2xl">
            Shopping Cart ({cartItems.length} items)
          </h2>
        </div>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {cartItems.length > 0 ? (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <CartCard
                    key={item.id}
                    product={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={()=>handleRemoveItem(item.id)}
                    onVariantChange={handleVariantChange} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 text-textSecondary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-textPrimary mb-2">
                  Your cart is empty
                </h3>
                <p className="text-textSecondary mb-6">
                  Add some items to get started!
                </p>
                <Link to={"/products"}>
                  <button
                  onClick={handleContinueShopping}
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-skin"
                >
                  Start Shopping
                  <ArrowRight className="h-4 w-4" />
                </button>
                </Link>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <OrderSummary
              subtotal={subtotal}
              savings={savings}
              shipping={shipping}
              tax={tax}
              total={total}
              onCheckout={handleCheckout}
              onContinueShopping={handleContinueShopping}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
