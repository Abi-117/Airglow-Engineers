import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const SetupAdmin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/admin/setup", { username, email, password });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error creating admin");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Setup Admin</h2>
        {message && <p className="text-center text-green-600 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Setup Admin</button>
        </form>
      </div>
    </div>
  );
};

export default SetupAdmin;
