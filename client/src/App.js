import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

// ─── Language Context ────────────────────────────────────────────────────────
const LangContext = createContext();

const translations = {
  en: {
    brand: '🚌 Karnataka Bus Ticket',
    home: 'Home',
    searchBuses: 'Search Buses',
    from: 'From',
    to: 'To',
    search: 'Search Buses',
    availableBuses: 'Available Buses',
    book: 'Book Now',
    noRoutes: 'No buses found for this route.',
    passengerDetails: 'Passenger Details',
    name: 'Full Name',
    age: 'Age',
    phone: 'Phone Number',
    seats: 'Number of Seats',
    payment: 'Payment Method',
    payNow: 'Pay & Book Ticket',
    back: '← Back',
    departure: 'Departure',
    duration: 'Duration',
    busNo: 'Bus No.',
    farePerSeat: 'Fare / seat',
    totalFare: 'Total Fare',
    status: 'CONFIRMED',
    ticketId: 'Ticket ID',
    downloadTip: 'Show this ticket to the conductor',
    selectCity: 'Select city',
    passenger: 'Passenger',
    heroTitle: 'Book Your Bus Ticket Instantly',
    heroSub: 'Karnataka KSRTC & Government Buses — Simple, Fast, Accessible',
    seats_left: 'seats left',
    bookingFor: 'Booking Summary',
    printTicket: '🖨️ Print / Save Ticket',
    homeLink: '🏠 Book Another Ticket',
    paymentConfirm: 'Processing payment…',
    upi: 'UPI / QR',
    card: 'Card',
    cash: 'Cash at Counter',
  },
  kn: {
    brand: '🚌 ಕರ್ನಾಟಕ ಬಸ್ ಟಿಕೆಟ್',
    home: 'ಮುಖಪುಟ',
    searchBuses: 'ಬಸ್ ಹುಡುಕಿ',
    from: 'ಎಲ್ಲಿಂದ',
    to: 'ಎಲ್ಲಿಗೆ',
    search: 'ಬಸ್ ಹುಡುಕಿ',
    availableBuses: 'ಲಭ್ಯ ಬಸ್‌ಗಳು',
    book: 'ಬುಕ್ ಮಾಡಿ',
    noRoutes: 'ಈ ಮಾರ್ಗದಲ್ಲಿ ಬಸ್‌ಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
    passengerDetails: 'ಪ್ರಯಾಣಿಕ ವಿವರಗಳು',
    name: 'ಪೂರ್ಣ ಹೆಸರು',
    age: 'ವಯಸ್ಸು',
    phone: 'ಫೋನ್ ಸಂಖ್ಯೆ',
    seats: 'ಆಸನಗಳ ಸಂಖ್ಯೆ',
    payment: 'ಪಾವತಿ ವಿಧಾನ',
    payNow: 'ಪಾವತಿಸಿ ಮತ್ತು ಟಿಕೆಟ್ ಬುಕ್ ಮಾಡಿ',
    back: '← ಹಿಂದೆ',
    departure: 'ಹೊರಡುವ ಸಮಯ',
    duration: 'ಅವಧಿ',
    busNo: 'ಬಸ್ ಸಂ.',
    farePerSeat: 'ದರ / ಆಸನ',
    totalFare: 'ಒಟ್ಟು ದರ',
    status: 'ದೃಢಪಡಿಸಿದೆ',
    ticketId: 'ಟಿಕೆಟ್ ಐಡಿ',
    downloadTip: 'ಈ ಟಿಕೆಟ್ ಅನ್ನು ಕಂಡಕ್ಟರ್‌ಗೆ ತೋರಿಸಿ',
    selectCity: 'ನಗರ ಆಯ್ಕೆ',
    passenger: 'ಪ್ರಯಾಣಿಕ',
    heroTitle: 'ತಕ್ಷಣ ನಿಮ್ಮ ಬಸ್ ಟಿಕೆಟ್ ಬುಕ್ ಮಾಡಿ',
    heroSub: 'ಕರ್ನಾಟಕ KSRTC ಮತ್ತು ಸರ್ಕಾರಿ ಬಸ್‌ಗಳು — ಸರಳ, ವೇಗ, ಸುಲಭ',
    seats_left: 'ಆಸನಗಳು ಬಾಕಿ',
    bookingFor: 'ಬುಕಿಂಗ್ ಸಾರಾಂಶ',
    printTicket: '🖨️ ಮುದ್ರಿಸಿ / ಉಳಿಸಿ',
    homeLink: '🏠 ಇನ್ನೊಂದು ಟಿಕೆಟ್ ಬುಕ್ ಮಾಡಿ',
    paymentConfirm: 'ಪಾವತಿ ಪ್ರಕ್ರಿಯೆ ನಡೆಯುತ್ತಿದೆ…',
    upi: 'UPI / QR',
    card: 'ಕಾರ್ಡ್',
    cash: 'ಕೌಂಟರ್‌ನಲ್ಲಿ ನಗದು',
  }
};

function useLang() {
  return useContext(LangContext);
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const { lang, setLang, t } = useLang();
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span>🚌</span>
        <span style={{ fontSize: '1rem' }}>{lang === 'en' ? 'Karnataka Bus Ticket' : 'ಕರ್ನಾಟಕ ಬಸ್ ಟಿಕೆಟ್'}</span>
      </Link>
      <button
        className="lang-toggle"
        onClick={() => setLang(lang === 'en' ? 'kn' : 'en')}
      >
        {lang === 'en' ? 'ಕನ್ನಡ' : 'English'}
      </button>
    </nav>
  );
}

// ─── Stepper ─────────────────────────────────────────────────────────────────
function Stepper({ current }) {
  const { t } = useLang();
  const steps = [t('searchBuses'), t('passengerDetails'), t('payment'), t('ticketId')];
  return (
    <div className="stepper">
      {steps.map((label, i) => (
        <React.Fragment key={i}>
          <div className={`step ${i < current ? 'done' : i === current ? 'active' : ''}`}>
            <div className="step-circle">{i < current ? '✓' : i + 1}</div>
            <div className="step-label">{label}</div>
          </div>
          {i < steps.length - 1 && (
            <div className={`step-line ${i < current ? 'done' : ''}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Cities list ─────────────────────────────────────────────────────────────
const CITIES = ['Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Tumakuru', 'Davangere', 'Belagavi', 'Shivamogga', 'Kalaburagi', 'Udupi'];

// ─── Page: Home ──────────────────────────────────────────────────────────────
function Home() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!source || !destination) {
      setError('Please select both From and To cities.');
      return;
    }
    if (source === destination) {
      setError('Origin and destination cannot be the same.');
      return;
    }
    setError('');
    navigate(`/routes?source=${source}&destination=${destination}`);
  };

  return (
    <div>
      <div className="hero">
        <h1>{t('heroTitle')}</h1>
        <p>{t('heroSub')}</p>
      </div>
      <div className="card">
        {error && <div className="alert alert-error">{error}</div>}
        <form className="search-form" onSubmit={handleSearch}>
          <div className="form-group">
            <label>{t('from')}</label>
            <select value={source} onChange={e => setSource(e.target.value)}>
              <option value="">{t('selectCity')}</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>{t('to')}</label>
            <select value={destination} onChange={e => setDestination(e.target.value)}>
              <option value="">{t('selectCity')}</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <button type="submit" className="btn btn-primary btn-block">{t('search')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Page: Route List ─────────────────────────────────────────────────────────
function RouteList() {
  const navigate = useNavigate();
  const { t } = useLang();
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const source = params.get('source') || '';
  const destination = params.get('destination') || '';

  const [routes, setRoutes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    setLoading(true);
    fetch(API_BASE + `/api/routes?source=${source}&destination=${destination}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) setRoutes(data.data);
        else setError('Failed to load routes.');
        setLoading(false);
      })
      .catch(() => {
        setError('Could not connect to the server. Is the backend running?');
        setLoading(false);
      });
  }, [source, destination]);

  if (loading) return <div className="loading">🔍 Searching buses…</div>;

  return (
    <div className="container">
      <Stepper current={0} />
      <div className="card">
        <div className="section-title">
          {source} → {destination}
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {routes.length === 0 && !error ? (
          <div className="empty-state">
            <div className="icon">🚌</div>
            <p>{t('noRoutes')}</p>
            <button className="btn btn-secondary" style={{ marginTop: 16 }} onClick={() => navigate('/')}>{t('back')}</button>
          </div>
        ) : (
          routes.map(route => (
            <div
              key={route.id}
              className="route-card"
              onClick={() => navigate(`/book/${route.id}`)}
            >
              <div className="route-card-header">
                <div>
                  <div className="route-arrow">
                    <span>{route.source}</span>
                    <span className="arrow">→</span>
                    <span>{route.destination}</span>
                  </div>
                  <h3>{route.busType}</h3>
                </div>
                <div className="fare">₹{route.fare}</div>
              </div>
              <div className="route-details">
                <span>🕐 {route.departure}</span>
                <span>⏱ {route.duration}</span>
                <span>🚌 {route.busNo}</span>
                <span style={{ color: route.availableSeats < 10 ? '#d32f2f' : '#388e3c' }}>
                  💺 {route.availableSeats} {t('seats_left')}
                </span>
              </div>
              <button className="btn btn-primary" style={{ marginTop: 14 }}>{t('book')}</button>
            </div>
          ))
        )}
        <button className="btn btn-secondary" style={{ marginTop: 8 }} onClick={() => navigate('/')}>{t('back')}</button>
      </div>
    </div>
  );
}

// ─── Page: Booking Form ───────────────────────────────────────────────────────
function BookingForm() {
  const { routeId } = useParams();
  const navigate = useNavigate();
  const { t } = useLang();

  const [route, setRoute] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [seats, setSeats] = React.useState(1);
  const [payment, setPayment] = React.useState('UPI');
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    fetch(API_BASE + `/api/routes/${routeId}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) setRoute(data.data);
        setLoading(false);
      });
  }, [routeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setError('Please enter passenger name.'); return; }
    if (!phone.trim() || phone.length < 10) { setError('Please enter a valid 10-digit phone number.'); return; }
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch(API_BASE + '/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routeId, passengerName: name, age, phone, seatsCount: seats, paymentMethod: payment })
      });
      const data = await res.json();
      if (data.success) {
        navigate('/ticket', { state: { ticket: data.data } });
      } else {
        setError(data.message || 'Booking failed.');
      }
    } catch {
      setError('Could not connect to server.');
    }
    setSubmitting(false);
  };

  if (loading) return <div className="loading">Loading…</div>;
  if (!route) return <div className="container"><p>Route not found.</p></div>;

  const total = route.fare * seats;

  return (
    <div className="container">
      <Stepper current={1} />
      <div className="card">
        <div className="section-title">{t('passengerDetails')}</div>

        {/* Route summary pill */}
        <div style={{ background: '#fff5f5', borderRadius: 10, padding: '12px 16px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontWeight: 700 }}>{route.source} → {route.destination}</span>
          <span style={{ color: '#888', fontSize: '0.9rem' }}>{route.departure} &nbsp;|&nbsp; {route.busType}</span>
          <span style={{ fontWeight: 800, color: '#d32f2f', fontSize: '1.1rem' }}>₹{route.fare} {t('farePerSeat')}</span>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="search-form">
            <div className="form-group">
              <label>{t('name')}</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Ramesh Kumar" required />
            </div>
            <div className="form-group">
              <label>{t('age')}</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 24" min="1" max="120" />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>{t('phone')}</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="10-digit mobile number" maxLength={10} required />
            </div>
          </div>

          {/* Seats */}
          <div style={{ marginTop: 20 }}>
            <div className="form-group">
              <label>{t('seats')}</label>
              <div className="seats-control" style={{ marginTop: 6 }}>
                <button type="button" onClick={() => setSeats(s => Math.max(1, s - 1))}>−</button>
                <span className="count">{seats}</span>
                <button type="button" onClick={() => setSeats(s => Math.min(6, s + 1))}>+</button>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div style={{ marginTop: 24 }}>
            <div className="section-title" style={{ marginBottom: 12 }}>{t('payment')}</div>
            <div className="payment-grid">
              {[
                { id: 'UPI', icon: '📱', label: t('upi') },
                { id: 'Card', icon: '💳', label: t('card') },
                { id: 'Cash', icon: '💵', label: t('cash') },
              ].map(opt => (
                <div
                  key={opt.id}
                  className={`payment-option ${payment === opt.id ? 'selected' : ''}`}
                  onClick={() => setPayment(opt.id)}
                >
                  <span className="payment-icon">{opt.icon}</span>
                  <span>{opt.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div style={{ marginTop: 24, borderTop: '2px solid #eee', paddingTop: 16 }}>
            <table className="summary-table">
              <tbody>
                <tr><td>{t('farePerSeat')}</td><td>₹{route.fare}</td></tr>
                <tr><td>{t('seats')}</td><td>× {seats}</td></tr>
                <tr className="summary-total"><td>{t('totalFare')}</td><td>₹{total}</td></tr>
              </tbody>
            </table>
          </div>

          <button type="submit" className="btn btn-success btn-block" disabled={submitting}>
            {submitting ? t('paymentConfirm') : `${t('payNow')} — ₹${total}`}
          </button>
          <button type="button" className="btn btn-secondary btn-block" onClick={() => navigate(-1)} style={{ marginTop: 8 }}>
            {t('back')}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Page: Ticket ─────────────────────────────────────────────────────────────
function TicketPage() {
  const navigate = useNavigate();
  const loc = useLocation();
  const { t } = useLang();
  const ticket = loc.state?.ticket;

  if (!ticket) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center' }}>
          <p>No ticket found.</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/')}>Go Home</button>
        </div>
      </div>
    );
  }

  const qrValue = JSON.stringify({ ticketId: ticket.ticketId, name: ticket.passengerName, route: `${ticket.source}-${ticket.destination}`, status: 'CONFIRMED' });

  return (
    <div className="container">
      <Stepper current={3} />
      <div className="alert alert-success" style={{ textAlign: 'center', fontSize: '1rem' }}>
        🎉 Booking Confirmed! Your ticket is ready.
      </div>

      <div className="ticket">
        <div className="ticket-header">
          <div className="brand">🚌 Karnataka Bus</div>
          <div className="ticket-status">{t('status')}</div>
        </div>

        <div className="ticket-id">{ticket.ticketId}</div>

        <div className="ticket-route">
          <div>
            <div className="city">{ticket.source}</div>
            <div className="city-sub">{ticket.departure}</div>
          </div>
          <div className="arrow-big">→</div>
          <div style={{ textAlign: 'right' }}>
            <div className="city">{ticket.destination}</div>
            <div className="city-sub">{ticket.duration || '—'}</div>
          </div>
        </div>

        <div className="ticket-info-grid">
          <div className="ticket-info-item">
            <label>{t('passenger')}</label>
            <p>{ticket.passengerName}</p>
          </div>
          <div className="ticket-info-item">
            <label>{t('phone')}</label>
            <p>{ticket.phone}</p>
          </div>
          <div className="ticket-info-item">
            <label>{t('seats')}</label>
            <p>{ticket.seatsCount}</p>
          </div>
          <div className="ticket-info-item">
            <label>{t('totalFare')}</label>
            <p>₹{ticket.totalFare}</p>
          </div>
          <div className="ticket-info-item">
            <label>{t('busNo')}</label>
            <p>{ticket.busNo}</p>
          </div>
          <div className="ticket-info-item">
            <label>{t('payment')}</label>
            <p>{ticket.paymentMethod}</p>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.82rem', color: '#888', marginBottom: 12 }}>
          {t('downloadTip')}
        </p>

        <div className="qr-container">
          <QRCodeSVG value={qrValue} size={140} level="M" />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => window.print()}>{t('printTicket')}</button>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => navigate('/')}>{t('homeLink')}</button>
      </div>
    </div>
  );
}

// ─── useParams shim ───────────────────────────────────────────────────────────
function useParams() {
  const loc = useLocation();
  const match = loc.pathname.match(/\/book\/(.+)/);
  return { routeId: match ? match[1] : null };
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState('en');
  const API_BASE = 'https://bus-ticketing-app-xphx.onrender.com';
  const t = (key) => translations[lang][key] || key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/routes" element={<RouteList />} />
            <Route path="/book/:routeId" element={<BookingForm />} />
            <Route path="/ticket" element={<TicketPage />} />
          </Routes>
        </div>
      </Router>
    </LangContext.Provider>
  );
}
