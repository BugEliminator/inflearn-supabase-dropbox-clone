"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function uploadFile(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const files = Array.from(formData.entries())
    .map(([name, file]) => file as File)
    .filter((file) => file instanceof File && file.name); // undefined 파일 제거;

  // ✅ 파일명 변환 함수 추가 (특수 문자 제거)
  function sanitizeFileName(fileName: string) {
    return fileName
      .normalize("NFC") // 한글 깨짐 방지
      .replace(/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_.-]/g, "_"); // 특수 문자 제거
  }

  const results = await Promise.all(
    files.map(async (file) => {
      const safeFileName = sanitizeFileName(file.name);
      const { data, error } = await supabase.storage
        .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
        .upload(safeFileName, file, { upsert: true });

      if (error) {
        console.error("❌ Supabase 업로드 실패:", error.message);
        throw new Error(error.message);
      }
      return data;
    })
  );

  return results;
}

/*
upsert = 업데이트와 인서트를 합친말
만약 파일이름으로 파일이 존재하면 업데이트해주고, 아니라면 인서트해줌
*/

export async function searchFiles(search: string = "") {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .list(null, { search });
  handleError(error);

  return data;
}

export async function deleteFile(fileName: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .remove([fileName]);

  handleError(error);

  return data;
}
