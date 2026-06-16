import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-32 text-center">
      <p className="mb-4 text-6xl">404</p>
      <h1 className="mb-2 text-2xl font-bold">الصفحة غير موجودة</h1>
      <Link href="/" className="mt-6 text-gold hover:underline">
        العودة للرئيسية
      </Link>
    </div>
  );
}
