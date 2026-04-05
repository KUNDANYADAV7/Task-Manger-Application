export default function TaskForm({
  form,
  setForm,
  handleSubmit,
  editId,
  btnLoading
}) {
  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-md mb-5 space-y-4">
      
      <input
        placeholder="Title"
        className="w-full border dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        placeholder="Description"
        className="w-full border dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        type="date"
        className="w-full border dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800"
        value={form.dueDate}
        onChange={(e) =>
          setForm({ ...form, dueDate: e.target.value })
        }
      />

      <button
        onClick={handleSubmit}
        disabled={btnLoading}
        className={`w-full text-white p-2 rounded transition disabled:opacity-50 ${
          editId
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
          {btnLoading ? editId ? "Updating..." : "Adding..." : editId ? "Update Task" : "Add Task"}
      </button>
    </div>
  );
}