import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="relative min-h-[400px] md:min-h-[500px]">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1603666413723-fd8b35434cba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGJlZXIlMjBicmV3ZXJ5JTIwdGFwc3xlbnwxfHx8fDE3NTg2OTAyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Craft beer brewery with taps"
        className="absolute inset-0 w-full h-full object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black/40 rounded-lg" />
      
      <div className="relative z-10 p-6 h-full flex flex-col justify-center text-white">
        <div className="max-w-md">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">
            Buy Fresh Craft Beer in Bulk
          </h2>
          <p className="text-lg mb-6 text-white/90">
            Pre-purchase growler fills at bulk discounts and redeem them at your favorite breweries
          </p>
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="bg-white text-black hover:bg-white/90"
          >
            Get Started
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4">
        <Card className="p-3 bg-white/90 backdrop-blur-sm">
          <div className="text-sm">
            <p className="font-medium text-center">Save up to 25%</p>
            <p className="text-xs text-muted-foreground text-center">with bulk purchases</p>
          </div>
        </Card>
      </div>
    </div>
  );
}