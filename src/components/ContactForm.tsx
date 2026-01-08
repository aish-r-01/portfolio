import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("https://formspree.io/f/xgovgdzy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact-form" className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.5em] mb-2">
          Direct Message
        </h2>
        <p className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tighter">
          Inquiries
        </p>
      </div>

      <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.05)] max-w-4xl mx-auto reveal-on-scroll">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 text-2xl font-black">
              ✓
            </div>
            <h3 className="text-2xl font-black text-zinc-950 mb-3 uppercase tracking-[0.1em]">
              Message Sent
            </h3>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed font-bold">
              I’ve received your message and will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Honeypot (spam protection) */}
            <input type="text" name="_gotcha" style={{ display: "none" }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-950 mb-2 pl-1">
                  Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-50 border-2 border-zinc-50 rounded-xl p-4 px-6 text-zinc-950 focus:outline-none focus:border-zinc-950 transition-all placeholder-zinc-400 text-sm font-bold shadow-sm"
                  placeholder="Enter Name"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-950 mb-2 pl-1">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-50 border-2 border-zinc-50 rounded-xl p-4 px-6 text-zinc-950 focus:outline-none focus:border-zinc-950 transition-all placeholder-zinc-400 text-sm font-bold shadow-sm"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-950 mb-2 pl-1">
                Your Context
              </label>
              <textarea
                required
                minLength={10}
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full bg-zinc-50 border-2 border-zinc-50 rounded-[1.5rem] p-6 text-zinc-950 focus:outline-none focus:border-zinc-950 transition-all resize-none text-sm font-bold placeholder-zinc-400 shadow-sm"
                placeholder="Details of your inquiry..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-6 bg-zinc-950 text-white font-black uppercase tracking-[0.4em] text-[11px] rounded-[1.5rem] hover:bg-indigo-600 transition-all duration-500 disabled:opacity-50 shadow-xl shadow-zinc-100 active:scale-[0.98]"
            >
              {sending ? "Sending..." : "Dispatch Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
