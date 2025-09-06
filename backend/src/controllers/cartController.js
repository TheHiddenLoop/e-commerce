import Cart from "../models/cart.js";

export const addCart = async (req, res) => {
  try {
    const { productId, quantity = 1, price, size, color } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].price = price; 
      } else {
        cart.items.push({ product: productId, quantity, price, size, color });
      }
    } else {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity, price, size, color }],
      });
    }

    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    await cart.save();

    res.status(201).json({ success: true, message: "Cart updated successfully", cart });
  } catch (error) {
    console.error("Error in addCart:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const allCart = async (req, res) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) cart = { items: [], totalQuantity: 0, totalPrice: 0 };

    res.status(200).json({ success: true, message: "All cart items", cart });
  } catch (error) {
    console.error("Error in allCart:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.id;       
    const productId = req.body.productId; 

    let cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => 
      item.product.toString() !== productId.toString()
    );

    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    cart = await Cart.findById(cartId).populate("items.product");
    res.status(200).json({ 
      success: true, 
      message: "Product removed from cart", 
      cart 
    });
  } catch (error) {
    console.error("Error in deleteCart:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

