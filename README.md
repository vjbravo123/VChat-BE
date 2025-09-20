
# VChat-BE 🗨️

A real-time chat backend built with **Node.js**, **Express**, and **Socket.IO**. Handles messaging, chat rooms, and user connections, providing the backend infrastructure for the VChat frontend.

---

## 🚀 Features

- **Real-Time Messaging**: Instant communication with Socket.IO.
- **User Authentication**: Secure login and registration.
- **Chat Rooms**: Create and join rooms for group chats.
- **Environment Configuration**: Managed using `.env` for sensitive data.

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express
- **Real-Time Communication**: Socket.IO
- **Database**: MongoDB (via Mongoose)
- **Environment Variables**: dotenv

---

## 📦 Installation & Setup

Clone the repository and install dependencies:

\`\`\`bash
git clone https://github.com/vjbravo123/VChat-BE.git
cd VChat-BE
npm install
\`\`\`

Create a \`.env\` file in the root directory and add your environment variables:

\`\`\`env
MONGO_URI=mongodb://127.0.0.1:27017/Vchat
JWT_SECRET=your_jwt_secret
\`\`\`

Start the server:

\`\`\`bash
npm start
\`\`\`

---

## 🔗 Usage

- Ensure the VChat-FE frontend is running and connected to this backend.
- Use API endpoints to interact with the chat server (refer to API docs if available).

Open your browser or frontend app to connect to the backend via \`http://localhost:5000\`.

---

## 📄 License

This project is licensed under the MIT License.

---

## 📌 Note

For the frontend implementation, visit the [VChat-FE repository](https://github.com/vjbravo123/VChat-FE).

---

## 🔗 GitHub Repo

Backend Repository: [https://github.com/vjbravo123/VChat-BE](https://github.com/vjbravo123/VChat-BE)
