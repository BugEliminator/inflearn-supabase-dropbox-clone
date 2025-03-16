"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

function sanitizeFileName(fileName: string) {
  return fileName
    .normalize("NFKD") // 유니코드 정규화
    .replace(/[^\w.-]/g, "_") // 특수 문자 제거
    .replace(/\s+/g, "_") // 공백을 `_`로 변경
    .toLowerCase(); // 소문자로 변환
}

export async function uploadFile(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const file = formData.get("file") as File | null;

  if (!file) {
    console.error("❌ 업로드할 파일이 없습니다.");
    throw new Error("파일이 없습니다.");
  }

  // 파일 이름을 안전한 형식으로 변환
  const safeFileName = sanitizeFileName(file.name);
  console.log("✅ 변환된 파일 이름:", safeFileName);

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .upload(safeFileName, file, { upsert: true });

  if (error) {
    console.error("❌ Supabase 업로드 실패:", error.message);
    throw new Error(error.message);
  }

  return data;
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
