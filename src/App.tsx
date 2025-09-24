import { useState } from 'react';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { HeroSection } from './components/home/HeroSection';
import { FeatureGrid } from './components/home/FeatureGrid';
import { BreweryCard } from './components/breweries/BreweryCard';
import { PackageSelector } from './components/packages/PackageSelector';
import { TokenList } from './components/tokens/TokenList';
import { RedemptionModal } from './components/redemption/RedemptionModal';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { ArrowLeft, Filter, Search } from 'lucide-react';
import { Input } from './components/ui/input';

// Mock data
const mockBreweries = [
  {
    id: '1',
    name: 'Hop Valley Brewing',
    location: 'Downtown Portland',
    image: 'https://images.unsplash.com/photo-1689348745037-21adeb31dd2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmV3ZXJ5JTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzU4NzE5NDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    distance: '0.8 mi',
    isOpen: true,
    packages: [
      {
        id: 'pkg1',
        name: 'Craft Explorer Pack',
        quantity: 6,
        originalPrice: 120,
        discountPrice: 90,
        savings: 25,
        description: 'Perfect for trying different styles',
        features: ['Any beer on tap', 'Valid for 6 months', 'Transferable']
      },
      {
        id: 'pkg2',
        name: 'Seasonal Sampler',
        quantity: 12,
        originalPrice: 240,
        discountPrice: 180,
        savings: 25,
        description: 'Best value for regular visitors',
        features: ['Any beer on tap', 'Valid for 1 year', 'Transferable', 'Priority reservations']
      }
    ]
  },
  {
    id: '2',
    name: 'Portland Brewing Co.',
    location: 'Pearl District',
    image: 'https://images.unsplash.com/photo-1603666413723-fd8b35434cba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGJlZXIlMjBicmV3ZXJ5JTIwdGFwc3xlbnwxfHx8fDE3NTg2OTAyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.6,
    distance: '1.2 mi',
    isOpen: false,
    packages: [
      {
        id: 'pkg3',
        name: 'IPA Lover Pack',
        quantity: 8,
        originalPrice: 160,
        discountPrice: 128,
        savings: 20,
        description: 'Specialized IPA selection',
        features: ['IPA varieties only', 'Valid for 6 months', 'Transferable']
      }
    ]
  }
];

const mockTokens = [
  {
    id: 'token1',
    breweryName: 'Hop Valley Brewing',
    breweryImage: 'https://images.unsplash.com/photo-1689348745037-21adeb31dd2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmV3ZXJ5JTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzU4NzE5NDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Downtown Portland',
    packageName: 'Craft Explorer Pack',
    remainingUses: 4,
    totalUses: 6,
    purchaseDate: '2024-01-15',
    expiresAt: '2024-07-15'
  },
  {
    id: 'token2',
    breweryName: 'Portland Brewing Co.',
    breweryImage: 'https://images.unsplash.com/photo-1603666413723-fd8b35434cba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGJlZXIlMjBicmV3ZXJ5JTIwdGFwc3xlbnwxfHx8fDE3NTg2OTAyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Pearl District',
    packageName: 'IPA Lover Pack',
    remainingUses: 8,
    totalUses: 8,
    purchaseDate: '2024-01-10',
    expiresAt: '2024-07-10'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedBrewery, setSelectedBrewery] = useState<any>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [userTokens, setUserTokens] = useState(12);
  const [tokens, setTokens] = useState(mockTokens);
  const [redemptionModal, setRedemptionModal] = useState<{
    isOpen: boolean;
    token: any;
  }>({ isOpen: false, token: null });

  const handleGetStarted = () => {
    setActiveTab('breweries');
  };

  const handleViewPackages = (brewery: any) => {
    setSelectedBrewery(brewery);
  };

  const handleBackToBreweries = () => {
    setSelectedBrewery(null);
    setSelectedPackage(null);
  };

  const handlePurchasePackage = (packageId: string) => {
    const brewery = selectedBrewery;
    const pkg = brewery.packages.find((p: any) => p.id === packageId);
    
    if (pkg) {
      // Add new token
      const newToken = {
        id: `token${Date.now()}`,
        breweryName: brewery.name,
        breweryImage: brewery.image,
        location: brewery.location,
        packageName: pkg.name,
        remainingUses: pkg.quantity,
        totalUses: pkg.quantity,
        purchaseDate: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      };
      
      setTokens(prev => [newToken, ...prev]);
      setUserTokens(prev => prev + pkg.quantity);
      setActiveTab('tokens');
    }
  };

  const handleRedeemToken = (tokenId: string) => {
    const token = tokens.find(t => t.id === tokenId);
    if (token && token.remainingUses > 0) {
      setRedemptionModal({ isOpen: true, token });
    }
  };

  const handleConfirmRedemption = (tokenId: string) => {
    setTokens(prev => prev.map(token => 
      token.id === tokenId 
        ? { ...token, remainingUses: token.remainingUses - 1 }
        : token
    ));
    setUserTokens(prev => prev - 1);
  };

  const renderContent = () => {
    if (selectedBrewery) {
      return (
        <div className="p-4 pb-20 md:pb-4">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="sm" onClick={handleBackToBreweries}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-medium">{selectedBrewery.name}</h1>
              <p className="text-sm text-muted-foreground">{selectedBrewery.location}</p>
            </div>
          </div>
          
          <PackageSelector
            packages={selectedBrewery.packages}
            selectedPackage={selectedPackage}
            onSelectPackage={setSelectedPackage}
            onPurchase={handlePurchasePackage}
            breweryName={selectedBrewery.name}
          />
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <div className="p-4 pb-20 md:pb-4 space-y-8">
            <HeroSection onGetStarted={handleGetStarted} />
            
            <div>
              <h2 className="text-xl font-medium mb-4">How it works</h2>
              <FeatureGrid />
            </div>

            <div>
              <h2 className="text-xl font-medium mb-4">Featured Breweries</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockBreweries.slice(0, 2).map(brewery => (
                  <BreweryCard
                    key={brewery.id}
                    brewery={brewery}
                    onViewPackages={handleViewPackages}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 'breweries':
        return (
          <div className="p-4 pb-20 md:pb-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search breweries..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockBreweries.map(brewery => (
                <BreweryCard
                  key={brewery.id}
                  brewery={brewery}
                  onViewPackages={handleViewPackages}
                />
              ))}
            </div>
          </div>
        );

      case 'tokens':
        return (
          <div className="p-4 pb-20 md:pb-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-lg font-medium">My Tokens</h1>
                <p className="text-sm text-muted-foreground">
                  {userTokens} fills available
                </p>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {userTokens}
              </Badge>
            </div>
            
            <TokenList
              tokens={tokens}
              onRedeemToken={handleRedeemToken}
            />
          </div>
        );

      case 'profile':
        return (
          <div className="p-4 pb-20 md:pb-4">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-medium">JD</span>
              </div>
              <h2 className="font-medium mb-1">John Doe</h2>
              <p className="text-sm text-muted-foreground mb-4">john.doe@email.com</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-xl font-medium">{userTokens}</p>
                  <p className="text-xs text-muted-foreground">Tokens</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-medium">3</p>
                  <p className="text-xs text-muted-foreground">Breweries</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-medium">$280</p>
                  <p className="text-xs text-muted-foreground">Saved</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuClick={() => {}} 
        userTokens={userTokens}
      />
      
      <main className="max-w-6xl mx-auto">
        {renderContent()}
      </main>
      
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />

      <RedemptionModal
        isOpen={redemptionModal.isOpen}
        onClose={() => setRedemptionModal({ isOpen: false, token: null })}
        token={redemptionModal.token}
        onConfirmRedemption={handleConfirmRedemption}
      />
    </div>
  );
}