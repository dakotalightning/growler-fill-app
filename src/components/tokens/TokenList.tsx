import { QrCode, MapPin, Calendar, Ticket } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Token {
  id: string;
  breweryName: string;
  breweryImage: string;
  location: string;
  packageName: string;
  remainingUses: number;
  totalUses: number;
  purchaseDate: string;
  expiresAt: string | null;
}

interface TokenListProps {
  tokens: Token[];
  onRedeemToken: (tokenId: string) => void;
}

export function TokenList({ tokens, onRedeemToken }: TokenListProps) {
  if (tokens.length === 0) {
    return (
      <div className="text-center py-12">
        <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-medium mb-2">No tokens yet</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Purchase a growler package to get started
        </p>
        <Button variant="outline">Browse Breweries</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tokens.map((token) => (
        <Card key={token.id} className="p-4">
          <div className="flex items-start gap-4">
            <ImageWithFallback
              src={token.breweryImage}
              alt={token.breweryName}
              className="w-16 h-16 object-cover rounded-lg"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium truncate">{token.breweryName}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{token.location}</span>
                  </div>
                </div>
                <Badge variant="secondary">
                  {token.remainingUses}/{token.totalUses} left
                </Badge>
              </div>

              <div className="mb-3">
                <p className="text-sm font-medium">{token.packageName}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Purchased {new Date(token.purchaseDate).toLocaleDateString()}</span>
                  {token.expiresAt && (
                    <>
                      <span>•</span>
                      <span>Expires {new Date(token.expiresAt).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => onRedeemToken(token.id)}
                  disabled={token.remainingUses === 0}
                  className="flex-1"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  {token.remainingUses > 0 ? 'Redeem' : 'Used Up'}
                </Button>
                <Button size="sm" variant="outline">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {token.remainingUses > 0 && (
            <div className="mt-4 pt-3 border-t border-border">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ 
                    width: `${(token.remainingUses / token.totalUses) * 100}%` 
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-center">
                {token.remainingUses} fills remaining
              </p>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}