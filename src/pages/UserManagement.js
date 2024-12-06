// src/pages/UserManagement.js
import React, { useState, useEffect } from 'react';
import { ApiService } from '../services/mockData';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon 
} from '@heroicons/react/solid';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    ApiService.getUsers().then(setUsers);
  }, []);

  const handleAddUser = () => {
    setSelectedUser({
      username: '',
      email: '',
      role: '',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      ApiService.deleteUser(userId).then(() => {
        setUsers(users.filter(u => u.id !== userId));
      });
    }
  };

  const handleSaveUser = () => {
    if (selectedUser.id) {
      // Update existing user
      ApiService.updateUser(selectedUser).then(updatedUser => {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        setIsModalOpen(false);
      });
    } else {
      // Create new user
      ApiService.createUser(selectedUser).then(newUser => {
        setUsers([...users, newUser]);
        setIsModalOpen(false);
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <button 
          onClick={handleAddUser}
          className="btn flex items-center bg-primary-500 text-white px-4 py-2 rounded"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>

      {/* User Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <span 
                    className={`px-2 py-1 rounded text-xs ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button 
                    onClick={() => handleEditUser(user)}
                    className="mr-2 text-primary-500 hover:text-primary-700"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              {selectedUser.id ? 'Edit User' : 'Add User'}
            </h3>
            <input
              type="text"
              placeholder="Username"
              value={selectedUser.username}
              onChange={(e) => setSelectedUser({...selectedUser, username: e.target.value})}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
              className="w-full p-2 mb-3 border rounded"
            />
            <select
              value={selectedUser.role}
              onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
              className="w-full p-2 mb-3 border rounded"
            >
              <option value="">Select Role</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            <select
              value={selectedUser.status}
              onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value})}
              className="w-full p-2 mb-3 border rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveUser}
                className="px-4 py-2 bg-primary-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;