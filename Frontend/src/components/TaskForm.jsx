export default function TaskForm({
  form,
  setForm,
  handleSubmit,
  editId,
  btnLoading
}) {
  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-md mb-5 space-y-4 transform transition-all duration-500 ease-out hover:scale-105 animate-slideInLeft">
      
      <input
        placeholder="Title"
        className="w-full border dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:border-blue-400 animate-slideInBottom"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Description"
        className="w-full border dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:border-blue-400 animate-slideInBottom"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="date"
        className="w-full border dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:border-blue-400 animate-slideInBottom"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
      />

      <button
        onClick={handleSubmit}
        disabled={btnLoading}
        className={`w-full text-white p-2 rounded transition-all duration-300 ease-in-out disabled:opacity-50 hover:scale-95 animate-slideInBottom ${
          editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {btnLoading ? (
          <span className="flex justify-center items-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            {editId ? "Updating..." : "Adding..."}
          </span>
        ) : (
          editId ? "Update Task" : "Add Task"
        )}
      </button>
    </div>
  );
}
