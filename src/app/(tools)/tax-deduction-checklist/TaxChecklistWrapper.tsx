"use client";

import dynamic from "next/dynamic";

const TaxChecklistTool = dynamic(() => import("./TaxChecklistTool"), { ssr: false });

export function TaxChecklistWrapper() {
  return <TaxChecklistTool />;
}
