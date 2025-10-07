import { Project } from '../lib/supabase';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Modern Villa',
    slug: 'modern-villa',
    category: 'Konut',
    description: 'Temiz çizgiler ve açık mekanlar sunan çağdaş bir villa',
    full_description: 'Bu çarpıcı modern villa, çağdaş tasarım ile fonksiyonel yaşam arasındaki mükemmel dengeyi sergiliyor. Üç kata yayılan rezidans, iç mekanı doğal ışıkla dolduran tavandan tabana pencereler sayesinde iç ve dış mekanlar arasında kusursuz bir bağlantı oluşturuyor. Minimalist estetik, özenle seçilmiş mobilyalar ve sofistikasyonu yansıtan nötr bir renk paletiyle tamamlanıyor. Üst düzey kaplamalar, özel dolaplar ve entegre akıllı ev teknolojisi bu villayı modern yaşamın bir başyapıtı haline getiriyor.',
    location: 'İstanbul, Bebek',
    year: '2023',
    area: '450 m²',
    main_image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    gallery_images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    featured: true,
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  },
  {
    id: '2',
    title: 'Şehir İçi Loft',
    slug: 'urban-loft',
    category: 'Konut',
    description: 'Şehrin kalbinde endüstriyel-şık bir loft',
    full_description: 'Bu şehir içi loft dönüşümü, tarihi bir endüstriyel binaya yeni bir hayat üflüyor. Açıkta bırakılmış tuğla duvarlar, orijinal çelik kirişler ve cilalı beton zeminler özgün bir endüstriyel estetik yaratırken, modern müdahaleler sıcaklık ve konfor katıyor. Açık plan düzeni, cömert tavan yüksekliğini maksimize ediyor; asma kat ise mekan hissini feda etmeden farklı alanlar oluşturuyor. Özel çelik ve ahşap elemanlar, vintage aydınlatma armatürleri ve özenle seçilmiş sanat eserleri bu sofistike şehir sığınağını tamamlıyor.',
    location: 'İstanbul, Karaköy',
    year: '2023',
    area: '280 m²',
    main_image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
    gallery_images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1909791/pexels-photo-1909791.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    featured: true,
    created_at: '2023-02-01',
    updated_at: '2023-02-01'
  },
  {
    id: '3',
    title: 'Butik Otel',
    slug: 'boutique-hotel',
    category: 'Ticari',
    description: 'Geleneksel ve modernliği harmanlayan lüks bir butik otel',
    full_description: 'Bu butik otel projesi, Osmanlı mirasının ve çağdaş tasarımın benzersiz bir karışımıyla lüks misafirperverliği yeniden yorumluyor. 24 odanın her biri, özel tasarım mobilyalar, yerel kaynaklı malzemeler ve Türk zanaatkarlığının hikayesini anlatan el yapımı detaylarla donatılmış. Kamusal alanlar, dramatik aydınlatma enstalasyonları, özel mermer işçiliği ve özenle seçilmiş sanat koleksiyonları sergiliyor. Samimi lobi barından panoramik şehir manzaralı çatı terasına kadar her mekan, unutulmaz misafir deneyimleri yaratmak için tasarlandı.',
    location: 'İstanbul, Sultanahmet',
    year: '2022',
    area: '1200 m²',
    main_image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
    gallery_images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    featured: true,
    created_at: '2022-12-01',
    updated_at: '2022-12-01'
  },
  {
    id: '4',
    title: 'Kurumsal Ofis',
    slug: 'corporate-office',
    category: 'Ticari',
    description: 'İşbirliği ve yaratıcılık için tasarlanmış modern bir çalışma alanı',
    full_description: 'Bu kurumsal ofis tasarımı, geleneksel işyeri kurallarından uzaklaşarak yaratıcılığı, işbirliğini ve refahı teşvik eden bir ortam yaratıyor. 800 metrekarelik alan, esnek çalışma bölgeleri, özel odaklanma alanları ve farklı çalışma tarzlarına uyum sağlayan dinamik toplantı mekanları sunuyor. Yaşayan duvarlar ve doğal malzemeler dahil biyofilik tasarım öğeleri, hava kalitesini ve çalışan memnuniyetini artırıyor. Akustik çözümler, ergonomik mobilyalar ve gelişmiş teknoloji altyapısı hem konfor hem de üretkenliği garanti ediyor.',
    location: 'İstanbul, Maslak',
    year: '2023',
    area: '800 m²',
    main_image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1200',
    gallery_images: [
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    featured: true,
    created_at: '2023-03-01',
    updated_at: '2023-03-01'
  },
  {
    id: '5',
    title: 'Lüks Daire',
    slug: 'luxury-apartment',
    category: 'Konut',
    description: 'Boğaz manzaralı zarif bir daire',
    full_description: 'Boğaz\'ın üzerinde yükseklerde konumlanan bu lüks daire, nefes kesen manzaraların tadını çıkarırken aşağıdaki hareketli şehirden samimi bir sığınak sunuyor. İç tasarım, krem, gri ve altın vurgulardan oluşan sofistike bir paletle rafine zarafeti vurguluyor. Özel marangozluk, İtalyan mermer yüzeyler ve tasarım aydınlatma, mekan boyunca lüks katmanlar oluşturuyor. Ana süit, ısıtmalı zeminler ve bağımsız küvetle spa benzeri bir banyoya sahipken, şefin mutfağı en üst düzey cihazlar ve özel dolaplarla donatılmış.',
    location: 'İstanbul, Etiler',
    year: '2023',
    area: '320 m²',
    main_image: 'https://images.pexels.com/photos/2029665/pexels-photo-2029665.jpeg?auto=compress&cs=tinysrgb&w=1200',
    gallery_images: [
      'https://images.pexels.com/photos/2029665/pexels-photo-2029665.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    featured: true,
    created_at: '2023-04-01',
    updated_at: '2023-04-01'
  },
  {
    id: '6',
    title: 'Restoran Tasarımı',
    slug: 'restaurant-design',
    category: 'Ticari',
    description: 'Akdeniz etkilerini taşıyan çağdaş bir yemek deneyimi',
    full_description: 'Bu restoran tasarımı, Akdeniz yemek kültürünün özünü çağdaş bir bakış açısıyla yakalıyor. 350 metrekarelik alan, her biri kendi karakterine sahip samimi yemek bölgelerine ayrılırken görsel bütünlük korunuyor. Traverten, meşe ve pirinç gibi doğal malzemeler sıcaklık yaratırken, stratejik aydınlatma tasarımı atmosferi gündüzden geceye dönüştürüyor. Açık mutfak konsepti, misafirlerin mutfak deneyimiyle bağlantı kurmasını sağlarken, özel tasarım mobilyalar sofistike estetiği tehlikeye atmadan konfor sunuyor.',
    location: 'İstanbul, Nişantaşı',
    year: '2022',
    area: '350 m²',
    main_image: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1200',
    gallery_images: [
      'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    featured: true,
    created_at: '2022-11-01',
    updated_at: '2022-11-01'
  }
];
