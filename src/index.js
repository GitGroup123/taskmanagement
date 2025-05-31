const app = require('./app');
const {connectDB} = require('./config/dbConnection.js');
const PORT = 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
