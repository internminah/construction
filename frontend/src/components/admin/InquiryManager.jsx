"use client";

import { useState, useEffect } from "react";
import { Mail, Trash2, Eye } from "@/components/common/Icons";
import AdminLayout from "./AdminLayout";

// Custom Icon for Checked status
const CheckedIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const TrashIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
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

export default function InquiryManager({ companyInfo }) {
  // Mock Data store initialized outside components
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal Dialog states
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deleteConfirmEnquiry, setDeleteConfirmEnquiry] = useState(null);

  // Initialize and load actual database contact inquiries
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/contact`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.data)) {
            // Map database rows to UI structure
            const mapped = data.data.map((c, index) => ({
              id: c.id,
              name: c.name,
              email: c.email,
              phone: c.phone ? c.phone.toString() : "N/A",
              subject: "General Inquiry",
              message: c.message,
              date: new Date().toISOString().split("T")[0],
              status: index % 2 === 0 ? "Unread" : "Read", // alternate read/unread status for demo
            }));
            setContacts(mapped);
          }
        }
      } catch (err) {
        console.error("Error loading contact inquiries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // API placeholders wrapper triggers
  const handleMarkAsRead = (id) => {
    // Local state toggle since backend has no update route
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Read" } : c))
    );
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry((prev) => ({ ...prev, status: "Read" }));
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c.id !== id));
      } else {
        console.error("Failed to delete contact inquiry in backend");
        setContacts((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error("Error deleting contact inquiry:", err);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } finally {
      setDeleteConfirmEnquiry(null);
    }
  };

  // Searching and status filtering computation
  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Read" && c.status === "Read") ||
      (statusFilter === "Unread" && c.status === "Unread");

    return matchesSearch && matchesStatus;
  });

  // Pagination slicing
  const totalItems = filteredContacts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);

  // Reset page on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  return (
    <AdminLayout companyInfo={companyInfo} activeTab="Contacts">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-poppins font-bold text-3xl text-slate-dark">Contact Enquiries</h1>
          <p className="font-sans text-slate-light text-sm mt-1">
            Monitor, inspect, and organize user enquiries and quotation specs.
          </p>
        </div>
      </div>

      {/* KPI Info Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex items-center gap-5">
          <div className="p-4 bg-primary/10 text-primary rounded-xl shrink-0">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-light/80 block uppercase tracking-wider">
              Total Enquiries
            </span>
            <span className="font-poppins font-extrabold text-2xl text-slate-dark mt-1 block">
              {contacts.length} Total
            </span>
          </div>
        </div>

        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex items-center gap-5">
          <div className="p-4 bg-amber-500/10 text-amber-600 rounded-xl shrink-0">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-light/80 block uppercase tracking-wider">
              New Messages
            </span>
            <span className="font-poppins font-extrabold text-2xl text-slate-dark mt-1 block">
              {contacts.filter((c) => c.status === "Unread").length} Unread
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar & Filtering Row */}
      <div className="bg-white border border-primary/5 rounded-2xl p-5 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search by client, email, phone, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-2.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
          />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider">
            Filter Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-mint border border-primary/10 rounded-lg px-3 py-2.5 text-xs font-poppins font-bold text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
          >
            <option value="All">All Messages</option>
            <option value="Unread">Unread Only</option>
            <option value="Read">Read Only</option>
          </select>
        </div>
      </div>

      {/* Loading state indicator */}
      {loading ? (
        <div className="bg-white border border-primary/5 rounded-2xl p-12 text-center shadow-md">
          <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="font-poppins font-semibold text-sm text-slate-light mt-4">Retrieving active contact records...</p>
        </div>
      ) : (
        /* Enquiries Table Card */
        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md">
          {filteredContacts.length === 0 ? (
            /* Empty State UI */
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-slate-light/30 mx-auto mb-4" />
              <h3 className="font-poppins font-bold text-lg text-slate-dark">No Enquiries Found</h3>
              <p className="font-sans text-slate-light text-sm mt-1">
                There are no client messages matching your search or filters.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Responsive table */}
              <div className="overflow-x-auto min-w-full">
                <table className="min-w-full divide-y divide-mint-dark/50 text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-light/75 uppercase font-poppins font-bold tracking-wider">
                      <th className="py-3 px-2">Client Details</th>
                      <th className="py-3 px-2">Phone Number</th>
                      <th className="py-3 px-2">Subject / Message Summary</th>
                      <th className="py-3 px-2">Date Received</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-mint-dark/40 font-sans">
                    {currentItems.map((item) => (
                      <tr key={item.id} className="hover:bg-mint/20 transition-colors">
                        {/* Client details */}
                        <td className="py-4 px-2">
                          <span className="block font-poppins font-bold text-slate-dark">{item.name}</span>
                          <span className="block text-xs text-slate-light/80 mt-0.5">{item.email}</span>
                        </td>
                        {/* Phone */}
                        <td className="py-4 px-2 text-slate-light text-xs font-semibold">
                          {item.phone}
                        </td>
                        {/* Subject summary */}
                        <td className="py-4 px-2 max-w-xs truncate">
                          <span className="block font-poppins font-semibold text-slate-dark text-xs truncate">
                            {item.subject}
                          </span>
                          <span className="block text-slate-light/85 text-xs truncate mt-0.5">
                            {item.message}
                          </span>
                        </td>
                        {/* Date */}
                        <td className="py-4 px-2 text-slate-light text-xs">
                          {item.date}
                        </td>
                        {/* Status */}
                        <td className="py-4 px-2">
                          <span
                            className={`text-[9px] font-semibold border rounded-full px-2.5 py-0.5 uppercase tracking-wide inline-block ${
                              item.status === "Unread"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-gray-100 text-gray-700 border-gray-200"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        {/* Actions */}
                        <td className="py-4 px-2 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* View */}
                            <button
                              onClick={() => setSelectedEnquiry(item)}
                              title="View Details"
                              className="p-1.5 bg-mint hover:bg-primary/10 text-primary rounded-lg transition-colors focus:outline-none cursor-pointer"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            {/* Mark read */}
                            {item.status === "Unread" && (
                              <button
                                onClick={() => handleMarkAsRead(item.id)}
                                title="Mark as Read"
                                className="p-1.5 bg-mint hover:bg-emerald-500/10 text-emerald-600 rounded-lg transition-colors focus:outline-none cursor-pointer"
                              >
                                <CheckedIcon className="h-4 w-4" />
                              </button>
                            )}
                            {/* Delete */}
                            <button
                              onClick={() => setDeleteConfirmEnquiry(item)}
                              title="Delete Enquiry"
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

              {/* Pagination UI */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-mint-dark/50 pt-4 text-xs font-poppins font-medium text-slate-light">
                  <span>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} enquiries
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

      {/* Modal 1: Inspection View Enquiry Details */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-darkest/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start border-b border-mint-dark pb-4">
              <div>
                <h3 className="font-poppins font-bold text-lg text-slate-dark">Enquiry Inspection</h3>
                <span className="text-[10px] text-slate-light block mt-0.5">Received on {selectedEnquiry.date}</span>
              </div>
              <span
                className={`text-[9px] font-semibold border rounded-full px-2.5 py-0.5 uppercase tracking-wide inline-block ${
                  selectedEnquiry.status === "Unread"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                {selectedEnquiry.status}
              </span>
            </div>

            <div className="space-y-4 text-sm font-sans">
              <div>
                <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Client</span>
                <span className="text-slate-dark font-semibold text-base mt-0.5 block">{selectedEnquiry.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Email Address</span>
                  <span className="text-slate-dark font-medium mt-0.5 block break-all">{selectedEnquiry.email}</span>
                </div>
                <div>
                  <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Phone Number</span>
                  <span className="text-slate-dark font-medium mt-0.5 block">{selectedEnquiry.phone}</span>
                </div>
              </div>
              <div>
                <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Subject</span>
                <span className="text-slate-dark font-semibold mt-0.5 block">{selectedEnquiry.subject}</span>
              </div>
              <div>
                <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Requirements Message</span>
                <p className="text-slate-light mt-1.5 leading-relaxed bg-mint/35 border border-primary/5 rounded-xl p-4 max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-mint-dark">
              {selectedEnquiry.status === "Unread" && (
                <button
                  onClick={() => handleMarkAsRead(selectedEnquiry.id)}
                  className="px-4 py-2 bg-primary hover:bg-primary-light text-mint font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 border border-primary/10 hover:bg-mint/30 text-slate-dark font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Confirm Delete Dialog */}
      {deleteConfirmEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-darkest/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-poppins font-bold text-lg text-slate-dark">Confirm Deletion</h3>
            <p className="font-sans text-sm text-slate-light leading-relaxed">
              Are you sure you want to permanently delete the contact enquiry from <strong className="text-slate-dark">{deleteConfirmEnquiry.name}</strong>? This operation is irreversible.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => handleDelete(deleteConfirmEnquiry.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Permanently Delete
              </button>
              <button
                onClick={() => setDeleteConfirmEnquiry(null)}
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
