import { Heart, MapPin, Search, User, Menu } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';

interface NavbarProps {
  onSearch?: (value: string) => void;
  searchValue?: string;
  isSearching?: boolean;
}

interface SearchBarProps {
  isMobile?: boolean;
  localSearchValue: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSearching?: boolean;
}

// 🔹 SearchBar defined outside Navbar (prevents input from losing focus)
const SearchBar: React.FC<SearchBarProps> = ({
  isMobile = false,
  localSearchValue,
  handleSearchChange,
  handleSearchSubmit,
  isSearching,
}) => (
  <form
    onSubmit={handleSearchSubmit}
    className={`flex items-center gap-2 ${isMobile ? 'w-full' : 'max-w-md w-full'}`}
  >
    <div className="relative flex-1">
      <input
        type="search"
        className="border p-2 pr-10 rounded-md w-full"
        placeholder="Search for drugs, medications..."
        value={localSearchValue}
        onChange={handleSearchChange}
      />
      <Search
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
    <Button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white"
      disabled={!localSearchValue.trim() || isSearching}
    >
      {isSearching ? 'Searching...' : 'Search'}
    </Button>
  </form>
);

export default function Navbar({
  onSearch,
  searchValue = '',
  isSearching = false,
}: NavbarProps) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);

  // 🔹 Sync only when external searchValue truly changes
  useEffect(() => {
    if (searchValue !== localSearchValue) {
      setLocalSearchValue(searchValue);
    }
  }, [searchValue]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch && localSearchValue.trim()) {
      onSearch(localSearchValue.trim());
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(e.target.value);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="bg-blue-500 rounded-lg flex items-center justify-center text-white p-2">
        <MapPin />
      </div>
      <span className="text-xl font-semibold text-foreground">My MedX</span>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/homepage-drug-search" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar
              localSearchValue={localSearchValue}
              handleSearchChange={handleSearchChange}
              handleSearchSubmit={handleSearchSubmit}
              isSearching={isSearching}
            />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="hover:bg-orange-500 hover:text-white">
              <MapPin className="mr-2" size={18} />
              <span>Find Nearby</span>
            </Button>
            <Button variant="ghost" className="hover:bg-orange-500 hover:text-white">
              <Heart className="mr-2" size={18} />
              <span>Favorites</span>
            </Button>
            <Button variant="outline" className="hover:bg-orange-500 hover:text-white" onClick={()=>navigate("auth/register")}>
              <User className="mr-2" size={18} />
              <span>Sign In</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <Menu size={24} />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-2 pb-3">
          <SearchBar
            isMobile
            localSearchValue={localSearchValue}
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
            isSearching={isSearching}
          />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-2">
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  <MapPin className="mr-2" size={18} />
                  Find Nearby Pharmacies
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Heart className="mr-2" size={18} />
                  My Favorites
                </Button>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2" size={18} />
                  Sign In
                </Button>
                <Button
                  variant="default"
                  className="w-full justify-start bg-blue-500 hover:bg-blue-600"
                >
                  Create Account
                </Button>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-1">
                <Button variant="ghost" className="w-full justify-start text-gray-600">
                  Help & Support
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-600">
                  About MedX
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Suggestions */}
      {localSearchValue && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="text-sm text-gray-600 mb-2">Popular searches:</div>
            <div className="flex flex-wrap gap-2">
              {['Aspirin', 'Ibuprofen', 'Acetaminophen', 'Insulin', 'Blood pressure medication'].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setLocalSearchValue(suggestion);
                      if (onSearch) onSearch(suggestion);
                    }}
                    className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white rounded-full text-sm transition-colors"
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
