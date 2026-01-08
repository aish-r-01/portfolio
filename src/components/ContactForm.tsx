
import React, { useState, useEffect } from 'react';

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    let error = '';
    if (!value.trim()) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Invalid email address.';
      }
    } else if (name === 'message' && value.length < 10) {
      error = 'Message must be at least 10 characters long.';
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = formData.name.trim() && 
                      formData.email.trim() && 
                      !errors.email && 
                      formData.message.trim().length >= 10 &&
                      !errors.message;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setFormState('sending');
    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTouched({});
      setTimeout(() => setFormState('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact-form" className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.5em] mb-2">Direct Message</h2>
        <p className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tighter">Inquiries</p>
      </div>

      <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.05)] max-w-4xl mx-auto reveal-on-scroll">
        {formState === 'success' ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
               </svg>
            </div>
            <h3 className="text-2xl font-black text-zinc-950 mb-3 uppercase tracking-[0.1em]">Message Sent</h3>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed font-bold">I have received your data and will review it shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-950 mb-2 pl-1">Full Identity</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onBlur={() => handleBlur('name')}
                  onChange={handleInputChange}
                  className={`w-full bg-zinc-50 border-2 ${touched.name && errors.name ? 'border-rose-400' : 'border-zinc-50'} rounded-xl p-4 px-6 text-zinc-950 focus:outline-none focus:border-zinc-950 transition-all placeholder-zinc-400 text-sm font-bold shadow-sm`}
                  placeholder="Enter Name"
                />
              </div>
              <div className="relative group">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-950 mb-2 pl-1">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onBlur={() => handleBlur('email')}
                  onChange={handleInputChange}
                  className={`w-full bg-zinc-50 border-2 ${touched.email && errors.email ? 'border-rose-400' : 'border-zinc-50'} rounded-xl p-4 px-6 text-zinc-950 focus:outline-none focus:border-zinc-950 transition-all placeholder-zinc-400 text-sm font-bold shadow-sm`}
                  placeholder="name@company.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-950 mb-2 pl-1">Your Context</label>
              <textarea
                required
                name="message"
                rows={4}
                value={formData.message}
                onBlur={() => handleBlur('message')}
                onChange={handleInputChange}
                className={`w-full bg-zinc-50 border-2 ${touched.message && errors.message ? 'border-rose-400' : 'border-zinc-50'} rounded-[1.5rem] p-6 text-zinc-950 focus:outline-none focus:border-zinc-950 transition-all resize-none text-sm font-bold placeholder-zinc-400 shadow-sm`}
                placeholder="Details of your inquiry..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={formState === 'sending' || !isFormValid}
              className="w-full py-6 bg-zinc-950 text-white font-black uppercase tracking-[0.4em] text-[11px] rounded-[1.5rem] hover:bg-indigo-600 transition-all duration-500 disabled:opacity-30 shadow-xl shadow-zinc-100 active:scale-[0.98]"
            >
              {formState === 'sending' ? 'Transmitting...' : 'Dispatch Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
