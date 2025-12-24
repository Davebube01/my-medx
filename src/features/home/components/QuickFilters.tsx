import { Button } from "../../../components/ui/button";
import { type FC, type ComponentType } from "react";
import { X, Lightbulb } from "lucide-react";
import * as LucideIcons from "lucide-react";

type FilterId =
  | "open_now"
  | "24_hours"
  | "has_parking"
  | "drive_through"
  | "delivery"
  | "accepts_insurance";

interface FilterOption {
  id: FilterId;
  label: string;
  icon: keyof typeof LucideIcons;
  description: string;
}

interface QuickFiltersProps {
  activeFilters?: FilterId[];
  onFilterToggle?: (filterId: FilterId) => void;
  resultCount?: number;
  className?: string;
}

const QuickFilters: FC<QuickFiltersProps> = ({
  activeFilters = [],
  onFilterToggle,
  resultCount = 0,
  className = "",
}) => {
  const filterOptions: FilterOption[] = [
    {
      id: "open_now",
      label: "Open Now",
      icon: "Clock",
      description: "Currently accepting customers",
    },
    {
      id: "24_hours",
      label: "24 Hours",
      icon: "Clock3",
      description: "Open 24/7",
    },
    {
      id: "has_parking",
      label: "Parking",
      icon: "Car",
      description: "On-site parking available",
    },
    {
      id: "drive_through",
      label: "Drive-Through",
      icon: "Navigation",
      description: "Drive-through service",
    },
    {
      id: "delivery",
      label: "Delivery",
      icon: "Truck",
      description: "Home delivery available",
    },
    {
      id: "accepts_insurance",
      label: "Insurance",
      icon: "Shield",
      description: "Accepts insurance",
    },
  ];

  const handleFilterClick = (filterId: FilterId) => {
    if (onFilterToggle) {
      onFilterToggle(filterId);
    }
  };

  const clearAllFilters = () => {
    activeFilters.forEach((filterId) => {
      if (onFilterToggle) {
        onFilterToggle(filterId);
      }
    });
  };

  // Helper function to render icon dynamically
  const renderIcon = (
    iconName: keyof typeof LucideIcons,
    size: number = 18,
    className: string = ""
  ) => {
    const IconComponent = LucideIcons[iconName] as ComponentType<{
      size?: number;
      className?: string;
    }>;
    if (!IconComponent) return null;
    return <IconComponent size={size} className={className} />;
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Quick Filters</h3>
          <p className="text-xs text-gray-600">
            {resultCount} pharmacies found
            {activeFilters.length > 0 &&
              ` with ${activeFilters.length} filter${
                activeFilters.length > 1 ? "s" : ""
              }`}
          </p>
        </div>

        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-gray-600 hover:text-gray-900"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {filterOptions.map((filter) => {
          const isActive = activeFilters.includes(filter.id);

          return (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              className={`p-3 rounded-lg border transition-all text-left ${
                isActive
                  ? "bg-blue-500 text-white border-blue-500 shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
              }`}
              title={filter.description}
            >
              <div className="flex flex-col items-center space-y-1">
                {renderIcon(
                  filter.icon,
                  18,
                  isActive ? "text-white" : "text-gray-600"
                )}
                <span
                  className={`text-xs font-medium text-center ${
                    isActive ? "text-white" : "text-gray-600"
                  }`}
                >
                  {filter.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Filters Summary */}
      {activeFilters.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-600">Active filters:</span>
            {activeFilters.map((filterId) => {
              const filter = filterOptions.find((f) => f.id === filterId);
              if (!filter) return null;

              return (
                <div
                  key={filterId}
                  className="flex items-center space-x-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                >
                  {renderIcon(filter.icon, 12)}
                  <span>{filter.label}</span>
                  <button
                    onClick={() => handleFilterClick(filterId)}
                    className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                    aria-label={`Remove ${filter.label} filter`}
                  >
                    <X size={10} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter Tips */}
      <div className="mt-4 p-3 bg-amber-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Lightbulb
            size={14}
            className="text-amber-500 mt-0.5 flex-shrink-0"
          />
          <div className="text-xs text-gray-600">
            <p className="font-medium text-gray-900 mb-1">Filter Tips:</p>
            <ul className="space-y-0.5">
              <li>• Combine multiple filters to narrow your search</li>
              <li>
                • "Open Now" shows pharmacies currently accepting customers
              </li>
              <li>• Use "24 Hours" for emergency medication needs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickFilters;
