"use client";

import { useState, useEffect } from "react";
import { Eye, Briefcase, Award, Compass, Users } from "@/components/common/Icons";
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

const UpdateStatusIcon = (props) => (
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
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </svg>
);

// Initial mock project tracking dataset representing GET /api/projects initial dump
const initialMockProjects = [
  {
    id: "proj-track-1",
    title: "High-Rise Glass Canopy",
    client: "Nexus Development Group",
    manager: "Dr. Alaina Vance",
    startDate: "2026-02-10",
    expectedCompletion: "2026-12-15",
    status: "Ongoing",
    progress: 45,
    priority: "High",
    description: "Installing double-paned reinforced glass columns and dynamic shading components across the plaza."
  },
  {
    id: "proj-track-2",
    title: "Suburban Green Estate",
    client: "Sterling Family Trust",
    manager: "Marcus Sterling",
    startDate: "2025-11-01",
    expectedCompletion: "2026-08-30",
    status: "Ongoing",
    progress: 75,
    priority: "Medium",
    description: "LEED Platinum residential building with smart passive grids and solar-roof layout planning."
  },
  {
    id: "proj-track-3",
    title: "Historic Port Restorations",
    client: "Naples Municipal Council",
    manager: "David Kross",
    startDate: "2026-05-12",
    expectedCompletion: "2027-02-20",
    status: "Planning",
    progress: 10,
    priority: "High",
    description: "Restoration of masonry walls, load capacity calculations, and seawall concrete fortification."
  },
  {
    id: "proj-track-4",
    title: "Aura Warehouses Logistics",
    client: "Aura Logistics Ltd",
    manager: "Sarah Jenkins",
    startDate: "2025-06-01",
    expectedCompletion: "2026-04-15",
    status: "Completed",
    progress: 100,
    priority: "Low",
    description: "Industrial warehouse expansion featuring passive cooling systems and automated loading docks."
  },
  {
    id: "proj-track-5",
    title: "Downtown Transit Hub",
    client: "Metropolitan Transit Authority",
    manager: "Dr. Alaina Vance",
    startDate: "2026-01-15",
    expectedCompletion: "2026-10-30",
    status: "On Hold",
    progress: 30,
    priority: "High",
    description: "Structural framing for a passenger transit terminal. Currently on hold due to utility clearance delays."
  }
];

export default function ProjectTracker({ companyInfo }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modals state
  const [selectedProject, setSelectedProject] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [statusUpdateProject, setStatusUpdateProject] = useState(null);
  const [deleteConfirmProject, setDeleteConfirmProject] = useState(null);

  // Form Fields State
  const [formTitle, setFormTitle] = useState("");
  const [formClient, setFormClient] = useState("");
  const [formManager, setFormManager] = useState("Dr. Alaina Vance");
  const [formStartDate, setFormStartDate] = useState("");
  const [formExpectedCompletion, setFormExpectedCompletion] = useState("");
  const [formStatus, setFormStatus] = useState("Planning");
  const [formProgress, setFormProgress] = useState(0);
  const [formPriority, setFormPriority] = useState("Medium");
  const [formDescription, setFormDescription] = useState("");

  // Initialize and simulate API fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(initialMockProjects);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Isolated mock API handlers (easy integration later)
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    // Simulate POST /api/projects
    const newProject = {
      id: `proj-track-${Date.now()}`,
      title: formTitle,
      client: formClient,
      manager: formManager,
      startDate: formStartDate || new Date().toISOString().split("T")[0],
      expectedCompletion: formExpectedCompletion || new Date().toISOString().split("T")[0],
      status: formStatus,
      progress: parseInt(formProgress) || 0,
      priority: formPriority,
      description: formDescription
    };

    setLoading(true);
    setTimeout(() => {
      setProjects((prev) => [newProject, ...prev]);
      setAddModalOpen(false);
      resetForm();
      setLoading(false);
    }, 400);
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    if (!editProject || !formTitle.trim()) return;

    // Simulate PUT /api/projects/:id
    const updated = {
      ...editProject,
      title: formTitle,
      client: formClient,
      manager: formManager,
      startDate: formStartDate,
      expectedCompletion: formExpectedCompletion,
      status: formStatus,
      progress: parseInt(formProgress) || 0,
      priority: formPriority,
      description: formDescription
    };

    setLoading(true);
    setTimeout(() => {
      setProjects((prev) =>
        prev.map((p) => (p.id === editProject.id ? updated : p))
      );
      setEditProject(null);
      resetForm();
      setLoading(false);
    }, 400);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!statusUpdateProject) return;

    // Simulate PATCH /api/projects/:id/status
    setLoading(true);
    setTimeout(() => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === statusUpdateProject.id
            ? { ...p, status: formStatus, progress: parseInt(formProgress) }
            : p
        )
      );
      setStatusUpdateProject(null);
      resetForm();
      setLoading(false);
    }, 400);
  };

  const handleDeleteProject = async (id) => {
    // Simulate DELETE /api/projects/:id
    setLoading(true);
    setTimeout(() => {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirmProject(null);
      setLoading(false);
    }, 400);
  };

  const openEditModal = (project) => {
    setEditProject(project);
    setFormTitle(project.title);
    setFormClient(project.client);
    setFormManager(project.manager);
    setFormStartDate(project.startDate);
    setFormExpectedCompletion(project.expectedCompletion);
    setFormStatus(project.status);
    setFormProgress(project.progress);
    setFormPriority(project.priority);
    setFormDescription(project.description);
  };

  const openStatusUpdateModal = (project) => {
    setStatusUpdateProject(project);
    setFormStatus(project.status);
    setFormProgress(project.progress);
  };

  const resetForm = () => {
    setFormTitle("");
    setFormClient("");
    setFormManager("Dr. Alaina Vance");
    setFormStartDate("");
    setFormExpectedCompletion("");
    setFormStatus("Planning");
    setFormProgress(0);
    setFormPriority("Medium");
    setFormDescription("");
  };

  // Searching and Filtering
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || p.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || p.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Pagination Slicing
  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  // Reset page number on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, priorityFilter]);

  return (
    <AdminLayout companyInfo={companyInfo} activeTab="Projects">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-poppins font-bold text-3xl text-slate-dark">Project Tracking</h1>
          <p className="font-sans text-slate-light text-sm mt-1">
            Monitor ongoing construction phases, project statuses, and structural task managers.
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
          Track New Project
        </button>
      </div>

      {/* KPI Info Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex items-center gap-5">
          <div className="p-4 bg-primary/10 text-primary rounded-xl shrink-0">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-light/80 block uppercase tracking-wider">
              Total Projects
            </span>
            <span className="font-poppins font-extrabold text-2xl text-slate-dark mt-1 block">
              {projects.length} Total
            </span>
          </div>
        </div>

        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex items-center gap-5">
          <div className="p-4 bg-amber-500/10 text-amber-600 rounded-xl shrink-0">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-light/80 block uppercase tracking-wider">
              Ongoing Phase
            </span>
            <span className="font-poppins font-extrabold text-2xl text-slate-dark mt-1 block">
              {projects.filter((p) => p.status === "Ongoing").length} Active
            </span>
          </div>
        </div>

        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex items-center gap-5">
          <div className="p-4 bg-emerald-500/10 text-emerald-600 rounded-xl shrink-0">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-light/80 block uppercase tracking-wider">
              Completed Projects
            </span>
            <span className="font-poppins font-extrabold text-2xl text-slate-dark mt-1 block">
              {projects.filter((p) => p.status === "Completed").length} Finished
            </span>
          </div>
        </div>

        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex items-center gap-5">
          <div className="p-4 bg-blue-500/10 text-blue-600 rounded-xl shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-light/80 block uppercase tracking-wider">
              Planning Stage
            </span>
            <span className="font-poppins font-extrabold text-2xl text-slate-dark mt-1 block">
              {projects.filter((p) => p.status === "Planning").length} Planning
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar & Filtering Row */}
      <div className="bg-white border border-primary/5 rounded-2xl p-5 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-grow max-w-md relative">
          <input
            type="text"
            placeholder="Search projects by name, client, manager..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-2.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 shrink-0">
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
              <option value="Planning">Planning</option>
              <option value="Ongoing">Ongoing</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider">
              Priority:
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-mint border border-primary/10 rounded-lg px-3 py-2.5 text-xs font-poppins font-bold text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
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
          <p className="font-poppins font-semibold text-sm text-slate-light mt-4">Retrieving tracked projects database...</p>
        </div>
      ) : (
        /* Projects Table Card */
        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md">
          {filteredProjects.length === 0 ? (
            /* Empty State UI */
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-slate-light/30 mx-auto mb-4" />
              <h3 className="font-poppins font-bold text-lg text-slate-dark">No Projects Found</h3>
              <p className="font-sans text-slate-light text-sm mt-1">
                There are no active or completed projects matching your selection parameters.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="overflow-x-auto min-w-full">
                <table className="min-w-full divide-y divide-mint-dark/50 text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-light/75 uppercase font-poppins font-bold tracking-wider">
                      <th className="py-3 px-2">Project Details</th>
                      <th className="py-3 px-2">Client</th>
                      <th className="py-3 px-2">Manager</th>
                      <th className="py-3 px-2">Timeline</th>
                      <th className="py-3 px-2">Progress</th>
                      <th className="py-3 px-2">Priority</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-mint-dark/40 font-sans">
                    {currentItems.map((item) => (
                      <tr key={item.id} className="hover:bg-mint/20 transition-colors">
                        {/* Name */}
                        <td className="py-4 px-2">
                          <span className="block font-poppins font-bold text-slate-dark text-sm">{item.title}</span>
                          <span className="block text-[10px] text-slate-light font-semibold">ID: {item.id}</span>
                        </td>
                        {/* Client */}
                        <td className="py-4 px-2 text-slate-dark font-medium text-xs">
                          {item.client}
                        </td>
                        {/* Manager */}
                        <td className="py-4 px-2 text-slate-light text-xs font-semibold">
                          {item.manager}
                        </td>
                        {/* Start Date & Expected Completion */}
                        <td className="py-4 px-2 text-xs text-slate-light">
                          <span className="block font-semibold">Start: {item.startDate}</span>
                          <span className="block text-[10px] mt-0.5">End: {item.expectedCompletion}</span>
                        </td>
                        {/* Progress Bar Column */}
                        <td className="py-4 px-2 max-w-[120px]">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-mint border border-primary/10 h-2 rounded-full overflow-hidden shrink-0">
                              <div
                                className="bg-primary h-full rounded-full transition-all duration-500"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                            <span className="font-poppins font-bold text-[10px] text-slate-dark">
                              {item.progress}%
                            </span>
                          </div>
                        </td>
                        {/* Priority Badge */}
                        <td className="py-4 px-2">
                          <span
                            className={`text-[9px] font-bold border rounded px-2 py-0.5 uppercase tracking-wide inline-block ${
                              item.priority === "High"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : item.priority === "Medium"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-gray-100 text-gray-700 border-gray-200"
                            }`}
                          >
                            {item.priority}
                          </span>
                        </td>
                        {/* Status badge */}
                        <td className="py-4 px-2">
                          <span
                            className={`text-[9px] font-semibold border rounded-full px-2.5 py-0.5 uppercase tracking-wide inline-block ${
                              item.status === "Ongoing"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : item.status === "Completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : item.status === "On Hold"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : "bg-gray-100 text-gray-700 border-gray-200"
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
                              onClick={() => setSelectedProject(item)}
                              title="View Details"
                              className="p-1.5 bg-mint hover:bg-primary/10 text-primary rounded-lg transition-colors focus:outline-none cursor-pointer"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            {/* Quick Status Update */}
                            <button
                              onClick={() => openStatusUpdateModal(item)}
                              title="Update Status/Progress"
                              className="p-1.5 bg-mint hover:bg-amber-500/10 text-amber-600 rounded-lg transition-colors focus:outline-none cursor-pointer"
                            >
                              <UpdateStatusIcon className="h-4 w-4" />
                            </button>
                            {/* Edit */}
                            <button
                              onClick={() => openEditModal(item)}
                              title="Edit Project"
                              className="p-1.5 bg-mint hover:bg-emerald-500/10 text-emerald-600 rounded-lg transition-colors focus:outline-none cursor-pointer"
                            >
                              <EditIcon className="h-4 w-4" />
                            </button>
                            {/* Delete */}
                            <button
                              onClick={() => setDeleteConfirmProject(item)}
                              title="Delete Project"
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

      {/* Modal 1: View Project Specifications */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-darkest/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start border-b border-mint-dark pb-4">
              <div>
                <h3 className="font-poppins font-bold text-lg text-slate-dark">{selectedProject.title}</h3>
                <span className="text-[10px] text-slate-light uppercase tracking-wider block mt-0.5">Client: {selectedProject.client}</span>
              </div>
              <span
                className={`text-[9px] font-semibold border rounded-full px-2.5 py-0.5 uppercase tracking-wide inline-block ${
                  selectedProject.status === "Ongoing"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : selectedProject.status === "Completed"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : selectedProject.status === "On Hold"
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                {selectedProject.status}
              </span>
            </div>

            <div className="space-y-4 text-sm font-sans">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Project Manager</span>
                  <span className="text-slate-dark font-semibold mt-0.5 block">{selectedProject.manager}</span>
                </div>
                <div>
                  <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Priority Rank</span>
                  <span className="text-slate-dark font-semibold mt-0.5 block">{selectedProject.priority} Priority</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Start Date</span>
                  <span className="text-slate-dark font-semibold mt-0.5 block">{selectedProject.startDate}</span>
                </div>
                <div>
                  <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Expected Completion</span>
                  <span className="text-slate-dark font-semibold mt-0.5 block">{selectedProject.expectedCompletion}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Progress Status ({selectedProject.progress}%)</span>
                <div className="mt-1 flex items-center gap-3">
                  <div className="w-full bg-mint border border-primary/10 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${selectedProject.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Requirements & Description</span>
                <p className="text-slate-light mt-1.5 leading-relaxed bg-mint/35 border border-primary/5 rounded-xl p-4 max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {selectedProject.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-mint-dark">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 border border-primary/10 hover:bg-mint/30 text-slate-dark font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Track (Create) New Project */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-darkest/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="border-b border-mint-dark pb-4">
              <h3 className="font-poppins font-bold text-lg text-slate-dark">Track New Construction Project</h3>
              <p className="text-xs text-slate-light">Input internal parameters, timelines, managers, and priorities.</p>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-sm font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Skyline Heights Complex"
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formClient}
                    onChange={(e) => setFormClient(e.target.value)}
                    placeholder="e.g. Nexus Development Group"
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Assigned Project Manager</label>
                  <select
                    value={formManager}
                    onChange={(e) => setFormManager(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  >
                    <option value="Dr. Alaina Vance">Dr. Alaina Vance</option>
                    <option value="Marcus Sterling">Marcus Sterling</option>
                    <option value="David Kross">David Kross</option>
                    <option value="Sarah Jenkins">Sarah Jenkins</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Priority Rank</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Expected Completion *</label>
                  <input
                    type="date"
                    required
                    value={formExpectedCompletion}
                    onChange={(e) => setFormExpectedCompletion(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Initial Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  >
                    <option value="Planning">Planning</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Progress Percent ({formProgress}%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formProgress}
                    onChange={(e) => setFormProgress(e.target.value)}
                    className="w-full mt-3 h-2 bg-mint rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Project Description *</label>
                <textarea
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Detailed breakdown of construction steps, permits, and active crew schedules..."
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
                  Start Tracking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Edit Project Parameters */}
      {editProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-darkest/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="border-b border-mint-dark pb-4">
              <h3 className="font-poppins font-bold text-lg text-slate-dark">Modify Project Parameters</h3>
              <p className="text-xs text-slate-light">Edit parameters and timeline limits for "{editProject.title}".</p>
            </div>

            <form onSubmit={handleUpdateProject} className="space-y-4 text-sm font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formClient}
                    onChange={(e) => setFormClient(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Assigned Project Manager</label>
                  <select
                    value={formManager}
                    onChange={(e) => setFormManager(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  >
                    <option value="Dr. Alaina Vance">Dr. Alaina Vance</option>
                    <option value="Marcus Sterling">Marcus Sterling</option>
                    <option value="David Kross">David Kross</option>
                    <option value="Sarah Jenkins">Sarah Jenkins</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Priority Rank</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Expected Completion *</label>
                  <input
                    type="date"
                    required
                    value={formExpectedCompletion}
                    onChange={(e) => setFormExpectedCompletion(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                  />
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
                    <option value="Planning">Planning</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Progress Percent ({formProgress}%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formProgress}
                    onChange={(e) => setFormProgress(e.target.value)}
                    className="w-full mt-3 h-2 bg-mint rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Project Description *</label>
                <textarea
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows="3"
                  className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-mint-dark">
                <button
                  type="button"
                  onClick={() => setEditProject(null)}
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

      {/* Modal 4: Quick Status / Progress Update Shortcut */}
      {statusUpdateProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-darkest/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <div>
              <h3 className="font-poppins font-bold text-lg text-slate-dark">Update Project Phase</h3>
              <p className="text-xs text-slate-light mt-0.5">Quickly update status and progress of "{statusUpdateProject.title}".</p>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4 text-sm font-sans">
              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Project Status</label>
                <select
                  value={formStatus}
                  onChange={(e) => {
                    const newStat = e.target.value;
                    setFormStatus(newStat);
                    if (newStat === "Completed") setFormProgress(100);
                  }}
                  className="w-full bg-mint border border-primary/10 rounded-lg px-3 py-2 mt-1 text-slate-dark focus:outline-none focus:border-primary focus:bg-white cursor-pointer"
                >
                  <option value="Planning">Planning</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Progress Percent ({formProgress}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formProgress}
                  onChange={(e) => setFormProgress(e.target.value)}
                  className="w-full mt-3 h-2 bg-mint rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-mint-dark">
                <button
                  type="button"
                  onClick={() => setStatusUpdateProject(null)}
                  className="px-4 py-2 border border-primary/10 hover:bg-mint/30 text-slate-dark font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:bg-primary-light text-mint font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Update Phase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 5: Confirm Delete Dialog */}
      {deleteConfirmProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-darkest/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-poppins font-bold text-lg text-slate-dark">Confirm Project Deletion</h3>
            <p className="font-sans text-sm text-slate-light leading-relaxed">
              Are you sure you want to permanently delete the tracked project <strong className="text-slate-dark">{deleteConfirmProject.title}</strong>? This operation is irreversible.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => handleDeleteProject(deleteConfirmProject.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-poppins font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Permanently Delete
              </button>
              <button
                onClick={() => setDeleteConfirmProject(null)}
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
