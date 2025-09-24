import { X, Home, Store, Ticket, User, Settings, HelpCircle, LogOut, Heart } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  userTokens: number;
}

export function SideMenu({ isOpen, onClose, activeTab, onTabChange, userTokens }: SideMenuProps) {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'breweries', label: 'Browse Breweries', icon: Store },
    { id: 'tokens', label: 'My Tokens', icon: Ticket, badge: userTokens },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const accountItems = [
    { id: 'favorites', label: 'Favorite Breweries', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  const handleNavigation = (tabId: string) => {
    onTabChange(tabId);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="text-left">Growler Filler</SheetTitle>
          <SheetDescription className="text-left">
            Craft beer marketplace
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 mb-4">
          <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
            <div className="flex-1">
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john.doe@email.com</p>
            </div>
            <Badge variant="secondary">{userTokens}</Badge>
          </div>
        </div>

        <div className="px-6 space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Navigation
          </p>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleNavigation(item.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge variant="outline" className="ml-2">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        <Separator className="my-4" />

        <div className="px-6 space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Account
          </p>
          {accountItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  // Handle account navigation
                  onClose();
                }}
              >
                <Icon className="h-4 w-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
              </Button>
            );
          })}
        </div>

        <Separator className="my-4" />

        <div className="px-6">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => {
              // Handle logout
              onClose();
            }}
          >
            <LogOut className="h-4 w-4 mr-3" />
            <span className="flex-1 text-left">Sign Out</span>
          </Button>
        </div>

        <div className="p-6 mt-auto">
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              App Version 1.0.0
            </p>
            <p className="text-xs text-muted-foreground">
              Need help? <Button variant="link" className="p-0 h-auto text-xs">Contact Support</Button>
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}