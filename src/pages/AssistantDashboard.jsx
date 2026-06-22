import { Link } from "react-router-dom";

function AssistantDashboard() {
  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">

    <div className="max-w-5xl mx-auto">

      <h1 className="text-5xl font-bold text-center text-blue-700 mb-3">
        Assistant Dashboard
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Manage daily orders and customer requests.
      </p>

      <div className="grid md:grid-cols-2 gap-8">

        <Link to="/all-orders">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-blue-700 mb-3">
              📋 View Orders
            </h2>

            <p className="text-gray-600">
              See all customer orders.
            </p>
          </div>
        </Link>

        <Link to="/all-orders">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-blue-700 mb-3">
              🔄 Update Status
            </h2>

            <p className="text-gray-600">
              Update order progress.
            </p>
          </div>
        </Link>

      </div>

    </div>

  </div>
);
}

export default AssistantDashboard;