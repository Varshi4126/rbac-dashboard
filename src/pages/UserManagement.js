import React, { useState, useEffect, useMemo } from 'react';
import { ApiService } from '../services/mockData';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  SearchIcon,
  ArrowUpIcon,
  ArrowDownIcon 
} from 'lucide-react';
import { Alert, AlertDescription } from '../components/Alert.js';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ field: 'username', direction: 'asc' });

  useEffect(() => {
    ApiService.getUsers().then(setUsers);
  }, []);

  // Validation functions
  const validateForm = (user) => {
    const newErrors = {};
    
    if (!user.username?.trim()) {
      newErrors.username = 'Username is required';
    } else if (user.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!user.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!user.role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Filter and sort functions
  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter(user => {
        const matchesSearch = (
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesStatus && matchesRole;
      })
      .sort((a, b) => {
        const aValue = a[sortConfig.field];
        const bValue = b[sortConfig.field];
        if (sortConfig.direction === 'asc') {
          return aValue.localeCompare(bValue);
        }
        return bValue.localeCompare(aValue);
      });
  }, [users, searchTerm, statusFilter, roleFilter, sortConfig]);

  const handleSort = (field) => {
    setSortConfig(current => ({
      field,
      direction: current.field === field && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleAddUser = () => {
    setSelectedUser({
      username: '',
      email: '',
      role: '',
      status: 'Active'
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setErrors({});
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
    if (!validateForm(selectedUser)) {
      return;
    }

    if (selectedUser.id) {
      ApiService.updateUser(selectedUser).then(updatedUser => {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        setIsModalOpen(false);
      });
    } else {
      ApiService.createUser(selectedUser).then(newUser => {
        setUsers([...users, newUser]);
        setIsModalOpen(false);
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <button 
          onClick={handleAddUser}
          className="btn flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 p-2 w-full border rounded"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {['username', 'email', 'role', 'status'].map(field => (
                <th 
                  key={field}
                  className="p-3 text-left cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort(field)}
                >
                  <div className="flex items-center">
                    <span className="capitalize">{field}</span>
                    {sortConfig.field === field && (
                      sortConfig.direction === 'asc' ? 
                        <ArrowUpIcon className="h-4 w-4 ml-1" /> :
                        <ArrowDownIcon className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
              ))}
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedUsers.map(user => (
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
                    className="mr-2 text-blue-500 hover:text-blue-700"
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
            
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={selectedUser.username}
                  onChange={(e) => setSelectedUser({...selectedUser, username: e.target.value})}
                  className={`w-full p-2 border rounded ${errors.username ? 'border-red-500' : ''}`}
                />
                {errors.username && (
                  <Alert variant="destructive" className="mt-1">
                    <AlertDescription>{errors.username}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                  className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <Alert variant="destructive" className="mt-1">
                    <AlertDescription>{errors.email}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div>
                <select
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                  className={`w-full p-2 border rounded ${errors.role ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Role</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
                {errors.role && (
                  <Alert variant="destructive" className="mt-1">
                    <AlertDescription>{errors.role}</AlertDescription>
                  </Alert>
                )}
              </div>

              <select
                value={selectedUser.status}
                onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end mt-6">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveUser}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
