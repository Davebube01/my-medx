import { useEffect, useState } from "react";

type Props = {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value = "", onChange, placeholder = "Search..." }: Props) {
  const [q, setQ] = useState(value);

  useEffect(() => setQ(value), [value]);

  useEffect(() => {
    const t = setTimeout(() => onChange?.(q), 300);
    return () => clearTimeout(t);
  }, [q, onChange]);

  return (
    <input
      aria-label="search"
      className="border rounded px-3 py-2 w-full"
      placeholder={placeholder}
      value={q}
      onChange={(e) => setQ(e.target.value)}
    />
  );
}
