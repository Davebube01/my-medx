import { Button } from '../../../components/ui/button';

interface MobileViewToggleProps {
  currentView?: string;
  onViewChange?: (view: 'map' | 'list') => void;
  resultCount?: number;
  className?: string;
}

const MobileViewToggle = ({ 
  currentView = 'map', 
  onViewChange, 
  resultCount = 0,
  className = "" 
}: MobileViewToggleProps) => {
  const views = [
    {
      id: 'map',
      label: 'Map View',
      icon: 'Map',
      description: 'Interactive map with pharmacy locations'
    },
    {
      id: 'list',
      label: 'List View',
      icon: 'List',
      description: `${resultCount} nearby pharmacies`
    }
  ];

  const handleViewChange = (viewId: any) => {
    if (onViewChange && viewId !== currentView) {
      onViewChange(viewId);
    }
  };

  return (
    <div className={`lg:hidden bg-surface border border-border rounded-lg p-2 healthcare-shadow ${className}`}>
      <div className="flex space-x-1">
        {views?.map((view) => (
          <Button
            key={view?.id}
            variant={currentView === view?.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleViewChange(view?.id)}
            className="flex-1 justify-center"
          >
            <div className="flex flex-col items-center">
              <span className="font-medium">{view?.label}</span>
              <span className={`text-xs ${
                currentView === view?.id 
                  ? 'text-primary-foreground/80' 
                  : 'text-text-secondary'
              }`}>
                {view?.description}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MobileViewToggle;