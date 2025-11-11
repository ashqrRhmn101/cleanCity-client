import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const MyIssues = () => {
  const { user } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const editModalRef = useRef(null);

  // Fetch only logged-in user's issues
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/issues?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setIssues(data))
        .catch((err) => console.error("Error loading issues:", err));
    }
  }, [user?.email]);

  // Open Edit Modal
  const handleEdit = (issue) => {
    setSelectedIssue(issue);
    editModalRef.current.showModal();
  };

  // Update Issue
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedIssue = {
      title: form.title.value,
      category: form.category.value,
      amount: form.amount.value,
      description: form.description.value,
      status: form.status.value,
    };

    try {
      const res = await fetch(
        `http://localhost:3000/issues/${selectedIssue._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedIssue),
        }
      );

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Issue updated successfully!",
          showConfirmButton: false,
          timer: 1500,
          //   position: "top-end",
        });
        form.reset();
        editModalRef.current.close();

        // Refresh issues instantly
        const updated = issues.map((issue) =>
          issue._id === selectedIssue._id ? { ...issue, ...updatedIssue } : issue
        );
        setIssues(updated);
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Could not update issue.",
      });
    }
  };

  // 🔹 Delete Issue
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This issue will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:3000/issues/${id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            setIssues(issues.filter((i) => i._id !== id));
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Issue has been deleted.",
              timer: 1200,
              showConfirmButton: false,
            });
          }
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Error deleting issue",
          });
        }
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-base-100 rounded-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🧾 My Reported Issues
      </h2>

      {/* Table Section */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-md mt-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Total Issues:{" "}
          <span className="text-green-600 font-bold text-3xl">
            {issues.length.toString().padStart(2, "0")}
          </span>
        </h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead>
              <tr className="text-gray-600 border-b">
                <th>SL No</th>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {issues.length > 0 ? (
                issues.map((issue, index) => (
                  <tr key={issue._id} className="hover:bg-gray-100">
                    <td>{index + 1}</td>
                    <td className="font-semibold text-gray-800">
                      {issue.title}
                    </td>
                    <td>{issue.category}</td>
                    <td className="font-semibold text-green-600">
                      ৳{issue.amount}
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          issue.status === "ongoing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {issue.status}
                      </span>
                    </td>
                    <td className="text-center flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(issue)}
                        className="btn btn-xs bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(issue._id)}
                        className="btn btn-xs bg-red-100 text-red-700 border border-red-300 hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-5">
                    No Issues Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-xl font-semibold text-center mb-4">
            Update Issue Details
          </h3>

          {selectedIssue && (
            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Title */}
              <div>
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedIssue.title}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  name="category"
                  defaultValue={selectedIssue.category}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="Garbage">Garbage</option>
                  <option value="Broken Footpath">Broken Footpath</option>
                  <option value="Illegal Dumping">Illegal Dumping</option>
                  <option value="Waterlogging">Waterlogging</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="label">
                  <span className="label-text">Amount (৳)</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={selectedIssue.amount}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedIssue.description}
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>

              {/* Status (dropdown) */}
              <div>
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  name="status"
                  defaultValue={selectedIssue.status}
                  className="select select-bordered w-full"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="ended">Ended</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="modal-action justify-between">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => editModalRef.current.close()}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Update Issue
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyIssues;
