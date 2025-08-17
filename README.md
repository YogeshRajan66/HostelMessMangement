# HostelMessMangement
---

The project includes the following features:

1. **Login Portal**:
   - **Admin (Hostel Staff)**
   - **User (Student)**

2. **User Pages**:
   - A page for users to view the mess meal plan.

3. **Admin Pages**:
   - A page for admins to edit the mess meal plan.
   - A payment allocation page where admins can digitally allocate payments to individual students or groups.

4. **Payment Page**:
   - A page for users to view all their payments, including mess fee, hostel fee, electricity bill, development charge, etc.

5. **Feedback & Report Page**:
   - A page for users to report problems in the hostel.
   - A view feedback page for admins to see reported problems and reply to them.

6. **Notification System**:
   - Notifications for payment alerts and completion.

7. **GUI-Level Room Allocation Page**:
   - A page displaying available and unavailable rooms in different colors.
   - Admins can control the access times for this page.

Additional functionalities may be added later.

---

STRUCTURE of the Project
hostel-mess-management/
│
├── config/
│   └── db.js                # Database connection and configuration
│
├── controllers/
│   ├── authController.js    # Handles login and authentication for admin and user
│   ├── mealPlanController.js# Admin edits and user views for mess meal plan
│   ├── paymentController.js # Handles payment viewing and allocation
│   ├── feedbackController.js# User feedback and admin responses
│   └── roomController.js    # GUI-level room allocation management
│
├── models/
│   ├── User.js              # User model schema (students, admin)
│   ├── MealPlan.js          # Meal plan model schema
│   ├── Payment.js           # Payment model schema
│   ├── Feedback.js          # Feedback model schema
│   └── Room.js              # Room model schema
│
├── routes/
│   ├── authRoutes.js        # Routes for login and authentication
│   ├── mealPlanRoutes.js    # Routes for meal plan viewing and editing
│   ├── paymentRoutes.js     # Routes for payment viewing and allocation
│   ├── feedbackRoutes.js    # Routes for feedback submission and viewing
│   └── roomRoutes.js        # Routes for room allocation
│
├── views/
│   ├── layouts/             # Common layouts (e.g., header, footer)
│   ├── auth/                # Login pages for admin and user
│   ├── mealPlan/            # Pages for viewing and editing meal plans
│   ├── payments/            # Pages for viewing payments and admin allocation
│   ├── feedback/            # Pages for submitting and viewing feedback
│   └── rooms/               # GUI for room allocation
│
├── public/
│   ├── css/                 # Stylesheets
│   ├── js/                  # Client-side JavaScript files
│   └── images/              # Images and other static assets
│
├── middlewares/
│   ├── authMiddleware.js    # Authentication middleware to protect routes
│   ├── errorHandler.js      # Error handling middleware
│   └── notification.js      # Middleware for sending payment alerts
│
├── utils/
│   └── timeControl.js       # Utility for controlling access times (e.g., room allocation)
│
├── .env                     # Environment variables (e.g., database URLs)
├── .gitignore               # Files and directories to be ignored by Git
├── app.js                   # Main application entry point
├── package.json             # NPM package file
└── README.md                # Project documentation
