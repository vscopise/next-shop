import Link from "next/link";

export const Footer = () => {
  return <div className="flex justify-center w-full text-xs mb-5">
    <Link href="/">
        <span>Next Shop | </span>
        <span>© {new Date().getFullYear()}</span>
    </Link>
  </div>
};
