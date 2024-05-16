import httpAxios from "../httpAxios";

function addToCart(productId, quantity,image) {
  return httpAxios.post("cart/add/" + productId + "/" + quantity+ "/" + image)
    .then(() => getCartItems())
    .catch((error) => {
      console.error('Error adding to cart:', error);
      throw error;
    });
}

function removeFromCart(productId) {
  return httpAxios.delete("cart/remove/" + productId);
}

function getCartItems() {
  return httpAxios.get("cart/items");
}

function getCartTotal() {
  return httpAxios.get("cart/total");
}

const updateCartItemQuantity = (productId, newQuantity) => {
  return httpAxios.put(`/cart/update/${productId}/${newQuantity}`);
};


const CartService = {
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  getCartItems: getCartItems,
  getCartTotal: getCartTotal,
  updateCartItemQuantity:updateCartItemQuantity
};

export default CartService;
