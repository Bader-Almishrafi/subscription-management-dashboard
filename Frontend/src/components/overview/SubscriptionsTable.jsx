import { motion } from "framer-motion";
import { Edit, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import SubscriptionForm from "../common/SubscriptionForm";

const SubscriptionsTable = ({ subscriptions, onRefresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [editSub, setEditSub] = useState(null);

  const handleDelete = async (id) => {
    
    try {
      await axios.delete(`http://127.0.0.1:8000/api/subscriptions/${id}/`);
      onRefresh?.();
    } catch (err) {
      console.error("Failed to delete subscription", err);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Subscriptions</h2>
        <button
          onClick={() => { setEditSub(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
        >
          <Plus size={18} /> Add Subscription
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Cost</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Billing</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Start</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Renewal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Active</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {subscriptions.map((sub) => (
              <motion.tr
                key={sub.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sub.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sub.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sub.cost} SAR</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sub.billing_cycle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sub.start_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sub.renewal_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {sub.is_active ? (
                    <span className="text-green-400 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-400 font-semibold">Inactive</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    onClick={() => { setEditSub(sub); setShowForm(true); }}
                    className="text-indigo-400 hover:text-indigo-300 mr-2"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <SubscriptionForm
          subscription={editSub}
          onClose={() => setShowForm(false)}
          onSuccess={() => { setShowForm(false); onRefresh?.(); }}
        />
      )}
    </motion.div>
  );
};

export default SubscriptionsTable;
