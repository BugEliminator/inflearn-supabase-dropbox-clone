"use client";

import DropboxImageList from "components/dropbox-image-list";
import FileDragDropZone from "components/file-dragdropZone";
import Logo from "components/logo";
import SearchComponent from "components/search-component";
import { useState } from "react";

export default function UI() {
  const [searchInput, setSerchInput] = useState("");

  return (
    <main className="w-full p-4 flex flex-col gap-4">
      {/* 로고 */}
      <Logo />
      {/* 검색 컴포넌트 */}
      <SearchComponent
        searchInput={searchInput}
        setSearchInput={setSerchInput}
      />
      {/* 파일 드래그엔드롭 */}
      <FileDragDropZone />
      {/* 이미지 리스트 */}
      <DropboxImageList searchInput={searchInput} />
    </main>
  );
}
