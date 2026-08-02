import { useState, useEffect } from 'react';
import { 
  Scissors, 
  Calendar, 
  Clock, 
  Plus, 
  Check, 
  DollarSign, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Bell,
  X,
  UserCheck,
  MessageCircle,
  ShieldCheck,
  Droplets,
  MapPin,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';
import './premium-animations.css';
import SocialCards from './components/ui/card-fan-carousel';
import { MeshGradient } from '@paper-design/shaders-react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import crop1 from './assets/crop_1.jpeg';
import crop2 from './assets/crop_2.jpeg';
import crop3 from './assets/crop_3.jpeg';
import crop4 from './assets/crop_4.jpeg';
import crop5 from './assets/crop_5.jpeg';
import crop6 from './assets/crop_6.jpeg';
import crop7 from './assets/crop_7.jpeg';
import crop8 from './assets/crop_8.jpeg';
import crop9 from './assets/crop_9.jpeg';
import crop10 from './assets/crop_10.jpeg';
import crop11 from './assets/crop_11.jpeg';
import crop12 from './assets/crop_12.jpeg';
import crop13 from './assets/crop_13.jpeg';

const DEMO_CARDS = [
  { imgUrl: crop1, alt: 'Hasil Karya Glam Studios 1' },
  { imgUrl: crop2, alt: 'Hasil Karya Glam Studios 2' },
  { imgUrl: crop3, alt: 'Hasil Karya Glam Studios 3' },
  { imgUrl: crop4, alt: 'Hasil Karya Glam Studios 4' },
  { imgUrl: crop5, alt: 'Hasil Karya Glam Studios 5' },
  { imgUrl: crop6, alt: 'Hasil Karya Glam Studios 6' },
  { imgUrl: crop7, alt: 'Hasil Karya Glam Studios 7' },
  { imgUrl: crop8, alt: 'Hasil Karya Glam Studios 8' },
  { imgUrl: crop9, alt: 'Hasil Karya Glam Studios 9' },
  { imgUrl: crop10, alt: 'Hasil Karya Glam Studios 10' },
  { imgUrl: crop11, alt: 'Hasil Karya Glam Studios 11' },
  { imgUrl: crop12, alt: 'Hasil Karya Glam Studios 12' },
  { imgUrl: crop13, alt: 'Hasil Karya Glam Studios 13' },
];

// TypeScript Interfaces
interface Service {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
}







interface Booking {
  id: string;
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  stylistId: string;
  stylistName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  services: Service[];
  totalAmount: number;
  notes: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  createdAt: string;
}





interface AdminNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  bookingCode: string;
  createdAt?: string;
}

// Admin authentication will be handled inside the App component.


// Konfigurasi WA Gateway Fonnte (Silakan isi token dari fonnte.com jika ingin mengirim otomatis ke HP admin)
const FONNTE_API_TOKEN = ''; 
const ADMIN_WA_NUMBER = '6285724300213';

// Initial Mock Data
const INITIAL_SERVICES: Service[] = [
  { id: 'srv-1', categoryId: 'cat-1', categoryName: 'Manicure & Spa', name: 'Classic Rose Manicure', description: 'Perawatan kuku klasik dengan rendaman mawar hangat, scrubbing, dan perapian kutikula.', price: 120000, duration: 45 },
  { id: 'srv-2', categoryId: 'cat-1', categoryName: 'Manicure & Spa', name: 'Premium Milk Spa Mani', description: 'Spa kuku bernutrisi tinggi dengan masker susu madu hangat untuk melembutkan tangan.', price: 180000, duration: 60 },
  { id: 'srv-3', categoryId: 'cat-2', categoryName: 'Pedicure & Spa', name: 'Classic Spa Pedicure', description: 'Pembersihan kuku kaki, perataan kapalan, scrub garam laut, pijat relaksasi.', price: 150000, duration: 60 },
  { id: 'srv-4', categoryId: 'cat-2', categoryName: 'Pedicure & Spa', name: 'Detox Charcoal Pedi Spa', description: 'Perawatan kaki mendalam dengan masker arang aktif untuk mengeluarkan racun dan bau kaki.', price: 210000, duration: 75 },
  { id: 'srv-5', categoryId: 'cat-3', categoryName: 'Gel Polish', name: 'Solid Premium Gel Polish', description: 'Pewarnaan kuku gel polos premium tahan hingga 4 minggu (bebas pilih 2 warna).', price: 100000, duration: 30 },
  { id: 'srv-6', categoryId: 'cat-4', categoryName: 'Nail Art Design', name: 'Korean Velvet Matte Art', description: 'Desain kuku seni korea dengan efek beludru matte, termasuk aksen gradasi lembut.', price: 230000, duration: 90 },
  { id: 'srv-7', categoryId: 'cat-4', categoryName: 'Nail Art Design', name: 'Luxury 3D Jewel Nail Art', description: 'Custom 3D nail art dengan tambahan mutiara, batuan kristal Swarovski, dan kawat emas.', price: 350000, duration: 120 },
  { id: 'srv-8', categoryId: 'cat-5', categoryName: 'Acrylic Extension', name: 'Classic Full Set Extension', description: 'Penyambungan kuku menggunakan akrilik premium natural lengkap dengan cat gel dasar.', price: 300000, duration: 120 }
];







const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b-1',
    bookingCode: 'GM-260613-FA89',
    customerName: 'Sarah Amalia',
    customerPhone: '081234567890',
    customerEmail: 'sarah.amalia@gmail.com',
    stylistId: 'sty-1',
    stylistName: 'Fiona Tan',
    bookingDate: '2026-06-13',
    startTime: '10:00',
    endTime: '11:30',
    services: [INITIAL_SERVICES[5]], // Korean Velvet Matte Art
    totalAmount: 230000,
    notes: 'Mau pasang kuku warna soft blue dengan aksen glitter.',
    status: 'COMPLETED',
    createdAt: '2026-06-12T14:30:00Z'
  },
  {
    id: 'b-2',
    bookingCode: 'GM-260613-CL02',
    customerName: 'Jessica Hartono',
    customerPhone: '087788992211',
    customerEmail: 'jess.hartono@yahoo.com',
    stylistId: 'sty-2',
    stylistName: 'Clara Wijaya',
    bookingDate: '2026-06-13',
    startTime: '13:00',
    endTime: '15:00',
    services: [INITIAL_SERVICES[7]], // Classic Full Set Extension
    totalAmount: 300000,
    notes: 'Kuku asli agak pendek, minta penyambungan akrilik natural.',
    status: 'CONFIRMED',
    createdAt: '2026-06-12T16:15:00Z'
  },
  {
    id: 'b-3',
    bookingCode: 'GM-260613-GR45',
    customerName: 'Alya Sabrina',
    customerPhone: '082155667788',
    customerEmail: 'alya.sabrina@gmail.com',
    stylistId: 'sty-3',
    stylistName: 'Grace Natalie',
    bookingDate: '2026-06-13',
    startTime: '15:30',
    endTime: '16:30',
    services: [INITIAL_SERVICES[2]], // Classic Spa Pedicure
    totalAmount: 150000,
    notes: 'Datang bersama teman.',
    status: 'PENDING',
    createdAt: '2026-06-13T08:00:00Z'
  }
];



function App() {
  // Simple Pathname Router State
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.hash || '#/');
  const [posTab, setPosTab] = useState<'queue' | 'settings' | 'therapists' | 'recap'>('queue');
  const [queueDate, setQueueDate] = useState<string>(new Date().toLocaleString('en-CA', { timeZone: 'Asia/Jakarta' }).split(',')[0]);
  
  // Database States (from Convex)
  const dbSettings = useQuery(api.settings.getScheduleSettings);
  const availableTimes = dbSettings?.availableTimes || ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30'];
  const stylistAvailability = dbSettings?.stylistAvailability || {};


  const dbBookings = useQuery(api.bookings.getBookings);
  const bookings = dbBookings ? dbBookings.map((b: any) => ({ ...b, id: b._id })) : INITIAL_BOOKINGS;
  
  const dbNotifs = useQuery(api.notifications.getNotifications);
  const adminNotifications = dbNotifs ? dbNotifs.map((n: any) => ({ ...n, id: n._id })) : [];

  // Convex Mutations
  const addBooking = useMutation(api.bookings.addBooking);
  const updateBookingStatus = useMutation(api.bookings.updateBookingStatus);
  const addNotification = useMutation(api.notifications.addNotification);
  const deleteNotification = useMutation(api.notifications.deleteNotification);
  const updateScheduleSettings = useMutation(api.settings.updateScheduleSettings);
  const verifyLogin = useMutation(api.auth.login);

  // Admin Authentication (Local mock instead of Firebase)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminProfile, setAdminProfile] = useState<{name: string, role: string} | null>(null);

  // Check login state from localStorage
  useEffect(() => {
    const localLogin = localStorage.getItem('glam_admin_loggedIn');
    const localRole = localStorage.getItem('glam_admin_role') || 'owner';
    if (localLogin === 'true') {
      setIsAdminLoggedIn(true);
      setAdminProfile({ name: localRole === 'owner' ? 'Admin' : 'Staff', role: localRole as 'owner' | 'kasir' });
    }
  }, []);

  const [adminUserInput, setAdminUserInput] = useState('');
  const [adminPassInput, setAdminPassInput] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');

  const handleAdminLogin = async () => {
    try {
      const result = await verifyLogin({ username: adminUserInput, password: adminPassInput });
      if (result.success) {
        localStorage.setItem('glam_admin_loggedIn', 'true');
        localStorage.setItem('glam_admin_role', result.role!);
        setIsAdminLoggedIn(true);
        setAdminProfile({ name: result.name!, role: result.role as 'owner' | 'kasir' });
        setAdminLoginError('');
      } else {
        setAdminLoginError('Kredensial salah atau pengguna tidak ditemukan.');
      }
    } catch (error: any) {
      setAdminLoginError('Terjadi kesalahan sistem.');
    }
  };


  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
  const [activeNotificationPopup, setActiveNotificationPopup] = useState<AdminNotification | null>(null);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  // Route Hashchange listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      if (adminProfile && hash !== '#/admin') {
        window.history.replaceState(null, '', '#/admin');
        setCurrentRoute('#/admin');
      } else {
        setCurrentRoute(hash);
      }
    };
    
    // Check initially in case they load the page on a different hash but are logged in
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [adminProfile]);

  // Scroll-triggered entry animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const els = document.querySelectorAll('.animate-on-scroll');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [currentRoute]);

  // Play synthesized notification sound chime using Web Audio API
  const playNotificationSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playNote = (freq: number, start: number, duration: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.05, start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(start);
        osc.stop(start + duration);
      };
      
      const now = audioCtx.currentTime;
      // Soft pleasant chime
      playNote(523.25, now, 0.3); // C5 note
      playNote(659.25, now + 0.15, 0.4); // E5 note
    } catch (err) {
      console.log('Audio Context playback not allowed yet', err);
    }
  };

  // Real-time notification sound effect
  const [lastProcessedNotifId, setLastProcessedNotifId] = useState<string | null>(null);
  useEffect(() => {
    if (adminNotifications.length > 0) {
      const latestNotif = adminNotifications[0];
      if (latestNotif._id !== lastProcessedNotifId) {
        if (latestNotif.createdAt && latestNotif.createdAt > new Date(Date.now() - 5000).toISOString()) {
          setUnreadNotifications(prev => prev + 1);
          setActiveNotificationPopup(latestNotif);
          playNotificationSound();
        }
        setLastProcessedNotifId(latestNotif._id);
      }
    }
  }, [adminNotifications, lastProcessedNotifId]);

  // --- CUSTOMER PORTAL STATES ---
  const [bookingStep, setBookingStep] = useState<number>(1);
  // const [custSelectedServices, setCustSelectedServices] = useState<Service[]>([]);
  const [custSelectedDate, setCustSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [custSelectedTime, setCustSelectedTime] = useState<string>('');
  const [custName, setCustName] = useState<string>('');
  const [custPhone, setCustPhone] = useState<string>('');
  const [custEmail, setCustEmail] = useState<string>('');
  const [custNotes, setCustNotes] = useState<string>('');
  const [custTreatment, setCustTreatment] = useState<string>('');
  // const [latestBookingCode, setLatestBookingCode] = useState<string>('');


  // Trigger Toast Notification
  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  // Format IDR currency
  const formatPrice = (val: number) => {
    return 'Rp ' + val.toLocaleString('id-ID');
  };

  // Helper to generate booking codes
  const generateBookingCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let rand = '';
    for (let i = 0; i < 4; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const todayStr = custSelectedDate.replace(/-/g, '').slice(2);
    return `GM-${todayStr}-${rand}`;
  };



  // Calculate estimated end time based on durations
  const getEndTimeStr = (startTime: string, minutes: number) => {
    if (!startTime) return '';
    const [hours, mins] = startTime.split(':').map(Number);
    let totalMins = hours * 60 + mins + minutes;
    const endHours = Math.floor(totalMins / 60) % 24;
    const endMins = totalMins % 60;
    return `${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`;
  };

  // Handle Customer Booking Submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custSelectedTime || !custName || !custPhone || !custTreatment) {
      showToast('Harap lengkapi semua data formulir!');
      return;
    }

    const bCode = generateBookingCode();
    const endTime = getEndTimeStr(custSelectedTime, 60); // default 1 hour
    const combinedNotes = `Treatment: ${custTreatment}${custNotes ? ' | Catatan: ' + custNotes : ''}`;

    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      bookingCode: bCode,
      customerName: custName,
      customerPhone: custPhone || '-',
      customerEmail: custEmail || 'guest@glamstudios.com',
      stylistId: 'sty-studio',
      stylistName: 'Glam Studios',
      bookingDate: custSelectedDate,
      startTime: custSelectedTime,
      endTime: endTime,
      services: [],
      totalAmount: 0,
      notes: combinedNotes,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    // Save to Convex
    const { id, ...bookingData } = newBooking;
    addBooking(bookingData as any);
    
    // Create Notification
    const dateFormatted = new Date(newBooking.bookingDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const newNotif = {
      title: 'Booking Baru Masuk',
      message: `${newBooking.customerName} membuat booking pada ${dateFormatted} jam ${newBooking.startTime}`,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':'),
      bookingCode: newBooking.bookingCode,
      createdAt: new Date().toISOString()
    };
    addNotification(newNotif);

    setBookingStep(3); // Show success WA screen

    // Kirim pesan WA otomatis ke Admin di background
    sendWhatsAppBackgroundNotification(newBooking);

    showToast(`Booking Reservasi Berhasil! Kode: ${bCode}`);
  };

  // Reset booking portal form
  const handleResetBookingForm = () => {
    setBookingStep(1);
    // setCustSelectedServices([]);
    setCustSelectedTime('');
    setCustName('');
    setCustPhone('');
    setCustEmail('');
    setCustNotes('');
    setCustTreatment('');
  };

  // Kirim WA Otomatis di background via Fonnte Gateway atau fallback wa.me
  const sendWhatsAppBackgroundNotification = (booking: Booking) => {
    const textMessage = `Halo Admin Glam Studio! 💅\n\nAda booking baru masuk:\n\n👤 Nama: ${booking.customerName}\n📱 No. WhatsApp: ${booking.customerPhone}\n📅 Tanggal: ${booking.bookingDate}\n⏰ Jam: ${booking.startTime} WIB\n💖 Treatment: ${booking.notes}\n\nTolong dikonfirmasi ya! 🌸`;

    if (!FONNTE_API_TOKEN) {
      console.log('Fonnte API Token belum dikonfigurasi. Lewati WA background otomatis.');
      return;
    }

    // Panggil Fonnte API
    fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        'Authorization': FONNTE_API_TOKEN
      },
      body: new URLSearchParams({
        target: ADMIN_WA_NUMBER,
        message: textMessage
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Background WA Fonnte response:', data);
      if (data.status) {
        showToast('Notifikasi WA otomatis terkirim ke Admin!');
      } else {
        console.warn('Fonnte API send failed:', data.reason);
      }
    })
    .catch(err => {
      console.error('Fonnte send error:', err);
    });
  };







  // Toggle/Add service in customer portal
  // const toggleCustomerServiceSelection = (srv: Service) => {
  //   const exists = custSelectedServices.some(s => s.id === srv.id);
  //   if (exists) {
  //     setCustSelectedServices(custSelectedServices.filter(s => s.id !== srv.id));
  //   } else {
  //     setCustSelectedServices([...custSelectedServices, srv]);
  //   }
  // };

  // --- ADMIN ACTIONS ---
  
  const markBookingComplete = (booking: Booking) => {
    updateBookingStatus({ id: booking.id as any, status: 'COMPLETED' });
    showToast(`Booking ${booking.bookingCode} ditandai selesai!`);
  };

  // --- CASHIER POS ACTIONS ---

  // Initiate checkout flow for a specific booking
  // const handleStartCheckout = (booking: Booking) => {
  //   setActiveCheckoutBooking(booking);
  //   setSelectedAddons([]);
  //   setSelectedProducts([]);
  //   setPaymentMethod('QRIS');
  // };



  // --- STATS / REPORTS MATHS ---
  const todayRevenue = bookings
    .filter(b => b.status === 'COMPLETED')
    .reduce((sum, b) => sum + b.totalAmount, 0);
  const totalBookingsCount = bookings.length;
  const completedBookingsCount = bookings.filter(b => b.status === 'COMPLETED').length;
  const pendingBookingsCount = bookings.filter(b => b.status === 'PENDING').length;


  // --- VIEW ROUTER RENDERING ---

      // Render Admin Login if on admin route and not logged in
      if (currentRoute === '#/admin' && !isAdminLoggedIn) {
        return (
          <main className="admin-login-container" style={{ position: 'relative' }}>
            <button 
              type="button"
              onClick={() => window.location.hash = '#/'}
              style={{ 
                position: 'absolute', 
                top: '24px', 
                left: '24px', 
                padding: '8px 16px', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: 'rgba(255,255,255,0.9)', 
                border: '1px solid rgba(0,0,0,0.1)', 
                cursor: 'pointer', 
                fontSize: '13px', 
                fontWeight: 'bold', 
                color: '#4a7df5', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                zIndex: 10
              }}
            >
              <ArrowLeft size={16} /> Kembali ke Beranda
            </button>
            <div className="login-card glass-panel">
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ color: '#4a7df5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 'bold', fontSize: '24px', letterSpacing: '1px' }}>
                  <Scissors size={24} style={{ transform: 'rotate(-45deg)', strokeWidth: 3 }} /> GLAM STUDIOS
                </div>
              </div>
              <h2 className="login-title" style={{ textAlign: 'left', fontSize: '26px', color: '#4a7df5' }}>Sign In</h2>
              <p className="login-subtitle" style={{ textAlign: 'left', marginTop: '4px', marginBottom: '24px' }}>Login to access your admin account</p>

              {adminLoginError && <div className="login-error-msg">{adminLoginError}</div>}

              <form onSubmit={(e) => { e.preventDefault(); handleAdminLogin(); }}>
                <div className="login-form-group">
                  <div className="input-with-icon">
                    <UserCheck size={18} className="input-icon" color="#4a7df5" />
                    <input
                      id="username"
                      type="text"
                      required
                      placeholder="username"
                      value={adminUserInput}
                      onChange={e => setAdminUserInput(e.target.value)}
                      className="login-input"
                    />
                  </div>
                </div>

                <div className="login-form-group" style={{ marginBottom: '16px' }}>
                  <div className="input-with-icon">
                    <ShieldCheck size={18} className="input-icon" color="#4a7df5" />
                    <input
                      id="password"
                      type="password"
                      required
                      placeholder="password"
                      value={adminPassInput}
                      onChange={e => setAdminPassInput(e.target.value)}
                      className="login-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px', fontSize: '13px', color: '#666' }}>
                  <input type="checkbox" id="remember" style={{ marginRight: '8px', width: '16px', height: '16px', accentColor: '#4a7df5' }} defaultChecked />
                  <label htmlFor="remember">Remember me</label>
                </div>

                <button type="submit" className="login-btn blue-btn">
                  Sign In
                </button>
                <div style={{ marginTop: '24px', fontSize: '12px', color: 'rgba(26,10,20,0.5)', lineHeight: 1.5, textAlign: 'left' }}>
                  <strong>Forgot username or password?</strong> Please contact the system administrator to reset your credentials.
                </div>
              </form>
            </div>
          </main>
        );
      }

  if (currentRoute === '#/') {
    return (
      <main className="landing-page fade-in">
        {/* ── HEADER ── */}
        <header className="landing-header">
          <div className="landing-logo">
            <div className="logo-icon-wrap">
              <Scissors size={20} color="white" style={{ transform: 'rotate(-45deg)' }} />
            </div>
            <span>Glam Studios</span>
            <span className="logo-pill">Premium</span>
          </div>
          <nav className="landing-nav">
            <a href="#/admin" className="nav-staff-btn">
              <UserCheck size={15} /> Staff
            </a>
          </nav>
        </header>

        {/* ── HERO SECTION ── */}
        <section className="landing-hero" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, backgroundColor: "#fce4df" }}>
            <MeshGradient
              style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', height: '100%' }}
              colors={["#fce4df", "#e5b3a6", "#f4d0c6", "#d89f92", "#fdfbfb"]}
              speed={0.15}
            />
          </div>
          <div className="landing-hero-overlay" style={{ zIndex: 10 }}>
            <div className="landing-hero-content">
              <div className="hero-eyebrow">
                <span className="eyebrow-dot" />
                Nail Art & Eyelash • Cianjur
              </div>
              <h1>Experience<br/><span className="hero-h1-accent">Luxury</span> Nail Art</h1>
              <p>Perawatan kuku premium di suasana yang nyaman dan elegan. Pesan jadwalmu sekarang dan nikmati layanan terbaik dari ahlinya.</p>
              <div className="hero-cta-row">
                <a href="#/booking" className="btn btn-primary hero-btn-book">
                  Booking Sekarang <ArrowRight size={18}/>
                </a>
                <a href="#gallery-section" className="hero-btn-gallery">
                  Lihat Karya Kami
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ── MARQUEE TICKER ── */}
        <div className="marquee-strip">
          <div className="marquee-track">
            {['Nail Art Korea ✦','Gel Polish Premium ✦','Acrylic Extension ✦','Manicure & Spa ✦','Pedicure Detox ✦','Eyelash Extension ✦','3D Jewel Art ✦','Classic Manicure ✦'].map((item, i) => (
              <span key={i} className="marquee-item">{item}</span>
            ))}
            {['Nail Art Korea ✦','Gel Polish Premium ✦','Acrylic Extension ✦','Manicure & Spa ✦','Pedicure Detox ✦','Eyelash Extension ✦','3D Jewel Art ✦','Classic Manicure ✦'].map((item, i) => (
              <span key={`dup-${i}`} className="marquee-item">{item}</span>
            ))}
          </div>
        </div>

        {/* ── PORTFOLIO GALLERY ── */}
        <section id="gallery-section" className="gallery-section">
          <div className="section-label-tag">Our Portfolio</div>
          <div className="landing-section-header">
            <h2>Hasil Karya Kami</h2>
            <p>Portofolio Nail Art &amp; Eyelash Extension terbaik dari terapis Glam Studios</p>
          </div>
          <SocialCards cards={DEMO_CARDS} />
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section id="why-us-section" className="landing-benefits">
          <div className="section-label-tag">Why Us</div>
          <div className="landing-section-header animate-on-scroll">
            <h2>Kenapa Memilih Glam Studios?</h2>
            <p>Berkomitmen memberikan pengalaman perawatan kuku terbaik untuk Anda</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card animate-on-scroll stagger-1">
              <div className="benefit-icon"><ShieldCheck size={32} /></div>
              <h3>Higienis &amp; Steril</h3>
              <p>Alat-alat kerja kami selalu dibersihkan dan dijaga kehigienisannya untuk kenyamanan Anda.</p>
            </div>
            <div className="benefit-card animate-on-scroll stagger-2">
              <div className="benefit-icon"><Sparkles size={32} /></div>
              <h3>Produk Premium</h3>
              <p>Hanya menggunakan produk kutek gel berkualitas tinggi yang terjamin keawetan dan warnanya.</p>
            </div>
            <div className="benefit-card animate-on-scroll stagger-3">
              <div className="benefit-icon"><Droplets size={32} /></div>
              <h3>Hasil Rapi &amp; Detail</h3>
              <p>Dikerjakan dengan teliti dan penuh kehati-hatian untuk memberikan hasil kuku yang cantik dan memuaskan.</p>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="cta-banner">
          <div className="cta-banner-inner">
            <div className="cta-banner-orb cta-orb-1"/>
            <div className="cta-banner-orb cta-orb-2"/>
            <div className="cta-content">
              <span className="cta-eyebrow">Limited Slot Tersedia</span>
              <h2>Siap Tampil Cantik &amp; Percaya Diri?</h2>
              <p>Jadwalkan perawatan kuku Anda sekarang dan dapatkan pengalaman salon premium yang tak terlupakan.</p>
              <a href="#/booking" className="cta-main-btn">
                Reservasi Sekarang <ArrowRight size={18}/>
              </a>
            </div>
          </div>
        </section>

        {/* ── LOCATION ── */}
        <section className="landing-location animate-on-scroll">
          <div className="section-label-tag">Kunjungi Kami</div>
          <div className="landing-section-header">
            <h2>Lokasi Glam Studios</h2>
            <p>Kunjungi studio kami di lokasi berikut</p>
          </div>
          <div className="map-container">
            <div style={{ textAlign: 'center', marginBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--primary)' }}>
                📍 6°49'33.6"S 107°08'00.1"E
              </div>
              <a 
                href="https://maps.google.com/maps?q=6%C2%B049'33.6%22S%20107%C2%B008'00.1%22E" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ fontSize: '12px', padding: '6px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <MapPin size={14} /> Buka di Google Maps
              </a>
            </div>
            <iframe
              title="Glam Studios Location"
              src="https://maps.google.com/maps?q=6%C2%B049'33.6%22S%20107%C2%B008'00.1%22E&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
        
        <footer className="landing-footer">
          <div className="footer-content">
            <div className="footer-col">
              <div className="footer-logo">
                <Scissors size={20} color="#e5b3a6" style={{ transform: 'rotate(-45deg)' }} />
                <span>Glam Studios</span>
              </div>
              <p style={{ marginTop: '12px', fontSize: '13px', color: '#a09ba8', lineHeight: '1.6' }}>
                Studio Nail Art &amp; Eyelash premium dengan komitmen memberikan pelayanan terbaik, higienis, dan terpercaya.
              </p>
            </div>
            <div className="footer-col">
              <h4 style={{ color: 'white', marginBottom: '16px', fontSize: '15px' }}>Hubungi Kami</h4>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '10px', fontSize: '13px', color: '#a09ba8' }}>
                <MapPin size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>Cianjur, Jawa Barat (6°49'33.6"S 107°08'00.1"E)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '13px', color: '#a09ba8' }}>
                <MessageCircle size={16} />
                <a href="https://wa.me/6285724300213" target="_blank" rel="noopener noreferrer" style={{ color: '#a09ba8', textDecoration: 'none' }}>+62 857 2430 0213</a>
              </div>
            </div>
            <div className="footer-col">
              <h4 style={{ color: 'white', marginBottom: '16px', fontSize: '15px' }}>Jam Operasional</h4>
              <p style={{ fontSize: '13px', color: '#a09ba8', marginBottom: '6px' }}>Berdasarkan Reservasi</p>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <a href="https://www.tiktok.com/@eyalash.nail" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="TikTok">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.13 4.35-2.86 5.75-1.85 1.5-4.32 2.14-6.66 1.72-2.73-.47-5.11-2.45-6.07-5.06-1.07-2.92-.09-6.32 2.4-8.23 2.14-1.63 5.01-2.14 7.51-1.42v4.06c-1.11-.47-2.43-.53-3.56-.16-1.18.38-2.11 1.29-2.52 2.45-.48 1.36-.12 2.96.93 3.97 1.05 1.01 2.65 1.25 3.97.63 1.18-.55 1.95-1.74 2.03-3.05.08-3.32.03-6.65.04-9.97.02-2.52.01-5.04.01-7.56z"/>
                  </svg>
                </a>
                <a href="https://wa.me/6285724300213" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp"><MessageCircle size={20} /></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Glam Studios. All rights reserved.</p>
          </div>
        </footer>
      </main>
    );
  }

  // 2. Client Booking Portal Route
  if (currentRoute === '#/booking') {
    return (
      <div className="app-container">
        {toast && <div className="toast">{toast}</div>}
        
        <header className="main-header">
          <button 
            type="button" 
            className="btn btn-secondary" 
            style={{ padding: '6px 16px', fontSize: '13px', borderRadius: '20px' }}
            onClick={() => window.location.hash = '#/'}
          >
            <ArrowLeft size={14} /> Kembali
          </button>
          <div className="logo-container" style={{ marginRight: '80px' }}>
            <Scissors size={24} color="#e5b3a6" style={{ transform: 'rotate(-45deg)' }} />
            <span className="logo-text">Glam Studios</span>
            <span className="logo-badge">Reservasi Online</span>
          </div>
          <div></div>
        </header>

        <main className="customer-portal fade-in">
          <div className="hero-section">
            <span className="hero-subtitle">Glamour Nail Art Experience</span>
            <h1 className="hero-title">Beautiful Nails, Effortless Booking</h1>
            <p className="hero-desc">
              Pilih perawatan kuku terbaikmu, jadwalkan bersama nail artist favorit, dan dapatkan konfirmasi instan langsung ke nomor WhatsApp milikmu.
            </p>
          </div>

          <div className="booking-wizard">
            {/* Steps Left Panel */}
            <div className="wizard-steps">
              <div className={`step-item ${bookingStep === 1 ? 'active' : bookingStep > 1 ? 'completed' : ''}`}>
                <div className="step-num">{bookingStep > 1 ? <Check size={14} /> : 1}</div>
                <div className="step-details">
                  <span className="step-title">Pilih Waktu</span>
                  <span className="step-desc">Tanggal & Jam Salon</span>
                </div>
              </div>

              <div className={`step-item ${bookingStep === 2 ? 'active' : bookingStep > 2 ? 'completed' : ''}`}>
                <div className="step-num">{bookingStep > 2 ? <Check size={14} /> : 2}</div>
                <div className="step-details">
                  <span className="step-title">Form Data Diri</span>
                  <span className="step-desc">Nama Anda</span>
                </div>
              </div>
            </div>

            {/* Steps Right Interactive Content Area */}
            <div className="wizard-content">

              {/* STEP 1: SCHEDULE & THERAPIST SELECTOR */}
              {bookingStep === 1 && (
                <div className="fade-in">
                  <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Tentukan Tanggal, Jam & Terapis</h3>
                  <p style={{ fontSize: '14px', marginBottom: '24px' }}>Silakan pilih slot waktu dan terapis yang tersedia.</p>
                  
                  <div className="datetime-picker" style={{ marginBottom: '24px' }}>
                    <div className="datepicker-wrapper">
                      <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Pilih Tanggal Kunjungan</label>
                      <input 
                        type="date" 
                        value={custSelectedDate} 
                        onChange={(e) => {
                          setCustSelectedDate(e.target.value);
                          setCustSelectedTime('');
                        }}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Slot Waktu Tersedia</label>
                      <div className="slots-grid">
                        {availableTimes.length > 0 ? availableTimes.map(time => {
                          const isSelected = custSelectedTime === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              className={`slot-btn ${isSelected ? 'selected' : ''}`}
                              onClick={() => {
                                setCustSelectedTime(time);
                              }}
                            >
                              {time}
                            </button>
                          );
                        }) : <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Belum ada slot waktu tersedia hari ini.</p>}
                      </div>
                    </div>
                  </div>

                  
                </div>
              )}

              {/* STEP 2: CONTACT & NOTES */}
              {bookingStep === 2 && (
                <div className="fade-in" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                  <h3 style={{ fontSize: '22px', marginBottom: '8px', textAlign: 'center' }}>Detail Pemesan</h3>
                  
                  {/* Welcome & Info Notice Card */}
                  <div style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(200,113,95,0.2)', borderRadius: '12px', padding: '20px', marginBottom: '24px', fontSize: '13.5px', lineHeight: '1.6', color: 'var(--text-main)', backdropFilter: 'blur(16px)' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '6px', fontSize: '15px', background: 'linear-gradient(135deg, #ffffff 0%, #e8c4b8 50%, #f0b8d0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Halo Kak Cantik! 💕</div>
                    <div style={{ marginBottom: '12px', color: 'rgba(26,10,20,0.6)' }}>Terima kasih sudah memilih Glam Studio. Mohon bantu isi format booking di bawah ini ya:</div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(255,255,255,0.9)', padding: '14px 16px', borderRadius: '8px', border: '1px solid rgba(224,111,160,0.15)', marginBottom: '12px' }}>
                      <div style={{ color: 'rgba(26,10,20,0.85)' }}><strong style={{ color: '#c4558a' }}>Nama:</strong> {custName || '-'}</div>
                      <div style={{ color: 'rgba(26,10,20,0.85)' }}><strong style={{ color: '#c4558a' }}>No. WhatsApp:</strong> {custPhone || '-'}</div>
                      <div style={{ color: 'rgba(26,10,20,0.85)' }}><strong style={{ color: '#c4558a' }}>Tanggal Booking:</strong> {custSelectedDate}</div>
                      <div style={{ color: 'rgba(26,10,20,0.85)' }}><strong style={{ color: '#c4558a' }}>Jam Booking:</strong> {custSelectedTime} WIB</div>
                                            <div style={{ color: 'rgba(26,10,20,0.85)' }}><strong style={{ color: '#c4558a' }}>Treatment yang Dipilih:</strong> {custTreatment || '-'}</div>
                    </div>
                    
                    <div style={{ fontSize: '12px', color: 'rgba(26,10,20,0.45)', borderLeft: '3px solid var(--primary)', paddingLeft: '10px', marginBottom: '12px', lineHeight: '1.6' }}>
                      Mohon datang tepat waktu sesuai jadwal booking ya, Kak. Jika terlambat lebih dari 15 menit tanpa konfirmasi, jadwal dapat dialihkan atau dibatalkan agar tidak mengganggu antrean customer lainnya.
                    </div>
                    <div style={{ fontWeight: '500', color: 'rgba(26,10,20,0.7)' }}>Terima kasih, Kak. Sampai bertemu di Glam Studio! 🤍🌸</div>
                  </div>
                  
                  <form onSubmit={handleBookingSubmit}>
                    <div className="form-group">
                      <label>Nama Lengkap *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Contoh: Sarah Amalia" 
                        value={custName} 
                        onChange={e => setCustName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>No. WhatsApp *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="Contoh: 08123456789" 
                        value={custPhone} 
                        onChange={e => setCustPhone(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Treatment yang Dipilih *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Contoh: Manicure Gel + Nail Art Korea" 
                        value={custTreatment} 
                        onChange={e => setCustTreatment(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Catatan Tambahan (Opsional)</label>
                      <textarea 
                        rows={3}
                        placeholder="Contoh: Mau warna soft pink dengan aksen glitter..."
                        value={custNotes} 
                        onChange={e => setCustNotes(e.target.value)}
                        style={{ resize: 'vertical', fontFamily: 'inherit' }}
                      />
                    </div>
                  </form>

                  {/* Summary box */}
                  <div style={{ background: 'rgba(255,248,252,0.95)', border: '1px solid rgba(200,113,95,0.2)', borderRadius: '12px', padding: '16px', marginTop: '8px', fontSize: '13px', color: 'rgba(26,10,20,0.5)', lineHeight: '1.8' }}>
                    <strong style={{ color: '#c4558a', display: 'block', marginBottom: '6px' }}>Ringkasan Jadwal</strong>
                    <div>Tanggal: <strong style={{ color: 'rgba(26,10,20,0.9)' }}>{custSelectedDate}</strong></div>
                    <div>Jam: <strong style={{ color: 'rgba(26,10,20,0.9)' }}>{custSelectedTime} WIB</strong></div>
                                      </div>
                </div>
              )}

              {/* STEP 3: SUCCESS / WHATSAPP POPUP */}
              {bookingStep === 3 && (
                <div className="fade-in" style={{ textAlign: 'center' }}>
                  <div className="booking-success-icon">
                    <div className="booking-success-ring">
                      <CheckCircle2 size={48} color="#28a745" />
                    </div>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '34px', marginBottom: '8px' }}>Booking Confirmed! 🎉</h3>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
                    <strong>Halo Kak Cantik! 💕✨</strong><br/>
                    Terima kasih sudah memilih Glam Studio. Berikut adalah ringkasan reservasi Anda:
                  </p>

                  <div style={{ maxWidth: '420px', margin: '0 auto', background: 'white', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.06)', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <div style={{ padding: '24px 24px 16px', background: '#fffdf9', borderBottom: '1px solid rgba(224,111,160,0.1)' }}>
                      <h4 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-main)', margin: 0 }}>Ringkasan Reservasi</h4>
                    </div>
                    
                    <div style={{ padding: '24px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '13.5px' }}>Nama Pelanggan</span>
                        <span style={{ fontWeight: '500', color: 'var(--text-main)', fontSize: '14px' }}>{custName}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '13.5px' }}>No. WhatsApp</span>
                        <span style={{ fontWeight: '500', color: 'var(--text-main)', fontSize: '14px' }}>{custPhone}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '13.5px' }}>Tanggal</span>
                        <span style={{ fontWeight: '500', color: 'var(--text-main)', fontSize: '14px' }}>{custSelectedDate}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '13.5px' }}>Jam Booking</span>
                        <span style={{ fontWeight: '500', color: 'var(--text-main)', fontSize: '14px' }}>{custSelectedTime} WIB</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '13.5px' }}>Treatment Dipilih</span>
                        <span style={{ fontWeight: '500', color: 'var(--text-main)', fontSize: '14px', background: 'rgba(224,111,160,0.06)', padding: '10px 14px', borderRadius: '10px' }}>
                          {custTreatment}
                        </span>
                      </div>
                      {custNotes && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '13.5px' }}>Catatan Tambahan</span>
                          <span style={{ fontWeight: '500', color: 'var(--text-main)', fontSize: '14px', background: '#f8f9fa', padding: '10px 14px', borderRadius: '10px' }}>
                            {custNotes}
                          </span>
                        </div>
                      )}
                      
                      <div style={{ marginTop: '8px', padding: '14px 16px', background: '#fffdf9', borderRadius: '12px', fontSize: '12.5px', color: '#887d71', lineHeight: '1.6', border: '1px solid #f2e9d8' }}>
                        🕒 Mohon datang tepat waktu sesuai jadwal ya, Kak. Jika terlambat lebih dari 15 menit tanpa konfirmasi, jadwal dapat dialihkan agar tidak mengganggu antrean lainnya.
                      </div>
                    </div>

                    <div style={{ padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <a
                        href={`https://wa.me/6285724300213?text=${encodeURIComponent(`Halo Admin Glam Studio! ✨\nSaya ingin konfirmasi booking saya:\n\n👤 Nama: ${custName}\n📱 No. WhatsApp: ${custPhone}\n📅 Tanggal: ${custSelectedDate}\n⏰ Jam: ${custSelectedTime} WIB\n💖 Treatment: ${custTreatment}${custNotes ? ' | ' + custNotes : ''}\n\nMohon bantuannya untuk diproses ya. Terima kasih! 🌸`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center', borderRadius: '10px', padding: '14px', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', boxShadow: '0 4px 14px rgba(224,111,160,0.3)' }}
                      >
                        <MessageCircle size={18} /> Kirim Konfirmasi ke WhatsApp
                      </a>
                      <button 
                        type="button"
                        className="btn btn-secondary" 
                        style={{ width: '100%', justifyContent: 'center', borderRadius: '10px', padding: '14px', fontSize: '14px', fontWeight: '500', background: '#f8f9fa', border: 'none', color: 'var(--text-main)' }}
                        onClick={handleResetBookingForm}
                      >
                        Buat Booking Baru
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Footer */}
              {bookingStep < 3 && (
                <div className="wizard-nav">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      if (bookingStep === 1) {
                        window.location.hash = '#/';
                      } else {
                        setBookingStep(bookingStep - 1);
                      }
                    }}
                  >
                    <ArrowLeft size={16} /> Kembali
                  </button>

                  {bookingStep < 2 ? (
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      disabled={!custSelectedTime}
                      onClick={() => setBookingStep(bookingStep + 1)}
                    >
                      Lanjut <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={handleBookingSubmit}
                    >
                      Konfirmasi Booking <Check size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 3. Admin / Cashier Dashboard Route
  if (currentRoute === '#/admin') {
    return (
      <div className="app-container">
        {toast && <div className="toast">{toast}</div>}

        {/* Real-time Slide-in booking notification popup */}
        {activeNotificationPopup && (
          <div className="admin-notification-popup">
            <div className="popup-header">
              <span className="popup-title">
                <Bell size={18} color="#e5b3a6" style={{ animation: 'swing 1s infinite' }} />
                <span>Ada Booking Baru Masuk!</span>
              </span>
              <button 
                className="popup-close" 
                onClick={() => setActiveNotificationPopup(null)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="popup-body">
              <p>{activeNotificationPopup.message}</p>
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '4px 12px', fontSize: '11px', borderRadius: '4px' }}
                  onClick={() => {
                    setActiveNotificationPopup(null);
                    setPosTab('queue');
                  }}
                >
                  Lihat Antrean
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="main-header">
          <div className="logo-container">
            <Scissors size={24} color="#e5b3a6" style={{ transform: 'rotate(-45deg)' }} />
            <span className="logo-text">Glam Studios</span>
            <span className="logo-badge">Staff & Jadwal</span>
          </div>

          <div className="header-controls">
            {/* Notification Bell Hub */}
            <div className="notification-bell-container">
              <button 
                className="bell-btn"
                onClick={() => {
                  setShowNotificationDropdown(!showNotificationDropdown);
                  setUnreadNotifications(0); // clear badge count on click
                }}
              >
                <Bell size={20} />
                {unreadNotifications > 0 && (
                  <span className="bell-badge">{unreadNotifications}</span>
                )}
              </button>

              {showNotificationDropdown && (
                <div className="notification-dropdown">
                  <div className="notification-dropdown-header">
                    <span>Notifikasi Masuk ({adminNotifications.length})</span>
                    <button 
                      className="clear-btn"
                      onClick={async () => {
                        for (const n of adminNotifications) {
                          await deleteNotification({ id: n.id as any });
                        }
                        setShowNotificationDropdown(false);
                      }}
                    >
                      Hapus Semua
                    </button>
                  </div>
                  <div className="notification-list">
                    {adminNotifications.length === 0 ? (
                      <div style={{ padding: '16px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                        Belum ada notifikasi reservasi.
                      </div>
                    ) : (
                      adminNotifications.map((n, index) => (
                        <div key={n.id} className="notification-item fade-in-up" onClick={() => {
                          setShowNotificationDropdown(false);
                          setPosTab('queue');
                        }} style={{ animationDelay: `${index * 0.03}s` }}>
                          <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <UserCheck size={12} color="var(--primary-hover)" /> {n.title}
                          </div>
                          <div style={{ marginTop: '2px', color: 'var(--text-main)' }}>{n.message}</div>
                          <div className="notification-item-time">{n.time}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="user-status-pill">
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 0 2px rgba(16,185,129,0.2)' }}></span>
              {adminProfile ? `${adminProfile.name} (${adminProfile.role === 'owner' ? 'Admin' : 'Staff'})` : 'Rani (Admin)'}
            </div>

            {isAdminLoggedIn && (
              <button
                className="btn btn-secondary logout-btn"
                onClick={async () => {
                  if (!window.confirm("Apakah Anda yakin ingin logout?")) return;
                  try {
                    localStorage.removeItem('glam_admin_loggedIn');
                    setIsAdminLoggedIn(false);
                    setAdminProfile(null);
                  } catch (err) { console.error(err); }
                  window.location.hash = '#/admin';
                }}
              >
                Logout
              </button>
            )}
          </div>
        </header>


        <main className="pos-portal fade-in">
          {/* Admin Sidebar */}
          <div className="pos-sidebar">
            <button 
              className={`pos-menu-item ${posTab === 'therapists' ? 'active' : ''}`}
              onClick={() => setPosTab('therapists')}
            >
              <UserCheck size={18} /> {adminProfile?.role === 'owner' ? 'Terapis & Jadwal' : 'Jadwal Terapis'}
            </button>

            <button 
              className={`pos-menu-item ${posTab === 'queue' ? 'active' : ''}`}
              onClick={() => setPosTab('queue')}
            >
              <Calendar size={18} /> Antrean Booking
            </button>
            
            {adminProfile?.role === 'owner' && (
              <>
                <button 
                  className={`pos-menu-item ${posTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setPosTab('settings')}
                >
                  <Clock size={18} /> Pengaturan Jam
                </button>
                <button 
                  className={`pos-menu-item ${posTab === 'recap' ? 'active' : ''}`}
                  onClick={() => setPosTab('recap')}
                >
                  <BarChart3 size={18} /> Rekap Data
                </button>
              </>
            )}
          </div>

          {/* POS Main Content Space */}
          <div className="pos-main-content">
            
            {/* TAB 1: QUEUE LIST */}
            {posTab === 'queue' && (
              <div>
                <div className="metrics-row">
                  <div className="metric-card fade-in-up" style={{ animationDelay: '0s' }}>
                    <div className="metric-icon-box">
                      <DollarSign size={24} />
                    </div>
                    <div>
                      <span className="metric-label">Omzet Hari Ini</span>
                      <div className="metric-val">{formatPrice(todayRevenue)}</div>
                    </div>
                  </div>

                  <div className="metric-card fade-in-up" style={{ animationDelay: '0.05s' }}>
                    <div className="metric-icon-box">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <span className="metric-label">Total Booking</span>
                      <div className="metric-val">{totalBookingsCount}</div>
                    </div>
                  </div>

                  <div className="metric-card fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="metric-icon-box">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <span className="metric-label">Lunas Selesai</span>
                      <div className="metric-val">{completedBookingsCount}</div>
                    </div>
                  </div>

                  <div className="metric-card fade-in-up" style={{ animationDelay: '0.15s' }}>
                    <div className="metric-icon-box">
                      <Clock size={24} />
                    </div>
                    <div>
                      <span className="metric-label">Menunggu Checkout</span>
                      <div className="metric-val">{pendingBookingsCount}</div>
                    </div>
                  </div>
                </div>

                <div className="panel-card">
                  <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 className="panel-title">Daftar Antrean Reservasi</h3>
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Sinkronisasi Otomatis</span>
                    </div>
                    <div>
                      <input 
                        type="date" 
                        value={queueDate} 
                        onChange={(e) => setQueueDate(e.target.value)}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                      />
                    </div>
                  </div>
                  
                  <div className="table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>Kode Booking</th>
                          <th>Nama Pelanggan</th>
                          <th>Tanggal / Waktu</th>
                          <th>Status</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.filter(b => b.bookingDate === queueDate).length === 0 ? (
                          <tr>
                            <td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                              Tidak ada antrean booking untuk tanggal ini.
                            </td>
                          </tr>
                        ) : bookings.filter(b => b.bookingDate === queueDate).map((b, index) => (
                          <tr key={b.id} className="fade-in-up" style={{ animationDelay: `${index * 0.04}s` }}>
                            <td><strong>{b.bookingCode}</strong></td>
                            <td>
                              <div>{b.customerName}</div>
                            </td>
                            <td>
                              <div style={{ fontSize: '13px' }}>{b.bookingDate}</div>
                              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{b.startTime} - {b.endTime}</div>
                            </td>
                            <td>
                              <span className={`badge badge-${b.status.toLowerCase()}`}>
                                {b.status}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {(b.status === 'PENDING' || b.status === 'CONFIRMED') && (
                                  <a
                                    href={`https://wa.me/${(() => { let p = (b.customerPhone || '').replace(/[^0-9]/g, ''); if (p.startsWith('0')) p = '62' + p.slice(1); return p; })()}?text=${encodeURIComponent(`Halo Kak ${b.customerName}! 💕\n\nIni pengingat jadwal booking Kakak di Glam Studio ya:\n\n📅 Tanggal: ${b.bookingDate}\n⏰ Waktu: ${b.startTime}\n💖 Treatment: ${b.notes || '-'}\n\nMohon hadir tepat waktu ya Kak. Sampai jumpa! ✨`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary"
                                    style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '6px', color: '#059669', borderColor: '#059669', background: 'transparent', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                                  >
                                    <MessageCircle size={13} /> WA Reminder
                                  </a>
                                )}
                                
                                {adminProfile?.role === 'owner' ? (
                                  <>
                                    {b.status === 'PENDING' || b.status === 'CONFIRMED' ? (
                                      <button 
                                        type="button" 
                                        className="btn btn-primary"
                                        style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '6px' }}
                                        onClick={() => markBookingComplete(b)}
                                      >
                                        Selesai <Check size={13} />
                                      </button>
                                    ) : b.status === 'COMPLETED' ? (
                                      <span style={{ color: '#28a745', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                        <Check size={14} /> Selesai
                                      </span>
                                    ) : null}

                                    {(b.status === 'PENDING' || b.status === 'CONFIRMED') && (
                                      <button
                                        className="btn btn-secondary"
                                        style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '6px', color: '#dc3545', borderColor: '#dc3545', background: 'transparent' }}
                                        onClick={() => {
                                          if (window.confirm('Yakin batalkan booking ini?')) {
                                            updateBookingStatus({ id: b.id as any, status: 'CANCELLED' });
                                          }
                                        }}
                                      >
                                        Batal <X size={13} />
                                      </button>
                                    )}
                                  </>
                                ) : (
                                  b.status === 'COMPLETED' ? (
                                    <span style={{ color: '#28a745', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                      <Check size={14} /> Selesai
                                    </span>
                                  ) : (
                                    <span style={{ color: 'var(--text-muted)' }}>-</span>
                                  )
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SETTINGS (PENGATURAN JAM) */}
            {posTab === 'settings' && (
              <div className="fade-in">
                <div className="panel-card" style={{ maxWidth: '600px' }}>
                  <div className="panel-header">
                    <h3 className="panel-title">Pengaturan Jam Reservasi Tersedia</h3>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <p style={{ fontSize: '14px', marginBottom: '16px' }}>Tambahkan atau hapus slot jam yang bisa dipilih oleh pelanggan pada form booking.</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                      {availableTimes.map((time, idx) => (
                        <div key={idx} style={{ background: 'var(--primary-light)', padding: '6px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 'bold' }}>
                          {time}
                          <button 
                            style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                            onClick={() => {
                              const newTimes = availableTimes.filter(t => t !== time);
                              updateScheduleSettings({ availableTimes: newTimes, stylistAvailability });
                              showToast(`Jam ${time} dihapus!`);
                            }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      {availableTimes.length === 0 && (
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Tidak ada jam yang aktif. Pelanggan tidak bisa booking.</span>
                      )}
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const input = form.elements.namedItem('newTime') as HTMLInputElement;
                      const newTime = input.value;
                      if (newTime && !availableTimes.includes(newTime)) {
                        const newTimes = [...availableTimes, newTime].sort();
                        updateScheduleSettings({ availableTimes: newTimes, stylistAvailability });
                        input.value = '';
                        showToast(`Jam ${newTime} berhasil ditambahkan!`);
                      }
                    }} style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="time" 
                        name="newTime" 
                        required 
                        style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                      />
                      <button type="submit" className="btn btn-primary">Tambah Jam <Plus size={16} /></button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: REKAP DATA (LAPORAN) */}
            {posTab === 'recap' && adminProfile?.role === 'owner' && (
              <div className="fade-in">
                <div className="panel-card">
                  <div className="panel-header">
                    <h3 className="panel-title"><BarChart3 size={20} /> Rekap Data & Laporan</h3>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                      <div style={{ flex: 1, background: 'var(--primary-light)', padding: '20px', borderRadius: '12px', color: 'var(--primary-hover)', textAlign: 'center' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Total Pendapatan Terselesaikan</div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px' }}>{formatPrice(todayRevenue)}</div>
                        <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>Dari {completedBookingsCount} transaksi lunas/selesai</div>
                      </div>
                    </div>
                    
                    {/* CHART AREA */}
                    <h4 style={{ color: 'var(--text-main)', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Trend Omzet (Terakhir)</h4>
                    <div style={{ width: '100%', height: '300px', marginBottom: '40px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={(() => {
                            // Hitung 7 hari terakhir
                            const data = [];
                            for (let i = 6; i >= 0; i--) {
                              const d = new Date();
                              d.setDate(d.getDate() - i);
                              const dateStr = d.toLocaleString('en-CA', { timeZone: 'Asia/Jakarta' }).split(',')[0]; // YYYY-MM-DD
                              const dailyTotal = bookings
                                .filter(b => b.bookingDate === dateStr && b.status === 'COMPLETED')
                                .reduce((sum, b) => sum + b.totalAmount, 0);
                              
                              data.push({
                                name: dateStr.split('-').slice(1).join('/'), // Tampilkan MM/DD
                                omzet: dailyTotal
                              });
                            }
                            return data;
                          })()}
                          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                          <YAxis 
                            tick={{ fontSize: 12 }} 
                            axisLine={false} 
                            tickLine={false} 
                            tickFormatter={(val) => `Rp${(val/1000)}k`} 
                          />
                          <Tooltip 
                            formatter={(value) => [formatPrice(value as number), 'Omzet']} 
                            cursor={{ fill: 'rgba(224, 111, 160, 0.05)' }} 
                          />
                          <Bar dataKey="omzet" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <h4 style={{ color: 'var(--text-main)', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Performa Terapis</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>Terapis</th>
                          <th style={{ textAlign: 'center' }}>Booking Selesai</th>
                          <th style={{ textAlign: 'right', paddingRight: '24px' }}>Pendapatan Terapis</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const completedBookings = bookings.filter(b => b.status === 'COMPLETED');
                          const totalEarned = completedBookings.reduce((sum, b) => sum + b.totalAmount, 0);
                          return (
                            <tr>
                              <td><strong>Glam Studios</strong></td>
                              <td style={{ textAlign: 'center' }}>{completedBookings.length}</td>
                              <td style={{ textAlign: 'right', paddingRight: '24px' }}>{formatPrice(totalEarned)}</td>
                            </tr>
                          );
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}


            {/* TAB: THERAPISTS (MANAJEMEN Staff & Staff Availability) */}
            {posTab === 'therapists' && (
              <div className="fade-in">
                <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
                  'Pengaturan Kesiapan Jadwal'
                </h2>
                <p style={{ fontSize: '14px', marginBottom: '24px' }}>
                  'Kelola kesiapan (Ready/Off) jadwal studio untuk masing-masing slot waktu.'
                </p>

                <div className={`pos-grid-layout $'single-column'`}>
                  
                  {/* Removed Left Column (Daftar Nail Artist) for Single Employee Model */}

                  {/* Right Column: Availability Grid */}
                  <div className="panel-card">
                    <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 className="panel-title">Kesiapan Terapis per Slot Waktu</h3>
                      <input
                        type="date"
                        value={custSelectedDate}
                        onChange={(e) => setCustSelectedDate(e.target.value)}
                        style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '13px' }}
                      />
                    </div>
                    <div style={{ padding: '16px' }}>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                        Pilih tanggal di atas, lalu klik status (Ready/Off) untuk mengubah kesiapan terapis pada jam tertentu.
                      </p>
                      
                      <div className="table-responsive">
                        <table className="schedule-grid-table">
                          <thead>
                            <tr>
                              <th>Jam Slot</th>
                              <th style={{ width: '150px' }}>Kesiapan</th>
                            </tr>
                          </thead>
                          <tbody>
                            {availableTimes.map(time => (
                              <tr key={time}>
                                <td><strong>{time}</strong></td>
                                                                {(() => {
                                  const key = `studio_${custSelectedDate}_${time}`;
                                  const isOff = stylistAvailability[key] === false;
                                  const isBooked = bookings.some(b => b.bookingDate === custSelectedDate && b.startTime === time && b.status !== 'CANCELLED' && b.status !== 'NO_SHOW');

                                  return (
                                    <td>
                                      {isBooked ? (
                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                                          Busy (Dipesan)
                                        </span>
                                      ) : (
                                        <div className="schedule-toggle-wrapper">
                                          <button
                                            type="button"
                                            className={`schedule-toggle-btn ${isOff ? 'off' : 'ready'}`}
                                            onClick={() => {
                                              const wasOff = stylistAvailability[key] === false;
                                              const willBeReady = wasOff;
                                              const newAvail = { ...stylistAvailability, [key]: willBeReady ? true : false };
                                              updateScheduleSettings({ availableTimes, stylistAvailability: newAvail });
                                              showToast(`Jadwal di jam ${time} diubah menjadi ${willBeReady ? 'Ready' : 'Off / Libur'}!`);
                                            }}
                                            aria-label={isOff ? 'Off / Libur' : 'Ready'}
                                          />
                                          <span className={`schedule-toggle-label ${isOff ? 'off' : 'ready'}`}>
                                            {isOff ? 'Off' : 'Ready'}
                                          </span>
                                        </div>
                                      )}
                                    </td>
                                  );
                                })()}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    );
  }

  return null;
}

export default App;
