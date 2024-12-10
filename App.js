const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static("public"));

// Middleware to check working hours
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Allow access during working hours
  } else {
    res.send("The web application is only available during working hours (Monday to Friday, 9 to 17).");
  }
};

// Apply middleware to all routes
app.use(workingHoursMiddleware);

// Set view engine
app.set("view engine", "html");

// Routes
app.get("/Home", (req, res) => {
  res.render("Home");
});

app.get("/Services", (req, res) => {
  res.render("Services");
});

app.get("/Contact", (req, res) => {
  res.render("Contact");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
