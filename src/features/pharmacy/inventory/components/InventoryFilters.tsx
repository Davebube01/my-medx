import { Search, X } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Input } from "../../../../components/ui/input";

type StockFilterType = "low" | "adequate" | "overstocked" | "";

type SelectOption = {
  value: string;
  label: string;
};

type InventoryFiltersProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  stockFilter: StockFilterType;
  onStockFilterChange: (value: StockFilterType) => void;
  onClearFilters: () => void;
};

export default function InventoryFilters({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  stockFilter,
  onStockFilterChange,
  onClearFilters,
}: InventoryFiltersProps) {
  const categoryOptions: SelectOption[] = [
    { value: "all", label: "All Categories" },
    { value: "Pain Relief", label: "Pain Relief" },
    { value: "Antibiotics", label: "Antibiotics" },
    { value: "Cardiovascular", label: "Cardiovascular" },
    { value: "Diabetes", label: "Diabetes" },
    { value: "Respiratory", label: "Respiratory" },
    { value: "Gastrointestinal", label: "Gastrointestinal" },
    { value: "Neurological", label: "Neurological" },
    { value: "Vitamins & Supplements", label: "Vitamins & Supplements" },
  ];

  const stockFilterOptions: SelectOption[] = [
    { value: "all", label: "All Stock Levels" },
    { value: "low", label: "Low Stock" },
    { value: "adequate", label: "Adequate Stock" },
    { value: "overstocked", label: "Overstocked" },
  ];

  const hasActiveFilters: boolean = Boolean(
    searchTerm || categoryFilter || stockFilter
  );

  return (
    <div className="bg-white border border-border rounded-lg p-4 healthcare-shadow mb-6">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4">
        {/* Search Input */}
        <div className="flex-1 lg:max-w-md">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search drugs by name, brand, or category..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onSearchChange(e?.target?.value)
              }
              className="pl-10 outline-none focus:outline-none"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="lg:w-48">
          <Select value={categoryFilter} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Stock Level Filter */}
        <div className="lg:w-48">
          <Select
            value={stockFilter}
            onValueChange={(value) =>
              onStockFilterChange(value as StockFilterType)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by stock level" />
            </SelectTrigger>
            <SelectContent>
              {stockFilterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button variant="outline" size="default" onClick={onClearFilters}>
            <X />
            Clear Filters
          </Button>
        )}
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-text-secondary">Active filters:</span>

            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                Search: "{searchTerm}"
                <button
                  onClick={() => onSearchChange("")}
                  className="ml-2 hover:text-primary/80"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {categoryFilter && (
              <span className="inline-flex items-center px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                Category:{" "}
                {
                  categoryOptions?.find((opt) => opt?.value === categoryFilter)
                    ?.label
                }
                <button
                  onClick={() => onCategoryChange("")}
                  className="ml-2 hover:text-secondary/80"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {stockFilter && (
              <span className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                Stock:{" "}
                {
                  stockFilterOptions?.find((opt) => opt?.value === stockFilter)
                    ?.label
                }
                <button
                  onClick={() => onStockFilterChange("")}
                  className="ml-2 hover:text-accent/80"
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
