import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <main>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/admin/services">Manage Services</Link></li>
        <li><Link to="/admin/projects">Manage Projects</Link></li>
        <li><Link to="/admin/references">Manage References</Link></li>
        <li><Link to="/admin/users">Manage Users</Link></li>
      </ul>
    </main>
  );
}