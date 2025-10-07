import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Project, About, Service, Contact, Hero } from '../lib/supabase';
// @ts-ignore - API module type definition
import { api } from '../lib/api';
import { Menu, X, ArrowRight, Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import serraLogo from '../serra_logo.png';

type AnimatedSectionProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

function AnimatedSection({ children, delay = 0, className = '' }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const variants = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  // Form state (kontrollü inputlar)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // Database data state
  const [projects, setProjects] = useState<Project[]>([]);
  const [about, setAbout] = useState<About | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [contact, setContact] = useState<Contact | null>(null);
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    // Load data from API
    const loadData = async () => {
      try {
        const [heroData, projectsData, aboutData, servicesData, contactData] = await Promise.all([
          api.hero.get(),
          api.projects.get(),
          api.about.get(),
          api.services.get(),
          api.contact.get()
        ]);

        // Filter for featured projects only
        const featuredProjects = projectsData.filter((p: Project) => p.featured);

        setHero(heroData);
        setProjects(featuredProjects);
        setAbout(aboutData);
        setServices(servicesData.sort((a: Service, b: Service) => a.order_index - b.order_index));
        setContact(contactData);
    } catch (error) {
      console.error('Failed to load data from API:', error);
      // API failed while loading - show empty state for now
      alert('Backend sunucusuna bağlanılamıyor. Lütfen npm run server komutunu çalıştırın.');
    }
    };

    loadData();
  }, []);

  // Menü açıkken body scroll lock & ESC ile kapatma
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsMenuOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Route değiştiğinde mobil menüyü kapat
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Slug üretme fonksiyonu (Türkçe karakter desteği)
  const makeSlug = (label: string) => {
    return label
      .toString()
      .normalize('NFD')                 // unicode ayrıştırma
      .replace(/[\u0300-\u036f]/g, '') // diakritik temizleme
      .replace(/İ/g, 'I')              // büyük İ -> I
      .replace(/ı/g, 'i')              // küçük ı -> i
      .replace(/[^\w\s-]/g, '')        // özel karakterleri çıkar
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');           // boşlukları tire yap
  };

  // Nav items: merkezi tanımlama
  const navItems = useMemo(() =>
    ['HAKKIMIZDA', 'PROJELER', 'HİZMETLER', 'İLETİŞİM'].map(label => ({
      label,
      anchor: `#${makeSlug(label)}`
    })), []);

  function handleNavClick(e: React.MouseEvent, to: string) {
    e.preventDefault();
    // iç link ise scroll davranışı
    if (to.startsWith('#')) {
      const el = document.querySelector(to);
      if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate(to);
    }
    setIsMenuOpen(false);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      // TODO: Burayı gerçek API çağrısına bağla. Şimdilik console.log
      console.log('Form gönderiliyor', form);
      // örn: await api.post('/contact', form)
      // show success toast
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      // show error toast
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-stone-200"
        role="navigation"
        aria-label="Ana menü"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.a
              href="/"
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  navigate('/');
                }
              }}
            >
              <img src={serraLogo} alt="Serra Mimarlık" className="h-12 w-auto" />
            </motion.a>

            <div className="hidden md:flex items-center gap-12">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.anchor}
                  onClick={(e) => handleNavClick(e, item.anchor)}
                  className="text-sm tracking-wide text-stone-600 hover:text-stone-900 transition-colors relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-900 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            <button
              ref={menuButtonRef}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="md:hidden text-stone-900"
              onClick={() => setIsMenuOpen(prev => !prev)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-stone-200"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.anchor}
                  onClick={(e) => handleNavClick(e, item.anchor)}
                  className="block text-sm tracking-wide text-stone-600"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${hero?.background_image || "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920"})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            aria-hidden
          />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-light tracking-wider mb-6"
          >
            {hero?.title || 'ZAMANSIZ ESTETİK'}
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl font-light tracking-wide mb-12 text-stone-200"
          >
            {hero?.subtitle || '2010\'dan Beri Olağanüstü İç Mekanlar Yaratıyoruz'}
          </motion.p>

          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              const el = document.querySelector('#projeler');
              if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-stone-900 text-sm tracking-wider transition-all duration-300 group"
            aria-label="Portföyü keşfet"
          >
            PORTFÖYÜ KEŞFET
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.section>

      <section id="hakkimizda" className="py-24 md:py-32 px-6 max-w-7xl mx-auto" style={{ scrollMarginTop: '80px' }}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-light tracking-wide text-stone-900 mb-8">{about?.title || 'Serra Mimarlık Hakkında'}</h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-6">
              {about?.content1 || 'On yılı aşkın deneyimiyle Serra Mimarlık, fonksiyonelliği estetik mükemmellikle kusursuzca harmanlayan sofistike mekanlar yaratma konusunda uzmanlaşmış bir iç mimarlık stüdyosudur.'}
            </p>
            <p className="text-lg text-stone-600 leading-relaxed mb-8">
              {about?.content2 || 'Felsefemiz, her müşterinin benzersiz ihtiyaçlarını anlamak ve vizyonlarını zamana meydan okuyan, titizlikle tasarlanmış iç mekanlara dönüştürmektir.'}
            </p>
            <div className="grid grid-cols-3 gap-8">
              {[
                { value: about?.projects_count || '150+', label: 'PROJE' },
                { value: about?.awards_count || '15', label: 'ÖDÜL' },
                { value: about?.satisfaction_rate || '100%', label: 'MEMNUNİYET' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-light text-stone-900 mb-2">{stat.value}</div>
                  <div className="text-sm tracking-wide text-stone-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative h-96 md:h-full min-h-[500px] overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src={about?.image_url || "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200"}
                alt="Serra Mimarlık stüdyo iç mekan örneği"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="projeler" className="py-24 md:py-32 bg-white" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light tracking-wide text-stone-900 mb-4">Öne Çıkan Projeler</h2>
              <p className="text-lg text-stone-600">En prestijli çalışmalarımızdan özenle seçilmiş bir koleksiyon</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects && projects.length > 0 ? (
              projects.map((project: Project, index: number) => (
                <AnimatedSection key={project.id} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="group cursor-pointer overflow-hidden"
                    onClick={() => navigate(`/project/${project.slug}`)}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') navigate(`/project/${project.slug}`);
                    }}
                    aria-label={`Proje: ${project.title}`}
                  >
                    <div className="relative h-80 overflow-hidden mb-4">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                        src={project.main_image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-stone-900/30 flex items-center justify-center"
                        aria-hidden
                      >
                        <span className="text-white text-sm tracking-wider">PROJEYİ GÖRÜNTÜLE</span>
                      </motion.div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-light tracking-wide text-stone-900 group-hover:text-stone-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm tracking-wider text-stone-500">{project.category}</p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))
            ) : (
              <p className="text-stone-600">Henüz proje bulunmamaktadır.</p>
            )}
          </div>
        </div>
      </section>

      <section id="hizmetler" className="py-24 md:py-32 px-6 max-w-7xl mx-auto" style={{ scrollMarginTop: '80px' }}>
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-wide text-stone-900 mb-4">Hizmetlerimiz</h2>
            <p className="text-lg text-stone-600">Seçici müşteriler için kapsamlı çözümler</p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02, borderColor: '#78716c' }}
                transition={{ duration: 0.3 }}
                className="p-8 border border-stone-200 group"
              >
                <h3 className="text-2xl font-light tracking-wide text-stone-900 mb-4 group-hover:text-stone-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">{service.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section id="iletisim" className="py-24 md:py-32 bg-stone-900 text-white" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-8">Birlikte Olağanüstü Bir Şeyler Yaratalım</h2>
              <p className="text-lg text-stone-300 leading-relaxed mb-12">
                Mekanınızı dönüştürmeye hazır mısınız? Projenizi görüşmek ve vizyonunuzu hayata nasıl geçirebileceğimizi keşfetmek için ekibimizle iletişime geçin.
              </p>

              <div className="space-y-6">
                <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4">
                  <MapPin size={24} className="text-stone-400 mt-1" />
                  <div>
                    <p className="text-stone-300">{contact?.address || 'İstanbul, Türkiye'}</p>
                    <p className="text-stone-400 text-sm">{contact?.city || 'Nişantaşı'}</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4">
                  <Phone size={24} className="text-stone-400" />
                  <p className="text-stone-300">{contact?.phone || '+90 212 XXX XXXX'}</p>
                </motion.div>

                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4">
                  <Mail size={24} className="text-stone-400" />
                  <p className="text-stone-300">{contact?.email || 'info@serramimarlik.net'}</p>
                </motion.div>
              </div>

              <div className="flex gap-6 mt-12">
                <motion.a whileHover={{ scale: 1.2, color: '#ffffff' }} href={contact?.instagram_url || '#'} className="text-stone-400 transition-colors" aria-label="Instagram">
                  <Instagram size={24} />
                </motion.a>
                <motion.a whileHover={{ scale: 1.2, color: '#ffffff' }} href={contact?.linkedin_url || '#'} className="text-stone-400 transition-colors" aria-label="LinkedIn">
                  <Linkedin size={24} />
                </motion.a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <form className="space-y-6" onSubmit={handleSubmit} aria-label="İletişim formu">
                <div>
                  <motion.input
                    whileFocus={{ borderColor: '#ffffff' }}
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="AD SOYAD"
                    className="w-full px-0 py-4 bg-transparent border-b border-stone-700 focus:border-white outline-none text-white placeholder-stone-500 tracking-wider text-sm transition-colors"
                    aria-label="Ad soyad"
                    required
                  />
                </div>
                <div>
                  <motion.input
                    whileFocus={{ borderColor: '#ffffff' }}
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="E-POSTA"
                    className="w-full px-0 py-4 bg-transparent border-b border-stone-700 focus:border-white outline-none text-white placeholder-stone-500 tracking-wider text-sm transition-colors"
                    aria-label="E-posta"
                    required
                  />
                </div>
                <div>
                  <motion.input
                    whileFocus={{ borderColor: '#ffffff' }}
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    type="tel"
                    placeholder="TELEFON"
                    className="w-full px-0 py-4 bg-transparent border-b border-stone-700 focus:border-white outline-none text-white placeholder-stone-500 tracking-wider text-sm transition-colors"
                    aria-label="Telefon"
                  />
                </div>
                <div>
                  <motion.textarea
                    whileFocus={{ borderColor: '#ffffff' }}
                    name="message"
                    value={form.message}
                    onChange={handleInputChange}
                    placeholder="MESAJINIZ"
                    rows={4}
                    className="w-full px-0 py-4 bg-transparent border-b border-stone-700 focus:border-white outline-none text-white placeholder-stone-500 tracking-wider text-sm resize-none transition-colors"
                    aria-label="Mesajınız"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: '#f5f5f4' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 bg-white text-stone-900 text-sm tracking-wider transition-all duration-300 mt-8 disabled:opacity-60"
                  aria-label="Mesaj gönder"
                >
                  {sending ? 'Gönderiliyor...' : 'MESAJ GÖNDER'}
                </motion.button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 bg-stone-950 text-stone-400 text-center">
        <p className="text-sm tracking-wide">© {new Date().getFullYear()} Serra Mimarlık. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}
