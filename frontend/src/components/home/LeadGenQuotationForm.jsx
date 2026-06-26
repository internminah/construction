"use client";

import { useState } from "react";
import { companyInfo } from "@/lib/data";

export default function LeadGenQuotationForm({ services = [] }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    serviceRequired: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.serviceRequired) {
      newErrors.serviceRequired = "Please select a service division";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please describe your structural requirements";
    } else if (formData.message.trim().length < 15) {
      newErrors.message = "Message must details requirements (min 15 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API round-trip delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      serviceRequired: "",
      message: "",
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <section id="quote-form" className="py-20 bg-mint scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
              Pricing Estimation
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
            Request a Project Quotation
          </h2>
          <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
            Provide details on your structural plans, location, and dimensions. Our engineering cost managers will draft a preliminary estimation.
          </p>
        </div>

        {/* Form Outer Container */}
        <div className="bg-white border border-primary/5 rounded-2xl p-8 sm:p-12 shadow-xl max-w-3xl mx-auto relative overflow-hidden">
          
          {/* Decorative Green Line at Top */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-primary" />

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Field 1: Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className={`w-full bg-mint border rounded-lg px-4 py-3.5 text-sm text-slate-dark focus:outline-none focus:bg-white focus:ring-1 transition-all ${
                    errors.fullName ? "border-red-500 focus:ring-red-500" : "border-primary/10 focus:border-primary focus:ring-primary"
                  }`}
                />
                {errors.fullName && (
                  <span className="text-xs text-red-600 mt-1 font-semibold block">{errors.fullName}</span>
                )}
              </div>

              {/* Field 2: Email */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  className={`w-full bg-mint border rounded-lg px-4 py-3.5 text-sm text-slate-dark focus:outline-none focus:bg-white focus:ring-1 transition-all ${
                    errors.email ? "border-red-500 focus:ring-red-500" : "border-primary/10 focus:border-primary focus:ring-primary"
                  }`}
                />
                {errors.email && (
                  <span className="text-xs text-red-600 mt-1 font-semibold block">{errors.email}</span>
                )}
              </div>

              {/* Field 4: Service Division Selector */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                  Service Required
                </label>
                <select
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  className={`w-full bg-mint border rounded-lg px-4 py-3.5 text-sm text-slate-dark focus:outline-none focus:bg-white focus:ring-1 transition-all ${
                    errors.serviceRequired ? "border-red-500 focus:ring-red-500" : "border-primary/10 focus:border-primary focus:ring-primary"
                  }`}
                >
                  <option value="">Select a division...</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                  <option value="General Consultation">General Structural Consultation</option>
                  <option value="Other Project">Other custom inquiry</option>
                </select>
                {errors.serviceRequired && (
                  <span className="text-xs text-red-600 mt-1 font-semibold block">{errors.serviceRequired}</span>
                )}
              </div>

              {/* Field 5: Message Description */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                  Message (Project Description)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe your site dimensions, preferred materials, structural blueprints, timeline targets..."
                  className={`w-full bg-mint border rounded-lg px-4 py-3.5 text-sm text-slate-dark focus:outline-none focus:bg-white focus:ring-1 transition-all resize-none ${
                    errors.message ? "border-red-500 focus:ring-red-500" : "border-primary/10 focus:border-primary focus:ring-primary"
                  }`}
                />
                {errors.message && (
                  <span className="text-xs text-red-600 mt-1 font-semibold block">{errors.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-light text-mint font-poppins font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Validating & Formatting Proposal...
                    </>
                  ) : (
                    "Submit Specification Form"
                  )}
                </button>
              </div>

            </form>
          ) : (
            /* Success confirmation card with scale-in transition */
            <div className="text-center py-10 animate-scale-in">
              <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="font-poppins font-bold text-3xl text-slate-dark mb-4">
                Inquiry Received!
              </h3>
              
              <p className="font-sans text-slate-light text-base leading-relaxed max-w-lg mx-auto mb-8">
                Thank you, <strong className="text-slate-dark">{formData.fullName}</strong>. We have successfully registered your quotation specifications for <strong className="text-primary">{formData.serviceRequired}</strong>.
              </p>

              <div className="bg-mint rounded-xl p-6 text-left max-w-md mx-auto mb-8 border border-primary/5 text-sm space-y-2.5 text-slate-light">
                <div><span className="font-poppins font-bold text-slate-dark">Email Registered:</span> {formData.email}</div>

                <div><span className="font-poppins font-bold text-slate-dark">Lead Status:</span> <span className="text-accent font-semibold uppercase tracking-wider text-xs bg-accent/10 px-2 py-0.5 rounded">High Priority</span></div>
              </div>

              <p className="font-sans text-xs text-slate-light/80 mb-8">
                Our principal architect or scheduling department will contact you via email within 24 business hours to finalize site coordinates.
              </p>

              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center px-6 py-3 font-poppins font-semibold text-sm rounded-lg text-primary border border-primary/20 hover:bg-primary/5 hover:border-primary transition-all duration-300 cursor-pointer"
              >
                Submit Another Specification
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
