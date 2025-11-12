
import { Button } from '../../../../components/ui/button';
import { Check, Clock, FileText, Info, RotateCcw, Save } from 'lucide-react';

interface SaveActionsPanelProps {
  onSave: () => void;
  onSaveDraft: () => void;
  onReset: () => void;
  hasChanges: boolean;
  isLoading: boolean;
  lastSaved: string | Date | null;
}

export default function SaveActionsPanel({ 
  onSave, 
  onSaveDraft, 
  onReset, 
  hasChanges, 
  isLoading, 
  lastSaved 
}: SaveActionsPanelProps) {
  const formatLastSaved = (timestamp: string | Date | null): string => {
    if (!timestamp) return 'Never';
    
    const now = new Date();
    const saved = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - saved.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return saved.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg border border-border healthcare-shadow sticky top-24 text-gray-700">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
            <Save size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Save Changes</h2>
            <p className="text-sm text-text-secondary">
              Last saved: {formatLastSaved(lastSaved)}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Primary Save Button */}
          <Button
            variant="default"
            onClick={onSave}
            disabled={!hasChanges || isLoading}
            className="w-full"
          >
            <Check/>
            {isLoading ? 'Saving...' : 'Save Profile Changes'}
          </Button>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={onSaveDraft}
              disabled={!hasChanges || isLoading}
            >
              <FileText />
              Save Draft
            </Button>

            <Button
              variant="ghost"
              onClick={onReset}
              disabled={!hasChanges || isLoading}
            >
              <RotateCcw />
              Reset
            </Button>
          </div>

          {/* Status Indicators */}
          <div className="pt-4 border-t border-border space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Profile Status:</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-success font-medium">Active</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Unsaved Changes:</span>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${hasChanges ? 'bg-warning' : 'bg-muted'}`}></div>
                <span className={hasChanges ? 'text-warning font-medium' : 'text-text-secondary'}>
                  {hasChanges ? 'Yes' : 'None'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Verification:</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-primary font-medium">Verified</span>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info size={16} className="text-primary mt-0.5" />
              <div className="text-sm text-text-secondary">
                <p className="font-medium text-foreground mb-1">Save Options:</p>
                <ul className="space-y-1">
                  <li>• <strong>Save Profile:</strong> Publish changes immediately</li>
                  <li>• <strong>Save Draft:</strong> Keep changes private for review</li>
                  <li>• <strong>Reset:</strong> Discard all unsaved changes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Auto-save Notice */}
          {hasChanges && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Clock size={14} className="text-warning" />
                <span className="text-sm text-warning font-medium">
                  Auto-save in 5 minutes
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}