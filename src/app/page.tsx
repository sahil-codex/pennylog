import Image from "next/image";
import Link from "next/link";
export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-4xl font-bold">PennyLog</h1>
      <p className="text-gray-500">Track your expense easily</p>
      <div className="flex gap-4">

        <Link href="/login" className="bg-blue-500 text-white px-6 py-2 rounded">Login</Link>
        <Link href="/register" className="bg-green-500 text-white px-6 py-2 rounded">Register</Link>
        
      </div>
    </div>
  );
}
