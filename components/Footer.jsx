export default function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className=" mx-auto px-6 py-4 flex justify-center text-sm text-gray-500">
        <div>
          © {new Date().getFullYear()} Quotaku. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
