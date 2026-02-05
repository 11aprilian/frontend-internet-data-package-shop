"use client";

import { Form, Input, Button, message, Card } from "antd";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const payload = {
        id: Date.now().toString(), 
        email: values.email,
        password: values.password,
        name: values.name,
      };

      await api.post("/users", payload);

      message.success("Registrasi berhasil! Silakan login.");
      router.push("/login");
    } catch (error) {
      message.error("Gagal melakukan registrasi");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left */}
      <div className="hidden md:flex flex-col justify-center px-16 text-white relative overflow-hidden bg-gradient-to-br from-amber-600 via-cyan-600 to-amber-700">
        <h1 className="text-5xl font-bold mb-4">Quotaku.</h1>
        <h2 className="text-2xl font-semibold mb-4">
          Daftar & Nikmati Kemudahan Internet
        </h2>
        <p className="text-white/90 leading-relaxed max-w-lg">
          Dengan akun Quotaku, kamu bisa membeli paket data internet dengan cepat,
          memantau riwayat transaksi, dan mendapatkan akses ke berbagai promo menarik.
          Proses pendaftaran singkat, sekali daftar langsung bisa digunakan kapan saja.
        </p>

        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-white/10 rounded-full" />
        <div className="absolute top-20 -right-24 w-[300px] h-[300px] bg-white/10 rounded-full" />
      </div>

      {/* Right */}
      <div className="flex items-center justify-center bg-gray-50 px-6">
        <Card className="w-full max-w-md shadow-2xl rounded-xl border-none">
          <h1 className="text-2xl font-bold text-center mb-2 text-amber-600">
            Daftar Akun Quotaku
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Buat akun baru untuk mulai membeli paket data internet
          </p>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Nama"
              name="name"
              rules={[{ required: true, message: "Nama wajib diisi" }]}
            >
              <Input placeholder="Nama lengkap" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email wajib diisi" },
                { type: "email", message: "Format email tidak valid" },
              ]}
            >
              <Input placeholder="user@quotaku.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Password wajib diisi" },
                { min: 6, message: "Password minimal 6 karakter" },
              ]}
            >
              <Input.Password placeholder="******" />
            </Form.Item>

            <Button
              htmlType="submit"
              block
              className="!bg-amber-600 hover:!bg-amber-500 !text-white"
            >
              Daftar
            </Button>
          </Form>

          <p className="text-center text-xs text-gray-400 mt-6">
            © {new Date().getFullYear()} Quotaku. All rights reserved.
          </p>
          <p className="text-center text-xs text-gray-400 mt-8">
            Sudah punya akun? 
            <Link href="/login" className="!text-amber-600">
              Login
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
