// server.js

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory data store
let users = [];
let idCounter = 1;

// CREATE - POST /users
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: idCounter++, name, email };
    users.push(newUser);
    res.status(201).json({ message: 'User created', user: newUser });
});


// Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running fine' });
});
// READ - GET /users
app.get('/users', (req, res) => {
    res.json(users);
});

// READ (Single User) - GET /users/:id
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

// UPDATE - PUT /users/:id
app.put('/users/:id', (req, res) => {
    const { name, email } = req.body;
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    res.json({ message: 'User updated', user });
});

// DELETE - DELETE /users/:id
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

    users.splice(userIndex, 1);
    res.json({ message: 'User deleted' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
