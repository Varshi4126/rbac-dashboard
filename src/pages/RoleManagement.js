// src/pages/RoleManagement.js
import React, { useState, useEffect } from 'react';
import { ApiService } from '../services/mockData';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  CheckIcon 
} from '@heroicons/react/solid';

function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const PERMISSION_OPTIONS = [
    'read', 'write', 'delete', 
    'manage_users', 'manage_roles'
  ];

  useEffect(() => {
    ApiService.getRoles().then(setRoles);
  }, []);

  const handleAddRole = () => {
    setSelectedRole({
      name: '',
      permissions: []
    });
    setIsModalOpen(true);
  };

  const togglePermission = (permission) => {
    const currentPermissions = selectedRole.permissions || [];
    const updatedPermissions = currentPermissions.includes(permission)
      ? currentPermissions.filter(p => p !== permission)
      : [...currentPermissions, permission];
    
    setSelectedRole({
      ...selectedRole,
      permissions: updatedPermissions
    });
  };

  const handleSaveRole = () => {
    // Simulated role save - in a real app, this would be an API call
    if (selectedRole.name) {
      const updatedRoles = roles.some(r => r.id === selectedRole.id)
        ? roles.map(r => r.id === selectedRole.id ? {...selectedRole, id: r.id} : r)
        : [...roles, {...selectedRole, id: Date.now()}];
      
      setRoles(updatedRoles);
      setIsModalOpen(false);
    }
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(r => r.id !== roleId));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Role Management</h2>
        <button 
          onClick={handleAddRole}
          className="btn flex items-center bg-primary-500 text-white px-4 py-2 rounded"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Role
        </button>
      </div>

      {/* Roles Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Role Name</th>
              <th className="p-3 text-left">Permissions</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{role.name}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map(perm => (
                      <span 
                        key={perm} 
                        className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs"
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3 text-right">
                  <button 
                    onClick={() => handleEditRole(role)}
                    className="mr-2 text-primary-500 hover:text-primary-700"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteRole(role.id)}
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

      {/* Modal for Add/Edit Role */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              {selectedRole.id ? 'Edit Role' : 'Add Role'}
            </h3>
            <input
              type="text"
              placeholder="Role Name"
              value={selectedRole.name}
              onChange={(e) => setSelectedRole({...selectedRole, name: e.target.value})}
              className="w-full p-2 mb-3 border rounded"
            />
            
            <div className="mb-3">
              <p className="text-sm font-medium mb-2">Permissions:</p>
              <div className="grid grid-cols-2 gap-2">
                {PERMISSION_OPTIONS.map(permission => (
                  <label 
                    key={permission} 
                    className="inline-flex items-center"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRole.permissions.includes(permission)}
                      onChange={() => togglePermission(permission)}
                      className="form-checkbox h-4 w-4 text-primary-600"
                    />
                    <span className="ml-2 text-sm">{permission}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveRole}
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

export default RoleManagement;