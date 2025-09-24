import { useState } from 'react';
import { QrCode, X, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface RedemptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: {
    id: string;
    breweryName: string;
    packageName: string;
    remainingUses: number;
  } | null;
  onConfirmRedemption: (tokenId: string) => void;
}

export function RedemptionModal({ 
  isOpen, 
  onClose, 
  token, 
  onConfirmRedemption 
}: RedemptionModalProps) {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false);

  const handleRedeem = async () => {
    if (!token) return;
    
    setIsRedeeming(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsRedeeming(false);
    setIsRedeemed(true);
    onConfirmRedemption(token.id);
    
    // Auto close after showing success
    setTimeout(() => {
      setIsRedeemed(false);
      onClose();
    }, 2000);
  };

  if (!token) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Redeem Token
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Show this QR code to brewery staff to redeem your growler fill
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="p-4 text-center">
            <h3 className="font-medium mb-1">{token.breweryName}</h3>
            <p className="text-sm text-muted-foreground mb-3">{token.packageName}</p>
            <p className="text-xs text-muted-foreground">
              {token.remainingUses} uses remaining
            </p>
          </Card>

          {!isRedeemed ? (
            <div className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center">
                {isRedeeming ? (
                  <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
                ) : (
                  <QrCode className="h-24 w-24 text-muted-foreground" />
                )}
              </div>
              
              <div>
                {isRedeeming ? (
                  <p className="text-sm text-muted-foreground">
                    Processing redemption...
                  </p>
                ) : (
                  <>
                    <p className="text-sm font-medium mb-2">
                      Show this QR code to the brewery staff
                    </p>
                    <p className="text-xs text-muted-foreground">
                      They will scan it to redeem your growler fill
                    </p>
                  </>
                )}
              </div>

              {!isRedeeming && (
                <Button onClick={handleRedeem} className="w-full">
                  Confirm Redemption
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center space-y-4 py-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <div>
                <h3 className="font-medium text-green-600 mb-1">
                  Successfully Redeemed!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Enjoy your fresh craft beer
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}