"use client";

import { Card, Row, Col, List, Tag, Skeleton, Carousel, Empty } from "antd";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { api } from "@/lib/api";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [popularPackages, setPopularPackages] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookies = parseCookies();
    const authUser = cookies.auth_user;

    if (authUser) {
      setUser(JSON.parse(authUser));
    }

    Promise.all([
      api.get("/transactions"),
      api.get("/packages"),
      api.get("/banners"),
    ]).then(([trxRes, pkgRes, bannerRes]) => {
      const allTransactions = trxRes.data;
      const packages = pkgRes.data;
      const bannersData = bannerRes.data;

      // transaksi terakhir
      const myTransactions = allTransactions.filter(
        (t) => t.user_id === JSON.parse(authUser)?.id,
      );

      // hitung paket terpopuler
      const popularityMap = {};
      allTransactions.forEach((t) => {
        popularityMap[t.package_id] = (popularityMap[t.package_id] || 0) + 1;
      });

      const popular = packages
        .map((p) => ({
          ...p,
          sold: popularityMap[p.id] || 0,
        }))
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 3);

      setTransactions(myTransactions.slice(0, 3));
      setPopularPackages(popular);
      setBanners(bannersData || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-0 overflow-hidden">
        {loading ? (
          <Skeleton.Image active className="!w-full !h-[200px]" />
        ) : banners.length === 0 ? (
          <Empty description="Belum ada banner promo" />
        ) : (
          <Carousel autoplay effect="fade">
            {banners.map((banner) => (
              <div key={banner.id}>
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-[1400px] h-[150px] md:h-[600px] object-cover rounded-lg mx-auto"
                />
              </div>
            ))}
          </Carousel>
        )}
      </div>

      {/* Paket Terpopuler */}
      <Card title="Paket Terpopuler">
        {loading ? (
          <Skeleton active />
        ) : (
          <Row gutter={[16, 16]}>
            {popularPackages.map((pkg) => (
              <Col xs={24} md={8} key={pkg.id}>
                <Card className="hover:shadow-md transition">
                  <div className="text-lg font-semibold">{pkg.name}</div>
                  <div className="text-sm text-gray-500">
                    Kuota: {pkg.quota}GB • {pkg.duration} Hari
                  </div>
                  <div className="mt-2 font-bold text-amber-600">
                    Rp {pkg.price.toLocaleString("id-ID")}
                  </div>
                  <Tag color="green" className="mt-2">
                    Terjual {pkg.sold}x
                  </Tag>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card>

      {/* Transaksi Terbaru */}
      <Card title="Transaksi Terbaru Saya">
        {loading ? (
          <Skeleton active />
        ) : transactions.length === 0 ? (
          <div className="text-gray-500">Belum ada transaksi.</div>
        ) : (
          <div className="space-y-3">
            {transactions.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg hover:shadow-sm transition bg-white"
              >
                <div>
                  <div className="font-semibold">{item.package_name}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString("id-ID")}
                  </div>
                </div>

                <div className="font-bold text-amber-600">
                  Rp {item.price.toLocaleString("id-ID")}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <WhyChooseUs />
    </div>
  );
}
