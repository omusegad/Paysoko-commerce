import Link from "next/link";

export default function Home() {
  return (
    <div className="text-black">
     <Link href="/login" className="px-2 py-6 text-lg text-black border ">Go to login</Link>
    </div>
  );
}
