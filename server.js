const express = require('express');
const PORT = 3000;
const ctrl = require('./usersCtrl');

const app = express()
app.use(express.json())


app.listen(PORT, () => console.log(`${PORT} ducks eating ice cream`))
app.get('/api/user', ctrl.getUser);
app.get('/api/user/:userId', ctrl.getUserId);
app.get('/api/admin', ctrl.getAdmin);
app.get('/api/nonadmin', ctrl.getNonAdmin);
app.get('/api/type/:userType', ctrl.getUserType);
app.put('/api/user/:userId', ctrl.updateUserId);
app.post('/api/user', ctrl.addUser);
app.delete('/api/user/:userId', ctrl.deleteUser);