import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FileDown } from "lucide-react";
import Swal from "sweetalert2";

const MyContribution = () => {
  const { user } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://cleancity-server.vercel.app/contribution?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setContributions(data);
        })
        .catch((err) => console.error("Error loading contributions:", err));
    }
  }, [user?.email]);

  // Download Single Contribution Report
  const handleDownloadReport = (c) => {
    const reportContent = `
      Community Cleanliness Contribution Report

      Contributor: ${c.contributorName}
      Email: ${c.email}
      Phone: ${c.phone}
      Address: ${c.address}

      Issue Title: ${c.issueTitle}
      Category: ${c.category}
      Location: ${c.location}
      Paid Amount: ${c.amount}
      Date: ${c.date}

      Thank you for supporting your community!
    `;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Contribution_Report_${c.issueTitle.replace(
      /\s+/g,
      "_"
    )}.txt`;
    link.click();

    Swal.fire({
      icon: "success",
      title: "Report Downloaded!",
      showConfirmButton: false,
      timer: 1200,
      position: "top-end",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-base-100 rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">
        💚 My Contributions
      </h2>

      <div className="bg-gray-50 p-6 rounded-xl shadow-md mt-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Total Contributions:{" "}
          <span className="text-green-600 font-bold text-3xl">
            {contributions.length.toString().padStart(2, "0")}
          </span>
        </h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead>
              <tr className="text-gray-600 border-b">
                <th>SL No</th>
                <th>Issue Title</th>
                <th>Category</th>
                <th>Paid Amount</th>
                <th>Date</th>
                <th className="text-center">Download</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {contributions.length > 0 ? (
                contributions.map((c, index) => (
                  <tr key={c._id} className="hover:bg-gray-100">
                    <td>{index + 1}</td>

                    {/* Issue Title */}
                    <td className="font-semibold text-gray-800">
                      {c.issueTitle}
                    </td>

                    {/* Category */}
                    <td className="text-gray-600">{c.category}</td>

                    {/* Amount */}
                    <td className="font-semibold text-green-600">
                      ${c.amount}
                    </td>

                    {/* Date */}
                    <td className="text-gray-600">{c.date}</td>

                    {/* Download Button */}
                    <td className="text-center">
                      <button
                        onClick={() => handleDownloadReport(c)}
                        className="btn btn-xs bg-green-100 text-green-700 border border-green-300 hover:bg-green-200 flex items-center gap-1"
                      >
                        <FileDown size={14} /> Download
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-5">
                    No Contributions Found
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

export default MyContribution;
