# Role-Based Access Control (RBAC) Dashboard

## 🎯 Project Overview
A sophisticated Role-Based Access Control (RBAC) dashboard built with React and Tailwind CSS, offering comprehensive user management, role administration, and permission control. This enhanced version includes advanced features like input validation, intelligent search, dynamic filtering, and real-time updates.

## 🌟 Key Features

### User Management
- **User Operations**
  - Seamlessly add, edit, and delete users
  - Assign roles to users with granular control
  - Manage user status (Active/Inactive)
  - Real-time input validation for user data

### Role Management
- **Role Customization**
  - Create and modify roles with ease
  - Define precise, granular permissions
  - Flexible role assignment mechanism

### Design & Responsiveness
- **Modern UI**
  - Responsive design powered by Tailwind CSS
  - Seamless experience across desktop and mobile devices
  - Clean, intuitive user interface
 
### Search & Filter Capabilities
- **Smart Search**
  - Global search across all user fields
  - Advanced filtering by role, status, and permissions
  - Custom sort options for columns

### Dynamic Permissions
- **Permission Management**
  - Dynamically assign or modify role permissions
  - Clear, comprehensible permission display
  - Intuitive modification workflows

## 🛠 Prerequisites

Ensure you have the following installed:
- Node.js (v14 or later)
- npm (v6 or later)

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/rbac-dashboard.git
cd rbac-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm start
```

### 4. Access the Application
Open [http://localhost:3000](http://localhost:3000) in your web browser

## 🚀 Technologies Used

- **Frontend**
  - React
  - React Router
  - Tailwind CSS
  - Heroicons

- **Data Management**
  - Mock API Service

## 📂 Project Structure
```
src/
├── components/           # Reusable React components
├── pages/                # Top-level page components
│   ├── Dashboard.js      # Main dashboard view
│   ├── UserManagement.js # User management page
│   └── RoleManagement.js # Role management page
├── services/             # API and data services
│   └── mockData.js       # Mock data service
├── App.js                # Main application component
└── index.js              # Entry point
```

## 🔧 Customization

### Backend Integration
- Modify `src/services/mockData.js` to connect to a real backend API
- Replace mock data methods with actual API calls

### Styling
- Customize Tailwind configuration in `tailwind.config.js`
- Adjust color schemes, breakpoints, and design tokens

### Permissions
- Extend permissions and roles as per requirements

## 🔒 Security Considerations

**Important Security Notes:**
- This is a mock implementation for demonstration purposes
- For production deployment, implement:
  - Robust user authentication
  - Server-side permission validation
  - Secure, authenticated API endpoints
  - HTTPS connections
  - Input validation and sanitization

## 📸 Screenshots

Dashboard Overview
![Dashboard Overview](/screenshots/dashboard.png)


User Management
![User Management](/screenshots/new_users.png)


Role Management
![Role Management](/screenshots/roles.png)


Search, Sort, and Filter
![SearchSortFilter](/screenshots/SearchSortFilter.png)


Input Validation
![Role Management](/screenshots/input.png)


CRUD for Roles
![CRUD Roles](/screenshots/CRUD_Roles.png)


CRUD for Users
![CRUD Users](/screenshots/CRUD_Users.png)


User Activity
![User Activity](/screenshots/User_Activity.png)
