return (
  <div className="min-h-screen bg-gray-100 p-8">

    <div className="max-w-7xl mx-auto">

      <h1 className="text-5xl font-bold text-center text-green-700 mb-3">
        Product Inventory
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Manage all products in your supermarket.
      </p>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

        <h3 className="font-semibold mb-3">
          Filter By Category
        </h3>

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
          className="border rounded-xl p-3 w-full md:w-72"
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {filteredProducts.map((product) => {

          const imageUrl = product.image
            ? `${IMAGE_URL}/${product.image}`
            : "https://via.placeholder.com/300";

          return (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">

                <h2 className="font-bold text-xl mb-2">
                  {product.name}
                </h2>

                <p className="text-green-700 font-bold text-lg">
                  D{product.price}
                </p>

                <p className="text-gray-600 mt-2">
                  Stock: {product.stock}
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  {product.category}
                </p>

                <div className="flex gap-3 mt-5">

                  <Link
                    to={`/edit-product/${product._id}`}
                    className="flex-1"
                  >
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(product._id)
                    }
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>

  </div>
);