"use client";

import { IconButton } from "@material-tailwind/react";

export default function DropboxImage() {
  return (
    <div className="relative w-full flex flex-col gap-2 p-4 border border-gray-100 rounded-2xl shadow-md">
      {/* 이미지 */}
      <div>
        <img
          src="/images/cutedog.jpeg"
          className="w-full aspect-square rounded-2xl"
        />
      </div>
      {/* 이미지 제목 */}
      <div>강아지.jpg</div>
      {/* 추후에 미션 여기다가 날짜 넣어야 할듯 */}
      {/* <div>날짜</div> */}
      <div className="absolute right-4 top-4">
        <IconButton onClick={() => {}} color="red">
          <i className="fas fa-trash" />
        </IconButton>
      </div>
    </div>
  );
}
