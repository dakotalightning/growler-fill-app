import { MapPin, Star, Clock } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Brewery {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  distance: string;
  packages: Array<{
    id: string;
    name: string;
    quantity: number;
    originalPrice: number;
    discountPrice: number;
    savings: number;
  }>;
  isOpen: boolean;
}

interface BreweryCardProps {
  brewery: Brewery;
  onViewPackages: (brewery: Brewery) => void;
}

export function BreweryCard({ brewery, onViewPackages }: BreweryCardProps) {
  const bestPackage = brewery.packages.reduce((best, pkg) => 
    pkg.savings > best.savings ? pkg : best, brewery.packages[0]
  );

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <ImageWithFallback
          src={brewery.image}
          alt={brewery.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={brewery.isOpen ? "default" : "secondary"} className="bg-white/90 text-black">
            <Clock className="h-3 w-3 mr-1" />
            {brewery.isOpen ? "Open" : "Closed"}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-black">
            <Star className="h-3 w-3 mr-1 fill-current" />
            {brewery.rating}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-medium mb-1">{brewery.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{brewery.location}</span>
            <span>•</span>
            <span>{brewery.distance}</span>
          </div>
        </div>

        {bestPackage && (
          <div className="mb-4 p-3 bg-accent rounded-lg">
            <p className="text-sm font-medium mb-1">Best Deal: {bestPackage.name}</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">${bestPackage.discountPrice}</span>
              <span className="text-sm text-muted-foreground line-through">
                ${bestPackage.originalPrice}
              </span>
              <Badge variant="secondary" className="text-xs">
                Save {bestPackage.savings}%
              </Badge>
            </div>
          </div>
        )}

        <Button 
          onClick={() => onViewPackages(brewery)}
          className="w-full"
          variant={brewery.isOpen ? "default" : "secondary"}
          disabled={!brewery.isOpen}
        >
          {brewery.isOpen ? "View Packages" : "Brewery Closed"}
        </Button>
      </div>
    </Card>
  );
}