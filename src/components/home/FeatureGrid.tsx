import { Wallet, MapPin, Gift, Users } from 'lucide-react';
import { Card } from '../ui/card';

export function FeatureGrid() {
  const features = [
    {
      icon: Wallet,
      title: 'Bulk Savings',
      description: 'Save 15-25% when you buy growler fills in packages of 6 or more'
    },
    {
      icon: MapPin,
      title: 'Redeem Anywhere',
      description: 'Use your tokens at any participating brewery in your area'
    },
    {
      icon: Gift,
      title: 'Gift Tokens',
      description: 'Perfect gifts for beer lovers - tokens never expire'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with local breweries and fellow craft beer enthusiasts'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Card key={index} className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}