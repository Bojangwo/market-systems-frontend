import API from "../services/api";
import { Link } from "react-router-dom";

function ProductCard({ id, image, name, price }) {
  const handleAddToCart = async () => {
    try {
      await API.post("/cart/add", {
        productId: id,
        quantity: 1,
      });

      alert("Product added to cart!");
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Please log in first.");
      } else {
        console.error(error);
        alert("Could not add product to cart.");
      }
    }
  };

  return (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 w-full max-w-xs">
    <Link
      to={`/product/${id}`}
      className="block"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {name}
        </h3>

        <p className="text-2xl font-bold text-green-700">
          D{price}
        </p>

        <p className="text-yellow-500 mt-2">
          ⭐⭐⭐⭐⭐
        </p>
      </div>
    </Link>

    <div className="px-5 pb-5">
      <button
        onClick={handleAddToCart}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
      >
        Add To Cart
      </button>
    </div>
  </div>
);
}

export default ProductCard;