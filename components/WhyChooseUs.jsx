import {
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  CustomerServiceOutlined,
  GiftOutlined,
} from "@ant-design/icons";

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">
          Mengapa TopUp di <span className="text-amber-600">Quotaku</span>
        </h2>

        <div className="grid grid-cols-1 mt-8 md:grid-cols-2 gap-x-16 gap-y-10">
          {/* Item 1 */}
          <div className="flex gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 text-2xl">
              <GiftOutlined />
            </div>
            <div>
              <div className="font-semibold text-lg">Penawaran Menarik</div>
              <p className="text-gray-500 text-sm">
                Selalu memberikan penawaran menarik dan diskon untuk produk-produk kami untukmu.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 text-2xl">
              <ThunderboltOutlined />
            </div>
            <div>
              <div className="font-semibold text-lg">Proses Cepat</div>
              <p className="text-gray-500 text-sm">
                Setiap produk yang kamu beli akan kamu dapatkan secara cepat kurang dari 10 menit.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 text-2xl">
              <CustomerServiceOutlined />
            </div>
            <div>
              <div className="font-semibold text-lg">
                Dukungan 24/7 tanpa kenal waktu
              </div>
              <p className="text-gray-500 text-sm">
                Tim kami akan selalu siap sedia membantu kamu 7 hari 24 jam tanpa kenal waktu.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 text-2xl">
              <SafetyCertificateOutlined />
            </div>
            <div>
              <div className="font-semibold text-lg">
                Pembayaran aman, jaminan uang kembali
              </div>
              <p className="text-gray-500 text-sm">
                Jaminan pembayaran yang aman dan mudah dengan jaminan uang kembali.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
