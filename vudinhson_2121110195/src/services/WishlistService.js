import httpAxios from "../httpAxios";

function addToWishlist(productId, image) {
  return httpAxios.post("wishlist/add/" + productId + "/" + image )
    .then(() => getWishlistItems())
    .catch((error) => {
      console.error('Error adding to wishlist:', error);
      throw error;
    });
}

function removeFromWishlist(productId) {
  return httpAxios.delete("wishlist/remove/" + productId);
}

function getWishlistItems() {
  return httpAxios.get("wishlist/items");
}


const WishlistService = {
  addToWishlist: addToWishlist,
  removeFromWishlist: removeFromWishlist,
  getWishlistItems: getWishlistItems,
};

export default WishlistService;
