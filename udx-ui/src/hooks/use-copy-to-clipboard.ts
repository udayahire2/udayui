import { useState, useEffect } from "react";

export function UseCopyToClipboard() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  return isMounted;
}
