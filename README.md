
# VChat-BE 🗨️

A real-time chat backend built with **Node.js**, **Express**, and **Socket.IO**. Handles messaging, chat rooms, and user connections, providing the backend infrastructure for the VChat frontend.

---

## 🌐 Live Backend

You can access the live backend here: [https://vchat-be.onrender.com](https://vchat-be.onrender.com) 🌐

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

1. Clone the backend repository:

```bash
git clone https://github.com/vjbravo123/VChat-BE.git
cd VChat-BE
npm install
```

2. Create a `.env` file in the root directory and add your environment variables:

```env
MONGO_URI=Your mongodb connection string goes here
JWT_SECRET=Your secret key
```

3. Start the backend server:

```bash
npm start
```

> Or, if you just want to see how the project works, the backend is live at: [https://vchat-be.onrender.com](https://vchat-be.onrender.com)  

---

## 🔗 Usage

- Ensure the VChat-FE frontend is running and connected to this backend.  
- Use API endpoints to interact with the chat server (refer to API docs if available).  
- Connect via frontend or directly via: `http://localhost:5000` (default port).  

---

## 📄 License

```text
This project is licensed under the MIT License.
See the LICENSE file for details.
```

---

## 📌 Note

For the frontend implementation, visit the [VChat-FE repository](https://github.com/vjbravo123/VChat-FE).

---

## 🔗 GitHub Repo

Backend Repository: [https://github.com/vjbravo123/VChat-BE](https://github.com/vjbravo123/VChat-BE)  
