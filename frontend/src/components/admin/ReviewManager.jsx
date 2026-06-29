"use client";

import { useState, useEffect } from "react";
import { Eye, Heart, Trophy, Building, Users } from "@/components/common/Icons";
import AdminLayout from "./AdminLayout";

// Custom SVG Icons
const EditIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const TrashIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const ApproveIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const RejectIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
);

// Initial mock reviews dataset representing GET /api/reviews initial dump
const initialMockReviews = [
  {
    id: "rev-1",
    clientName: "Jonathan Sterling",
    projectName: "Bespoke Glass Villa",
    role: "President, Sterling Family Trust",
    content: "I Constructions exceeded all our expectations. They finished the Hamptons Glass Villa three weeks ahead of schedule and the transparency in pricing was refreshing.",
    rating: 5,
    date: "2026-06-25",
    status: "Approved",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150"
  },
  {
    id: "rev-2",
    clientName: "Clara Vance",
    projectName: "The Emerald Heights Skyscraper",
    role: "Managing Director, Emerald Holdings Group",
    content: "The engineering team at I Constructions is top-tier. They integrated complex sustainable energy grids into our 45-story skyscraper with precision.",
    rating: 5,
    date: "2026-06-24",
    status: "Approved",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150"
  },
  {
    id: "rev-3",
    clientName: "Marcus Aurelius",
    projectName: "Eco-Industrial Complex",
    role: "Director of Operations",
    content: "Excellent layout execution and timely delivery. The structural safety parameters were met perfectly.",
    rating: 4,
    date: "2026-06-22",
    status: "Pending",
    image: ""
  },
  {
    id: "rev-4",
    clientName: "Seneca Tully",
    projectName: "Renovation Masonry Works",
    role: "Owner, Stoic Properties",
    content: "Staging phase delays were somewhat frustrating, but the final masonry builds look absolutely spectacular.",
    rating: 3,
    date: "2026-06-20",
    status: "Pending",
    image: ""
  },
  {
    id: "rev-5",
    clientName: "Cicero Tully",
    projectName: "Senate Renovation Hall",
    role: "Senior Consultant",
    content: "Extremely poor scheduling oversight. The stone cladding installation was delayed by four weeks and calculations were faulty.",
    rating: 2,
    date: "2026-06-18",
    status: "Rejected",
    image: ""
  }
];

export default function ReviewManager({ companyInfo }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modals state
  const [selectedReview, setSelectedReview] = useState(null);
  const [editReview, setEditReview] = useState(null);
  const [deleteConfirmReview, setDeleteConfirmReview] = useState(null);
  const [statusConfirmReview, setStatusConfirmReview] = useState(null);

  // Form Fields State
  const [formClientName, setFormClientName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formProjectName, setFormProjectName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formContent, setFormContent] = useState("");
  const [formStatus, setFormStatus] = useState("Pending");

  // Initialize and load actual database testimonials (reviews)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/testimonials`);
        if (res.ok) {
          const data = await res.json();
          const result = Array.isArray(data.data) ? data.data : (data.data?.testimonials || data.testimonials || []);
          const mapped = result.map((r) => ({
            id: r.id.toString(),
            clientName: r.customer_name || r.clientName || "",
            projectName: r.projectName || "Bespoke Glass Villa",
            role: r.role || "Client",
            content: r.review || r.content || "",
            rating: Number(r.rating) || 5,
            date: r.date || "2026-06-29",
            status: r.status || "Approved",
            image: r.image || ""
          }));
          setReviews(mapped);
        }
      } catch (err) {
        console.error("Failed to load reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // API handlers calling backend endpoints
  const handleUpdateReview = async (e) => {
    e.preventDefault();
    if (!editReview || !formClientName.trim()) return;

    // Local update fallback since backend doesn't support testimonial updates
    const updated = {
      ...editReview,
      clientName: formClientName,
      role: formRole,
      projectName: formProjectName,
      rating: parseInt(formRating) || 5,
      content: formContent,
      status: formStatus
    };

    setLoading(true);
    setTimeout(() => {
      setReviews((prev) =>
        prev.map((r) => (r.id === editReview.id ? updated : r))
      );
      if (selectedReview && selectedReview.id === editReview.id) {
        setSelectedReview(updated);
      }
      setEditReview(null);
      resetForm();
      setLoading(false);
    }, 400);
  };

  const handlePatchStatus = async (id, newStatus) => {
    // Local patch fallback since backend doesn't support testimonial status updates
    setLoading(true);
    setTimeout(() => {
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
      if (selectedReview && selectedReview.id === id) {
        setSelectedReview((prev) => ({ ...prev, status: newStatus }));
      }
      setStatusConfirmReview(null);
      setLoading(false);
    }, 400);
  };

  const handleDeleteReview = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/testimonials/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
        setSelectedReview(null);
      } else {
        alert("Failed to delete review from database.");
      }
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Error deleting review.");
    } finally {
      setDeleteConfirmReview(null);
      setLoading(false);
    }
  };

  const openEditModal = (review) => {
    setEditReview(review);
    setFormClientName(review.clientName);
    setFormRole(review.role);
    setFormProjectName(review.projectName);
    setFormRating(review.rating);
    setFormContent(review.content);
    setFormStatus(review.status);
  };

  const resetForm = () => {
    setFormClientName("");
    setFormRole("");
    setFormProjectName("");
    setFormRating(5);
    setFormContent("");
    setFormStatus("Pending");
  };

  // Searching and Filtering
  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || r.status === statusFilter;

    const matchesRating =
      ratingFilter === "All" || r.rating === parseInt(ratingFilter);

    return matchesSearch && matchesStatus && matchesRating;
  });

  // Pagination Slicing
  const totalItems = filteredReviews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);

  // Reset page number on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, ratingFilter]);

  return (
    <AdminLayout companyInfo={companyInfo} activeTab="Reviews">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-poppins font-bold text-3xl text-slate-dark">Review Moderation</h1>
          <p className="font-sans text-slate-light text-sm mt-1">
            Moderate, review, and edit customer testimonials before publication hooks are updated.
          </p>
        </div>
      </div>

      {/* KPI Info Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex items-center gap-5">
          <div className="p-4 bg-primary/10 text-primary rounded-xl shrink-0">
            <Heart className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-light/80 block uppercase tracking-wider">
              Total Reviews
            </span>
            <span className="font-poppins font-extrabold text-2xl text-slate-dark mt-1 block">
              {reviews.length} Total
            </span>
          </div>
        </div>

        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex items-center gap-5">
          <div className="p-4 bg-emerald-500/10 text-emerald-600 rounded-xl shrink-0">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-light/80 block uppercase tracking-wider">
              Approved Feedbacks
            </span>
            <span className="font-poppins font-extrabold text-2xl text-slate-dark mt-1 block">
              {reviews.filter((r) => r.status === "Approved").length} Active
            </span>
          </div>
        </div>

        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex items-center gap-5">
          <div className="p-4 bg-amber-500/10 text-amber-600 rounded-xl shrink-0">
            <Building className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-light/80 block uppercase tracking-wider">
              Pending Moderation
            </span>
            <span className="font-poppins font-extrabold text-2xl text-slate-dark mt-1 block">
              {reviews.filter((r) => r.status === "Pending").length} Pending
            </span>
          </div>
        </div>

        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex items-center gap-5">
          <div className="p-4 bg-red-500/10 text-red-600 rounded-xl shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-light/80 block uppercase tracking-wider">
              Rejected Feedbacks
            </span>
            <span className="font-poppins font-extrabold text-2xl text-slate-dark mt-1 block">
              {reviews.filter((r) => r.status === "Rejected").length} Rejected
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar & Filtering Row */}
      <div className="bg-white border border-primary/5 rounded-2xl p-5 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-grow max-w-md relative">
          <input
            type="text"
            placeholder="Search testimonials by customer, project, content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-2.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider">
              Rating:
            </label>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="bg-mint border border-primary/10 rounded-lg px-3 py-2.5 text-xs font-poppins font-bold text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
            >
              <option value="All">All Stars</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider">
              Status:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-mint border border-primary/10 rounded-lg px-3 py-2.5 text-xs font-poppins font-bold text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending Only</option>
              <option value="Approved">Approved Only</option>
              <option value="Rejected">Rejected Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading state indicator */}
      {loading ? (
        <div className="bg-white border border-primary/5 rounded-2xl p-12 text-center shadow-md">
          <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="font-poppins font-semibold text-sm text-slate-light mt-4">Retrieving customer feedbacks database...</p>
        </div>
      ) : (
        /* Reviews Table Card */
        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md">
          {filteredReviews.length === 0 ? (
            /* Empty State UI */
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-slate-light/30 mx-auto mb-4" />
              <h3 className="font-poppins font-bold text-lg text-slate-dark">No Reviews Found</h3>
              <p className="font-sans text-slate-light text-sm mt-1">
                There are no client feedback entries matching your search keys or selection filter.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="overflow-x-auto min-w-full">
                <table className="min-w-full divide-y divide-mint-dark/50 text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-light/75 uppercase font-poppins font-bold tracking-wider">
                      <th className="py-3 px-2">Customer Name</th>
                      <th className="py-3 px-2">Project Name</th>
                      <th className="py-3 px-2">Rating</th>
                      <th className="py-3 px-2">Review Preview</th>
                      <th className="py-3 px-2">Date</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-mint-dark/40 font-sans">
                    {currentItems.map((item) => (
                      <tr key={item.id} className="hover:bg-mint/20 transition-colors">
                        {/* Name and avatar/details */}
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full overflow-hidden border border-mint-dark shrink-0 relative bg-mint flex items-center justify-center font-poppins font-bold text-primary text-xs">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.clientName}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                item.clientName.split(" ").map(w => w[0]).join("").slice(0, 2)
                              )}
                            </div>
                            <div>
                              <span className="block font-poppins font-bold text-slate-dark text-sm">{item.clientName}</span>
                              <span className="block text-[9px] text-slate-light font-semibold -mt-0.5">{item.role || "Client"}</span>
                            </div>
                          </div>
                        </td>
                        {/* Project */}
                        <td className="py-4 px-2 text-slate-dark font-medium text-xs">
                          {item.projectName}
                        </td>
                        {/* Rating */}
                        <td className="py-4 px-2">
                          <div className="flex gap-0.5 text-amber-500 text-sm">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i}>{i < item.rating ? "★" : "☆"}</span>
                            ))}
                          </div>
                        </td>
                        {/* Review text preview */}
                        <td className="py-4 px-2 max-w-xs truncate text-xs text-slate-light leading-relaxed">
                          {item.content}
                        </td>
                        {/* Date */}
                        <td className="py-4 px-2 text-slate-light text-xs font-semibold">
                          {item.date}
                        </td>
                        {/* Status badge */}
                        <td className="py-4 px-2">
                          <span
                            className={`text-[9px] font-semibold border rounded-full px-2.5 py-0.5 uppercase tracking-wide inline-block ${
                              item.status === "Approved"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : item.status === "Rejected"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        {/* Actions */}
                        <td className="py-4 px-2 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* View */}
                            <button
                              onClick={() => setSelectedReview(item)}
                              title="View Details"
                              className="p-1.5 bg-mint hover:bg-primary/10 text-primary rounded-lg transition-colors focus:outline-none cursor-pointer"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            {/* Quick Moderation Controls */}
                            {item.status !== "Approved" && (
                              <button
                                onClick={() => setStatusConfirmReview({ review: item, newStatus: "Approved" })}
                                title="Approve Review"
                                className="p-1.5 bg-mint hover:bg-emerald-500/10 text-emerald-600 rounded-lg transition-colors focus:outline-none cursor-pointer"
                              >
                                <ApproveIcon className="h-4 w-4" />
                              </button>
                            )}
                            {item.status !== "Rejected" && (
                              <button
                                onClick={() => setStatusConfirmReview({ review: item, newStatus: "Rejected" })}
                                title="Reject Review"
                                className="p-1.5 bg-mint hover:bg-rose-500/10 text-rose-600 rounded-lg transition-colors focus:outline-none cursor-pointer"
                              >
                                <RejectIcon className="h-4 w-4" />
                              </button>
                            )}
                            {/* Edit */}
                            <button
                              onClick={() => openEditModal(item)}
                              title="Edit Review"
                              className="p-1.5 bg-mint hover:bg-amber-500/10 text-amber-600 rounded-lg transition-colors focus:outline-none cursor-pointer"
                            >
                              <EditIcon className="h-4 w-4" />
                            </button>
                            {/* Delete */}
                            <button
                              onClick={() => setDeleteConfirmReview(item)}
                              title="Delete Review"
                              className="p-1.5 bg-red-50 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors focus:outline-none cursor-pointer"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-mint-dark/50 pt-4 text-xs font-poppins font-medium text-slate-light">
                  <span>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      className="px-3 py-1.5 border border-primary/15 rounded-lg bg-mint hover:bg-primary/5 disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      Previous
                    </button>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      className="px-3 py-1.5 border border-primary/15 rounded-lg bg-mint hover:bg-primary/5 disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Modal 1: View Review Specifications */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-darkest/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start border-b border-mint-dark pb-4">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full overflow-hidden border border-mint-dark shrink-0 relative bg-mint flex items-center justify-center font-poppins font-bold text-primary text-sm">
                  {selectedReview.image ? (
                    <img
                      src={selectedReview.image}
                      alt={selectedReview.clientName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    selectedReview.clientName.split(" ").map(w => w[0]).join("").slice(0, 2)
                  )}
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-slate-dark">{selectedReview.clientName}</h3>
                  <span className="text-[10px] text-slate-light font-semibold block">{selectedReview.role || "Client"}</span>
                </div>
              </div>
              <span
                className={`text-[9px] font-semibold border rounded-full px-2.5 py-0.5 uppercase tracking-wide inline-block ${
                  selectedReview.status === "Approved"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : selectedReview.status === "Rejected"
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                {selectedReview.status}
              </span>
            </div>

            <div className="space-y-4 text-sm font-sans">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Project Name</span>
                  <span className="text-slate-dark font-semibold mt-0.5 block">{selectedReview.projectName}</span>
                </div>
                <div>
                  <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Submission Date</span>
                  <span className="text-slate-dark font-semibold mt-0.5 block">{selectedReview.date}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Rating Rating</span>
                <div className="flex gap-0.5 text-amber-500 text-lg mt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < selectedReview.rating ? "★" : "☆"}</span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Review Testimonial Content</span>
                <p className="text-slate-light mt-1.5 leading-relaxed bg-mint/35 border border-primary/5 rounded-xl p-4 max-h-40 overflow-y-auto whitespace-pre-wrap italic">
                  &ldquo;{selectedReview.content}&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-mint-dark">
              <div className="flex items-center gap-2">
                {selectedReview.status !== "Approved" && (
                  <button
                    onClick={() => handlePatchStatus(selectedReview.id, "Approved")}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Approve
                  </button>
                )}
                {selectedReview.status !== "Rejected" && (
                  <button
                    onClick={() => handlePatchStatus(selectedReview.id, "Rejected")}
                    className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Reject
                  </button>
                )}
              </div>
              <button
                onClick={() => setSelectedReview(null)}
                className="px-4 py-2 border border-primary/10 hover:bg-mint/30 text-slate-dark font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Review Parameters */}
      {editReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-darkest/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="border-b border-mint-dark pb-4">
              <h3 className="font-poppins font-bold text-lg text-slate-dark">Modify Testimonial Parameters</h3>
              <p className="text-xs text-slate-light">Edit review details submitted by "{editReview.clientName}".</p>
            </div>

            <form onSubmit={handleUpdateReview} className="space-y-4 text-sm font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={formClientName}
                    onChange={(e) => setFormClientName(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Client Role / Profession</label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. Senior Developer"
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={formProjectName}
                    onChange={(e) => setFormProjectName(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Rating Star</label>
                  <select
                    value={formRating}
                    onChange={(e) => setFormRating(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Moderation Status</label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                  className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Feedback Content *</label>
                <textarea
                  required
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  rows="4"
                  className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-mint-dark">
                <button
                  type="button"
                  onClick={() => setEditReview(null)}
                  className="px-4 py-2 border border-primary/10 hover:bg-mint/30 text-slate-dark font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:bg-primary-light text-mint font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Save Modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Quick Status Action Confirmation */}
      {statusConfirmReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-darkest/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-poppins font-bold text-lg text-slate-dark">Confirm Moderation Action</h3>
            <p className="font-sans text-sm text-slate-light leading-relaxed">
              Are you sure you want to mark the review from <strong className="text-slate-dark">{statusConfirmReview.review.clientName}</strong> as <strong className="text-slate-dark uppercase">{statusConfirmReview.newStatus}</strong>?
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => handlePatchStatus(statusConfirmReview.review.id, statusConfirmReview.newStatus)}
                className={`px-4 py-2 text-white font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer ${
                  statusConfirmReview.newStatus === "Approved" ? "bg-emerald-600 hover:bg-emerald-500" : "bg-rose-600 hover:bg-rose-500"
                }`}
              >
                Confirm {statusConfirmReview.newStatus}
              </button>
              <button
                onClick={() => setStatusConfirmReview(null)}
                className="px-4 py-2 border border-primary/10 hover:bg-mint/30 text-slate-dark font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Confirm Delete Dialog */}
      {deleteConfirmReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-darkest/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-poppins font-bold text-lg text-slate-dark">Confirm Feedback Deletion</h3>
            <p className="font-sans text-sm text-slate-light leading-relaxed">
              Are you sure you want to permanently delete the review from <strong className="text-slate-dark">{deleteConfirmReview.clientName}</strong>? This operation is irreversible.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => handleDeleteReview(deleteConfirmReview.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Permanently Delete
              </button>
              <button
                onClick={() => setDeleteConfirmReview(null)}
                className="px-4 py-2 border border-primary/10 hover:bg-mint/30 text-slate-dark font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
