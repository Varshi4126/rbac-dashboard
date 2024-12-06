// src/services/mockData.js
export const INITIAL_USERS = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@company.com',
      role: 'Super Admin',
      status: 'Active'
    },
    {
      id: 2,
      username: 'john_doe',
      email: 'john@company.com',
      role: 'Editor',
      status: 'Active'
    }
  ];

  export const INITIAL_ROLES = [
    {
      id: 1,
      name: 'Super Admin',
      permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles']
    },
    {
      id: 2,
      name: 'Editor',
      permissions: ['read', 'write']
    },
    {
      id: 3,
      name: 'Viewer',
      permissions: ['read']
    }
  ];
  
  // Simulated API service
  export const ApiService = {
    getUsers: () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(INITIAL_USERS), 500);
      });
    },
    getRoles: () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(INITIAL_ROLES), 500);
      });
    },
    createUser: (user) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newUser = { ...user, id: Date.now() };
          INITIAL_USERS.push(newUser);
          resolve(newUser);
        }, 500);
      });
    },
    updateUser: (updatedUser) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = INITIAL_USERS.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            INITIAL_USERS[index] = updatedUser;
            resolve(updatedUser);
          }
        }, 500);
      });
    },
    deleteUser: (userId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = INITIAL_USERS.findIndex(u => u.id === userId);
          if (index !== -1) {
            INITIAL_USERS.splice(index, 1);
            resolve(true);
          }
        }, 500);
      });
    }
  };

