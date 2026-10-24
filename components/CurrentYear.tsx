
"use client";

import { useEffect, useState } from "react";

export default function CurrentYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (year === null) {
    return <span>© VerBytesnBits</span>;
  }

  return <span>© {year} VerBytesnBits</span>;
}
