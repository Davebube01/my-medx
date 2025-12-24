import { useState, type ChangeEvent } from "react";
import { Search } from "lucide-react";
import { MOCK_DRUGS } from "../../data/mockData";
import type { Drug } from "../../types";

interface DrugSearchInputProps {
  onSelect: (drug: Drug) => void;
  placeholder?: string;
  className?: string; // Add className prop for flexibility
}

export const DrugSearchInput = ({
  onSelect,
  placeholder = "Search for a drug...",
  className,
}: DrugSearchInputProps) => {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<Drug[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Simple client-side search against mock data
  // In real app, this might be a debounced API call
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (val.length < 2) {
      setMatches([]);
      setIsOpen(false);
      return;
    }

    const hits = Object.values(MOCK_DRUGS).filter(
      (d) =>
        d.name.toLowerCase().includes(val.toLowerCase()) ||
        d.keywords.some((k) => k.includes(val.toLowerCase()))
    );
    setMatches(hits);
    setIsOpen(true);
  };

  const handleSelect = (drug: Drug) => {
    setQuery("");
    setMatches([]);
    setIsOpen(false);
    onSelect(drug);
  };

  return (
    <div className={`relative ${className || ""}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
          onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay to allow click
        />
      </div>

      {isOpen && matches.length > 0 && (
        <div className="absolute top-full text-black left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-60 overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2 p-1">
          {matches.map((drug) => (
            <button
              key={drug.id}
              onClick={() => handleSelect(drug)}
              className="w-full flex items-start p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900">{drug.name}</p>
                <p className="text-xs text-gray-500">
                  {drug.strength} • {drug.form}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
