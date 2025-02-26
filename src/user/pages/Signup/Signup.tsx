import  { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      
      toast.success('Signup successful! Redirecting...', {
        position: 'top-right',
        autoClose: 2000,
      });
      
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || 'An error occurred', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-6xl sm:mx-auto w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl sm:p-20 p-6">
          <div className="max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="First Name" className="w-full px-3 py-2 border rounded-lg text-black" />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last Name" className="w-full px-3 py-2 border rounded-lg text-black" />
              </div>

              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="w-full px-3 py-2 border rounded-lg text-black" />
              
              <div className="relative">
                <input type={passwordVisible ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required placeholder="Password" className="w-full px-3 py-2 border rounded-lg text-black" />
                <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <img src="/show.png" alt="Show Password" className="w-5 h-5" />
                </button>
              </div>

              <select name="role" value={formData.role} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg text-black">
                <option value="">Select Role</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>

              <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
