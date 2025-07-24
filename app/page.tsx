"use client";

import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { IoMdFootball } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
// import { FiShoppingCart } from "react-icons/fi";
import { useState } from "react";

const JERSEYS = [
  {
    id: "home",
    name: "Jersey Home Persipura 24/25",
    img: "/jersey1.png",
    price: 499000,
    label: "Home",
  },
  {
    id: "away",
    name: "Jersey Away Persipura 24/25",
    img: "/jersey2.png",
    price: 499000,
    label: "Away",
  },
];
const MODELS = [
  { id: "pendek", label: "Lengan Pendek" },
  { id: "panjang", label: "Lengan Panjang" },
  { id: "kiper", label: "Kiper" },
];
const SIZES = ["S", "M", "L", "XL", "2XL", "3XL"];
const DELIVERIES = [
  { id: "jne", label: "JNE" },
  { id: "sicepat", label: "SiCepat" },
  { id: "jnt", label: "J&T" },
  { id: "anteraja", label: "AnterAja" },
];

type CartItem = {
  id: number;
  variant: string;
  model: string;
  size: string;
  name: string;
  img: string;
  price: number;
};

// Add fixture data and team logos
const FIXTURES = [
  {
    id: 1,
    type: "LIGA 2",
    date: "Sabtu, 20 Juli 2024",
    time: "19:00",
    stadium: "Stadion Mandala",
    home: { name: "Persipura", logo: "/persipura-logo.png" },
    away: { name: "Persija", logo: "/pl2.png" },
    score: "2 - 1",
    finished: true,
    button: "Ulasan Pertandingan",
  },
  {
    id: 2,
    type: "LIGA 2",
    date: "Sabtu, 27 Juli 2024",
    time: "16:00",
    stadium: "Stadion Mandala",
    home: { name: "Persipura", logo: "/persipura-logo.png" },
    away: { name: "PSM", logo: "/pl2.png" },
    score: null,
    finished: false,
    button: "Info Tiket",
  },
  {
    id: 3,
    type: "LIGA 2",
    date: "Minggu, 3 Agustus 2024",
    time: "18:30",
    stadium: "Stadion Mandala",
    home: { name: "Persipura", logo: "/persipura-logo.png" },
    away: { name: "Arema", logo: "/pl2.png" },
    score: null,
    finished: false,
    button: "Info Tiket",
  },
  {
    id: 4,
    type: "LIGA 2",
    date: "Sabtu, 10 Agustus 2024",
    time: "20:00",
    stadium: "Stadion Mandala",
    home: { name: "Persipura", logo: "/persipura-logo.png" },
    away: { name: "Bali United", logo: "/pl2.png" },
    score: null,
    finished: false,
    button: "Info Tiket",
  },
];

export default function Home() {
  // Cart and shop state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [delivery, setDelivery] = useState(DELIVERIES[0].id);
  
  // Mobile menu state
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowMobileMenu(false);
  };

  // Jersey selection state
  const [selectedVariant, setSelectedVariant] = useState("home");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const selectedJersey = JERSEYS.find(j => j.id === selectedVariant)!;

  function handleAddToCart() {
    if (!selectedJersey || !selectedModel || !selectedSize) return;
    setCart([
      ...cart,
      {
        id: Date.now(),
        variant: selectedJersey.id,
        model: selectedModel,
        size: selectedSize,
        name: selectedJersey.name,
        img: selectedJersey.img,
        price: selectedJersey.price,
      },
    ]);
    setSelectedModel("");
    setSelectedSize("");
    setShowCart(true);
  }

  function handleRemoveFromCart(id: number) {
    setCart(cart.filter(item => item.id !== id));
  }

  function handleCheckout() {
    setShowCart(false);
    setShowCheckout(true);
  }

  function handlePay() {
    setCart([]);
    setShowCheckout(false);
    setShowSuccess(true);
  }

  function handleAddCollectionToCart(img: string, name: string) {
    setCart([
      ...cart,
      {
        id: Date.now(),
        variant: 'collection',
        model: 'pendek',
        size: 'M',
        name,
        img,
        price: 299000, // Example price for collection items
      },
    ]);
    setShowCart(true);
  }

  return (
    <>
      {/* Navbar with Cart Icon */}
      <nav className="bg-black text-white py-4 px-6 lg:px-12 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <Image
                src="/persipura-logo.png"
                alt="Persipura Logo"
                width={40}
                height={40}
              />
              <div className="text-2xl font-bold text-white">PERSIPURA JAYAPURA</div>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-yellow-400 transition-colors">BERANDA</a>
              {/* <a href="#" className="hover:text-yellow-400 transition-colors">TIM</a> */}
              <a href="#" className="hover:text-yellow-400 transition-colors">BERITA</a>
              {/* <a href="#" className="hover:text-yellow-400 transition-colors">TIKET</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">TOKO</a> */}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* <button
              className="relative"
              onClick={() => setShowCart(v => !v)}
              aria-label="Keranjang Belanja"
            >
              <FiShoppingCart className="h-7 w-7" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {cart.length}
                </span>
              )}
            </button> */}
            <button 
              className="md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <HiOutlineMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50">
          <div className="bg-white h-full w-80 shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Image
                  src="/persipura-logo.png"
                  alt="Persipura Logo"
                  width={32}
                  height={32}
                />
                <div className="text-xl font-bold text-black">PERSIPURA</div>
              </div>
              <button 
                onClick={() => setShowMobileMenu(false)}
                className="text-2xl text-gray-400 hover:text-black"
              >
                &times;
              </button>
            </div>
            <nav className="space-y-4">
              {/* <a 
                href="#" 
                className="block py-3 text-black font-semibold border-b border-gray-200 hover:text-yellow-600 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                BERANDA
              </a> */}
              <a 
                href="#" 
                className="block py-3 text-black font-semibold border-b border-gray-200 hover:text-yellow-600 transition-colors"
                onClick={() => scrollToSection('news')}
              >
                BERITA
              </a>
              {/* <a 
                href="#" 
                className="block py-3 text-black font-semibold border-b border-gray-200 hover:text-yellow-600 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                JERSEY
              </a> */}
              <a 
                href="#" 
                className="block py-3 text-black font-semibold border-b border-gray-200 hover:text-yellow-600 transition-colors"
                onClick={() => scrollToSection('schedule')}
              >
                JADWAL
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Drawer/Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold">Keranjang Belanja</h4>
              <button onClick={() => setShowCart(false)} className="text-2xl text-gray-400 hover:text-black">&times;</button>
            </div>
            {cart.length === 0 ? (
              <div className="text-gray-500 flex-1 flex items-center justify-center">Keranjang kosong.</div>
            ) : (
              <>
                <ul className="divide-y divide-gray-200 mb-4 flex-1 overflow-y-auto">
                  {cart.map(item => (
                    <li key={item.id} className="flex items-center gap-4 py-2">
                      <Image src={item.img} alt={item.name} width={48} height={64} className="rounded" />
                      <div className="flex-1">
                        <div className="font-semibold text-black">{item.name}</div>
                        <div className="text-sm text-gray-500">Model: {MODELS.find(m => m.id === item.model)?.label}, Ukuran: {item.size}</div>
                      </div>
                      <div className="font-bold text-black">Rp{item.price.toLocaleString("id-ID")}</div>
                      <button onClick={() => handleRemoveFromCart(item.id)} className="ml-2 text-red-600 hover:text-red-800">Hapus</button>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end">
                  <button
                    className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-500"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-black" onClick={() => setShowCheckout(false)}>&times;</button>
            <h4 className="text-2xl font-bold mb-4">Checkout</h4>
            <ul className="divide-y divide-gray-200 mb-4">
              {cart.map(item => (
                <li key={item.id} className="flex items-center gap-4 py-2">
                  <Image src={item.img} alt={item.name} width={40} height={54} className="rounded" />
                  <div className="flex-1">
                    <div className="font-semibold text-black">{item.name}</div>
                    <div className="text-sm text-gray-500">Model: {MODELS.find(m => m.id === item.model)?.label}, Ukuran: {item.size}</div>
                  </div>
                  <div className="font-bold text-black">Rp{item.price.toLocaleString("id-ID")}</div>
                </li>
              ))}
            </ul>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-black mb-1">Pilih Pengiriman</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={delivery}
                onChange={e => setDelivery(e.target.value)}
              >
                {DELIVERIES.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-red-700 text-white font-bold px-6 py-2 rounded hover:bg-red-800"
                onClick={handlePay}
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl relative text-center">
            <h4 className="text-2xl font-bold mb-4 text-green-700">Pembayaran Berhasil!</h4>
            <p className="mb-4">Terima kasih telah berbelanja di Persipura Store.<br />Pesanan Anda sedang diproses.</p>
            <button
              className="bg-black text-white font-bold px-6 py-2 rounded hover:bg-gray-800"
              onClick={() => setShowSuccess(false)}
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 overflow-hidden">
          {/* Full background squad image, low opacity */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
            <Image
              src="/hero.png"
              alt="Persipura Squad"
              fill
              style={{ objectFit: 'cover', opacity: 0.20 }}
              className=""
              priority={false}
            />
          </div>
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="relative z-20 h-full flex items-center justify-center">
            <div className="text-center text-white px-6">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center mb-4 p-6">
                  <Image
                    src="/persipura-logo.png"
                    alt="Persipura Logo"
                    width={120}
                    height={120}
                  />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-yellow-400">PERSIPURA</span> JAYAPURA
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                Mutiara Hitam Papua - Kebanggaan Tanah Papua! Bergabunglah dengan keluarga Persipura dan rasakan semangat sepak bola Indonesia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                  onClick={() => scrollToSection('news')}
                >
                  BERITA TERKINI
                </button>
                <button className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                  onClick={() => scrollToSection('schedule')}
                >
                  LIHAT JADWAL
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce">
              <IoMdFootball className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
        </section>


        {/* Score Section */}
        <section className="w-full bg-red-700 md:bg-black py-10 px-4 flex flex-col items-center">
          <div className="w-full max-w-md mx-auto flex flex-col items-center">
            <div className="flex items-center justify-center w-full mb-4 gap-6">
              <Image
                src="/persipura-logo.png"
                alt="Persipura Logo"
                width={48}
                height={48}
              />
              <div className="text-4xl md:text-5xl font-extrabold text-white text-center leading-tight flex-1">
                PERSIPURA <span className="text-yellow-400">2</span> - <span className="text-yellow-400">1</span> PERSIBO
              </div>
              <Image
                src="/persibo.png"
                alt="Persibo Logo"
                width={48}
                height={48}
              />
            </div>
            <div className="my-6 border-t-4 border-white w-full"></div>
            <div className="text-white text-lg md:text-xl font-semibold tracking-wide text-left md:text-center">
              CUPLIKAN PERTANDINGAN
            </div>
          </div>
        </section>

                {/* News Section */}
                <section id="news" className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-black">BERITA TERBARU</h2>
              <a href="#" className="text-black text-sm font-semibold border-b border-black hover:text-yellow-600 transition-colors">Lihat Semua</a>
            </div>
            {/* Recommended image size: 300x400px or 600x800px (3:4 ratio, portrait) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* News Card 1 */}
              <div className="bg-white">
                <div className="aspect-[3/4] w-full relative rounded-lg overflow-hidden mb-4">
                  <Image src="/news1.png" alt="Berita 1" fill style={{objectFit:'cover'}} className="" />
                </div>
                <div className="text-xs text-gray-500 font-semibold mb-1">LIGA 2 — 2 jam lalu</div>
                <div className="text-black text-lg font-bold">Persipura Siap Hadapi Laga Penting di Mandala</div>
              </div>
              {/* News Card 2 */}
              <div className="bg-white">
                <div className="aspect-[3/4] w-full relative rounded-lg overflow-hidden mb-4">
                  <Image src="/news2.png" alt="Berita 2" fill style={{objectFit:'cover'}} className="" />
                </div>
                <div className="text-xs text-gray-500 font-semibold mb-1">TRANSFER — 3 jam lalu</div>
                <div className="text-black text-lg font-bold">Pemain Baru Resmi Bergabung dengan Persipura</div>
              </div>
              {/* News Card 3 */}
              <div className="bg-white">
                <div className="aspect-[3/4] w-full relative rounded-lg overflow-hidden mb-4">
                  <Image src="/news3.png" alt="Berita 3" fill style={{objectFit:'cover'}} className="" />
                </div>
                <div className="text-xs text-gray-500 font-semibold mb-1">KLUB — 5 jam lalu</div>
                <div className="text-black text-lg font-bold">Latihan Intensif Jelang Derby Papua</div>
              </div>
              {/* News Card 4 */}
              <div className="bg-white">
                <div className="aspect-[3/4] w-full relative rounded-lg overflow-hidden mb-4">
                  <Image src="/news4.png" alt="Berita 4" fill style={{objectFit:'cover'}} className="" />
                </div>
                <div className="text-xs text-gray-500 font-semibold mb-1">SUPPORTER — 6 jam lalu</div>
                <div className="text-black text-lg font-bold">Dukungan Suporter Membanjiri Stadion Mandala</div>
              </div>
            </div>
          </div>
        </section>


        {/* Sponsor Section - Animated, Black Background, White Logos */}
        <section className="py-12 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="sr-only">Sponsor Kami</h2>
            </div>
            <div className="relative">
              {/* Animated sponsor logos */}
              <div className="overflow-hidden">
                <div className="flex gap-24 animate-sponsor-scroll items-center">
                  {/* Replace these with <Image> and your real sponsor logos */}
                  <span className="block w-48 h-16 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">Gate.io</span>
                  </span>
                  <span className="block w-48 h-16 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">U-Power</span>
                  </span>
                  <span className="block w-48 h-16 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">QATAR AIRWAYS</span>
                  </span>
                  <span className="block w-48 h-16 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">visit QATAR</span>
                  </span>
                  {/* Repeat for seamless loop */}
                  <span className="block w-48 h-16 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">Gate.io</span>
                  </span>
                  <span className="block w-48 h-16 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">U-Power</span>
                  </span>
                  <span className="block w-48 h-16 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">QATAR AIRWAYS</span>
                  </span>
                  <span className="block w-48 h-16 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">visit QATAR</span>
                  </span>
                </div>
              </div>
              {/* Semua partner link */}
              <div className="mt-8">
                <a href="#" className="text-white text-lg font-semibold border-b-2 border-white pb-1 inline-block hover:text-yellow-400 transition-colors">Sponsor Kami</a>
              </div>
            </div>
          </div>
        </section>

       



        {/* Jersey Shop Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">2024/25 Jersey Persipura</h2>

            {/* Personalisation row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-gray-50 rounded-xl p-8 mb-8">
              {/* Large Jersey Image */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-[260px] aspect-[3/4] relative">
                  <Image src={selectedJersey.img} alt={selectedJersey.name} fill style={{objectFit:'cover'}} className="rounded-xl" />
                </div>
                <div className="mt-4 text-2xl font-bold text-black">Rp{selectedJersey.price.toLocaleString("id-ID")}</div>
              </div>
              {/* Personalisation Form */}
              <div>
                <h3 className="text-2xl font-bold text-black mb-4">Personalisasi Jersey 24/25 Anda</h3>
                <div className="mb-4 flex items-center">
                  <span className="font-semibold text-black mr-2">Varian:</span>
                  {JERSEYS.map(jersey => (
                    <button
                      key={jersey.id}
                      className={`flex flex-col items-center justify-center mx-1 bg-white rounded-full border-4 ${selectedVariant === jersey.id ? "border-red-700" : "border-gray-200"} w-20 h-20 p-1 transition-all`}
                      onClick={() => { setSelectedVariant(jersey.id); setSelectedModel(""); setSelectedSize(""); }}
                    >
                      <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
                        <Image src={jersey.img} alt={jersey.label} width={56} height={56} className="object-contain" />
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-black mb-1">Model Jersey</label>
                  <div className="flex gap-2">
                    {MODELS.map(model => (
                      <button
                        key={model.id}
                        className={`px-4 py-2 rounded border font-semibold ${selectedModel === model.id ? "bg-black text-white" : "bg-white text-black border-gray-300"}`}
                        onClick={() => { setSelectedModel(model.id); setSelectedSize(""); }}
                      >
                        {model.label}
                      </button>
                    ))}
                  </div>
                </div>
                {selectedModel && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-black mb-1">Ukuran</label>
                    <div className="flex gap-2 flex-wrap">
                      {SIZES.map(size => (
                        <button
                          key={size}
                          className={`px-4 py-2 rounded border font-semibold ${selectedSize === size ? "bg-black text-white" : "bg-white text-black border-gray-300"}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-2 mb-4">
                  <button className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 rounded" disabled>Kustomisasi</button>
                  <button
                    className={`flex-1 font-semibold py-2 rounded transition-colors ${selectedModel && selectedSize ? "bg-red-700 text-white hover:bg-red-800" : "bg-gray-300 text-gray-400 cursor-not-allowed"}`}
                    disabled={!(selectedModel && selectedSize)}
                    onClick={handleAddToCart}
                  >
                    Tambah ke Keranjang
                  </button>
                </div>
                <div className="text-xs text-gray-500 mb-2">Pengiriman Standar & Ekspres Tersedia</div>
                <div className="text-xs text-gray-400">Maaf, tidak dapat mengembalikan jersey dengan nama/nomor custom.</div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">Belanja Koleksi Kami</h2>
            <div className="flex gap-8 overflow-x-auto pb-4">
              {/* Collection Card 1 */}
              <div className="min-w-[320px] max-w-[340px] bg-white rounded-2xl shadow flex flex-col items-start p-4">
                <div className="aspect-[3/4] w-full relative rounded-lg overflow-hidden mb-4">
                  <div className="absolute top-4 left-4 bg-white text-black text-xs font-bold rounded-full px-4 py-2 shadow">New In</div>
                  <Image src="/jersey1.png" alt="Koleksi Jersey" fill style={{objectFit:'cover'}} className="" />
                </div>
                <div className="text-xl font-bold text-black mb-2">Koleksi Jersey</div>
                <button
                  className="w-full mt-auto bg-red-700 text-white font-semibold py-2 rounded hover:bg-red-800 transition-colors"
                  onClick={() => handleAddCollectionToCart('/jersey1.png', 'Koleksi Jersey')}
                >
                  Tambah ke Keranjang
                </button>
              </div>
              {/* Collection Card 2 */}
              <div className="min-w-[320px] max-w-[340px] bg-white rounded-2xl shadow flex flex-col items-start p-4">
                <div className="aspect-[3/4] w-full relative rounded-lg overflow-hidden mb-4">
                  <div className="absolute top-4 left-4 bg-white text-black text-xs font-bold rounded-full px-4 py-2 shadow">New In</div>
                  <Image src="/jersey2.png" alt="Koleksi Streetwear" fill style={{objectFit:'cover'}} className="" />
                </div>
                <div className="text-xl font-bold text-black mb-2">Koleksi Streetwear</div>
                <button
                  className="w-full mt-auto bg-red-700 text-white font-semibold py-2 rounded hover:bg-red-800 transition-colors"
                  onClick={() => handleAddCollectionToCart('/jersey2.png', 'Koleksi Streetwear')}
                >
                  Tambah ke Keranjang
                </button>
              </div>
              {/* Collection Card 3 */}
              <div className="min-w-[320px] max-w-[340px] bg-white rounded-2xl shadow flex flex-col items-start p-4">
                <div className="aspect-[3/4] w-full relative rounded-lg overflow-hidden mb-4">
                  <div className="absolute top-4 left-4 bg-white text-black text-xs font-bold rounded-full px-4 py-2 shadow">New In</div>
                  <Image src="/jersey2.png" alt="Koleksi Anak Kecil" fill style={{objectFit:'cover'}} className="" />
                </div>
                <div className="text-xl font-bold text-black mb-2">Koleksi Anak Kecil</div>
                <button
                  className="w-full mt-auto bg-red-700 text-white font-semibold py-2 rounded hover:bg-red-800 transition-colors"
                  onClick={() => handleAddCollectionToCart('/jersey2.png', 'Koleksi Anak Kecil')}
                >
                  Tambah ke Keranjang
                </button>
              </div>
              {/* Collection Card 4 */}
              <div className="min-w-[320px] max-w-[340px] bg-white rounded-2xl shadow flex flex-col items-start p-4">
                <div className="aspect-[3/4] w-full relative rounded-lg overflow-hidden mb-4">
                  <div className="absolute top-4 left-4 bg-white text-black text-xs font-bold rounded-full px-4 py-2 shadow">New In</div>
                  <Image src="/jersey1.png" alt="Koleksi Kemeja" fill style={{objectFit:'cover'}} className="" />
                </div>
                <div className="text-xl font-bold text-black mb-2">Koleksi Kemeja</div>
                <button
                  className="w-full mt-auto bg-red-700 text-white font-semibold py-2 rounded hover:bg-red-800 transition-colors"
                  onClick={() => handleAddCollectionToCart('/jersey1.png', 'Koleksi Kemeja')}
                >
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </section>

         {/* Stats Section */}
         <section className="py-16 px-6 lg:px-12 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Statistik Klub
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">4</div>
                <div className="text-gray-300">Gelar Liga Indonesia</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">2</div>
                <div className="text-gray-300">Piala Indonesia</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">1963</div>
                <div className="text-gray-300">Tahun Berdiri</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">60+</div>
                <div className="text-gray-300">Tahun Sejarah</div>
              </div>
            </div>
          </div>
        </section>


        {/* Fixtures Section */}
        <section id="schedule" className="py-12 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-black">JADWAL PERTANDINGAN</h2>
              <a href="#" className="text-black text-sm font-semibold border-b border-black hover:text-yellow-600 transition-colors">Semua Jadwal</a>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {FIXTURES.map(match => (
                <div key={match.id} className="min-w-[300px] max-w-[320px] bg-white rounded-2xl shadow flex flex-col items-center px-6 py-8 mx-1">
                  <div className="text-xs font-bold text-red-700 mb-2 uppercase tracking-widest">{match.type}</div>
                  <div className="text-sm text-gray-700 mb-1">{match.date}</div>
                  <div className="text-sm text-gray-500 mb-2">{match.time}, {match.stadium}</div>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="flex flex-col items-center">
                      <Image src={match.home.logo} alt={match.home.name} width={40} height={40} className="object-contain" />
                    </div>
                    {match.finished ? (
                      <div className="text-lg font-bold bg-gray-900 text-white rounded px-3 py-1">{match.score}</div>
                    ) : (
                      <div className="text-lg font-bold bg-gray-200 text-gray-900 rounded px-3 py-1">{match.time}</div>
                    )}
                    <div className="flex flex-col items-center">
                      <Image src={match.away.logo} alt={match.away.name} width={40} height={40} className="object-contain" />
                    </div>
                  </div>
                  <div className="text-xs text-gray-700 font-bold mb-4">
                    {match.home.name} <span className="text-gray-400">vs</span> {match.away.name}
                  </div>
                  <button className="w-full border-2 border-black rounded-full py-2 text-black font-semibold hover:bg-black hover:text-white transition-colors">
                    {match.button}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src="/persipura-logo.png"
                    alt="Persipura Logo"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <h3 className="text-2xl font-bold text-yellow-400">PERSIPURA JAYAPURA</h3>
                </div>
                <p className="text-gray-300 mb-4">
                Didirikan pada tahun 1963, Persipura merupakan salah satu klub sepak bola paling legendaris di Indonesia dengan sejarah yang kaya dan penuh prestasi.
Persipura memiliki basis suporter terbesar di Indonesia Timur dan menjadi simbol kebanggaan serta identitas bagi masyarakat Papua, didukung oleh catatan prestasi yang mengesankan berupa empat gelar juara liga Indonesia.
Dikenal dengan julukan “Mutiara Hitam,” Persipura saat ini berkompetisi di Liga 2 Indonesia, dengan tekad kuat untuk kembali ke kasta tertinggi Liga 1 dan merebut kembali kejayaannya di kancah sepak bola nasional.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    <FaFacebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    <FaTwitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    <FaInstagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    <FaYoutube className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    <FaTiktok className="h-6 w-6" />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">KLUB</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-yellow-400 transition-colors">Tentang Kami</a></li>
                  <li><a href="#" className="hover:text-yellow-400 transition-colors">Sejarah</a></li>
                  <li><a href="#" className="hover:text-yellow-400 transition-colors">Stadion</a></li>
                  <li><a href="#" className="hover:text-yellow-400 transition-colors">Manajemen</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">TIM</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-yellow-400 transition-colors">Tim Utama</a></li>
                  <li><a href="#" className="hover:text-yellow-400 transition-colors">Akademi</a></li>
                  <li><a href="#" className="hover:text-yellow-400 transition-colors">Pelatih</a></li>
                  <li><a href="#" className="hover:text-yellow-400 transition-colors">Tim Medis</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">DUKUNGAN</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-yellow-400 transition-colors">Kontak</a></li>
                  <li><a href="#" className="hover:text-yellow-400 transition-colors">Pusat Bantuan</a></li>
                  <li><a href="#" className="hover:text-yellow-400 transition-colors">Kebijakan Privasi</a></li>
                  <li><a href="#" className="hover:text-yellow-400 transition-colors">Ketentuan Layanan</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
              <p>&copy; 2024 Persipura Jayapura. Semua hak dilindungi. Mutiara Hitam Papua!</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
