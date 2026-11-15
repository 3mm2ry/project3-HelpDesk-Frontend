# HelpDesk Pro – Frontend

The frontend of **HelpDesk Pro**, an IT Service Management Platform. It provides a web interface for employees, IT staff, and administrators to access support services and manage IT resources.

## Main Features

- **Authentication:** Sign up, sign in, and sign out.
- **Role-based Dashboard:** Displays shortcuts and relevant ticket, asset, and user statistics based on the signed-in user's role.
- **Ticket Management:** Create tickets, view ticket details, edit tickets, upload ticket images, and add or manage comments.
- **IT Asset Management:** Browse equipment, view asset details, create and edit assets, and request to borrow available equipment.
- **Borrow Requests:** IT staff and administrators can review requests, approve or reject them, and record returned assets.
- **User Management:** View user information and update user details.
- **Department Management:** View and manage company departments.
- **Office Locations:** Browse office locations and desk information, with administrative create and edit pages.
- **My Profile:** View account details, phone number, department, assigned location, and related assets.
- **AI Assistant:** Chat with the IT assistant for troubleshooting steps and navigate to ticket creation if the issue is not resolved.

## Technology Stack

- React
- Vite
- React Router
- Axios
- JavaScript
- CSS

## Project Structure

```text
Frontend/
├── public/
├── src/
│   ├── assets/         # Role images and other frontend assets
│   ├── components/     # Shared components such as Navbar
│   ├── CSS/            # Application stylesheets
│   ├── pages/          # Application pages
│   │   ├── ai/
│   │   ├── assets/
│   │   ├── departments/
│   │   ├── locations/
│   │   ├── tickets/
│   │   └── users/
│   ├── services/       # Axios API service functions
│   ├── App.jsx         # Routes and authentication state
│   └── main.jsx        # React application entry point
├── index.html
├── vite.config.js
├── package.json
└── .env                # Frontend environment variables (not committed)
```

## Getting Started

### Prerequisites

- Node.js and npm
- The HelpDesk Pro backend running and accessible

### Installation

1. Open a terminal in the frontend project folder.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend project root and set the backend API base URL:

   ```env
   VITE_BACK_END_SERVER_URL=http://localhost:3000
   ```

   Change the URL if your backend is running on a different host or port.

4. Start the Vite development server using the script defined in `package.json` (commonly `npm run dev`).
5. Open the local URL printed in the terminal (Vite commonly uses `http://localhost:5173`).

## API Communication

The frontend uses a shared Axios instance in `src/services/api.js`. It reads the backend URL from `VITE_BACK_END_SERVER_URL` and automatically adds the saved token as a Bearer token to API requests when a user is signed in.

Feature-specific API functions are organized in `src/services/`, including authentication, tickets, assets, comments, users, departments, locations, profile, and AI chat.

## User Roles

The interface supports three user roles:

- **Employee:** Can use employee-facing support features such as creating and tracking tickets, browsing assets, requesting equipment, viewing locations, and using the AI Assistant.
- **IT-Staff:** Has access to IT support and asset-management workflows, including borrow-request handling.
- **Admin:** Has administrative access to additional management areas such as users and departments.

Actual access is also enforced by the backend; frontend navigation and route checks are not a substitute for backend authorization.

## Notes

- Keep environment files and private credentials out of source control.
- The frontend expects the backend API to be running before data-driven features can work.
- Uploaded image URLs are built using the configured backend URL in the relevant pages.
