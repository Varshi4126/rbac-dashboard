// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  UserGroupIcon, 
  ShieldCheckIcon, 
  CogIcon 
} from '@heroicons/react/solid';

// Import page components
import UserManagement from './pages/UserManagement';
import RoleManagement from './pages/RoleManagement';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-primary-600">RBAC Dashboard</h1>
          </div>
          <nav className="mt-10">
            <Link 
              to="/" 
              className="flex items-center p-4 hover:bg-gray-100 transition-colors"
            >
              <CogIcon className="h-6 w-6 mr-3 text-primary-500" />
              Dashboard
            </Link>
            <Link 
              to="/users" 
              className="flex items-center p-4 hover:bg-gray-100 transition-colors"
            >
              <UserGroupIcon className="h-6 w-6 mr-3 text-primary-500" />
              User Management
            </Link>
            <Link 
              to="/roles" 
              className="flex items-center p-4 hover:bg-gray-100 transition-colors"
            >
              <ShieldCheckIcon className="h-6 w-6 mr-3 text-primary-500" />
              Role Management
            </Link>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-10 bg-gray-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/roles" element={<RoleManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;