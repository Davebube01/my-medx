import {
  useState,
  useEffect,
  useRef,
  type FC,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Input } from "../../../components/ui/input";
import { ArrowUpRight, Search, TrendingUp } from "lucide-react";
import { Button } from "../../../components/ui/button";

export interface Drug {
  id: number;
  name: string;
  category: string;
  strength: string;
  form: string;
}

interface DrugSearchBarProps {
  onSearch?: (value: string) => void;
  searchValue?: string;
  isSearching?: boolean;
  onSuggestionSelect?: (drug: Drug) => void;
}

const DrugSearchBar: FC<DrugSearchBarProps> = ({
  onSearch,
  searchValue = "",
  isSearching = false,
  onSuggestionSelect,
}) => {
  const [localSearchValue, setLocalSearchValue] = useState<string>(searchValue);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Drug[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number | null>(null);

  // Mock drug suggestions
  const drugDatabase: Drug[] = [
    {
      id: 1,
      name: "Aspirin",
      category: "Pain Relief",
      strength: "325mg",
      form: "Tablet",
    },
    {
      id: 2,
      name: "Ibuprofen",
      category: "Pain Relief",
      strength: "200mg",
      form: "Tablet",
    },
    {
      id: 3,
      name: "Acetaminophen",
      category: "Pain Relief",
      strength: "500mg",
      form: "Tablet",
    },
    {
      id: 4,
      name: "Insulin",
      category: "Diabetes",
      strength: "100 units/mL",
      form: "Injection",
    },
    {
      id: 5,
      name: "Metformin",
      category: "Diabetes",
      strength: "500mg",
      form: "Tablet",
    },
    {
      id: 6,
      name: "Lisinopril",
      category: "Blood Pressure",
      strength: "10mg",
      form: "Tablet",
    },
    {
      id: 7,
      name: "Amlodipine",
      category: "Blood Pressure",
      strength: "5mg",
      form: "Tablet",
    },
    {
      id: 8,
      name: "Atorvastatin",
      category: "Cholesterol",
      strength: "20mg",
      form: "Tablet",
    },
    {
      id: 9,
      name: "Omeprazole",
      category: "Acid Reflux",
      strength: "20mg",
      form: "Capsule",
    },
    {
      id: 10,
      name: "Albuterol",
      category: "Asthma",
      strength: "90mcg",
      form: "Inhaler",
    },
  ];

  const popularSearches: string[] = [
    "Aspirin",
    "Ibuprofen",
    "Insulin",
    "Blood pressure medication",
    "Allergy medicine",
  ];

  useEffect(() => {
    setLocalSearchValue(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchValue(value);

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounced search suggestions
    debounceRef.current = setTimeout(() => {
      if (value.trim().length > 0) {
        const filtered = drugDatabase
          .filter(
            (drug) =>
              drug.name.toLowerCase().includes(value.toLowerCase()) ||
              drug.category.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 5);
        setSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (localSearchValue.trim() && onSearch) {
      onSearch(localSearchValue.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (drug: Drug) => {
    setLocalSearchValue(drug.name);
    setShowSuggestions(false);
    if (onSuggestionSelect) {
      onSuggestionSelect(drug);
    }
    if (onSearch) {
      onSearch(drug.name);
    }
  };

  const handlePopularSearchClick = (searchTerm: string) => {
    setLocalSearchValue(searchTerm);
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search for drugs, medications, or conditions..."
            value={localSearchValue}
            onChange={handleInputChange}
            className="pl-12 pr-4 py-6 text-lg"
            disabled={isSearching}
            onFocus={() => {
              if (
                localSearchValue.trim().length > 0 &&
                suggestions.length > 0
              ) {
                setShowSuggestions(true);
              }
            }}
          />
          <Search
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          {isSearching && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        <Button
          type="submit"
          variant="default"
          size="lg"
          disabled={!localSearchValue.trim() || isSearching}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Search
        </Button>
      </form>

      {/* Search Suggestions Dropdown */}
      {showSuggestions &&
        (suggestions.length > 0 || localSearchValue.trim().length === 0) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
            {suggestions.length > 0 ? (
              <div>
                <div className="px-4 py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-600">
                    Drug Suggestions
                  </span>
                </div>
                {suggestions.map((drug) => (
                  <button
                    key={drug.id}
                    onClick={() => handleSuggestionClick(drug)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">
                          {drug.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {drug.strength} • {drug.form} • {drug.category}
                        </div>
                      </div>
                      <ArrowUpRight size={16} className="text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <div className="px-4 py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-600">
                    Popular Searches
                  </span>
                </div>
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearchClick(search)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <TrendingUp size={16} className="text-gray-500" />
                      <span className="text-gray-900">{search}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default DrugSearchBar;
