"use client";

import { useState } from "react";

export default function QuotationForm({ services }) {
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone: "",
    project_type: "",
    project_details: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/quotations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitStatus("success");
        setFormData({
          customer_name: "",
          email: "",
          phone: "",
          project_type: "",
          project_details: "",
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.message || "Failed to submit quotation. Please try again.");
      }
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please make sure the server is running and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quote" className="py-20 bg-mint scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
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
            Provide details on your location, scale, and budget. Our cost managers will draft a preliminary estimation.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-primary/5 rounded-2xl p-8 sm:p-12 shadow-xl max-w-4xl mx-auto">
          <h3 className="font-poppins font-bold text-2xl text-slate-dark mb-8">
            Specification Form
          </h3>

          {/* Success Banner */}
          {submitStatus === "success" && (
            <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-sans flex items-center gap-3">
              <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <strong>Quotation Request Submitted Successfully!</strong> Our estimating team will contact you shortly.
              </div>
            </div>
          )}

          {/* Error Banner */}
          {submitStatus === "error" && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm font-sans flex items-center gap-3">
              <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <div>
                <strong>Error:</strong> {errorMessage}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Field 1: Name */}
            <div>
              <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                required
                placeholder="Marcus Sterling"
                className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-3.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
            </div>

            {/* Field 2: Email */}
            <div>
              <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="marcus@example.com"
                className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-3.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
            </div>

            {/* Field 3: Service Category */}
            <div>
              <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                Select Division / Service
              </label>
              <select
                name="project_type"
                value={formData.project_type}
                onChange={handleChange}
                required
                className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-3.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
              >
                <option value="">Choose a service...</option>
                {services.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title}
                  </option>
                ))}
                <option value="General Consultation">General Structural Consultation</option>
                <option value="Other Project">Other custom inquiry</option>
              </select>
            </div>

            {/* Field 4: Phone Number */}
            <div>
              <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1 (555) 123-4567"
                className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-3.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
            </div>

            {/* Field 5: Details */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                Description of Requirements
              </label>
              <textarea
                name="project_details"
                value={formData.project_details}
                onChange={handleChange}
                rows={5}
                required
                placeholder="Tell us about the site dimensions, architectural specifications, or custom requests..."
                className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-3.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-light text-mint font-poppins font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting Specification...
                  </>
                ) : (
                  "Submit Specification Form"
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
