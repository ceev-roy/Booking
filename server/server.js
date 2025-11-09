import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const dataDir = "./data";
const bookingsFile = `${dataDir}/bookings.json`;
const subscriptionsFile = `${dataDir}/subscriptions.json`;

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const readData = (path) => (fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : []);
const writeData = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, 2));

// Get all bookings
app.get("/api/bookings", (req, res) => res.json(readData(bookingsFile)));

// Book Sarasvati Puja
app.post("/api/book", (req, res) => {
  const booking = { id: Date.now(), ...req.body };
  const bookings = readData(bookingsFile);
  bookings.push(booking);
  writeData(bookingsFile, bookings);
  res.json({ success: true, bookingId: booking.id });
});

// Subscribe to Plan
app.post("/api/subscribe", (req, res) => {
  const { plan, price, discount } = req.body;
  if (!plan) return res.status(400).json({ success: false, error: "Missing plan field" });

  const subscriptions = readData(subscriptionsFile);
  const newSub = { id: Date.now(), plan, price, discount, createdAt: new Date().toISOString() };
  subscriptions.push(newSub);
  writeData(subscriptionsFile, subscriptions);

  res.json({ success: true, message: `Subscribed to ${plan} plan` });
});

// Get all subscriptions
app.get("/api/subscriptions", (req, res) => res.json(readData(subscriptionsFile)));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
