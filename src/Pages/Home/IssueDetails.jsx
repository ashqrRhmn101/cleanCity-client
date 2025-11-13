import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { DollarSign, Tag, MapPin, Calendar, HeartHandshake } from "lucide-react";

const IssueDetails = () => {
  const issue = useLoaderData();
  const { user } = useContext(AuthContext);
  const bidModalRef = useRef(null);
  const [contributions, setContributions] = useState([]);

  const {
    _id,
    title,
    status,
    category,
    location,
    description,
    image,
    date,
    amount,
    email,
    photoURL,
  } = issue || {};
  // console.log(issue)

  // Fetch Contributions for this Issue
  useEffect(() => {
    fetch(
      `https://cleancity-server.vercel.app/issues/contribution/${issue._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setContributions(data);
      });
  }, [issue._id]);

  //  Modal open function
  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  //  Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const contributorName = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const extraInfo = form.extraInfo.value;
    const date = new Date().toLocaleDateString();

    const contributionData = {
      issueId: _id,
      issueTitle: title,
      amount: form.amount.value,
      contributorName,
      email,
      phone,
      address,
      date,
      extraInfo,
      image: user?.photoURL || "",
      category,
      location,
    };

    console.log("Saving contribution:", contributionData);

    // MongoDB get (API route)
    //https://cleancity-server.vercel.app/contributions
    try {
      const res = await fetch(
        "https://cleancity-server.vercel.app/contribution",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contributionData),
        }
      );

      if (res.ok) {
        bidModalRef.current.close();
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: "Contribution submitted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();

        // contributions
        contributionData._id = res.ok;
        const newContributionData = [...contributions, contributionData];
        newContributionData.sort((a, b) => b.amount - a.amount);
        setContributions(newContributionData);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while saving your contribution!",
        });
      }
    } catch (error) {
      console.error("Error saving contribution:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Unable to connect to the server.",
      });
    }
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto p-6 bg-base-100">
        {/* Back Button */}
        <div className="mb-4">
          <Link
            to="/issues"
            className="text-sm flex items-center gap-1 hover:text-green-600 transition-all"
          >
            <span className="text-lg">←</span> Back To Issues
          </Link>
        </div>

        {/* Main Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT SIDE */}
          <div>
            {/* Issue Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={
                  image ||
                  "https://via.placeholder.com/600x400?text=No+Image+Available"
                }
                alt={title}
                className="w-full h-80 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Description */}
            <div className="border rounded-lg p-5 bg-white dark:bg-gray-800">
              <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-white">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <h2 className="text-2xl font-bold  mb-2">{title}</h2>
            {status && (
              <div
                className={`badge badge-outline capitalize px-3 py-1 text-sm font-semibold ${
                  status === "ongoing"
                    ? "text-green-500 border-green-400"
                    : "text-red-500 border-red-400"
                }`}
              >
                {status}
              </div>
            )}

            {/* Suggested Budget */}
            <div className="text-2xl font-semibold text-green-600 mb-1 flex items-center gap-2">
              <DollarSign size={20} /> {amount || 0}
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Suggested Fix Budget (estimated)
            </p>

            {/* Issue Info */}
            <div className="border rounded-lg p-4 mb-4 bg-white dark:bg-gray-800">
              <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">
                Issue Details
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2 mb-2">
                <Tag size={16} /> <strong>Category:</strong> {category}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2 mb-2">
                <MapPin size={16} /> <strong>Location:</strong> {location}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <Calendar size={16} /> <strong>Date:</strong>{" "}
                {new Date(date).toLocaleDateString()}
              </p>
            </div>

            {/* Reporter Info */}
            <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
              <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">
                Reported By
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={
                    photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                  }
                  alt="Reporter"
                  className="w-12 h-12 rounded-full border object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {email?.split("@")[0]}
                  </p>
                  <p className="text-sm text-gray-500">{email}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Issue ID:</strong> {_id}
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={handleBidModalOpen}
              className="btn btn-success w-full mt-5 hover:text-white"
            >
              Contribute Issue <HeartHandshake color="orange"/> 
            </button>
          </div>
        </div>

        {/* Modal */}
        <dialog
          ref={bidModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="text-xl font-semibold text-center mb-4">
              Contribute to Community Clean-Up
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Issue Title (readonly) */}
              <div>
                <label className="label">
                  <span className="label-text">Issue Title</span>
                </label>
                <input
                  type="text"
                  name="issueTitle"
                  className="input input-bordered w-full"
                  value={title}
                  readOnly
                />
              </div>

              {/* Amount */}
              <div>
                <label className="label">
                  <span className="label-text">Amount ($)</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  className="input input-bordered w-full"
                  placeholder="Enter contribution amount"
                  defaultValue={amount || ""}
                  required
                />
              </div>

              {/* Contributor Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="label">
                    <span className="label-text">Contributor Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="input input-bordered w-full"
                    placeholder="Your full name"
                    value={user?.displayName || ""}
                    readOnly
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="input input-bordered w-full"
                    value={user?.email || ""}
                    readOnly
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  className="input input-bordered w-full"
                  placeholder="+8801XXXXXXXXX"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  name="address"
                  className="input input-bordered w-full"
                  placeholder="Your address"
                  // required
                />
              </div>

              {/* Additional Info */}
              <div>
                <label className="label">
                  <span className="label-text">Additional Info (optional)</span>
                </label>
                <textarea
                  name="extraInfo"
                  className="textarea textarea-bordered w-full"
                  placeholder="If you want to add extra info..."
                ></textarea>
              </div>

              {/* Date (Display only) */}
              <p className="text-sm text-gray-500">
                <strong>Date:</strong> {new Date().toLocaleDateString()}
              </p>

              {/* Buttons */}
              <div className="modal-action justify-between">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => bidModalRef.current.close()}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Submit Contribution
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>

      {/* ✅ Contribution Table */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-md mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Contributions For This Issue:{" "}
          <span className="text-green-600 font-bold text-3xl">
            {contributions.length.toString().padStart(2, "0")}
          </span>
        </h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-gray-600 border-b">
                <th>SL No</th>
                <th>Contributor</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {contributions.length > 0 ? (
                contributions.map((c, index) => (
                  <tr key={c._id} className="hover:bg-gray-100">
                    <td className="text-amber-500">{index + 1}</td>
                    <td className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full">
                          <img
                            src={
                              c.image ||
                              "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                            }
                            alt={c.contributorName}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {c.contributorName}
                        </h3>
                      </div>
                    </td>
                    <td className="text-gray-700">{c.email}</td>
                    <td className="text-gray-700">{c.phone}</td>
                    <td className="font-semibold text-green-600">
                      ${c.amount}
                    </td>
                    <td className="text-gray-600">{c.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-5">
                    No Contributions Yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
