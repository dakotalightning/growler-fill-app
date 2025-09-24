import { Check, ShoppingCart } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Package {
  id: string;
  name: string;
  quantity: number;
  originalPrice: number;
  discountPrice: number;
  savings: number;
  description: string;
  features: string[];
}

interface PackageSelectorProps {
  packages: Package[];
  selectedPackage: string | null;
  onSelectPackage: (packageId: string) => void;
  onPurchase: (packageId: string) => void;
  breweryName: string;
}

export function PackageSelector({ 
  packages, 
  selectedPackage, 
  onSelectPackage, 
  onPurchase,
  breweryName 
}: PackageSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1708166210419-78d967872a1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVyJTIwZ3Jvd2xlciUyMGJvdHRsZXxlbnwxfHx8fDE3NTg3NDIwNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Beer growler"
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-lg font-medium">Growler Packages</h2>
          <p className="text-sm text-muted-foreground">{breweryName}</p>
        </div>
      </div>

      {packages.map((pkg) => (
        <Card 
          key={pkg.id} 
          className={`p-4 cursor-pointer transition-all ${
            selectedPackage === pkg.id 
              ? 'ring-2 ring-primary border-primary' 
              : 'hover:border-primary/50'
          }`}
          onClick={() => onSelectPackage(pkg.id)}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium">{pkg.name}</h3>
                <Badge variant="secondary">
                  {pkg.quantity} fills
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Save {pkg.savings}%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{pkg.description}</p>
            </div>
            {selectedPackage === pkg.id && (
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>

          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-medium">${pkg.discountPrice}</span>
              <span className="text-sm text-muted-foreground line-through">
                ${pkg.originalPrice}
              </span>
              <span className="text-sm text-green-600 font-medium">
                Save ${pkg.originalPrice - pkg.discountPrice}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              ${(pkg.discountPrice / pkg.quantity).toFixed(2)} per fill
            </p>
          </div>

          <div className="space-y-1 mb-4">
            {pkg.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Check className="h-3 w-3 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {selectedPackage === pkg.id && (
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onPurchase(pkg.id);
              }}
              className="w-full"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Purchase Package
            </Button>
          )}
        </Card>
      ))}
    </div>
  );
}