import { useState, useEffect } from "react";
import axios from "axios";

const SubscriptionForm = ({ subscription, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    cost: "",
    billing_cycle: "", // صار اختياري
    start_date: "",
    renewal_date: "",
    is_active: true,
  });

  useEffect(() => {
    if (subscription) {
      setFormData(subscription);
    }
  }, [subscription]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = { ...formData };

    // إذا Renewal Date فاضي → نحسبه حسب Start Date + Billing Cycle
    if (!payload.renewal_date && payload.start_date && payload.billing_cycle) {
      const start = new Date(payload.start_date);
      let renewal = new Date(start);

      if (payload.billing_cycle === "Monthly") {
        renewal.setMonth(renewal.getMonth() + 1);
      } else if (payload.billing_cycle === "Yearly") {
        renewal.setFullYear(renewal.getFullYear() + 1);
      }

      payload.renewal_date = renewal.toISOString().split("T")[0]; // YYYY-MM-DD
    }

    try {
      if (subscription) {
        await axios.put(
          `http://127.0.0.1:8000/api/subscriptions/${subscription.id}/`,
          payload
        );
      } else {
        await axios.post("http://127.0.0.1:8000/api/subscriptions/", payload);
      }
      onSuccess?.();
    } catch (err) {
      console.error("Error saving subscription:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-xl max-w-lg w-full text-white">
        <h2 className="text-xl font-bold mb-4">
          {subscription ? "Edit Subscription" : "Add Subscription"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full bg-gray-700 px-2 py-2 rounded"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              className="w-full bg-gray-700 px-2 py-2 rounded"
            />
          </div>

          {/* Cost */}
          <div>
            <label className="block text-sm mb-1">Cost</label>
            <input
              type="number"
              step="0.01"
              name="cost"
              value={formData.cost || ""}
              onChange={handleChange}
              className="w-full bg-gray-700 px-2 py-2 rounded"
              required
            />
          </div>

          {/* Billing Cycle */}
          <div>
            <label className="block text-sm mb-1">Billing Cycle</label>
            <select
              name="billing_cycle"
              value={formData.billing_cycle || ""}
              onChange={handleChange}
              className="w-full bg-gray-700 px-2 py-2 rounded"
            >
              <option value="">-- Select --</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm mb-1">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date || ""}
              onChange={handleChange}
              className="w-full bg-gray-700 px-2 py-2 rounded"
              required
            />
          </div>

          {/* Renewal Date */}
          <div>
            <label className="block text-sm mb-1">Renewal Date</label>
            <input
              type="date"
              name="renewal_date"
              value={formData.renewal_date || ""}
              onChange={handleChange}
              className="w-full bg-gray-700 px-2 py-2 rounded"
            />
          </div>

          {/* Active Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />
            <label>Active</label>
          </div>
        </form>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;
