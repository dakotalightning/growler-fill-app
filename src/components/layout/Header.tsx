import { Bell, User, Menu, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '../ui/dropdown-menu';

interface HeaderProps {
  onMenuClick: () => void;
  userTokens: number;
}

export function Header({ onMenuClick, userTokens }: HeaderProps) {
  return (
    <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg font-medium">Growler Filler</h1>
          <p className="text-xs text-muted-foreground hidden sm:block">Craft beer marketplace</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-accent rounded-full">
          <MapPin className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Portland, OR</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Tokens:</span>
          <Badge variant="secondary" className="font-medium">
            {userTokens}
          </Badge>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="space-y-1">
                <p className="font-medium text-sm">New brewery partner!</p>
                <p className="text-xs text-muted-foreground">
                  Cascade Brewing just joined the platform
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="space-y-1">
                <p className="font-medium text-sm">Token expiring soon</p>
                <p className="text-xs text-muted-foreground">
                  Your Portland Brewing tokens expire in 30 days
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center">
              <span className="text-xs text-muted-foreground">View all notifications</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">JD</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Order History</DropdownMenuItem>
            <DropdownMenuItem>Favorite Breweries</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Help & Support</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}