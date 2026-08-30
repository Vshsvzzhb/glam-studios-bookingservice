import { useState, useEffect } from 'react';
import { 
  
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
  BarChart3,
  Users,
  UserPlus,
  Trash2,
  Star
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';
import './premium-animations.css';
import SocialCards from './components/ui/card-fan-carousel';
import Catalog from './components/Catalog';
import { CATALOG_SERVICES } from './data/catalogData';
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
  { imgUrl: crop1, alt: 'Hasil Karya Glam Studio 1' },
  { imgUrl: crop2, alt: 'Hasil Karya Glam Studio 2' },
  { imgUrl: crop3, alt: 'Hasil Karya Glam Studio 3' },
  { imgUrl: crop4, alt: 'Hasil Karya Glam Studio 4' },
  { imgUrl: crop5, alt: 'Hasil Karya Glam Studio 5' },
  { imgUrl: crop6, alt: 'Hasil Karya Glam Studio 6' },
  { imgUrl: crop7, alt: 'Hasil Karya Glam Studio 7' },
  { imgUrl: crop8, alt: 'Hasil Karya Glam Studio 8' },
  { imgUrl: crop9, alt: 'Hasil Karya Glam Studio 9' },
  { imgUrl: crop10, alt: 'Hasil Karya Glam Studio 10' },
  { imgUrl: crop11, alt: 'Hasil Karya Glam Studio 11' },
  { imgUrl: crop12, alt: 'Hasil Karya Glam Studio 12' },
  { imgUrl: crop13, alt: 'Hasil Karya Glam Studio 13' },
];

const DEFAULT_REVIEWS = [
  {
    _id: 'def-1',
    customerName: 'Sarah Amalia',
    treatment: 'Paket All-In-One Promo 150K',
    rating: 5,
    review: 'Pengerjaannya sangat teliti dan detail! Kuku palsunya pas banget dan cat gel glossy-nya awet berminggu-minggu tanpa chipping.',
    createdAt: '2026-08-28T10:00:00.000Z'
  },
  {
    _id: 'def-2',
    customerName: 'Nabila Putri',
    treatment: 'Lashes YY Premium',
    rating: 5,
    review: 'Bulu matanya ringan banget, nggak perih di mata, dan hasilnya bervolume natural. Terapisnya ramah dan studionya super bersih!',
    createdAt: '2026-08-25T14:30:00.000Z'
  },
  {
    _id: 'def-3',
    customerName: 'Dinda Maharani',
    treatment: 'Massage & Lulur Badan Signature',
    rating: 5,
    review: 'Badan langsung enteng dan kulit jadi halus banget setelah luluran. Suasana studionya tenang dan nyaman untuk relaksasi.',
    createdAt: '2026-08-22T16:00:00.000Z'
  },
  {
    _id: 'def-4',
    customerName: 'Clarissa Valerie',
    treatment: 'Brow Bomber Signature',
    rating: 5,
    review: 'Bentuk alis jadi jauh lebih berdimensi dan rapi alami, nggak perlu ribet ngalis lagi setiap pagi. Rekomen banget!',
    createdAt: '2026-08-20T11:15:00.000Z'
  }
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
const ADMIN_WA_NUMBER = '6285759929830';

// Initial Mock Data
const INITIAL_SERVICES: Service[] = [
  { id: 'srv-1', categoryId: 'cat-1', categoryName: 'Manicure & Spa', name: 'Classic Rose Manicure', description: 'Perawatan kuku klasik dengan rendaman mawar hangat, scrubbing, dan perapian kutikula.', price: 120000, duration: 45 },
  { id: 'srv-2', categoryId: 'cat-1', categoryName: 'Manicure', name: 'Premium Milk Mani', description: 'Perawatan kuku bernutrisi tinggi dengan masker susu madu hangat untuk melembutkan tangan.', price: 180000, duration: 60 },
  { id: 'srv-3', categoryId: 'cat-2', categoryName: 'Pedicure', name: 'Classic Pedicure', description: 'Pembersihan kuku kaki, perataan kapalan, scrub garam laut, pijat relaksasi.', price: 150000, duration: 60 },
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
    services: [INITIAL_SERVICES[2]], // Classic Pedicure
    totalAmount: 150000,
    notes: 'Datang bersama teman.',
    status: 'PENDING',
    createdAt: '2026-06-13T08:00:00Z'
  }
];



const getJakartaDateStr = (d = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(d);
  const year = parts.find(p => p.type === 'year')?.value || '2026';
  const month = parts.find(p => p.type === 'month')?.value || '01';
  const day = parts.find(p => p.type === 'day')?.value || '01';
  return `${year}-${month}-${day}`;
};

function App() {
  // Simple Pathname Router State
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.hash || '#/');
  const [posTab, setPosTab] = useState<'queue' | 'settings' | 'therapists' | 'recap' | 'users'>('queue');
  const [queueDate, setQueueDate] = useState<string>(getJakartaDateStr());
  
  // Database States (from Convex)
  const dbSettings = useQuery(api.settings.getScheduleSettings);
  const availableTimes = dbSettings?.availableTimes || ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  const stylistAvailability = dbSettings?.stylistAvailability || {};


  const dbBookings = useQuery(api.bookings.getBookings);
  const bookings = dbBookings ? dbBookings.map((b: any) => ({ ...b, id: b._id })) : INITIAL_BOOKINGS;
  
  const dbNotifs = useQuery(api.notifications.getNotifications);
  const dbUsers = useQuery(api.users.getUsers);

  const adminNotifications = dbNotifs ? dbNotifs.map((n: any) => ({ ...n, id: n._id })) : [];
  const adminUsers = dbUsers || [];

  const addUser = useMutation(api.users.addUser);
  const deleteUser = useMutation(api.users.deleteUser);

  const [newUserForm, setNewUserForm] = useState({ username: '', password: '', name: '', role: 'kasir' });

  // Convex Mutations
  const addBooking = useMutation(api.bookings.addBooking);
  const updateBookingStatus = useMutation(api.bookings.updateBookingStatus);
  const addNotification = useMutation(api.notifications.addNotification);
  const deleteNotification = useMutation(api.notifications.deleteNotification);
  const updateScheduleSettings = useMutation(api.settings.updateScheduleSettings);
  const verifyLogin = useMutation(api.auth.login);
  const dbReviews = useQuery(api.reviews.getReviews);
  const addReviewMutation = useMutation(api.reviews.addReview);

  // Admin Authentication (Local mock instead of Firebase)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminProfile, setAdminProfile] = useState<{name: string, role: string} | null>(null);

  // Check login state from localStorage
  useEffect(() => {
    const localLogin = localStorage.getItem('glam_admin_loggedIn');
    const localRole = localStorage.getItem('glam_admin_role') || 'owner';
    if (localLogin === 'true') {
      setIsAdminLoggedIn(true);
      setAdminProfile({ name: localRole === 'owner' ? 'Admin' : 'Kasir', role: localRole as 'owner' | 'kasir' });
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
  const [bookingCategoryFilter, setBookingCategoryFilter] = useState<'all' | 'eyelash' | 'nail' | 'massage' | 'brow'>('all');
  const [custSelectedDate, setCustSelectedDate] = useState<string>(
    getJakartaDateStr()
  );
  const [custSelectedTime, setCustSelectedTime] = useState<string>('');
  const [custName, setCustName] = useState<string>('');
  const [custPhone, setCustPhone] = useState<string>('');
  const [custEmail, setCustEmail] = useState<string>('');
  const [custNotes, setCustNotes] = useState<string>('');
  const [custTreatment, setCustTreatment] = useState<string>('Paket All-In-One Promo Spesial');
  const [custServicePrice, setCustServicePrice] = useState<number>(150000);
  const [isCustomTreatment, setIsCustomTreatment] = useState<boolean>(false);
  const [customTreatmentInput, setCustomTreatmentInput] = useState<string>('');
  
  // States for Landing Page Reviews & Popups
  const [selectedServicePopup, setSelectedServicePopup] = useState<any | null>(null);
  const [showSurvey, setShowSurvey] = useState<boolean>(false);
  const [surveyName, setSurveyName] = useState<string>('');
  const [surveyTreatment, setSurveyTreatment] = useState<string>('Paket All-In-One Promo 150K');
  const [surveyRating, setSurveyRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [surveyReview, setSurveyReview] = useState<string>('');
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);
  const [logoClicks, setLogoClicks] = useState<number>(0);

  // Dynamic reviews combining database with defaults
  const displayedReviews = dbReviews && dbReviews.length > 0 ? dbReviews : DEFAULT_REVIEWS;

  // Handle Review Submission to Convex
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!surveyName.trim()) {
      showToast('Harap masukkan nama Anda!');
      return;
    }
    if (!surveyReview.trim()) {
      showToast('Harap tuliskan ulasan Anda!');
      return;
    }
    try {
      setIsSubmittingReview(true);
      await addReviewMutation({
        customerName: surveyName.trim(),
        treatment: surveyTreatment,
        rating: surveyRating,
        review: surveyReview.trim(),
      });
      setShowSurvey(false);
      setSurveyName('');
      setSurveyReview('');
      setSurveyRating(5);
      showToast('Terima kasih! Ulasan Anda telah berhasil diterbitkan.');
    } catch (err) {
      console.error(err);
      showToast('Gagal mengirim ulasan. Silakan coba lagi.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Hidden admin login trigger
  useEffect(() => {
    if (logoClicks >= 3) {
      window.location.hash = '#/admin';
      setLogoClicks(0);
    }
    
    // Reset clicks after 2 seconds to require fast clicking
    if (logoClicks > 0) {
      const timer = setTimeout(() => setLogoClicks(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [logoClicks]);


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

    // Double check slot capacity
    const existingBookings = bookings.filter(b => 
      b.bookingDate === custSelectedDate && 
      b.startTime === custSelectedTime && 
      b.status !== 'CANCELLED' && b.status !== 'NO_SHOW'
    );
    if (existingBookings.length >= 2) {
      showToast('Maaf, slot waktu ini baru saja penuh! Silakan pilih jam atau tanggal lain.');
      setBookingStep(2);
      setCustSelectedTime('');
      return;
    }

    const bCode = generateBookingCode();
    const endTime = getEndTimeStr(custSelectedTime, 60); // default 1 hour
    const combinedNotes = `Treatment: ${custTreatment}${custServicePrice ? ` (${formatPrice(custServicePrice)})` : ''}${custNotes ? ' | Catatan: ' + custNotes : ''}`;

    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      bookingCode: bCode,
      customerName: custName,
      customerPhone: custPhone || '-',
      customerEmail: custEmail || 'guest@glamstudios.com',
      stylistId: 'sty-studio',
      stylistName: 'Glam Studio',
      bookingDate: custSelectedDate,
      startTime: custSelectedTime,
      endTime: endTime,
      services: [],
      totalAmount: custServicePrice || 0,
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
      message: `${newBooking.customerName} membuat booking (${custTreatment}) pada ${dateFormatted} jam ${newBooking.startTime}`,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':'),
      bookingCode: newBooking.bookingCode,
      createdAt: new Date().toISOString()
    };
    addNotification(newNotif);

    setBookingStep(4); // Show success WA screen

    // Kirim pesan WA otomatis ke Admin di background
    sendWhatsAppBackgroundNotification(newBooking);

    showToast(`Booking Reservasi Berhasil! Kode: ${bCode}`);
  };

  // Reset booking portal form
  const handleResetBookingForm = () => {
    setBookingStep(1);
    setCustSelectedTime('');
    setCustName('');
    setCustPhone('');
    setCustEmail('');
    setCustNotes('');
    setCustTreatment('Paket All-In-One Promo Spesial');
    setCustServicePrice(150000);
    setIsCustomTreatment(false);
    setCustomTreatmentInput('');
  };

  // Kirim WA Otomatis di background via Fonnte Gateway atau fallback wa.me
  const sendWhatsAppBackgroundNotification = (booking: Booking) => {
    const textMessage = `Halo Admin Glam Studio! \uD83D\uDC85\n\nAda booking baru masuk:\n\n\uD83D\uDC64 Nama: ${booking.customerName}\n\uD83D\uDCF1 No. WhatsApp: ${booking.customerPhone}\n\uD83D\uDCC5 Tanggal: ${booking.bookingDate}\n\u23F0 Jam: ${booking.startTime} WIB\n\uD83D\uDC96 Treatment: ${booking.notes}\n\nTolong dikonfirmasi ya! \uD83C\uDF38`;

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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/favicon.png" alt="Glam Studio" style={{ height: '72px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} />
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
          <div className="landing-logo" onClick={() => setLogoClicks(prev => prev + 1)} style={{ cursor: 'pointer', userSelect: 'none' }}>
            <img src="/favicon.png" alt="Glam Studio" style={{ height: '56px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply', transform: 'scale(1.2)' }} />
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: '700', marginLeft: '12px', background: 'linear-gradient(135deg, #c4558a 0%, #e06fa0 60%, #f0b8d0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Glam Studio</span>
            <span className="logo-pill" style={{ marginLeft: '12px' }}>Premium</span>
          </div>
          <nav className="landing-nav">
            <a href="#catalog-section" style={{ fontWeight: '500', color: 'var(--text-main)', textDecoration: 'none' }}>Pricelist</a>
            <a href="#gallery-section" style={{ fontWeight: '500', color: 'var(--text-main)', textDecoration: 'none', marginLeft: '16px' }}>Karya</a>
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
                <a href="#gallery-section" className="hero-btn-gallery" onClick={(e) => { e.preventDefault(); document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  Lihat Karya Kami
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ── MARQUEE TICKER ── */}
        <div className="marquee-strip">
          <div className="marquee-track">
            {['Nail Art Korea ✦','Gel Polish Premium ✦','Acrylic Extension ✦','Basic Manicure ✦','Pedicure Detox ✦','Eyelash Extension ✦','3D Jewel Art ✦','Classic Manicure ✦'].map((item, i) => (
              <span key={i} className="marquee-item">{item}</span>
            ))}
            {['Nail Art Korea ✦','Gel Polish Premium ✦','Acrylic Extension ✦','Basic Manicure ✦','Pedicure Detox ✦','Eyelash Extension ✦','3D Jewel Art ✦','Classic Manicure ✦'].map((item, i) => (
              <span key={`dup-${i}`} className="marquee-item">{item}</span>
            ))}
          </div>
        </div>

        {/* ── PORTFOLIO GALLERY ── */}
        <section id="gallery-section" className="gallery-section">
          <div className="landing-section-header">
            <div className="section-label-tag">Our Portfolio</div>
            <h2>Hasil Karya Kami</h2>
            <p>Portofolio Nail Art &amp; Eyelash Extension terbaik dari terapis Glam Studio</p>
          </div>
          <SocialCards cards={DEMO_CARDS} />
        </section>

        {/* ── CATALOG / PRICELIST ── */}
        <Catalog onSelectService={(name, price) => {
          setCustTreatment(name);
          if (price) setCustServicePrice(price);
          setBookingStep(2);
          window.location.hash = '#/booking';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />

        {/* ── WHY CHOOSE US ── */}
        <section id="why-us-section" className="landing-benefits">
          <div className="landing-section-header animate-on-scroll">
            <div className="section-label-tag">Why Us</div>
            <h2>Kenapa Memilih Glam Studio?</h2>
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

        {/* ── TESTIMONIALS / ULASAN PELANGGAN ── */}
        <section id="reviews-section" className="landing-testimonials animate-on-scroll">
          <div className="landing-section-header">
            <div className="section-label-tag">Customer Reviews</div>
            <h2>Ulasan Pelanggan Setia</h2>
            <p>Pengalaman nyata dan kepuasan hasil perawatan di Glam Studio</p>
            <div style={{ marginTop: '16px' }}>
              <button
                type="button"
                className="btn btn-outline"
                style={{ borderRadius: '25px', padding: '8px 22px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                onClick={() => setShowSurvey(true)}
              >
                <Star size={15} fill="#c8715f" color="#c8715f" /> Beri Ulasan Anda
              </button>
            </div>
          </div>

          <div className="testimonials-grid">
            {displayedReviews.map((rev: any, idx: number) => (
              <div key={rev._id || idx} className={`testi-card animate-on-scroll stagger-${(idx % 3) + 1}`}>
                <div className="testi-stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star 
                      key={s} 
                      size={16} 
                      fill={s <= rev.rating ? "#e5987d" : "transparent"} 
                      color={s <= rev.rating ? "#c8715f" : "#d8c8c2"} 
                    />
                  ))}
                </div>
                <p className="testi-text">
                  "{rev.review}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', borderTop: '1px solid rgba(224, 111, 160, 0.12)', paddingTop: '16px' }}>
                  <div>
                    <div className="testi-author">{rev.customerName}</div>
                    {rev.treatment && (
                      <div style={{ fontSize: '11px', color: '#8a7a70', marginTop: '2px', textTransform: 'none', fontWeight: '500' }}>
                        {rev.treatment}
                      </div>
                    )}
                  </div>
                  {rev.createdAt && (
                    <span style={{ fontSize: '11px', color: '#a09ba8' }}>
                      {new Date(rev.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>
            ))}
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
          <div className="landing-section-header">
            <div className="section-label-tag">Kunjungi Kami</div>
            <h2>Lokasi Glam Studio</h2>
            <p>Kunjungi studio kami di lokasi berikut</p>
          </div>
          <div className="map-container">
            <div style={{ textAlign: 'center', marginBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} /> Glam Studio Cianjur
              </div>
              <a 
                href="https://maps.app.goo.gl/1i89XZkSekFwNzKk7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ fontSize: '12px', padding: '6px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <MapPin size={14} /> Buka di Google Maps
              </a>
            </div>
            <iframe
              title="Glam Studio Location"
              src="https://maps.google.com/maps?q=-6.8284199,107.1322826&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
              <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src="/favicon.png" alt="Glam Studio" style={{ height: '56px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply', transform: 'scale(1.1)' }} />
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: '700', color: '#e5b3a6' }}>Glam Studio</span>
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
                <a href="https://wa.me/6285759929830" target="_blank" rel="noopener noreferrer" style={{ color: '#a09ba8', textDecoration: 'none' }}>+62 857 5992 9830</a>
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
                <a href="https://wa.me/6285759929830" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp"><MessageCircle size={20} /></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Glam Studio. All rights reserved.</p>
          </div>
        </footer>

        {/* Floating Review / Rating Button */}
        <button 
          className="floating-survey-btn"
          onClick={() => setShowSurvey(true)}
          style={{ 
            position: 'fixed', 
            bottom: '24px', 
            left: '24px', 
            background: 'linear-gradient(135deg, #c8715f 0%, #e06fa0 100%)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '30px', 
            padding: '12px 20px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            boxShadow: '0 8px 24px rgba(200, 113, 95, 0.35)', 
            cursor: 'pointer', 
            zIndex: 90, 
            fontWeight: '600',
            fontSize: '13.5px',
            letterSpacing: '0.3px',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <Star size={16} fill="white" color="white" /> Beri Nilai Kami
        </button>

        {/* Modals */}
        {selectedServicePopup && (
          <div className="modal-overlay" onClick={() => setSelectedServicePopup(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'white', padding: '32px', borderRadius: '24px', width: '90%', maxWidth: '400px', textAlign: 'center' }}>
              <h2 style={{ marginBottom: '12px' }}>{selectedServicePopup.name}</h2>
              <p style={{ color: '#666', marginBottom: '20px', fontSize: '15px' }}>{selectedServicePopup.desc}</p>
              <div className="price-tag" style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '32px' }}>{selectedServicePopup.price}</div>
              <button className="btn btn-primary" style={{ width: '100%', marginBottom: '12px' }} onClick={() => { setSelectedServicePopup(null); window.location.hash = '#/booking'; }}>Booking Sekarang</button>
              <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => setSelectedServicePopup(null)}>Tutup</button>
            </div>
          </div>
        )}

        {/* ── LUXURY CUSTOMER REVIEW MODAL ── */}
        {showSurvey && (
          <div className="modal-overlay" onClick={() => !isSubmittingReview && setShowSurvey(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 8, 12, 0.65)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div className="modal-content fade-in" onClick={e => e.stopPropagation()} style={{ background: '#ffffff', padding: '32px 28px', borderRadius: '24px', width: '100%', maxWidth: '460px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', border: '1px solid rgba(224, 111, 160, 0.2)', position: 'relative' }}>
              <button 
                type="button" 
                onClick={() => setShowSurvey(false)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#998c86', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>

              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#faf2ef', border: '1px solid #ebdcd7', color: '#c8715f', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <Star size={24} fill="#c8715f" color="#c8715f" />
                </div>
                <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: '0 0 6px' }}>
                  Beri Nilai &amp; Ulasan
                </h3>
                <p style={{ color: '#8a7a70', fontSize: '13px', margin: 0 }}>
                  Bagikan kepuasan dan pengalaman perawatan Anda di Glam Studio.
                </p>
              </div>

              <form onSubmit={handleSubmitReview}>
                {/* Rating Stars */}
                <div style={{ textAlign: 'center', marginBottom: '20px', background: '#fdf8f6', padding: '14px', borderRadius: '14px', border: '1px solid #f3e5e0' }}>
                  <div style={{ fontSize: '12px', color: '#8a5a4d', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Tingkat Kepuasan
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isHoveredOrActive = (hoverRating || surveyRating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setSurveyRating(star)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', transition: 'transform 0.15s ease' }}
                        >
                          <Star
                            size={30}
                            fill={isHoveredOrActive ? "#e5987d" : "transparent"}
                            color={isHoveredOrActive ? "#c8715f" : "#d8c8c2"}
                            strokeWidth={1.8}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ fontSize: '12px', color: '#c8715f', fontWeight: 600, marginTop: '6px' }}>
                    {surveyRating === 5 && 'Sangat Memuaskan (5/5)'}
                    {surveyRating === 4 && 'Puas (4/5)'}
                    {surveyRating === 3 && 'Cukup Baik (3/5)'}
                    {surveyRating === 2 && 'Kurang Memuaskan (2/5)'}
                    {surveyRating === 1 && 'Perlu Evaluasi (1/5)'}
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                    Nama Lengkap Anda *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sarah Amalia"
                    value={surveyName}
                    onChange={(e) => setSurveyName(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #ebdcd7', fontSize: '13.5px' }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                    Layanan yang Diterima
                  </label>
                  <select
                    value={surveyTreatment}
                    onChange={(e) => setSurveyTreatment(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #ebdcd7', fontSize: '13.5px', background: 'white' }}
                  >
                    <option value="Paket All-In-One Promo 150K">Paket All-In-One Promo 150K (Nail Art)</option>
                    <option value="Polosan Gel Polish">Polosan Gel Polish (75K)</option>
                    <option value="Polosan + Kuku Palsu">Polosan + Kuku Palsu (100K)</option>
                    <option value="Lashes Single">Lashes Single (111K)</option>
                    <option value="Lash Lift & Tint">Lash Lift & Tint (155K)</option>
                    <option value="Lashes YY Premium">Lashes YY Premium (148K)</option>
                    <option value="Lashes Anime Style">Lashes Anime Style (138K)</option>
                    <option value="Lashes 3D Volume">Lashes 3D Volume (153K)</option>
                    <option value="Lashes Volume Set">Lashes Volume Set (155K)</option>
                    <option value="Russian / Bold Volume">Russian / Bold Volume (204K)</option>
                    <option value="Massage & Lulur Badan Signature">Massage & Lulur Badan (120K)</option>
                    <option value="Brow Bomber Signature">Brow Bomber Signature (185K)</option>
                    <option value="Brow Lamination Fluffy Look">Brow Lamination (150K)</option>
                    <option value="Treatment Lainnya">Treatment Lainnya</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                    Ulasan &amp; Kesan Anda *
                  </label>
                  <textarea
                    required
                    placeholder="Ceritakan pengalaman Anda terkait kerapian hasil, kenyamanan tempat, maupun keramahan terapis..."
                    rows={4}
                    value={surveyReview}
                    onChange={(e) => setSurveyReview(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #ebdcd7', fontSize: '13.5px', resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ flex: '1', borderRadius: '10px', padding: '12px' }}
                    onClick={() => setShowSurvey(false)}
                    disabled={isSubmittingReview}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ flex: '2', borderRadius: '10px', padding: '12px', fontWeight: 600 }}
                    disabled={isSubmittingReview}
                  >
                    {isSubmittingReview ? 'Menerbitkan...' : 'Kirim Ulasan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
          <div className="logo-container" style={{ marginRight: '80px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/favicon.png" alt="Glam Studio" style={{ height: '64px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply', transform: 'scale(1.1)' }} />
            <span className="logo-text">Glam Studio</span>
            <span className="logo-badge" style={{ marginLeft: '8px' }}>Reservasi Online</span>
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
              <div 
                className={`step-item ${bookingStep === 1 ? 'active' : bookingStep > 1 ? 'completed' : ''}`}
                onClick={() => setBookingStep(1)}
                style={{ cursor: 'pointer' }}
              >
                <div className="step-num">{bookingStep > 1 ? <Check size={14} /> : 1}</div>
                <div className="step-details">
                  <span className="step-title">Pilih Layanan</span>
                  <span className="step-desc">Pricelist & Katalog</span>
                </div>
              </div>

              <div 
                className={`step-item ${bookingStep === 2 ? 'active' : bookingStep > 2 ? 'completed' : ''}`}
                onClick={() => custTreatment && setBookingStep(2)}
                style={{ cursor: custTreatment ? 'pointer' : 'default' }}
              >
                <div className="step-num">{bookingStep > 2 ? <Check size={14} /> : 2}</div>
                <div className="step-details">
                  <span className="step-title">Pilih Waktu</span>
                  <span className="step-desc">Tanggal & Jam</span>
                </div>
              </div>

              <div 
                className={`step-item ${bookingStep === 3 ? 'active' : bookingStep > 3 ? 'completed' : ''}`}
                onClick={() => custTreatment && custSelectedTime && setBookingStep(3)}
                style={{ cursor: custTreatment && custSelectedTime ? 'pointer' : 'default' }}
              >
                <div className="step-num">{bookingStep > 3 ? <Check size={14} /> : 3}</div>
                <div className="step-details">
                  <span className="step-title">Form Data Diri</span>
                  <span className="step-desc">Nama & WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Steps Right Interactive Content Area */}
            <div className="wizard-content">

              {/* STEP 1: SERVICE & CATALOG SELECTOR */}
              {bookingStep === 1 && (
                <div className="fade-in">
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '22px', marginBottom: '6px', color: 'var(--text-main)' }}>Pilih Layanan & Perawatan</h3>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: 0 }}>
                      Pilih treatment yang ingin Anda reservasikan dari katalog eksklusif Glam Studio.
                    </p>
                  </div>

                  {/* Category Filter Tabs */}
                  <div className="booking-category-pills">
                    {[
                      { id: 'all', label: 'Semua Layanan' },
                      { id: 'eyelash', label: 'Eyelash Extension' },
                      { id: 'nail', label: 'Nail Art' },
                      { id: 'massage', label: 'Massage & Lulur' },
                      { id: 'brow', label: 'Brow Treatment' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        className={`booking-category-pill ${bookingCategoryFilter === cat.id ? 'active' : ''}`}
                        onClick={() => setBookingCategoryFilter(cat.id as any)}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Services Grid */}
                  <div className="booking-services-grid">
                    {CATALOG_SERVICES
                      .filter(s => bookingCategoryFilter === 'all' || s.category === bookingCategoryFilter)
                      .map(service => {
                        const isSelected = custTreatment === service.name && !isCustomTreatment;
                        return (
                          <div
                            key={service.id}
                            className={`booking-service-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                              setCustTreatment(service.name);
                              setCustServicePrice(service.price);
                              setIsCustomTreatment(false);
                            }}
                          >
                            <div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ 
                                  fontSize: '11px', 
                                  fontWeight: 600, 
                                  color: '#8a5a4d', 
                                  background: '#faf2ef', 
                                  padding: '3px 8px', 
                                  borderRadius: '6px',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px'
                                }}>
                                  {service.categoryName}
                                </span>
                                {service.promoBadge && (
                                  <span style={{ 
                                    fontSize: '10.5px', 
                                    fontWeight: 700, 
                                    color: 'white', 
                                    background: 'linear-gradient(135deg, #c8715f 0%, #e06fa0 100%)', 
                                    padding: '3px 8px', 
                                    borderRadius: '12px' 
                                  }}>
                                    {service.promoBadge}
                                  </span>
                                )}
                              </div>

                              <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px', lineHeight: '1.3' }}>
                                {service.name}
                              </h4>
                              
                              <p style={{ fontSize: '12.5px', color: '#8a7a70', lineHeight: '1.5', marginBottom: '14px' }}>
                                {service.description}
                              </p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '12px', borderTop: '1px solid #f3e9e5' }}>
                              <div>
                                {service.normalPrice && (
                                  <div style={{ fontSize: '11.5px', color: '#a09ba8', textDecoration: 'line-through' }}>
                                    {service.normalPriceDisplay}
                                  </div>
                                )}
                                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary)' }}>
                                  {service.priceDisplay}
                                </div>
                              </div>
                              
                              <div className="booking-service-check">
                                {isSelected && <Check size={13} strokeWidth={3} />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* Custom Treatment Option */}
                  <div 
                    style={{ 
                      background: isCustomTreatment ? '#fff8fb' : '#faf6f4', 
                      border: isCustomTreatment ? '1.5px solid var(--primary)' : '1px dashed #d8c6be', 
                      borderRadius: '14px', 
                      padding: '16px 20px', 
                      marginTop: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => {
                      setIsCustomTreatment(true);
                      if (customTreatmentInput) {
                        setCustTreatment(customTreatmentInput);
                      }
                      setCustServicePrice(0);
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isCustomTreatment ? '10px' : '0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="booking-service-check" style={{ background: isCustomTreatment ? 'var(--primary)' : 'transparent', borderColor: isCustomTreatment ? 'var(--primary)' : '#d4c5c0', color: 'white' }}>
                          {isCustomTreatment && <Check size={13} strokeWidth={3} />}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Treatment Khusus / Permintaan Khusus</div>
                          <div style={{ fontSize: '12px', color: '#8a7a70' }}>Tuliskan nama perawatan kustom yang ingin Anda reservasikan</div>
                        </div>
                      </div>
                    </div>

                    {isCustomTreatment && (
                      <div style={{ marginTop: '12px' }} onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          placeholder="Ketik treatment yang diinginkan (misal: Retouch Lashes, Custom Nail Art)..."
                          value={customTreatmentInput}
                          onChange={(e) => {
                            setCustomTreatmentInput(e.target.value);
                            setCustTreatment(e.target.value || 'Treatment Kustom');
                          }}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: '1px solid #ebdcd7',
                            fontSize: '13.5px',
                            background: 'white'
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Selected Item Summary Bar */}
                  {custTreatment && (
                    <div className="booking-selected-bar fade-in">
                      <div>
                        <div style={{ fontSize: '12px', color: '#8a7a70' }}>Layanan Terpilih:</div>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
                          {custTreatment} {custServicePrice > 0 && <span style={{ color: 'var(--primary)', fontWeight: 600, marginLeft: '6px' }}>({formatPrice(custServicePrice)})</span>}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ padding: '8px 22px', borderRadius: '20px', fontSize: '13px' }}
                        onClick={() => setBookingStep(2)}
                      >
                        Lanjut ke Jadwal <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: SCHEDULE & TIME SELECTOR */}
              {bookingStep === 2 && (
                <div className="fade-in">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '22px', marginBottom: '4px', color: 'var(--text-main)' }}>Tentukan Tanggal & Jam</h3>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: 0 }}>Silakan pilih slot waktu kunjungan yang tersedia.</p>
                    </div>

                    <div style={{ background: '#faf2ef', border: '1px solid #ebdcd7', borderRadius: '20px', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#8a5a4d', fontWeight: 600 }}>{custTreatment}</span>
                      <button 
                        type="button" 
                        style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '11.5px', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                        onClick={() => setBookingStep(1)}
                      >
                        Ubah
                      </button>
                    </div>
                  </div>
                  
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
                        min={getJakartaDateStr()}
                      />
                    </div>
                    
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Slot Waktu Tersedia</label>
                      <div className="slots-grid">
                        {availableTimes.length > 0 ? (() => {
                          const todayStr = getJakartaDateStr();
                          const isToday = custSelectedDate === todayStr;
                          const now = new Date();
                          const jakartaTimeParts = new Intl.DateTimeFormat('en-US', {
                            timeZone: 'Asia/Jakarta',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false
                          }).formatToParts(now);
                          const currentHour = parseInt(jakartaTimeParts.find(p => p.type === 'hour')?.value || '0', 10);
                          const currentMinute = parseInt(jakartaTimeParts.find(p => p.type === 'minute')?.value || '0', 10);

                          const filteredTimes = availableTimes.filter(time => {
                            // 1. Check if set OFF by admin for this date & time
                            const key = `studio_${custSelectedDate}_${time}`;
                            if (stylistAvailability && stylistAvailability[key] === false) {
                              return false;
                            }

                            // 2. Check if past time today
                            if (isToday) {
                              const [h, m] = time.split(':').map(Number);
                              if (h < currentHour || (h === currentHour && m <= currentMinute)) {
                                return false;
                              }
                            }
                            
                            // 3. Check active bookings count for this time & date (max capacity: 2)
                            const bookingsForSlot = bookings.filter(b => 
                              b.bookingDate === custSelectedDate && 
                              b.startTime === time &&
                              b.status !== 'CANCELLED' && b.status !== 'NO_SHOW'
                            );
                            
                            return bookingsForSlot.length < 2;
                          });

                          if (filteredTimes.length === 0) {
                            return (
                              <div style={{ textAlign: 'center', padding: '16px 8px', width: '100%', gridColumn: '1 / -1' }}>
                                <p style={{ fontSize: '13.5px', color: '#c8715f', fontWeight: 'bold' }}>
                                  Semua slot waktu untuk tanggal ini sudah penuh / tidak tersedia.
                                </p>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                                  Silakan pilih tanggal lain (misalnya besok) untuk melakukan booking.
                                </p>
                              </div>
                            );
                          }

                          return filteredTimes.map(time => {
                            const isSelected = custSelectedTime === time;
                            const bookingsForSlot = bookings.filter(b => 
                              b.bookingDate === custSelectedDate && 
                              b.startTime === time &&
                              b.status !== 'CANCELLED' && b.status !== 'NO_SHOW'
                            );
                            const remaining = 2 - bookingsForSlot.length;

                            return (
                              <button
                                key={time}
                                type="button"
                                className={`slot-btn ${isSelected ? 'selected' : ''}`}
                                onClick={() => {
                                  setCustSelectedTime(time);
                                }}
                              >
                                <span>{time}</span>
                                {remaining === 1 && (
                                  <span style={{ fontSize: '10px', opacity: 0.8, marginLeft: '4px', fontWeight: 'normal' }}>
                                    (Sisa 1)
                                  </span>
                                )}
                              </button>
                            );
                          });
                        })() : <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Belum ada slot waktu tersedia hari ini.</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT & NOTES */}
              {bookingStep === 3 && (
                <div className="fade-in" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                  <h3 style={{ fontSize: '22px', marginBottom: '8px', textAlign: 'center' }}>Detail Pemesan</h3>
                  
                  {/* Welcome & Info Notice Card */}
                  <div style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(200,113,95,0.2)', borderRadius: '12px', padding: '20px', marginBottom: '24px', fontSize: '13.5px', lineHeight: '1.6', color: 'var(--text-main)', backdropFilter: 'blur(16px)' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '6px', fontSize: '15px', color: 'var(--primary)' }}>Form Reservasi Pelanggan</div>
                    <div style={{ marginBottom: '12px', color: 'rgba(26,10,20,0.6)' }}>Terima kasih telah memilih Glam Studio. Silakan lengkapi data kontak Anda:</div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(255,255,255,0.9)', padding: '14px 16px', borderRadius: '8px', border: '1px solid rgba(224,111,160,0.15)', marginBottom: '12px' }}>
                      <div style={{ color: 'rgba(26,10,20,0.85)' }}>
                        <strong style={{ color: '#c4558a' }}>Treatment:</strong> {custTreatment} {custServicePrice > 0 && `(${formatPrice(custServicePrice)})`}
                      </div>
                      <div style={{ color: 'rgba(26,10,20,0.85)' }}><strong style={{ color: '#c4558a' }}>Tanggal Booking:</strong> {custSelectedDate}</div>
                      <div style={{ color: 'rgba(26,10,20,0.85)' }}><strong style={{ color: '#c4558a' }}>Jam Booking:</strong> {custSelectedTime} WIB</div>
                    </div>
                    
                    <div style={{ fontSize: '12px', color: 'rgba(26,10,20,0.55)', borderLeft: '3px solid var(--primary)', paddingLeft: '10px', marginBottom: '12px', lineHeight: '1.6' }}>
                      Mohon hadir tepat waktu sesuai jadwal booking. Jika terlambat lebih dari 15 menit tanpa konfirmasi, jadwal dapat dialihkan demi kenyamanan antrean pelanggan lainnya.
                    </div>
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
                </div>
              )}

              {/* STEP 4: SUCCESS / WHATSAPP POPUP */}
              {bookingStep === 4 && (
                <div className="fade-in" style={{ textAlign: 'center' }}>
                  <div className="booking-success-icon">
                    <div className="booking-success-ring">
                      <CheckCircle2 size={48} color="#28a745" />
                    </div>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', marginBottom: '8px' }}>Reservasi Terkonfirmasi</h3>
                  <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
                    Terima kasih telah memilih Glam Studio. Berikut rincian reservasi Anda:
                  </p>

                  <div style={{ maxWidth: '440px', margin: '0 auto', background: 'white', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.06)', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.04)' }}>
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
                          {custTreatment} {custServicePrice > 0 && `(${formatPrice(custServicePrice)})`}
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
                      
                      <div style={{ marginTop: '8px', padding: '14px 16px', background: '#fffdf9', borderRadius: '12px', fontSize: '12px', color: '#887d71', lineHeight: '1.6', border: '1px solid #f2e9d8' }}>
                        Mohon datang tepat waktu sesuai jadwal yang telah ditentukan. Jika terlambat lebih dari 15 menit tanpa konfirmasi terlebih dahulu, slot dapat dialihkan ke pelanggan lain.
                      </div>
                    </div>

                    <div style={{ padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <a
                        href={`https://wa.me/6285759929830?text=${encodeURIComponent(`Halo Admin Glam Studio,\nSaya ingin konfirmasi reservasi jadwal booking saya:\n\nNama: ${custName}\nNo. WhatsApp: ${custPhone}\nTanggal: ${custSelectedDate}\nJam: ${custSelectedTime} WIB\nTreatment: ${custTreatment}${custServicePrice > 0 ? ` (${formatPrice(custServicePrice)})` : ''}${custNotes ? ' | Catatan: ' + custNotes : ''}\n\nMohon bantuannya untuk pencatatan jadwal. Terima kasih.`)}`}
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
              {bookingStep < 4 && (
                <div className="wizard-nav" style={{ marginTop: '32px' }}>
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

                  {bookingStep === 1 && (
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      disabled={!custTreatment}
                      onClick={() => setBookingStep(2)}
                    >
                      Pilih Waktu <ArrowRight size={16} />
                    </button>
                  )}

                  {bookingStep === 2 && (
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      disabled={!custSelectedTime}
                      onClick={() => setBookingStep(3)}
                    >
                      Lanjut ke Data Diri <ArrowRight size={16} />
                    </button>
                  )}

                  {bookingStep === 3 && (
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
          <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/favicon.png" alt="Glam Studio" style={{ height: '64px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply', transform: 'scale(1.1)' }} />
            <span className="logo-text">Glam Studio</span>
            <span className="logo-badge" style={{ marginLeft: '8px' }}>Admin & Kasir</span>
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
              {adminProfile ? `${adminProfile.name} (${adminProfile.role === 'owner' ? 'Admin' : 'Kasir'})` : 'Admin'}
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
              <Users size={18} /> Kelola Terapis
            </button>

            {isAdminLoggedIn && adminProfile?.role === 'owner' && (
              <button 
                className={`pos-menu-item ${posTab === 'users' ? 'active' : ''}`}
                onClick={() => setPosTab('users')}
              >
                <ShieldCheck size={18} /> Kelola Pengguna
              </button>
            )}

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
                                    href={`https://wa.me/${(() => { let p = (b.customerPhone || '').replace(/[^0-9]/g, ''); if (p.startsWith('0')) p = '62' + p.slice(1); return p; })()}?text=${encodeURIComponent(`Halo Kak ${b.customerName},\n\nBerikut pengingat jadwal reservasi Anda di Glam Studio:\n\nTanggal: ${b.bookingDate}\nWaktu: ${b.startTime} WIB\nTreatment: ${b.notes || '-'}\n\nMohon hadir tepat waktu sesuai jadwal ya Kak. Terima kasih.`)}`}
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

            {posTab === 'users' && adminProfile?.role === 'owner' && (
              <div className="pos-card fade-in">
                <div className="pos-card-header">
                  <h2>Kelola Pengguna (Admin & Kasir)</h2>
                </div>
                <div className="pos-card-content">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
                    
                    {/* Add User Form */}
                    <div className="service-form-panel" style={{ padding: '20px', background: '#f9f5fa', borderRadius: '12px', border: '1px solid #eee' }}>
                      <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>Tambah Pengguna Baru</h3>
                      <div className="form-group" style={{ marginBottom: '12px' }}>
                        <label>Nama Lengkap</label>
                        <input type="text" className="login-input" value={newUserForm.name} onChange={e => setNewUserForm({...newUserForm, name: e.target.value})} placeholder="Nama Pengguna" />
                      </div>
                      <div className="form-group" style={{ marginBottom: '12px' }}>
                        <label>Username</label>
                        <input type="text" className="login-input" value={newUserForm.username} onChange={e => setNewUserForm({...newUserForm, username: e.target.value})} placeholder="Username" />
                      </div>
                      <div className="form-group" style={{ marginBottom: '12px' }}>
                        <label>Password</label>
                        <input type="password" className="login-input" value={newUserForm.password} onChange={e => setNewUserForm({...newUserForm, password: e.target.value})} placeholder="Password" />
                      </div>
                      <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label>Role / Peran</label>
                        <select className="login-input" value={newUserForm.role} onChange={e => setNewUserForm({...newUserForm, role: e.target.value})}>
                          <option value="kasir">Kasir</option>
                          <option value="owner">Admin (Owner)</option>
                        </select>
                      </div>
                      <button 
                        className="btn btn-primary" 
                        style={{ width: '100%' }}
                        onClick={async () => {
                          if(!newUserForm.username || !newUserForm.password || !newUserForm.name) {
                            setToast("Harap isi semua data");
                            return;
                          }
                          try {
                            await addUser(newUserForm);
                            setToast("Pengguna berhasil ditambahkan");
                            setNewUserForm({ username: '', password: '', name: '', role: 'kasir' });
                          } catch (err: any) {
                            setToast(err.message || "Gagal menambahkan pengguna");
                          }
                        }}
                      >
                        <UserPlus size={16} /> Simpan Pengguna
                      </button>
                    </div>

                    {/* Users List */}
                    <div>
                      <div className="table-responsive">
                        <table className="pos-table">
                          <thead>
                            <tr>
                              <th>Nama</th>
                              <th>Username</th>
                              <th>Role</th>
                              <th>Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {adminUsers.map((u: any) => (
                              <tr key={u._id}>
                                <td><strong>{u.name}</strong></td>
                                <td>{u.username}</td>
                                <td>
                                  <span className={`status-badge ${u.role === 'owner' ? 'status-confirmed' : 'status-completed'}`}>
                                    {u.role === 'owner' ? 'Admin' : 'Kasir'}
                                  </span>
                                </td>
                                <td>
                                  <button 
                                    className="btn btn-outline" 
                                    style={{ padding: '6px 10px', color: '#e11d48', borderColor: '#ffe4e6' }}
                                    onClick={async () => {
                                      if (confirm(`Yakin ingin menghapus ${u.name}?`)) {
                                        await deleteUser({ id: u._id });
                                        setToast("Pengguna dihapus");
                                      }
                                    }}
                                  >
                                    <Trash2 size={14} /> Hapus
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {adminUsers.length === 0 && (
                              <tr>
                                <td colSpan={4} style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                                  Belum ada pengguna di tabel ini. Jika kosong, login fallback (admin/admin123) tetap aktif.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

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
                              <td><strong>Glam Studio</strong></td>
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
                            {availableTimes.map(time => {
                              const key = `studio_${custSelectedDate}_${time}`;
                              const isOff = stylistAvailability[key] === false;
                              const activeBookings = bookings.filter(b => b.bookingDate === custSelectedDate && b.startTime === time && b.status !== 'CANCELLED' && b.status !== 'NO_SHOW');
                              const isFull = activeBookings.length >= 2;

                              return (
                                <tr key={time}>
                                  <td>
                                    <strong>{time}</strong>
                                    {activeBookings.length > 0 && (
                                      <div style={{ fontSize: '11px', color: isFull ? '#e53e3e' : '#d69e2e', fontWeight: 'bold' }}>
                                        {activeBookings.length}/2 Kuota Terisi
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    {isFull ? (
                                      <span style={{ fontSize: '11px', color: '#e53e3e', fontWeight: 'bold' }}>
                                        Full (2/2 Kuota)
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
                                </tr>
                              );
                            })}
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
