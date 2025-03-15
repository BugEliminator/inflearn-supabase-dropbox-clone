"use client";

import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-1">
      <Image
        src="/images/dropbox_icon.png"
        alt="드롭박스 로고"
        width={50}
        height={50}
        className="!w-8 h-auto"
      />
      <span className="text-xl font-bold">Mini Box</span>
    </div>
  );
}
