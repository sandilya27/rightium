"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function CloseArticle() {
  const router = useRouter();

  const close = () => {
    // App-router navigation does not update document.referrer, so history is
    // the reliable way to return to the card that initiated the transition.
    if (window.history.length > 1) router.back();
    else router.push("/blog");
  };

  return (
    <button
      type="button"
      onClick={close}
      className="inline-flex items-center gap-2 border-b border-accent-bright/70 pb-1 font-medium text-white transition-[gap,color] duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:gap-3 [@media(hover:hover)_and_(pointer:fine)]:hover:text-accent-bright"
    >
      <ArrowLeft className="size-4" />
      Close article
    </button>
  );
}
