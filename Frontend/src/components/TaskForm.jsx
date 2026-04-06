import React from "react";
import { X } from "lucide-react";

export default function TaskForm({
  form,
  setForm,
  handleSubmit,
  editId,
  btnLoading,
  closeModal,
}) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-300">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {editId ? "Update Task" : "Create New Task"}
        </h3>
        <button
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
          <input
            placeholder="What needs to be done?"
            className="w-full border dark:border-gray-700 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea
            placeholder="Add some details..."
            rows="3"
            className="w-full border dark:border-gray-700 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
          <input
            type="date"
            className="w-full border dark:border-gray-700 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={closeModal}
            className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={btnLoading}
            className={`flex-[2] text-white p-2.5 rounded-lg transition-all font-medium disabled:opacity-50 active:scale-95 ${
              editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {btnLoading ? (
              <span className="flex justify-center items-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                {editId ? "Updating..." : "Adding..."}
              </span>
            ) : (
              editId ? "Update Task" : "Add Task"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}