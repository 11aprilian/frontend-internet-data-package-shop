"use client";

import { Form, Input, Button, message, Card } from "antd";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { setAuthCookie } from "@/lib/auth";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const res = await api.get("/users", {
        params: {
          email: values.email,
          password: values.password,
        },
      });

      if (res.data.length > 0) {
        const user = res.data[0];
        setAuthCookie(user);

        message.success("Login berhasil!");
        router.push("/dashboard");

        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      } else {
        message.error("Email atau password salah");
      }
    } catch (error) {
      message.error("Gagal terhubung ke server");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left */}
      <div className="hidden md:flex flex-col justify-center px-16 text-white relative overflow-hidden bg-gradient-to-br from-blue-600 via-amber-600 to-cyan-700">
        <h1 className="text-5xl font-bold mb-4">Quotaku.</h1>
        <h2 className="text-2xl font-semibold mb-4">
          Beli Paket Data Tanpa Ribet
        </h2>
        <p className="text-white/90 leading-relaxed max-w-lg">
          Quotaku adalah platform pembelian paket data internet yang cepat,
          aman, dan praktis. Kamu bisa memilih berbagai paket sesuai kebutuhan,
          cek riwayat transaksi, dan langsung aktif tanpa perlu keluar rumah.
          Cukup login, pilih paket favoritmu, dan nikmati koneksi internet tanpa
          hambatan.
        </p>

        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-white/10 rounded-full" />
        <div className="absolute top-20 -right-24 w-[300px] h-[300px] bg-white/10 rounded-full" />
      </div>

      {/* Right */}
      <div className="flex items-center justify-center bg-gray-50 px-6">
        <Card className="w-full max-w-md shadow-2xl rounded-xl border-none">
          <h1 className="text-2xl font-bold text-center mb-2 text-amber-600">
            Masuk ke Quotaku
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Login untuk membeli paket data internet favoritmu
          </p>

          <Form layout="vertical" onFinish={onFinish}>
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
              rules={[{ required: true, message: "Password wajib diisi" }]}
            >
              <Input.Password placeholder="******" />
            </Form.Item>

            <Button
              htmlType="submit"
              block
              className="!bg-amber-600 hover:!bg-amber-500 !text-white"
            >
              Login
            </Button>
          </Form>

          <p className="text-center text-xs text-gray-400 mt-8">
            © {new Date().getFullYear()} Quotaku. All rights reserved.
          </p>
          <p className="text-center text-xs text-gray-400 mt-8">
            Belum punya akun?
            <Link href="/register" className="!text-amber-600">
              Daftar
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
