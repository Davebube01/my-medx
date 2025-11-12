import { Camera, FolderOpen, Lightbulb, Upload, X } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useRef, useState, type JSX, } from "react";

// Props interface
interface ProfileImageUploadProps {
  currentImage: string | null;
  onImageChange: (file: File | null, imageUrl: string | null) => void;
  isLoading: boolean;
}

export default function ProfileImageUpload({ 
  currentImage, 
  onImageChange, 
  isLoading 
}: ProfileImageUploadProps): JSX.Element {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file: File): void => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imageUrl = e.target?.result as string;
        setPreviewImage(imageUrl);
        onImageChange(file, imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleRemoveImage = (): void => {
    setPreviewImage(null);
    onImageChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6 healthcare-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Camera size={20} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Pharmacy Image</h2>
          <p className="text-sm text-text-secondary">Upload your pharmacy logo or storefront image</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Current Image Preview */}
        {previewImage && (
          <div className="relative">
            <div className="w-full max-w-md mx-auto">
              <div className="relative overflow-hidden rounded-lg border border-border">
                <img 
                  src={previewImage} 
                  alt="Pharmacy profile" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/20 to-transparent" />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2"
                  disabled={isLoading}
                >
                  <X size={16} />
                  <span className="sr-only">Remove image</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center healthcare-transition ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={isLoading}
          />

          <div className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Upload size={24} className="text-text-secondary" />
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {previewImage ? 'Replace Image' : 'Upload Pharmacy Image'}
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Drag and drop your image here, or click to browse
              </p>
              
              <Button
                variant="outline"
                onClick={openFileDialog}
                disabled={isLoading}
              >
                <FolderOpen />
                Choose File
              </Button>
            </div>

            <div className="text-xs text-text-secondary space-y-1">
              <p>Supported formats: JPG, PNG, GIF</p>
              <p>Maximum file size: 5MB</p>
              <p>Recommended dimensions: 800x600px</p>
            </div>
          </div>

          {dragActive && (
            <div className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center">
              <div className="text-primary font-medium">Drop image here</div>
            </div>
          )}
        </div>

        {/* Image Guidelines */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Lightbulb size={16} className="text-warning mt-0.5" />
            <div className="text-sm text-text-secondary">
              <p className="font-medium text-foreground mb-2">Image Guidelines:</p>
              <ul className="space-y-1">
                <li>• Use a clear, high-quality image of your pharmacy storefront</li>
                <li>• Ensure good lighting and avoid blurry or pixelated images</li>
                <li>• Include your pharmacy name or signage if visible</li>
                <li>• Professional photos help build customer trust</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export types for reuse
export type { ProfileImageUploadProps };