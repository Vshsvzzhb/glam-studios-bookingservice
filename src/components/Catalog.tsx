import React, { useState } from 'react';
import { 
  Sparkles, 
  Diamond, 
  Droplets, 
  Palette, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Scissors, 
  Eye, 
  Heart, 
  Sprout, 
  Hand,
  ArrowRight
} from 'lucide-react';
import './Catalog.css';

interface CatalogProps {
  onSelectService?: (serviceName: string, price?: number) => void;
}

const Catalog: React.FC<CatalogProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<'eyelash' | 'nail' | 'massage' | 'brow'>('eyelash');

  const handleBookService = (name: string, price?: number) => {
    if (onSelectService) {
      onSelectService(name, price);
    } else {
      window.location.hash = '#/booking';
    }
  };

  return (
    <section id="catalog-section" className="catalog-section-wrapper animate-on-scroll">
      <div className="landing-section-header">
        <div className="section-label-tag">Pricelist & Catalog</div>
        <h2>Layanan & Penawaran Eksklusif</h2>
        <p>
          Nikmati sentuhan perawatan kecantikan presisi dengan bahan premium dan terapis bersertifikasi.
        </p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        {/* Responsive Tabs Navigation */}
        <div className="catalog-tabs-nav">
          <button 
            className={`catalog-tab-btn btn ${activeTab === 'eyelash' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('eyelash')}
          >
            <Sparkles size={16} /> Eyelash Extension
          </button>
          <button 
            className={`catalog-tab-btn btn ${activeTab === 'nail' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('nail')}
          >
            <Diamond size={16} /> Nail Art
          </button>
          <button 
            className={`catalog-tab-btn btn ${activeTab === 'massage' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('massage')}
          >
            <Droplets size={16} /> Massage & Lulur
          </button>
          <button 
            className={`catalog-tab-btn btn ${activeTab === 'brow' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('brow')}
          >
            <Eye size={16} /> Brow Treatment
          </button>
        </div>

        {/* ── 1. EYELASH TAB ── */}
        {activeTab === 'eyelash' && (
          <div className="catalog-tab-content fade-in">
            <div className="catalog-eyelash-card">
              
              <div style={{ textAlign: 'center', marginBottom: '28px', position: 'relative', zIndex: 1 }}>
                <span style={{ 
                  display: 'inline-block', 
                  background: 'linear-gradient(135deg, #c8715f 0%, #e06fa0 100%)', 
                  color: 'white', 
                  padding: '6px 18px', 
                  borderRadius: '20px', 
                  fontWeight: 600, 
                  fontSize: '12px', 
                  letterSpacing: '1.5px', 
                  textTransform: 'uppercase', 
                  marginBottom: '12px', 
                  boxShadow: '0 4px 14px rgba(200, 113, 95, 0.25)' 
                }}>
                  Penawaran Diskon 15%
                </span>
                <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', margin: 0 }}>
                  Koleksi Eyelash Extension
                </h3>
              </div>

              <div className="catalog-eyelash-table-wrapper">
                <table className="catalog-table">
                  <thead>
                    <tr>
                      <th>Tipe Treatment</th>
                      <th>Harga Normal</th>
                      <th style={{ color: 'var(--primary)' }}>Harga Promo (Diskon 15%)</th>
                      <th style={{ textAlign: 'right' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Lashes Single', normal: '125.000', promo: '111.038', priceVal: 111038 },
                      { name: 'Lash Lift & Tint', normal: '175.000', promo: '155.963', priceVal: 155963 },
                      { name: 'Lashes Anime Style', normal: '155.000', promo: '138.863', priceVal: 138863 },
                      { name: 'Lashes YY Premium', normal: '165.000', promo: '148.838', priceVal: 148838 },
                      { name: 'Lashes 3D Volume', normal: '170.000', promo: '153.488', priceVal: 153488 },
                      { name: 'Lashes Volume Set', normal: '175.000', promo: '155.963', priceVal: 155963 },
                      { name: 'Lashes Wispy Textured', normal: '175.000', promo: '155.963', priceVal: 155963 },
                      { name: 'Russian / Bold Volume', normal: '230.000', promo: '204.863', priceVal: 204863 },
                      { name: 'Double Premium Set', normal: '200.000', promo: '178.750', priceVal: 178750 },
                    ].map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: '500', color: 'var(--text-main)' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d4a396', display: 'inline-block', flexShrink: 0 }}></span>
                            {item.name}
                          </span>
                        </td>
                        <td style={{ color: '#a09ba8', textDecoration: 'line-through', fontSize: '13.5px' }}>
                          Rp {item.normal}
                        </td>
                        <td style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '14.5px', background: 'rgba(224, 111, 160, 0.03)' }}>
                          Rp {item.promo}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            className="btn btn-outline"
                            style={{ padding: '6px 14px', fontSize: '11.5px', borderRadius: '20px' }}
                            onClick={() => handleBookService(item.name, item.priceVal)}
                          >
                            Pilih <ArrowRight size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── 2. NAIL ART TAB ── */}
        {activeTab === 'nail' && (
          <div className="catalog-tab-content fade-in">
            <div className="catalog-grid-two">
              {/* Card 1 */}
              <div className="catalog-service-card">
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#faf2ef', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#c8715f', border: '1px solid #ebdcd7' }}>
                  <Droplets size={22} strokeWidth={1.6} />
                </div>
                <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '6px' }}>Polosan Gel</h3>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px', letterSpacing: '-0.5px' }}>75K</div>
                <p style={{ color: '#8a7a70', fontSize: '13px', lineHeight: '1.5', marginBottom: '16px' }}>Aplikasi cat kuku gel premium polos dengan kilau tahan lama tanpa tambahan desain.</p>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ width: '100%', borderRadius: '20px', padding: '8px 16px', fontSize: '12.5px', marginTop: 'auto' }}
                  onClick={() => handleBookService('Polosan Gel Polish', 75000)}
                >
                  Pilih Layanan Ini
                </button>
              </div>

              {/* Card 2 */}
              <div className="catalog-service-card">
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#faf2ef', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#c8715f', border: '1px solid #ebdcd7' }}>
                  <Layers size={22} strokeWidth={1.6} />
                </div>
                <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '6px' }}>Polosan + Kuku Palsu</h3>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px', letterSpacing: '-0.5px' }}>100K</div>
                <p style={{ color: '#8a7a70', fontSize: '13px', lineHeight: '1.5', marginBottom: '16px' }}>Termasuk pemasangan tip kuku presisi dengan aplikasi gel polish kualitas salon.</p>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ width: '100%', borderRadius: '20px', padding: '8px 16px', fontSize: '12.5px', marginTop: 'auto' }}
                  onClick={() => handleBookService('Polosan Gel + Kuku Palsu', 100000)}
                >
                  Pilih Layanan Ini
                </button>
              </div>
            </div>

            {/* Special Promo Card */}
            <div className="catalog-promo-banner">
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px',
                background: 'linear-gradient(135deg, #c8715f 0%, #e06fa0 100%)', 
                color: 'white', 
                padding: '6px 16px', 
                borderRadius: '20px', 
                fontWeight: 600, 
                fontSize: '11.5px', 
                marginBottom: '14px', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px',
                boxShadow: '0 4px 14px rgba(200, 113, 95, 0.25)'
              }}>
                <Sparkles size={13} /> Paket All-In-One Promo
              </span>

              <div style={{ fontSize: '48px', fontWeight: '700', color: '#4a3832', marginBottom: '4px', lineHeight: '1', fontFamily: 'var(--font-serif)', letterSpacing: '-1px' }}>
                150K
              </div>
              <p style={{ color: '#8a7a70', fontSize: '13.5px', marginBottom: '24px', letterSpacing: '0.3px' }}>
                Paket Perawatan Lengkap Termasuk:
              </p>
              
              <div className="catalog-perks-grid">
                {[
                  { icon: Hand, label: 'Free Manicure', desc: 'Pembersihan kutikula & kuku rapi' },
                  { icon: Palette, label: 'Design Simple 10 Jari', desc: 'Bebas pilih motif desain minimalis' },
                  { icon: Layers, label: 'Kuku Palsu Included', desc: 'Pemasangan kuku palsu presisi' },
                  { icon: ShieldCheck, label: 'Finishing Glossy', desc: 'Lapisan top coat ekstra berkilau' }
                ].map((perk, i) => {
                  const IconComp = perk.icon;
                  return (
                    <div key={i} className="catalog-perk-item">
                      <div className="perk-icon-box" style={{ 
                        width: '44px', 
                        height: '44px', 
                        background: '#faf2ef', 
                        borderRadius: '12px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        color: '#c8715f', 
                        marginBottom: '10px',
                        border: '1px solid #f0dfd8',
                        flexShrink: 0
                      }}>
                        <IconComp size={20} strokeWidth={1.6} />
                      </div>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#4a3832', marginBottom: '3px' }}>
                        {perk.label}
                      </div>
                      <div style={{ fontSize: '11px', color: '#8a7a70', lineHeight: '1.35' }}>
                        {perk.desc}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '28px' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: '12px 32px', borderRadius: '30px', fontSize: '14px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(200, 113, 95, 0.3)' }}
                  onClick={() => handleBookService('Paket All-In-One Promo Spesial', 150000)}
                >
                  <Sparkles size={16} /> Pilih Paket 150K Ini
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── 3. MASSAGE TAB ── */}
        {activeTab === 'massage' && (
          <div className="catalog-tab-content fade-in">
            <div className="catalog-massage-card">
              <div className="catalog-massage-header">
                <span style={{ letterSpacing: '2px', fontSize: '11px', textTransform: 'uppercase', marginBottom: '8px', display: 'inline-block', border: '1px solid rgba(255,255,255,0.2)', padding: '4px 14px', borderRadius: '20px', color: '#e8dfd3' }}>
                  Signature Body Care
                </span>
                <h3 style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', color: '#ffffff', margin: '6px 0', letterSpacing: '-0.5px' }}>
                  MASSAGE & LULUR BADAN
                </h3>
                <p style={{ color: '#d4c5b9', fontSize: '13.5px', margin: 0, maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.6' }}>
                  Relaksasi menyeluruh untuk meredakan ketegangan otot, mengangkat sel kulit mati, dan mengembalikan kesegaran tubuh.
                </p>
              </div>

              <div className="catalog-massage-body">
                <div style={{ flex: '1', minWidth: '220px', textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <span style={{ background: '#ede3de', color: '#5a4d46', padding: '4px 12px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 600 }}>NORMAL</span>
                    <span style={{ fontSize: '18px', color: '#a09ba8', textDecoration: 'line-through', fontWeight: 500 }}>Rp 150.000</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ background: '#c8715f', color: 'white', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600 }}>PROMO</span>
                    <div style={{ fontSize: '44px', color: '#2b2523', fontWeight: 700, lineHeight: '1', fontFamily: 'var(--font-serif)' }}>
                      120K
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ borderRadius: '20px', padding: '8px 20px', fontSize: '13px' }}
                    onClick={() => handleBookService('Massage & Lulur Badan Signature', 120000)}
                  >
                    Pilih Treatment Ini
                  </button>
                </div>

                <div className="catalog-massage-perks">
                  {[
                    { icon: Heart, title: 'Deep Massage', desc: 'Meredakan otot tegang' },
                    { icon: Droplets, title: 'Lulur Alami', desc: 'Menutrisi & mencerahkan' },
                    { icon: Sparkles, title: 'Refresh Body', desc: 'Tubuh lebih segar & rileks' },
                    { icon: Clock, title: 'Durasi Penuh', desc: '±60 menit treatment' }
                  ].map((item, i) => {
                    const IconC = item.icon;
                    return (
                      <div key={i} className="catalog-mini-perk">
                        <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#faf2ef', color: '#c8715f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                          <IconC size={17} strokeWidth={1.6} />
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#3a3431', marginBottom: '2px' }}>{item.title}</div>
                          <div style={{ fontSize: '11px', color: '#8a7a70', lineHeight: '1.3' }}>{item.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── 4. BROW TAB ── */}
        {activeTab === 'brow' && (
          <div className="catalog-tab-content fade-in">
            <div className="catalog-grid-two">
              {/* Brow Bomber */}
              <div className="catalog-brow-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ background: '#faf2ef', padding: '4px 12px', borderRadius: '20px', fontWeight: 600, color: '#8a5a4d', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', border: '1px solid #ebdcd7' }}>
                    Fuller & Defined
                  </span>
                </div>

                <h3 style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', color: '#2b2523', marginBottom: '4px', letterSpacing: '-0.5px' }}>BROW BOMBER</h3>
                <p style={{ color: '#8a7a70', fontSize: '13px', marginBottom: '16px', lineHeight: '1.5' }}>Nutrisi intensif untuk alis tampak lebih penuh, tebal, dan terawat alami.</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ background: '#ede3de', color: '#5a4d46', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 600 }}>NORMAL</span>
                  <span style={{ fontSize: '15px', color: '#a09ba8', textDecoration: 'line-through' }}>Rp 250.000</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <span style={{ background: '#c8715f', color: 'white', padding: '4px 10px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 600 }}>PROMO</span>
                  <div style={{ fontSize: '38px', color: '#2b2523', fontWeight: 700, lineHeight: '1', fontFamily: 'var(--font-serif)' }}>185K</div>
                </div>

                <div className="catalog-brow-perks" style={{ marginBottom: '20px' }}>
                  {[
                    { icon: Sprout, label: 'Stimulus Alami', desc: 'Nutrisi akar alis' },
                    { icon: Eye, label: 'Tampak Tebal', desc: 'Efek tebal merata' },
                    { icon: ShieldCheck, label: 'Tahan Lama', desc: 'Aman & presisi' }
                  ].map((perk, i) => {
                    const IconP = perk.icon;
                    return (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '6px' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#faf2ef', border: '1px solid #ebdcd7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c8715f', flexShrink: 0 }}>
                          <IconP size={18} strokeWidth={1.6} />
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: '#3a3431', marginBottom: '1px' }}>{perk.label}</div>
                          <div style={{ fontSize: '10px', color: '#8a7a70', lineHeight: '1.25' }}>{perk.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ width: '100%', borderRadius: '20px', padding: '8px 16px', fontSize: '12.5px', marginTop: 'auto' }}
                  onClick={() => handleBookService('Brow Bomber Signature', 185000)}
                >
                  Pilih Brow Bomber
                </button>
              </div>

              {/* Brow Lamination */}
              <div className="catalog-brow-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ background: '#faf2ef', padding: '4px 12px', borderRadius: '20px', fontWeight: 600, color: '#8a5a4d', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', border: '1px solid #ebdcd7' }}>
                    Fluffy & Sleek
                  </span>
                </div>

                <h3 style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', color: '#2b2523', marginBottom: '4px', letterSpacing: '-0.5px' }}>BROW LAMINATION</h3>
                <p style={{ color: '#8a7a70', fontSize: '13px', marginBottom: '16px', lineHeight: '1.5' }}>Merapikan arah tumbuh alis untuk tampilan fluffy, rapi, dan mudah ditata.</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ background: '#ede3de', color: '#5a4d46', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 600 }}>NORMAL</span>
                  <span style={{ fontSize: '15px', color: '#a09ba8', textDecoration: 'line-through' }}>Rp 195.000</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <span style={{ background: '#c8715f', color: 'white', padding: '4px 10px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 600 }}>PROMO</span>
                  <div style={{ fontSize: '38px', color: '#2b2523', fontWeight: 700, lineHeight: '1', fontFamily: 'var(--font-serif)' }}>150K</div>
                </div>

                <div className="catalog-brow-perks" style={{ marginBottom: '20px' }}>
                  {[
                    { icon: Scissors, label: 'Rapi & Flawless', desc: 'Mudah disisir rapi' },
                    { icon: Sparkles, label: 'Efek Volume', desc: 'Dimensi alis penuh' },
                    { icon: Clock, label: '4-6 Minggu', desc: 'Awet tahan lama' }
                  ].map((perk, i) => {
                    const IconL = perk.icon;
                    return (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '6px' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#faf2ef', border: '1px solid #ebdcd7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c8715f', flexShrink: 0 }}>
                          <IconL size={18} strokeWidth={1.6} />
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: '#3a3431', marginBottom: '1px' }}>{perk.label}</div>
                          <div style={{ fontSize: '10px', color: '#8a7a70', lineHeight: '1.25' }}>{perk.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ width: '100%', borderRadius: '20px', padding: '8px 16px', fontSize: '12.5px', marginTop: 'auto' }}
                  onClick={() => handleBookService('Brow Lamination Fluffy Look', 150000)}
                >
                  Pilih Brow Lamination
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Catalog;
