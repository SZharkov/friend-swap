import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from "../public/vectors/logo.svg";

export default function Header() {
  return (
    <div className="sticky top-0 z-50">
      {/* Main header */}
      <div className="flex justify-between h-16 px-4 items-center bg-[#001A31] gap-3">
        <div>
          <Link href="/" className="hover:opacity-70 transition-opacity">
            <Image
              className="w-[190px]"
              src={logo}
              alt="FriendSwap logo"
              priority
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ConnectButton/>
        </div>
      </div>
    </div>
  );
}
