# verify_app
API for user management and authentication.
Description

Verify-app is a user authentication and verification app. It allows users to register, log in and verify their account using a verification code sent to their email.

Features

- User registration
- Login
- Account verification via verification code
- Password reset
- Authentication with JWT token

Technologies used

- Node.js
- Express.js
- Sequelize
- PostgreSQL
- JSON Web Tokens (JWT)

Installation

1. Clone the repository: `git clone (link unavailable)
2. Install the dependencies: npm install
3. Set the environment variables: cp .env.example .env
4. Start the server: npm start

Usage

1. Register a new user: POST /api/v1/users
2. Log in: POST /api/v1/users/login
3. Verify your account: GET /api/v1/users/verify/:code
4. Reset your password: POST /api/v1/users/reset_password

Contributions

Contributions are welcome. Please create a pull request with your changes.

License

This project is licensed under the MIT license.

Contact

- Email: andreaandrademejia@gmail.com
- GitHub: https://github.com/andreaandrademejia
# verify_app
