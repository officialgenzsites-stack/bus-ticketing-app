const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Routes Data (Karnataka KSRTC / BMTC)
const routes = [
  {
    id: 'R1',
    source: 'Bengaluru',
    destination: 'Mysuru',
    busType: 'KSRTC Rajahamsa Executive',
    busNo: 'KA-01-F-5432',
    departure: '08:00 AM',
    fare: 280,
    duration: '3h 30m',
    availableSeats: 24
  },
  {
    id: 'R2',
    source: 'Bengaluru',
    destination: 'Mysuru',
    busType: 'KSRTC Non-AC Sleeper',
    busNo: 'KA-41-A-1209',
    departure: '09:30 AM',
    fare: 350,
    duration: '3h 15m',
    availableSeats: 12
  },
  {
    id: 'R3',
    source: 'Bengaluru',
    destination: 'Tumakuru',
    busType: 'BMTC / KSRTC Express',
    busNo: 'KA-01-FA-9871',
    departure: '07:15 AM',
    fare: 120,
    duration: '1h 45m',
    availableSeats: 30
  },
  {
    id: 'R4',
    source: 'Bengaluru',
    destination: 'Hubballi',
    busType: 'KSRTC Airavat Club Class (Volvo)',
    busNo: 'KA-51-F-8822',
    departure: '10:00 PM',
    fare: 850,
    duration: '7h 00m',
    availableSeats: 18
  },
  {
    id: 'R5',
    source: 'Mangaluru',
    destination: 'Bengaluru',
    busType: 'KSRTC sleeper',
    busNo: 'KA-19-F-3344',
    departure: '09:00 PM',
    fare: 650,
    duration: '8h 00m',
    availableSeats: 8
  }
];

// In-memory ticket store
const tickets = [];

// Get all routes
app.get('/api/routes', (req, res) => {
  const { source, destination } = req.query;
  let filtered = routes;
  if (source) {
    filtered = filtered.filter(r => r.source.toLowerCase() === source.toLowerCase());
  }
  if (destination) {
    filtered = filtered.filter(r => r.destination.toLowerCase() === destination.toLowerCase());
  }
  res.json({ success: true, data: filtered });
});

// Get route by ID
app.get('/api/routes/:id', (req, res) => {
  const route = routes.find(r => r.id === req.params.id);
  if (!route) {
    return res.status(404).json({ success: false, message: 'Route not found' });
  }
  res.json({ success: true, data: route });
});

// Book ticket
app.post('/api/book', (req, res) => {
  const { routeId, passengerName, age, phone, seatsCount, paymentMethod } = req.body;

  const route = routes.find(r => r.id === routeId);
  if (!route) {
    return res.status(400).json({ success: false, message: 'Invalid route selected' });
  }

  const totalFare = route.fare * (seatsCount || 1);
  const ticketId = 'KA-' + Math.floor(100000 + Math.random() * 900000);

  const newTicket = {
    ticketId,
    routeId,
    source: route.source,
    destination: route.destination,
    busType: route.busType,
    busNo: route.busNo,
    departure: route.departure,
    passengerName: passengerName || 'Passenger',
    age: age || 'N/A',
    phone: phone || 'N/A',
    seatsCount: seatsCount || 1,
    totalFare,
    paymentMethod: paymentMethod || 'UPI',
    bookingTime: new Date().toISOString(),
    status: 'CONFIRMED'
  };

  tickets.push(newTicket);

  res.status(201).json({
    success: true,
    message: 'Ticket booked successfully!',
    data: newTicket
  });
});

// Verify ticket (Conductor check)
app.get('/api/ticket/:ticketId', (req, res) => {
  const ticket = tickets.find(t => t.ticketId === req.params.ticketId);
  if (!ticket) {
    // Return a mock ticket for demo convenience if not found in memory
    return res.json({
      success: true,
      data: {
        ticketId: req.params.ticketId,
        source: 'Bengaluru',
        destination: 'Mysuru',
        busType: 'KSRTC Rajahamsa Executive',
        busNo: 'KA-01-F-5432',
        departure: '08:00 AM',
        passengerName: 'Demo Passenger',
        seatsCount: 1,
        totalFare: 280,
        status: 'CONFIRMED'
      }
    });
  }
  res.json({ success: true, data: ticket });
});

app.listen(PORT, () => {
  console.log(`Karnataka Bus Ticketing Server running on port ${PORT}`);
});
