import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <>
    {/* Footer */}
      <footer className="bg-surface border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-blue-500 rounded-lg flex items-center justify-center text-white p-2">
                      <MapPin />
                    </div>
              <span className="text-xl font-semibold text-foreground">My MedX</span>
            </div>
            <p className="text-text-secondary mb-4">
              Helping you find medications when you need them most.
            </p>
            <p className="text-sm text-text-secondary">
              © {new Date()?.getFullYear()} My MedX. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
