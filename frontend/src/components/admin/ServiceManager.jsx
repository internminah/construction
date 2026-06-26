"use client";

import { useState, useEffect } from "react";
import { Eye, Building2, Building, Briefcase, Award, Compass, Hammer } from "@/components/common/Icons";
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

const PlusIcon = (props) => (
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
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// Initial mock dataset representing GET /api/services initial dump
const initialMockServices = [
  {
    id: "serv-1",
    title: "Residential Construction",
    category: "Construction",
    description: "Custom premium residences, modern apartments, and green living environments.",
    details: "Your dream home built with premium materials. We specialize in luxury residential estates, sustainable single-family residences, and upscale multi-family structures.",
    slug: "residential",
    iconName: "Building2",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600",
    status: "Active",
    lastUpdated: "2026-06-25"
  },
  {
    id: "serv-2",
    title: "Commercial Construction",
    category: "Construction",
    description: "Building high-performance corporate offices, retail spaces, and commercial structures.",
    details: "We deliver commercial builds that optimize flow, support structural efficiency, and reflect modern luxury. Our services range from new build projects to tenant improvements.",
    slug: "commercial",
    iconName: "Building",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600",
    status: "Active",
    lastUpdated: "2026-06-24"
  },
  {
    id: "serv-3",
    title: "Interior Design",
    category: "Design",
    description: "Elegant bespoke interior design concepts aligning utility and high-end aesthetics.",
    details: "Designing inside-out. We choose premium color configurations, load-bearing spatial layouts, and premium light systems to create breathtaking workspaces and living environments.",
    slug: "interior",
    iconName: "Award",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600",
    status: "Active",
    lastUpdated: "2026-06-23"
  },
  {
    id: "serv-4",
    title: "Renovation & Remodeling",
    category: "Modernization",
    description: "Expanding, upgrading, and breathing new life into existing structural blueprints.",
    details: "We transform dated residences and commercial spaces into modern masterpieces. From single-room updates to full-facility structural modernizations.",
    slug: "renovation",
    iconName: "Hammer",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600",
    status: "Active",
    lastUpdated: "2026-06-22"
  },
  {
    id: "serv-5",
    title: "Civil Engineering",
    category: "Engineering",
    description: "Infrastructure planning, load calculations, and environmental feasibility management.",
    details: "Bridging architectural vision with load safety. Our structural engineers design foundations, manage grading blueprints, and inspect load-bearing steel alignments.",
    slug: "engineering",
    iconName: "Compass",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600",
    status: "Active",
    lastUpdated: "2026-06-21"
  },
  {
    id: "serv-6",
    title: "Project Management",
    category: "Management",
    description: "Lifecycle scheduling, procurement oversight, and strict quality control supervision.",
    details: "End-to-end governance. We handle procurement, site inspections, contractor workflows, and schedule critical path models to ensure flawless delivery.",
    slug: "management",
    iconName: "Briefcase",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600",
    status: "Inactive",
    lastUpdated: "2026-06-20"
  }
];

export default function ServiceManager({ companyInfo }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal Dialog states
  const [selectedService, setSelectedService] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editService, setEditService] = useState(null);
  const [deleteConfirmService, setDeleteConfirmService] = useState(null);

  // Form Fields State
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Construction");
  const [formStatus, setFormStatus] = useState("Active");
  const [formDescription, setFormDescription] = useState("");
  const [formDetails, setFormDetails] = useState("");
  const [formIcon, setFormIcon] = useState("Building2");
  const [formImage, setFormImage] = useState("");

  // Initialize and simulate API fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setServices(initialMockServices);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Isolated mock API handlers (easy integration later)
  const handleCreateService = async (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    // Simulate POST /api/services
    const newService = {
      id: `serv-${Date.now()}`,
      title: formTitle,
      category: formCategory,
      description: formDescription,
      details: formDetails,
      slug: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      iconName: formIcon,
      image: formImage || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600",
      status: formStatus,
      lastUpdated: new Date().toISOString().split("T")[0]
    };

    setLoading(true);
    setTimeout(() => {
      setServices((prev) => [newService, ...prev]);
      setAddModalOpen(false);
      resetForm();
      setLoading(false);
    }, 400);
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    if (!editService || !formTitle.trim()) return;

    // Simulate PUT /api/services/:id
    const updated = {
      ...editService,
      title: formTitle,
      category: formCategory,
      description: formDescription,
      details: formDetails,
      iconName: formIcon,
      image: formImage,
      status: formStatus,
      lastUpdated: new Date().toISOString().split("T")[0]
    };

    setLoading(true);
    setTimeout(() => {
      setServices((prev) =>
        prev.map((s) => (s.id === editService.id ? updated : s))
      );
      setEditService(null);
      resetForm();
      setLoading(false);
    }, 400);
  };

  const handleDeleteService = async (id) => {
    // Simulate DELETE /api/services/:id
    setLoading(true);
    setTimeout(() => {
      setServices((prev) => prev.filter((s) => s.id !== id));
      setDeleteConfirmService(null);
      setLoading(false);
    }, 400);
  };

  const openEditModal = (service) => {
    setEditService(service);
    setFormTitle(service.title);
    setFormCategory(service.category);
    setFormStatus(service.status);
    setFormDescription(service.description);
    setFormDetails(service.details);
    setFormIcon(service.iconName);
    setFormImage(service.image);
  };

  const resetForm = () => {
    setFormTitle("");
    setFormCategory("Construction");
    setFormStatus("Active");
    setFormDescription("");
    setFormDetails("");
    setFormIcon("Building2");
    setFormImage("");
  };

  // Searching and Filtering
  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || s.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination Slicing
  const totalItems = filteredServices.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem);

  // Reset pagination page on search/filter update
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  // Helper to map iconName string to lucide components
  const renderIcon = (name, className = "h-5 w-5") => {
    switch (name) {
      case "Building2":
        return <Building2 className={className} />;
      case "Building":
        return <Building className={className} />;
      case "Award":
        return <Award className={className} />;
      case "Hammer":
        return <Hammer className={className} />;
      case "Compass":
        return <Compass className={className} />;
      case "Briefcase":
        return <Briefcase className={className} />;
      default:
        return <Building2 className={className} />;
    }
  };

  return (
    <AdminLayout companyInfo={companyInfo} activeTab="Services">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-poppins font-bold text-3xl text-slate-dark">Services Catalog</h1>
          <p className="font-sans text-slate-light text-sm mt-1">
            Create, view, edit, and organize structural and design service offerings.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setAddModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-light text-mint font-poppins font-bold text-sm rounded-xl transition-all shadow-md self-start sm:self-center cursor-pointer"
        >
          <PlusIcon className="h-4 w-4" />
          Add New Service
        </button>
      </div>

      {/* KPI Info Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex items-center gap-5">
          <div className="p-4 bg-primary/10 text-primary rounded-xl shrink-0">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-light/80 block uppercase tracking-wider">
              Total Services
            </span>
            <span className="font-poppins font-extrabold text-2xl text-slate-dark mt-1 block">
              {services.length} Catalogued
            </span>
          </div>
        </div>

        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex items-center gap-5">
          <div className="p-4 bg-emerald-500/10 text-emerald-600 rounded-xl shrink-0">
            <Building className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-light/80 block uppercase tracking-wider">
              Active Offerings
            </span>
            <span className="font-poppins font-extrabold text-2xl text-slate-dark mt-1 block">
              {services.filter((s) => s.status === "Active").length} Active
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar & Filtering Row */}
      <div className="bg-white border border-primary/5 rounded-2xl p-5 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-grow max-w-md relative">
          <input
            type="text"
            placeholder="Search services by title, category, keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-2.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
          />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider">
            Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-mint border border-primary/10 rounded-lg px-3 py-2.5 text-xs font-poppins font-bold text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Loading state indicator */}
      {loading ? (
        <div className="bg-white border border-primary/5 rounded-2xl p-12 text-center shadow-md">
          <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="font-poppins font-semibold text-sm text-slate-light mt-4">Syncing services directory...</p>
        </div>
      ) : (
        /* Services Table Card */
        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md">
          {filteredServices.length === 0 ? (
            /* Empty State UI */
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-slate-light/30 mx-auto mb-4" />
              <h3 className="font-poppins font-bold text-lg text-slate-dark">No Services Found</h3>
              <p className="font-sans text-slate-light text-sm mt-1">
                There are no catalogue items matching your search key or selection filter.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="overflow-x-auto min-w-full">
                <table className="min-w-full divide-y divide-mint-dark/50 text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-light/75 uppercase font-poppins font-bold tracking-wider">
                      <th className="py-3 px-2">Service Details</th>
                      <th className="py-3 px-2">Category</th>
                      <th className="py-3 px-2">Short Description</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2">Last Updated</th>
                      <th className="py-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-mint-dark/40 font-sans">
                    {currentItems.map((item) => (
                      <tr key={item.id} className="hover:bg-mint/20 transition-colors">
                        {/* Name and icon */}
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-mint text-primary rounded-lg shrink-0 border border-primary/5">
                              {renderIcon(item.iconName, "h-5 w-5")}
                            </div>
                            <div>
                              <span className="block font-poppins font-bold text-slate-dark">{item.title}</span>
                              <span className="block text-[10px] text-slate-light uppercase tracking-wider font-semibold">ID: {item.id}</span>
                            </div>
                          </div>
                        </td>
                        {/* Category */}
                        <td className="py-4 px-2">
                          <span className="font-poppins font-semibold text-xs text-slate-dark px-2.5 py-1 bg-mint border border-primary/10 rounded-md">
                            {item.category}
                          </span>
                        </td>
                        {/* Short Description */}
                        <td className="py-4 px-2 max-w-xs truncate text-xs text-slate-light">
                          {item.description}
                        </td>
                        {/* Status */}
                        <td className="py-4 px-2">
                          <span
                            className={`text-[9px] font-semibold border rounded-full px-2.5 py-0.5 uppercase tracking-wide inline-block ${
                              item.status === "Active"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-gray-100 text-gray-700 border-gray-200"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        {/* Last Updated */}
                        <td className="py-4 px-2 text-slate-light text-xs font-semibold">
                          {item.lastUpdated}
                        </td>
                        {/* Actions */}
                        <td className="py-4 px-2 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* View */}
                            <button
                              onClick={() => setSelectedService(item)}
                              title="View Details"
                              className="p-1.5 bg-mint hover:bg-primary/10 text-primary rounded-lg transition-colors focus:outline-none cursor-pointer"
                            >
                              <Eye className="h-4.5 w-4.5" />
                            </button>
                            {/* Edit */}
                            <button
                              onClick={() => openEditModal(item)}
                              title="Edit Service"
                              className="p-1.5 bg-mint hover:bg-emerald-500/10 text-emerald-600 rounded-lg transition-colors focus:outline-none cursor-pointer"
                            >
                              <EditIcon className="h-4.5 w-4.5" />
                            </button>
                            {/* Delete */}
                            <button
                              onClick={() => setDeleteConfirmService(item)}
                              title="Delete Service"
                              className="p-1.5 bg-red-50 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors focus:outline-none cursor-pointer"
                            >
                              <TrashIcon className="h-4.5 w-4.5" />
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

      {/* Modal 1: Inspection View Service Details */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-darkest/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start border-b border-mint-dark pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-mint text-primary rounded-xl shrink-0 border border-primary/5">
                  {renderIcon(selectedService.iconName, "h-6 w-6")}
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg text-slate-dark">{selectedService.title}</h3>
                  <span className="text-[10px] text-slate-light uppercase tracking-wider block mt-0.5">Category: {selectedService.category}</span>
                </div>
              </div>
              <span
                className={`text-[9px] font-semibold border rounded-full px-2.5 py-0.5 uppercase tracking-wide inline-block ${
                  selectedService.status === "Active"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                {selectedService.status}
              </span>
            </div>

            {selectedService.image && (
              <div className="h-44 w-full rounded-xl overflow-hidden border border-mint-dark relative">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="space-y-4 text-sm font-sans">
              <div>
                <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Short Overview</span>
                <p className="text-slate-dark mt-1 font-medium">{selectedService.description}</p>
              </div>
              <div>
                <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Detailed Specifications</span>
                <p className="text-slate-light mt-1.5 leading-relaxed bg-mint/35 border border-primary/5 rounded-xl p-4 max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {selectedService.details}
                </p>
              </div>
              <div className="text-[10px] text-slate-light font-semibold uppercase tracking-wider">
                Last modified on {selectedService.lastUpdated}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-mint-dark">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 border border-primary/10 hover:bg-mint/30 text-slate-dark font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Create (Add) New Service */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-darkest/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="border-b border-mint-dark pb-4">
              <h3 className="font-poppins font-bold text-lg text-slate-dark">Create New Service Offering</h3>
              <p className="text-xs text-slate-light">Input structural details, image assets, and icons for the catalog.</p>
            </div>

            <form onSubmit={handleCreateService} className="space-y-4 text-sm font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Service Name *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Concrete Contracting"
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  >
                    <option value="Construction">Construction</option>
                    <option value="Design">Design</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Icon Type</label>
                  <select
                    value={formIcon}
                    onChange={(e) => setFormIcon(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  >
                    <option value="Building2">Building Stack (Building2)</option>
                    <option value="Building">Corporate Office (Building)</option>
                    <option value="Award">Star Ribbon (Award)</option>
                    <option value="Hammer">Claw Hammer (Hammer)</option>
                    <option value="Compass">Surveyor Compass (Compass)</option>
                    <option value="Briefcase">Case Portfolio (Briefcase)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Image URL</label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Short Overview *</label>
                <input
                  type="text"
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="e.g. High-strength concrete works and grading foundation layouts."
                  className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Detailed Specifications</label>
                <textarea
                  value={formDetails}
                  onChange={(e) => setFormDetails(e.target.value)}
                  placeholder="Full scope specifications, engineering codes, and delivery workflow..."
                  rows="3"
                  className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-mint-dark">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 border border-primary/10 hover:bg-mint/30 text-slate-dark font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:bg-primary-light text-mint font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Publish Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Edit Existing Service */}
      {editService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-darkest/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="border-b border-mint-dark pb-4">
              <h3 className="font-poppins font-bold text-lg text-slate-dark">Modify Service Specifications</h3>
              <p className="text-xs text-slate-light">Edit parameters and status criteria for "{editService.title}".</p>
            </div>

            <form onSubmit={handleUpdateService} className="space-y-4 text-sm font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Service Name *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  >
                    <option value="Construction">Construction</option>
                    <option value="Design">Design</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Icon Type</label>
                  <select
                    value={formIcon}
                    onChange={(e) => setFormIcon(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  >
                    <option value="Building2">Building Stack (Building2)</option>
                    <option value="Building">Corporate Office (Building)</option>
                    <option value="Award">Star Ribbon (Award)</option>
                    <option value="Hammer">Claw Hammer (Hammer)</option>
                    <option value="Compass">Surveyor Compass (Compass)</option>
                    <option value="Briefcase">Case Portfolio (Briefcase)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Image URL</label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Short Overview *</label>
                <input
                  type="text"
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Detailed Specifications</label>
                <textarea
                  value={formDetails}
                  onChange={(e) => setFormDetails(e.target.value)}
                  rows="3"
                  className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-mint-dark">
                <button
                  type="button"
                  onClick={() => setEditService(null)}
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

      {/* Modal 4: Confirm Delete Dialog */}
      {deleteConfirmService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-darkest/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-poppins font-bold text-lg text-slate-dark">Confirm Deletion</h3>
            <p className="font-sans text-sm text-slate-light leading-relaxed">
              Are you sure you want to permanently delete the service <strong className="text-slate-dark">{deleteConfirmService.title}</strong>? This operation is irreversible.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => handleDeleteService(deleteConfirmService.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Permanently Delete
              </button>
              <button
                onClick={() => setDeleteConfirmService(null)}
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
