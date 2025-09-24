import { Bell, User, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface HeaderProps {
  onMenuClick: () => void;
  userTokens: number;
}

export function Header({ onMenuClick, userTokens }: HeaderProps) {
  return (
    <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onMenuClick} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg font-medium">Growler Filler</h1>
          <p className="text-xs text-muted-foreground">Craft beer marketplace</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Tokens:</span>
          <Badge variant="secondary" className="font-medium">
            {userTokens}
          </Badge>
        </div>
        <Button variant="ghost" size="sm">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}