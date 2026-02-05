"use client";

import { useEffect, useState } from "react";
import { Spin, Tag, Empty } from "antd";
import { api } from "@/lib/api";
import { parseCookies } from "nookies";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookies = parseCookies();
    const authUser = cookies.auth_user ? JSON.parse(cookies.auth_user) : null;

    api.get("/transactions")
      .then((res) => {
        if (authUser) {
          const myTransactions = res.data.filter(
            (trx) => trx.user_id === authUser.id
          );
          setTransactions(myTransactions);
        } else {
          setTransactions([]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!transactions.length) {
    return <Empty description="Belum ada transaksi" />;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-xl font-semibold mb-4">Riwayat Transaksi</h1>

      <div className="space-y-3">
        {transactions.map((trx) => (
          <div
            key={trx.id}
            className="bg-white rounded-xl p-4 border border-amber-200 flex justify-between items-center"
          >
            {/* Left */}
            <div>
              <p className="font-medium">{trx.package_name}</p>
              <p className="text-xs">{trx.phone}</p>
              <p className="text-xs text-gray-500">
                {new Date(trx.date).toLocaleDateString("id-ID")}
              </p>
            </div>

            {/* Right */}
            <div className="text-right">
              <p className="font-semibold">
                Rp {trx.price.toLocaleString("id-ID")}
              </p>
              <Tag color={trx.status === "SUCCESS" ? "green" : "orange"}>
                {trx.status}
              </Tag>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
