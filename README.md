# Quotaku 🚀

Aplikasi Web Pembelian Paket Data Internet Sederhana

---

## 🛠️ Tech Stack

- **Frontend**: Next.js
- **UI Library**: Ant Design + Tailwind CSS
- **Backend API**: REST API (`/users`, `/packages`, `/transactions`, `/banners`)
- **Database**: JSON Server / API Service (mock / backend service)

---

## 📦 Instalasi & Menjalankan Project

1. Clone repository:

   ```bash
   git clone https://github.com/username/quotaku.git
   cd quotaku

   ```

2. Install dependencies:

   ```bash
    npm install

   ```

3. Jalankan development server:

   ```bash
    npx json-server --watch db.json --port 3001
    npm run dev

   ```

4. Buka di browser:

   ```bash
    http://localhost:3000

   ```

5. Akun demo:
   ```bash
    {
   "email": "user@test.com",
   "password": "123456"
   }
   ```


🧭 Flow UX (Alur Penggunaan Aplikasi)
1️⃣ Halaman Login / Register

User Flow:

User membuka halaman login

Jika belum punya akun → klik Daftar

User mengisi email & password

Jika login berhasil → diarahkan ke Dashboard



2️⃣ Dashboard (Beranda)

Yang ditampilkan:

Banner promo

Paket terpopuler

Ringkasan transaksi terakhir user



3️⃣ Pilih Paket Data

User Flow:

User memilih paket data dari daftar

Sistem menampilkan detail paket (kuota, harga, masa aktif)



4️⃣ Input Nomor HP (Customer)

User Flow:

User memasukkan nomor tujuan (number only)

Klik lanjut → muncul menu pembayaran



5️⃣ Pembayaran (Tanpa Pindah Halaman / AJAX)

User Flow:

User memilih metode pembayaran

Klik bayar

Sistem memproses transaksi tanpa reload halaman

Status transaksi ditampilkan



6️⃣ Riwayat Transaksi

User Flow:

User membuka menu Transaksi

Sistem menampilkan hanya transaksi milik user tersebut


7️⃣ Logout

User Flow:

User klik avatar di header

Pilih logout
