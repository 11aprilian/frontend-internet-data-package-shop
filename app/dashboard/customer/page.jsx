"use client";

import { useEffect, useRef, useState } from "react";
import { Card, Input, Button, Tag, message } from "antd";
import { api } from "@/lib/api";
import { parseCookies } from "nookies";

export default function CustomerPage() {
  const [phone, setPhone] = useState("");
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingBuy, setLoadingBuy] = useState(false);

  // filter
  const [filterType, setFilterType] = useState("semua");
  const paymentRef = useRef(null);

  useEffect(() => {
    api.get("/packages").then((res) => setPackages(res.data));

    const cookies = parseCookies();
    if (cookies.auth_user) {
      setUser(JSON.parse(cookies.auth_user));
    }
  }, []);

  const filteredPackages = packages.filter((pkg) => {
    if (filterType === "semua") return true;
    return pkg.type === filterType;
  });

  const handleSelectPackage = (pkg) => {
    if (!phone) {
      message.warning("Masukkan nomor HP terlebih dahulu");
      return;
    }
    setSelectedPackage(pkg);
    setShowPayment(true);
    setTimeout(() => {
      paymentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleBuy = async () => {
    if (!paymentMethod) {
      message.warning("Pilih metode pembayaran");
      return;
    }

    setLoadingBuy(true);

    const payload = {
      user_id: user.id,
      package_id: selectedPackage.id,
      package_name: `${selectedPackage.name} ${selectedPackage.quota}${selectedPackage.unit}`,
      price: selectedPackage.price,
      date: new Date().toISOString().slice(0, 10),
      status: "SUCCESS",
      phone,
      payment_method: paymentMethod,
    };

    await api.post("/transactions", payload);

    message.success("Pembelian berhasil!");

    setLoadingBuy(false);
    setSelectedPackage(null);
    setShowPayment(false);
    setPaymentMethod(null);
    setPhone("");
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Nomor HP */}
      <Card>
        <div className="font-semibold mb-2">Masukkan Nomor HP</div>
        <Input
          placeholder="08xxxxxxxxxx"
          value={phone}
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={(e) => {
            const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
            setPhone(onlyNumber);
          }}
          maxLength={15}
        />
      </Card>

      {/* Paket */}
      <Card
        title={
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-4">
            <div>Pilih Paket Data</div>
            <div className="flex gap-2 flex-wrap">
              {["semua", "harian", "mingguan", "bulanan"].map((type) => (
                <Button
                  key={type}
                  size="small"
                  type={filterType === type ? "primary" : "default"}
                  onClick={() => setFilterType(type)}
                >
                  {type === "semua"
                    ? "Semua"
                    : type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => handleSelectPackage(pkg)}
              className={`border border-amber-200 rounded-xl p-4 cursor-pointer transition
                ${
                  selectedPackage?.id === pkg.id
                    ? "border-amber-500 bg-amber-50"
                    : "hover:border-amber-400"
                }`}
            >
              <div className="flex justify-between items-center">
                <div className="font-semibold">{pkg.name}</div>
                <Tag color="blue">{pkg.badge}</Tag>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Kuota: {pkg.quota} {pkg.unit} • {pkg.duration} Hari
              </div>
              <div className="mt-2 font-bold text-amber-600">
                Rp {pkg.price.toLocaleString("id-ID")}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pembayaran */}
      {showPayment && (
        <div ref={paymentRef}>
          <Card title="Pilih Pembayaran">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {["QRIS", "GOPAY", "SHOPEEPAY", "ALFAMART"].map((m) => (
                <div
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={`border border-amber-200 rounded-lg p-4 cursor-pointer flex justify-between
                    ${
                      paymentMethod === m
                        ? "border-amber-500 bg-amber-50"
                        : "hover:border-amber-400"
                    }`}
                >
                  <span>{m}</span>
                  <span className="font-semibold text-amber-600">
                    Rp {selectedPackage.price.toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Action */}
      {showPayment && (
        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            size="large"
            shape="round"
            loading={loadingBuy}
            onClick={handleBuy}
          >
            Beli Sekarang
          </Button>
        </div>
      )}
    </div>
  );
}
