// src/pages/Dashboard.js
import React from 'react';
import { UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/solid';
import { INITIAL_USERS, INITIAL_ROLES } from '../services/mockData.js';

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">RBAC Dashboard</h1>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <UserGroupIcon className="h-10 w-10 text-primary-500 mr-4" />
            <h2 className="text-xl font-semibold">Total Users</h2>
          </div>
          <p className="text-3xl font-bold text-gray-800">{INITIAL_USERS.length}</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <ShieldCheckIcon className="h-10 w-10 text-primary-500 mr-4" />
            <h2 className="text-xl font-semibold">Total Roles</h2>
          </div>
          <p className="text-3xl font-bold text-gray-800">{INITIAL_ROLES.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;