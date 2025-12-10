import React from "react";

export default function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex px-2 py-1 text-xs bg-accent rounded text-accent-foreground">{children}</span>;
}
