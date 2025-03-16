"use client";

import { IconButton } from "@material-tailwind/react";
import { getImageUrl } from "utils/supabase/storage";

export default function DropboxImage({ image }) {
  return (
    <div className="relative w-full flex flex-col gap-2 p-4 border border-gray-100 rounded-2xl shadow-md">
      {/* 이미지 */}
      <div>
        <img
          src={getImageUrl(image.name)}
          className="w-full aspect-square rounded-2xl"
        />
      </div>
      {/* 이미지 제목 */}
      <div>{image.name}</div>
      <div>`생성일: ${image.created_at}`</div>
      <div>`수정일: ${image.updated_at}`</div>
      <div className="absolute right-4 top-4">
        <IconButton onClick={() => {}} color="red">
          <i className="fas fa-trash" />
        </IconButton>
      </div>
    </div>
  );
}
