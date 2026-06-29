"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  Mail,
  Briefcase,
  Heart,
  Activity,
} from "@/components/common/Icons";
import AdminLayout from "./AdminLayout";

export default function Dashboard({ companyInfo, stats, projects, reviews }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
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
            // Map database columns to support UI expected fields
            const mapped = data.data.map((item) => ({
              id: item.id,
              name: item.name,
              email: item.email,
              phone: item.phone ? item.phone.toString() : "N/A",
              category: "General Inquiry",
              status: "New",
              statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
            }));
            setEnquiries(mapped);
          }
        }
      } catch (err) {
        console.error("Failed to fetch enquiries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const activities = [
    {
      id: "act-1",
      time: "10 mins ago",
      user: "Super Admin",
      action: "Approved review by Jonathan Sterling",
      badgeColor: "bg-emerald-100 text-emerald-800"
    },
    {
      id: "act-2",
      time: "1 hour ago",
      user: "System",
      action: "Database backup completed successfully",
      badgeColor: "bg-gray-100 text-gray-800"
    },
    {
      id: "act-3",
      time: "3 hours ago",
      user: "Super Admin",
      action: "Updated details for Residential Construction",
      badgeColor: "bg-emerald-100 text-emerald-800"
    },
    {
      id: "act-4",
      time: "Yesterday",
      user: "System",
      action: "Received new quotation request from Marcus Sterling",
      badgeColor: "bg-emerald-100 text-emerald-800"
    },
    {
      id: "act-5",
      time: "2 days ago",
      user: "Super Admin",
      action: "Added new landmark project 'Bespoke Glass Villa'",
      badgeColor: "bg-emerald-100 text-emerald-800"
    }
  ];

  return (
    <AdminLayout companyInfo={companyInfo} activeTab="Dashboard">
      {/* 3. Welcome Card */}
      <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[140px]">
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-poppins font-bold text-2xl text-slate-dark sm:text-3xl">
            Welcome back, Administrator!
          </h2>
          <p className="font-sans text-slate-light text-sm mt-2 leading-relaxed">
            Here is your overview of I Constructions operations. All services are active, database connects cleanly, and API routes are listening.
          </p>
        </div>
        {/* Background design elements */}
        <div className="absolute right-0 bottom-0 opacity-10 text-primary pointer-events-none transform translate-y-6 translate-x-6">
          <Building2 className="h-44 w-44" />
        </div>
      </div>

      {/* 4. Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1: Total Enquiries */}
        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-light/75 block uppercase tracking-wider">Total Enquiries</span>
              <span className="font-poppins font-extrabold text-3xl text-slate-dark block mt-1.5">{enquiries.length}</span>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Mail className="h-5 w-5" />
            </div>
          </div>
          <span className="text-[11px] font-sans font-semibold text-primary block mt-4">
            +12.5% increase vs last month
          </span>
        </div>

        {/* KPI 2: Total Projects */}
        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-light/75 block uppercase tracking-wider">Total Projects</span>
              <span className="font-poppins font-extrabold text-3xl text-slate-dark block mt-1.5">{projects.length}</span>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Briefcase className="h-5 w-5" />
            </div>
          </div>
          <span className="text-[11px] font-sans font-semibold text-primary block mt-4">
            +2 added recently
          </span>
        </div>

        {/* KPI 3: Total Reviews */}
        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-light/75 block uppercase tracking-wider">Total Reviews</span>
              <span className="font-poppins font-extrabold text-3xl text-slate-dark block mt-1.5">{reviews.length}</span>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Heart className="h-5 w-5" />
            </div>
          </div>
          <span className="text-[11px] font-sans font-semibold text-primary block mt-4">
            4.9/5 rating average
          </span>
        </div>

        {/* KPI 4: Website Statistics */}
        <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-light/75 block uppercase tracking-wider">Website Visitors</span>
              <span className="font-poppins font-extrabold text-3xl text-slate-dark block mt-1.5">1,240</span>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <span className="text-[11px] font-sans font-semibold text-primary block mt-4">
            +8.4% pageviews today
          </span>
        </div>

      </div>

      {/* KPI Dashboard Tables & Timeline Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Block: Recent Enquiries & Projects */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Enquiries Table */}
          <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-6 border-b border-mint-dark pb-4">
              <h3 className="font-poppins font-bold text-lg text-slate-dark">Recent Client Enquiries</h3>
              <span className="text-xs py-1 px-2.5 bg-mint text-primary rounded-md font-semibold font-sans">
                Action Required
              </span>
            </div>
            <div className="overflow-x-auto min-w-full">
              <table className="min-w-full divide-y divide-mint-dark/50 text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-light/75 uppercase font-poppins font-bold tracking-wider">
                    <th className="py-3 px-2">Client</th>
                    <th className="py-3 px-2">Contact Details</th>
                    <th className="py-3 px-2">Service Category</th>
                    <th className="py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mint-dark/40 font-sans">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-mint/25 transition-colors">
                      <td className="py-4 px-2 font-poppins font-semibold text-slate-dark">{enq.name}</td>
                      <td className="py-4 px-2 text-slate-light text-xs">
                        <span className="block">{enq.email}</span>
                        <span className="block text-slate-light/70 mt-0.5">{enq.phone}</span>
                      </td>
                      <td className="py-4 px-2 text-slate-light">{enq.category}</td>
                      <td className="py-4 px-2">
                        <span className={`text-[10px] font-semibold border rounded-full px-2.5 py-0.5 uppercase tracking-wide inline-block ${enq.statusColor}`}>
                          {enq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Projects Table */}
          <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-6 border-b border-mint-dark pb-4">
              <h3 className="font-poppins font-bold text-lg text-slate-dark">Recent Project Landmark Status</h3>
              <span className="text-xs py-1 px-2.5 bg-mint text-primary rounded-md font-semibold font-sans">
                Active Works
              </span>
            </div>
            <div className="overflow-x-auto min-w-full">
              <table className="min-w-full divide-y divide-mint-dark/50 text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-light/75 uppercase font-poppins font-bold tracking-wider">
                    <th className="py-3 px-2">Project</th>
                    <th className="py-3 px-2">Client Details</th>
                    <th className="py-3 px-2">Site Coordinates</th>
                    <th className="py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mint-dark/40 font-sans">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-mint/25 transition-colors">
                      <td className="py-4 px-2 font-poppins font-semibold text-slate-dark">{project.title}</td>
                      <td className="py-4 px-2 text-slate-light text-xs">
                        <span className="block">{project.client}</span>
                        <span className="block text-slate-light/70 mt-0.5">{project.category}</span>
                      </td>
                      <td className="py-4 px-2 text-slate-light">{project.location}</td>
                      <td className="py-4 px-2">
                        <span className="text-[10px] font-semibold border border-primary/20 bg-primary/10 text-primary rounded-full px-2.5 py-0.5 uppercase tracking-wide inline-block">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Block: Reviews & System Log Timeline */}
        <div className="space-y-8">
          
          {/* Recent Reviews widget */}
          <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md">
            <h3 className="font-poppins font-bold text-lg text-slate-dark mb-6 border-b border-mint-dark pb-4">
              Recent Client Feedback
            </h3>
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-3 bg-mint/30 rounded-xl flex gap-3 border border-primary/5">
                  <img src={rev.image} alt={rev.clientName} className="h-9 w-9 rounded-full object-cover shrink-0 border border-mint-dark" />
                  <div className="min-w-0">
                    <h4 className="font-poppins font-bold text-xs text-slate-dark truncate">{rev.clientName}</h4>
                    <span className="text-[9px] font-medium text-slate-light uppercase tracking-wider block -mt-0.5">{rev.role}</span>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <span key={i} className="text-amber-400 text-xs">★</span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-light/90 italic leading-relaxed mt-2">&ldquo;{rev.content}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline widget */}
          <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md">
            <h3 className="font-poppins font-bold text-lg text-slate-dark mb-6 border-b border-mint-dark pb-4">
              Recent Activity Timeline
            </h3>
            <div className="relative border-l border-mint-dark pl-4 space-y-6">
              {activities.map((act) => (
                <div key={act.id} className="relative">
                  {/* Timeline dot */}
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary border-2 border-white ring-4 ring-mint" />
                  <div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${act.badgeColor} uppercase tracking-wider`}>
                      {act.user}
                    </span>
                    <span className="text-[10px] text-slate-light/65 ml-2 font-sans font-medium">{act.time}</span>
                    <p className="font-sans text-xs text-slate-light font-medium mt-1.5 leading-relaxed">{act.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
