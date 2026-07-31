// ===== FIREBASE AUTH CHECK =====
let currentUser = null;
let currentRole = 'kasir';

function waitForFirebase(cb) {
  if (window._firebase) { cb(window._firebase); }
  else { setTimeout(() => waitForFirebase(cb), 100); }
}

waitForFirebase(({ auth, db, onAuthStateChanged, collection, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc, updateDoc, query, orderBy, onSnapshot }) => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) { window.location.href = 'pos-auth.html'; return; }
    currentUser = user;
    // Get user role
    const snap = await getDoc(doc(db, 'users', user.uid));
    if (snap.exists()) {
      currentRole = snap.data().role || 'kasir';
      const uname = snap.data().name || user.email;
      document.querySelector('.cashier-name').textContent = uname;
      document.querySelector('.cashier-role').textContent = currentRole.charAt(0).toUpperCase() + currentRole.slice(1);
    }
    applyRoleAccess();

    // Load items from Firestore
    const itemsSnap = await getDocs(collection(db, 'pos_items'));
    if (!itemsSnap.empty) {
      items = itemsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    } else {
      // Seed default items
      for (const it of DEFAULT_ITEMS) {
        await setDoc(doc(db, 'pos_items', it.id), it);
      }
    }

    // Load transactions from Firestore (real-time)
    const q = query(collection(db, 'pos_transactions'), orderBy('date', 'desc'));
    onSnapshot(q, (snap) => {
      transactions = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      updateChips();
    });

    window._db = db;
    window._collection = collection;
    window._doc = doc;
    window._addDoc = addDoc;
    window._setDoc = setDoc;
    window._deleteDoc = deleteDoc;
    window._updateDoc = updateDoc;
    window._auth = auth;

    renderCategories();
    renderMenu();
    updateChips();
  });
});

const escapeHTML = (str) => typeof str === 'string' ? str.replace(/[&<>'"]/g, tag => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'}[tag])) : str;

function applyRoleAccess() {
  const isOwner = currentRole === 'owner';
  const isManager = currentRole === 'manager';
  if (!isOwner) document.getElementById('nav-services').style.display = isOwner ? 'flex' : 'none';
  if (!isOwner && !isManager) document.getElementById('nav-report').style.display = 'none';
}

function logout() {
  if (window._auth) window._auth.signOut().then(() => { window.location.href = 'pos-auth.html'; });
}

// ===== DATA =====
const DEFAULT_ITEMS = [
  { id:'i1', name:'Classic Manicure', category:'Manicure', type:'service', price:80000, duration:45, stock:-1 },
  { id:'i2', name:'Premium Milk Spa Mani', category:'Manicure', type:'service', price:180000, duration:60, stock:-1 },
  { id:'i3', name:'Classic Spa Pedicure', category:'Pedicure', type:'service', price:150000, duration:60, stock:-1 },
  { id:'i4', name:'Detox Charcoal Pedi', category:'Pedicure', type:'service', price:210000, duration:75, stock:-1 },
  { id:'i5', name:'Solid Premium Gel Polish', category:'Nail Art', type:'service', price:100000, duration:30, stock:-1 },
  { id:'i6', name:'Korean Velvet Matte Art', category:'Nail Art', type:'service', price:230000, duration:90, stock:-1 },
  { id:'i7', name:'Luxury 3D Jewel Nail Art', category:'Nail Art', type:'service', price:350000, duration:120, stock:-1 },
  { id:'i8', name:'Classic Acrylic Extension', category:'Nail Art', type:'service', price:300000, duration:120, stock:-1 },
  { id:'i9', name:'Classic Eyelash Extension', category:'Eyelash', type:'service', price:200000, duration:90, stock:-1 },
  { id:'i10', name:'Volume Lash (3D-5D)', category:'Eyelash', type:'service', price:300000, duration:120, stock:-1 },
  { id:'i11', name:'Mega Volume Lash (6D+)', category:'Eyelash', type:'service', price:400000, duration:150, stock:-1 },
  { id:'i12', name:'Lash Lifting & Tinting', category:'Eyelash', type:'service', price:250000, duration:90, stock:-1 },
  { id:'i13', name:'Eyelash Removal', category:'Eyelash', type:'service', price:75000, duration:30, stock:-1 },
  { id:'i14', name:'Lash Infill / Refill', category:'Eyelash', type:'service', price:150000, duration:60, stock:-1 },
  { id:'i15', name:'Extra 3D Nail Charm', category:'Addon', type:'service', price:25000, duration:10, stock:-1 },
  { id:'i16', name:'Glitter / Chrome Effect', category:'Addon', type:'service', price:30000, duration:10, stock:-1 },
  { id:'i17', name:'Old Gel Removal', category:'Addon', type:'service', price:40000, duration:15, stock:-1 },
  { id:'i18', name:'Nail Strengthening Overlay', category:'Addon', type:'service', price:50000, duration:15, stock:-1 },
  { id:'i19', name:'Cuticle Revitalizer Oil', category:'Produk', type:'product', price:65000, duration:0, stock:25 },
  { id:'i20', name:'Premium Hand Cream Rose', category:'Produk', type:'product', price:85000, duration:0, stock:15 },
  { id:'i21', name:'Acetone-Free Remover', category:'Produk', type:'product', price:45000, duration:0, stock:30 },
  { id:'i22', name:'Press-on Nails Gift Set', category:'Produk', type:'product', price:125000, duration:0, stock:10 },
];

let items = DEFAULT_ITEMS;
let transactions = [];
let cart = [];
let selectedPayment = 'QRIS';
let activeCategory = 'Semua';
let editingId = null;
let lastReceipt = null;

async function saveItems() {
  if (!window._db) return;
  for (const it of items) {
    await window._setDoc(window._doc(window._db, 'pos_items', it.id), it);
  }
}

async function saveTransaction(trx) {
  if (!window._db) return;
  await window._addDoc(window._collection(window._db, 'pos_transactions'), trx);
}

// ===== ROUTING =====
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.getElementById('nav-' + name).classList.add('active');
  if (name === 'pos') { renderCategories(); renderMenu(); updateChips(); }
  if (name === 'services') renderServicesTable('all');
  if (name === 'report') renderReport();
  if (name === 'history') renderHistory();
}

// ===== CATEGORIES =====
const ALL_CATS = ['Semua', 'Nail Art', 'Eyelash', 'Manicure', 'Pedicure', 'Addon', 'Produk'];

function renderCategories() {
  const wrap = document.getElementById('category-tabs');
  wrap.innerHTML = ALL_CATS.map(c =>
    `<button class="cat-tab ${c === activeCategory ? 'active' : ''}" onclick="setCategory('${c}')">${c}</button>`
  ).join('');
}

function setCategory(cat) {
  activeCategory = cat;
  renderCategories();
  renderMenu();
}

// ===== MENU =====
function filterMenu() { renderMenu(); }

function renderMenu() {
  const q = (document.getElementById('search-input').value || '').toLowerCase();
  const grid = document.getElementById('menu-grid');
  const filtered = items.filter(it => {
    const matchCat = activeCategory === 'Semua' || it.category === activeCategory;
    const matchQ = !q || it.name.toLowerCase().includes(q) || it.category.toLowerCase().includes(q);
    return matchCat && matchQ;
  });
  if (!filtered.length) { grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--muted)">Tidak ada item ditemukan</div>'; return; }
  grid.innerHTML = filtered.map(it => {
    const outOfStock = it.type === 'product' && it.stock === 0;
    const lowStock = it.type === 'product' && it.stock > 0 && it.stock <= 5;
    return `<div class="menu-item ${outOfStock ? 'out-of-stock' : ''}" onclick="${outOfStock ? '' : `addToCart('${escapeHTML(it.id)}')`}">
      ${it.type === 'product' && it.stock >= 0 ? `<div class="item-stock-badge ${lowStock ? 'low' : ''}">Stok: ${it.stock}</div>` : ''}
      <div class="item-name">${escapeHTML(it.name)}</div>
      <div class="item-category">${escapeHTML(it.category)}</div>
      <div class="item-price">${fmt(it.price)}</div>
      ${it.duration ? `<div class="item-duration">${it.duration} mnt</div>` : ''}
    </div>`;
  }).join('');
}

// ===== CART =====
function addToCart(id) {
  const it = items.find(i => i.id === id);
  if (!it) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    if (it.type === 'product' && existing.qty >= it.stock) { toast('Stok tidak cukup!', 'error'); return; }
    existing.qty++;
  } else {
    cart.push({ id: it.id, name: it.name, price: it.price, qty: 1, type: it.type });
  }
  renderCart();
}

function changeQty(id, delta) {
  const c = cart.find(c => c.id === id);
  if (!c) return;
  c.qty += delta;
  if (c.qty <= 0) cart = cart.filter(c => c.id !== id);
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  renderCart();
}

function clearCart() {
  cart = [];
  document.getElementById('customer-name').value = '';
  renderCart();
}

function renderCart() {
  const wrap = document.getElementById('cart-items');
  if (!cart.length) {
    wrap.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon"></div><p>Keranjang kosong</p><small>Pilih layanan dari menu</small></div>`;
    updateTotals(); return;
  }
  wrap.innerHTML = cart.map(c => `
    <div class="cart-row">
      <div class="cart-row-info">
        <div class="cart-row-name">${escapeHTML(c.name)}</div>
        <div class="cart-row-price">${fmt(c.price * c.qty)}</div>
      </div>
      <div class="cart-qty">
        <button class="qty-btn" onclick="changeQty('${escapeHTML(c.id)}',-1)">−</button>
        <span class="qty-num">${c.qty}</span>
        <button class="qty-btn" onclick="changeQty('${escapeHTML(c.id)}',1)">+</button>
      </div>
      <button class="cart-row-remove" onclick="removeFromCart('${escapeHTML(c.id)}')">✕</button>
    </div>`).join('');
  updateTotals();
}

function updateTotals() {
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const discPct = parseFloat(document.getElementById('discount-input').value) || 0;
  const disc = Math.round(subtotal * discPct / 100);
  const tax = Math.round((subtotal - disc) * 0.1);
  const grand = subtotal - disc + tax;
  document.getElementById('subtotal').textContent = fmt(subtotal);
  document.getElementById('tax-amount').textContent = fmt(tax);
  document.getElementById('grand-total').textContent = fmt(grand);
  calcChange();
}

function calcChange() {
  if (selectedPayment !== 'Cash') return;
  const grand = getGrand();
  const received = parseFloat(document.getElementById('cash-received').value) || 0;
  const change = received - grand;
  document.getElementById('change-display').textContent = change >= 0 ? `Kembalian: ${fmt(change)}` : `Kurang: ${fmt(Math.abs(change))}`;
}

function getGrand() {
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const discPct = parseFloat(document.getElementById('discount-input').value) || 0;
  const disc = Math.round(subtotal * discPct / 100);
  const tax = Math.round((subtotal - disc) * 0.1);
  return subtotal - disc + tax;
}

// ===== PAYMENT =====
function selectPayment(method) {
  selectedPayment = method;
  document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('pay-' + method).classList.add('active');
  document.getElementById('cash-field').style.display = method === 'Cash' ? 'block' : 'none';
}

// ===== CHECKOUT =====
function checkout() {
  if (!cart.length) { toast('Keranjang masih kosong!', 'error'); return; }
  const customerName = document.getElementById('customer-name').value.trim() || 'Guest';
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const discPct = parseFloat(document.getElementById('discount-input').value) || 0;
  const disc = Math.round(subtotal * discPct / 100);
  const tax = Math.round((subtotal - disc) * 0.1);
  const grand = subtotal - disc + tax;

  if (selectedPayment === 'Cash') {
    const received = parseFloat(document.getElementById('cash-received').value) || 0;
    if (received < grand) { toast('Uang yang diterima kurang!', 'error'); return; }
  }

  // Reduce product stock
  cart.forEach(ci => {
    const it = items.find(i => i.id === ci.id);
    if (it && it.type === 'product' && it.stock >= 0) it.stock = Math.max(0, it.stock - ci.qty);
  });

  const inv = generateInvoice();
  const trx = {
    invoice: inv,
    customer: customerName,
    items: [...cart],
    subtotal, discount: disc, tax, total: grand,
    payment: selectedPayment,
    cashier: currentUser ? currentUser.email : 'unknown',
    date: new Date().toISOString()
  };
  lastReceipt = { id: inv, ...trx };
  await saveTransaction(trx);
  await saveItems();
  showReceipt(lastReceipt);
  clearCart();
  document.getElementById('discount-input').value = '';
  updateChips();
  toast('Transaksi berhasil! ' + inv, 'success');
}

// ===== RECEIPT =====
function showReceipt(trx) {
  const el = document.getElementById('receipt-content');
  const dateStr = new Date(trx.date).toLocaleString('id-ID');
  el.innerHTML = `
    <div class="receipt-header">
      <div class="receipt-logo">✦ Glam Studios</div>
      <div class="receipt-sub">Beauty & Nail Art</div>
      <div style="font-size:11px;color:var(--muted);margin-top:4px">${dateStr}</div>
    </div>
    <div class="receipt-row"><span>No. Invoice</span><span style="font-weight:600">${escapeHTML(trx.invoice)}</span></div>
    <div class="receipt-row"><span>Pelanggan</span><span>${escapeHTML(trx.customer)}</span></div>
    <div class="receipt-row"><span>Pembayaran</span><span>${escapeHTML(trx.payment)}</span></div>
    <div class="receipt-items" style="margin-top:10px">
      ${trx.items.map(i => `<div class="receipt-item-row"><span>${escapeHTML(i.name)} x${i.qty}</span><span style="float:right">${fmt(i.price*i.qty)}</span></div>`).join('')}
    </div>
    <div class="receipt-row"><span>Subtotal</span><span>${fmt(trx.subtotal)}</span></div>
    ${trx.discount ? `<div class="receipt-row"><span>Diskon</span><span>-${fmt(trx.discount)}</span></div>` : ''}
    <div class="receipt-row"><span>PPN 10%</span><span>${fmt(trx.tax)}</span></div>
    <div class="receipt-row total"><span>TOTAL</span><span>${fmt(trx.total)}</span></div>
    <div class="receipt-footer">Terima kasih sudah berkunjung!<br>Glam Studios — Beauty & Nail Art</div>
  `;
  document.getElementById('receipt-modal').classList.add('open');
}

function closeReceiptModal() { document.getElementById('receipt-modal').classList.remove('open'); }

function printReceipt() { window.print(); }

function shareWhatsApp() {
  if (!lastReceipt) return;
  const t = lastReceipt;
  const items = t.items.map(i => `• ${i.name} x${i.qty}: ${fmt(i.price*i.qty)}`).join('\n');
  const msg = `Struk Glam Studios\n${new Date(t.date).toLocaleString('id-ID')}\n\nNo: ${t.invoice}\nPelanggan: ${t.customer}\n\n${items}\n\nTotal: ${fmt(t.total)}\nMetode: ${t.payment}\n\nTerima kasih! 💅`;
  window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
}

// ===== SERVICES TABLE =====
let serviceFilter = 'all';
function filterServices(cat) {
  serviceFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('sf-' + (cat === 'all' ? 'all' : cat === 'Nail Art' ? 'nail' : cat === 'Eyelash' ? 'eye' : cat === 'Manicure' ? 'mani' : cat === 'Pedicure' ? 'pedi' : 'prod')).classList.add('active');
  renderServicesTable(cat);
}

function renderServicesTable(cat) {
  const tbody = document.getElementById('services-tbody');
  const filtered = cat === 'all' ? items : items.filter(i => i.category === cat);
  tbody.innerHTML = filtered.map(it => `
    <tr>
      <td><span style="margin-right:8px">${escapeHTML(it.emoji)||'✦'}</span>${escapeHTML(it.name)}</td>
      <td><span class="badge badge-${it.category==='Nail Art'?'nail':it.category==='Eyelash'?'eye':it.category==='Manicure'?'mani':it.category==='Pedicure'?'pedi':it.category==='Produk'?'prod':'addon'}">${escapeHTML(it.category)}</span></td>
      <td style="font-weight:600;color:var(--accent)">${fmt(it.price)}</td>
      <td style="color:var(--muted)">${it.duration ? escapeHTML(it.duration.toString())+' mnt' : '-'}</td>
      <td style="color:${it.stock<0?'var(--muted)':it.stock<=5?'var(--warning)':'var(--success)'}">${it.stock<0?'∞':it.stock}</td>
      <td><div class="action-btns">
        <button class="btn-icon" onclick="openEditModal('${escapeHTML(it.id)}')">Edit</button>
        <button class="btn-icon danger" onclick="deleteItem('${escapeHTML(it.id)}')">Hapus</button>
      </div></td>
    </tr>`).join('');
}

// ===== ADD/EDIT MODAL =====
function openAddModal() {
  editingId = null;
  document.getElementById('modal-title').textContent = 'Tambah Item';
  document.getElementById('item-id').value = '';
  ['item-name','item-price','item-duration','item-stock','item-emoji','item-desc'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('item-category').value = 'Nail Art';
  document.getElementById('item-type').value = 'service';
  document.getElementById('item-modal').classList.add('open');
}

function openEditModal(id) {
  const it = items.find(i => i.id === id);
  if (!it) return;
  editingId = id;
  document.getElementById('modal-title').textContent = 'Edit Item';
  document.getElementById('item-id').value = id;
  document.getElementById('item-name').value = it.name;
  document.getElementById('item-category').value = it.category;
  document.getElementById('item-type').value = it.type;
  document.getElementById('item-price').value = it.price;
  document.getElementById('item-duration').value = it.duration || '';
  document.getElementById('item-stock').value = it.stock;
  document.getElementById('item-emoji').value = it.emoji || '';
  document.getElementById('item-desc').value = it.desc || '';
  document.getElementById('item-modal').classList.add('open');
}

function closeItemModal() { document.getElementById('item-modal').classList.remove('open'); }

function saveItem() {
  const name = document.getElementById('item-name').value.trim();
  const price = parseFloat(document.getElementById('item-price').value);
  if (!name || !price) { toast('Nama dan harga wajib diisi!', 'error'); return; }
  const newItem = {
    id: editingId || 'i' + Date.now(),
    name,
    category: document.getElementById('item-category').value,
    type: document.getElementById('item-type').value,
    price,
    duration: parseInt(document.getElementById('item-duration').value) || 0,
    stock: parseInt(document.getElementById('item-stock').value) || -1,
    emoji: document.getElementById('item-emoji').value || '✦',
    desc: document.getElementById('item-desc').value.trim(),
  };
  if (editingId) {
    items = items.map(i => i.id === editingId ? newItem : i);
    toast('Item berhasil diperbarui!', 'success');
  } else {
    items.push(newItem);
    toast('Item berhasil ditambahkan!', 'success');
  }
  saveItems();
  closeItemModal();
  renderServicesTable(serviceFilter === 'all' ? 'all' : serviceFilter);
  renderMenu();
}

async function deleteItem(id) {
  if (!confirm('Hapus item ini?')) return;
  if (window._db) await window._deleteDoc(window._doc(window._db, 'pos_items', id));
  items = items.filter(i => i.id !== id);
  renderServicesTable(serviceFilter);
  toast('Item dihapus', 'success');
}

// ===== REPORT =====
function renderReport() {
  const period = document.getElementById('report-period').value;
  const filtered = filterByPeriod(transactions, period);
  const totalRev = filtered.reduce((s, t) => s + t.total, 0);
  const totalTrx = filtered.length;
  const avgTrx = totalTrx ? Math.round(totalRev / totalTrx) : 0;

  document.getElementById('stats-grid').innerHTML = `
    <div class="stat-card"><div class="stat-card-label">Total Pendapatan</div><div class="stat-card-value" style="color:var(--accent)">${fmt(totalRev)}</div><div class="stat-card-sub">${totalTrx} transaksi</div></div>
    <div class="stat-card"><div class="stat-card-label">Total Transaksi</div><div class="stat-card-value">${totalTrx}</div><div class="stat-card-sub">Rata-rata ${fmt(avgTrx)}/trx</div></div>
    <div class="stat-card"><div class="stat-card-label">Pendapatan Bersih (est.)</div><div class="stat-card-value" style="color:var(--success)">${fmt(Math.round(totalRev * 0.85))}</div><div class="stat-card-sub">Setelah komisi ~15%</div></div>
    <div class="stat-card"><div class="stat-card-label">Item Terjual</div><div class="stat-card-value">${filtered.reduce((s,t) => s+t.items.reduce((a,i)=>a+i.qty,0),0)}</div><div class="stat-card-sub">Total item</div></div>
  `;

  // Recent transactions
  document.getElementById('recent-transactions').innerHTML = filtered.slice(0,8).map(t =>
    `<div class="trx-item"><div><div style="font-weight:600;font-size:13px">${escapeHTML(t.customer)}</div><div style="font-size:11px;color:var(--muted)">${escapeHTML(t.invoice)} &middot; ${new Date(t.date).toLocaleDateString('id-ID')}</div></div><div style="font-weight:700;color:var(--accent)">${fmt(t.total)}</div></div>`
  ).join('') || '<div style="color:var(--muted);font-size:13px;padding:16px 0">Tidak ada data</div>';

  // Top services
  const itemCount = {};
  filtered.forEach(t => t.items.forEach(i => { itemCount[i.name] = (itemCount[i.name]||0) + i.qty; }));
  const sorted = Object.entries(itemCount).sort((a,b)=>b[1]-a[1]).slice(0,8);
  document.getElementById('top-services').innerHTML = sorted.map(([name,qty]) =>
    `<div class="top-item"><span>${escapeHTML(name)}</span><span style="font-weight:600;color:var(--accent)">${qty}x</span></div>`
  ).join('') || '<div style="color:var(--muted);font-size:13px;padding:16px 0">Belum ada data</div>';
}

function filterByPeriod(trxs, period) {
  const now = new Date();
  return trxs.filter(t => {
    const d = new Date(t.date);
    if (period === 'today') return d.toDateString() === now.toDateString();
    if (period === 'week') return (now - d) <= 7*864e5;
    if (period === 'month') return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    return true;
  });
}

// ===== HISTORY =====
function renderHistory() {
  const q = (document.getElementById('history-search').value||'').toLowerCase();
  const filtered = transactions.filter(t => !q || t.customer.toLowerCase().includes(q) || t.invoice.toLowerCase().includes(q));
  const tbody = document.getElementById('history-tbody');
  tbody.innerHTML = filtered.map(t => `
    <tr>
      <td style="font-weight:600;color:var(--accent)">${escapeHTML(t.invoice)}</td>
      <td>${escapeHTML(t.customer)}</td>
      <td style="color:var(--muted);font-size:12px">${escapeHTML(t.items.map(i=>i.name+(i.qty>1?' x'+i.qty:'')).join(', '))}</td>
      <td style="font-weight:700">${fmt(t.total)}</td>
      <td><span style="background:var(--surface2);padding:3px 10px;border-radius:20px;font-size:12px">${escapeHTML(t.payment)}</span></td>
      <td style="color:var(--muted);font-size:12px">${new Date(t.date).toLocaleString('id-ID')}</td>
      <td><button class="btn-icon" onclick='showReceiptById("${escapeHTML(t.id)}")'>Lihat</button></td>
    </tr>`).join('') || '<tr><td colspan="7" style="text-align:center;padding:30px;color:var(--muted)">Belum ada transaksi</td></tr>';
}

function showReceiptById(id) {
  const t = transactions.find(t => t.id === id);
  if (t) { lastReceipt = t; showReceipt(t); }
}

// ===== EXPORT =====
function exportCSV() {
  const header = 'Invoice,Pelanggan,Item,Total,Pembayaran,Tanggal';
  const rows = transactions.map(t => [
    t.invoice, t.customer,
    t.items.map(i=>i.name+' x'+i.qty).join(' | '),
    t.total, t.payment,
    new Date(t.date).toLocaleString('id-ID')
  ].join(','));
  const csv = [header,...rows].join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'glam-pos-' + new Date().toISOString().split('T')[0] + '.csv';
  a.click();
  toast('CSV berhasil diexport!', 'success');
}

// ===== UTILS =====
function fmt(n) { return 'Rp ' + Math.round(n).toLocaleString('id-ID'); }

function generateInvoice() {
  const d = new Date().toISOString().split('T')[0].replace(/-/g,'');
  return 'INV-' + d + '-' + Math.floor(1000+Math.random()*9000);
}

function toast(msg, type='') {
  const wrap = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'toast-item ' + type;
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

function closeModal(e) { e.target.classList.remove('open'); }

function updateChips() {
  const today = new Date().toDateString();
  const todayTrx = transactions.filter(t => new Date(t.date).toDateString() === today);
  document.getElementById('chip-trx').textContent = todayTrx.length;
  document.getElementById('chip-rev').textContent = fmt(todayTrx.reduce((s,t)=>s+t.total,0)).replace('Rp ','');
}

// ===== INIT =====
window.onload = () => {
  document.getElementById('today-date').textContent = new Date().toLocaleDateString('id-ID', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  // Add logout button to sidebar footer
  const footer = document.querySelector('.sidebar-footer');
  if (footer) {
    const btn = document.createElement('button');
    btn.textContent = 'Keluar';
    btn.style.cssText = 'width:100%;padding:8px;margin-top:10px;border-radius:8px;border:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;font-size:13px;';
    btn.onmouseover = () => btn.style.color = 'var(--danger)';
    btn.onmouseout = () => btn.style.color = 'var(--muted)';
    btn.onclick = logout;
    footer.appendChild(btn);
  }
};
