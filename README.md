## About Paysoko commerce

This project integrates a Laravel backend with a Next.js frontend, focusing on user authentication, cart functionality, and order management. The backend leverages Redis for caching and session storage, while the frontend provides a modern, responsive user interface for managing orders, login, registration, and cart operations.

## Technologies Used
Backend (Laravel):
Laravel (PHP Framework)

Redis (for caching and session management)

MySQL (for database storage)

Redis CLI (for Redis operations)

## Frontend (Next.js):

Next.js (React Framework)

Tailwind CSS (for styling)


## Backend Setup (Laravel)
1. Laravel Setup
Laravel is configured as the backend API, handling user authentication, session management, and cart operations.
1. Redis Configuration
- Installed Redis on the local machine.
- Added Redis CLI to WSL (Windows Subsystem for Linux).
- install redis-cli 
- Tested Redis by running the command: { redis-server}

1. Developed the following APIs:
User Login:

1. A POST endpoint for user authentication, accepting username/email and password.
User Registration:

1. A POST endpoint for registering new users with the necessary details.
Logout:

1. A POST endpoint to handle user logout by clearing the session.
Forgot Password:

1. A POST endpoint for initiating the password reset process.
Reset Password:

1. A PUT endpoint for resetting the user’s password after verification.
Add to Cart:

1. A POST endpoint to add items to the user's cart, stored in the Redis server.
View Cart Items:

1.  A GET endpoint to fetch all items currently in the user's cart from Redis.
Submit Order:

11 .A POST endpoint to submit an order from the cart page and store the order in the MySQL database.
Frontend Setup (Next.js)
1. Next.js Setup
Installed and configured Next.js for building the frontend with React-based components.
2. Created Pages:

## Login Page:

A login page where users can log in by entering their credentials.
POST request to the backend login API.


## Register Page:

A registration page where new users can sign up by entering their details.
POST request to the backend registration API.

## Dashboard:

A dashboard page that displays the user's orders fetched from the backend API, storing the orders in MySQL.
## Cart Page:

A cart page to view all the items added to the cart, fetched from the Redis server.

## Add to Cart Page:
A page that displays a sample product and allows users to add the product to their cart, which is stored in Redis.
## Functionalities Implemented:

1. Login Functionality:
Implements form submission with validation to log users in.
2. Register Functionality:
Handles user registration and validation via form submission.
3. View Orders:
Fetches and displays the user's order history from the backend (MySQL).
4. Cart Operations:
Allows users to view cart items stored in Redis and add items to the cart.

## Installation & Setup
1. Backend (Laravel) - ( Installed laravel on "backend") folder
2. Frontend (Next.js) - ( Installed next on "frontend") folder
3. setup Docker files for each
4. setup docker-compose file with mysql, redis, backend and frontend
5. setup git workflow 

## Configure Redis:
Make sure Redis is installed and running on your local machine by :

- install redis server in your machinine
- Start the server by running command : redis-server
- Test if the server in up  by running : ping


## API Endpoints
- User Authentication
- POST /api/auth/login - Log in a user.
- POST /api/auth/register - Register a new user.
- POST /api/auth/logout - Log out the current user.
- POST /api/auth/forgot-password - Send password reset link.
- PUT /api/auth/reset-password - Reset user password.
- 
## Cart Management
- POST /api/cart/add - Add item to cart (stored in Redis).
- GET /api/cart - View cart items (from Redis).
- POST /api/cart/submit - Submit the order from the cart.

## Order Management
- GET /api/orders - Fetch user orders from the MySQL database.

## Features
- User Authentication:
- Login, Registration, Password Reset.

## Cart Functionality:
- Add items to the cart.
- View cart items.
- Submit orders.
- Order Management:
- View submitted orders.

## How to setup in your local machine
- Have docker Installed
- clone https://github.com/omusegad/Paysoko-commerce.git
- cd into "your directory" run "docker-compose build"

## Troubleshooting
If Redis is not running, ensure it is installed and started by running redis-server in the terminal.
If you encounter issues with the API routes, make sure the Laravel application is correctly configured to handle CORS and session management.
Contribution

Feel free to fork the repository, make changes, and submit a pull request. Contributions are welcome!

## License
This project is licensed under the MIT License - see the LICENSE file for details.