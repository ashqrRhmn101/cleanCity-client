import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const AddIssues = () => {
  const { user } = useContext(AuthContext);

  // ✅ Form Submit Handler
  const handleAddIssue = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const location = form.location.value;
    const description = form.description.value;
    const image = form.image.value;
    const amount = parseFloat(form.amount.value);
    const status = "ongoing";
    const date = new Date().toISOString();
    const email = user?.email || "anonymous";

    const issueData = {
      title,
      category,
      location,
      description,
      image,
      amount,
      status,
      date,
      email,
    };

    console.log("New Issue:", issueData);

    try {
      const res = await fetch("http://localhost:3000/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueData),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Issue Reported Successfully!",
          text: "Your issue has been submitted.",
          timer: 1500,
          showConfirmButton: false,
        //   position: "top-end",
        });
        form.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "Unable to save issue. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error saving issue:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Could not connect to the server.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-black">
        🧹 Report a New Community Issue
      </h2>

      <form onSubmit={handleAddIssue} className="space-y-5">
        {/* Title */}
        <div>
          <label className="label">
            <span className="label-text">Issue Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter issue title"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            name="category"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select a category</option>
            <option value="Garbage">Garbage</option>
            <option value="Broken Footpath">Broken Footpath</option>
            <option value="Illegal Dumping">Illegal Dumping</option>
            <option value="Waterlogging">Waterlogging</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
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
            className="textarea textarea-bordered w-full"
            placeholder="Describe the issue in detail"
            required
          ></textarea>
        </div>

        {/* Image */}
        <div>
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="url"
            name="image"
            placeholder="https://example.com/image.jpg"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="label">
            <span className="label-text">Suggested Fix Budget (৳)</span>
          </label>
          <input
            type="number"
            name="amount"
            placeholder="Enter estimated amount"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Status (read-only default) */}
        <div>
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <input
            type="text"
            name="status"
            value="ongoing"
            readOnly
            className="input input-bordered w-full bg-gray-100 text-gray-500"
          />
        </div>

        {/* Date (display only) */}
        <div>
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input
            type="text"
            readOnly
            value={new Date().toLocaleDateString()}
            className="input input-bordered w-full bg-gray-100 text-gray-500"
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100 text-gray-500"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success w-full mt-4">
          Submit Issue
        </button>
      </form>
    </div>
  );
};

export default AddIssues;
