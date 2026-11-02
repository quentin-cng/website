"use client";
import dynamic from "next/dynamic";
const Journey = dynamic(() => import("../components/journey/Journey"), {
  ssr: false,
  loading: () => (
    <div className="loading">
      THE JOURNEY<span>Preparing your arrival</span>
    </div>
  ),
});
export default function Page() {
  return <Journey />;
}
