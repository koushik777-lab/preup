import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, FileText, Heart } from "lucide-react";
import EnquiryModal from "@/components/enquiry-modal";
import LoginModal from "@/components/login-modal";
import RegisterModal from "@/components/register-modal";
import { useAuth } from "@/lib/auth";
import type { ShraddhaPackage } from "@shared/schema";

export default function ShraddhaKriyaPage() {
  const { user } = useAuth();
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: packages = [], isLoading } = useQuery<ShraddhaPackage[]>({
    queryKey: ["/api/shraddha-packages"],
  });

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.rituals.some(ritual => ritual.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handlePackageEnquiry = (packageId: string) => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      setSelectedPackage(packageId);
      setIsEnquiryModalOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading shraddha packages...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20" data-testid="shraddha-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="shraddha-title">
            Shraddha Kriya Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="shraddha-description">
            Honor your ancestors with authentic Pind Daan ceremonies and traditional rituals performed by experienced purohits in the sacred city of Varanasi
          </p>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sacred Rituals</h3>
              <p className="text-muted-foreground">Traditional ceremonies performed with complete devotion and authenticity</p>
            </div>
            <div className="text-center">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Expert Guidance</h3>
              <p className="text-muted-foreground">Experienced purohits guide you through every step of the ritual process</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Complete Arrangements</h3>
              <p className="text-muted-foreground">All materials and preparations included for a seamless experience</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search rituals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            data-testid="shraddha-search"
          />
        </div>

        {/* Packages Grid */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground mb-2">No packages found</p>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search terms" : "Shraddha packages will be available soon"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow"
                data-testid={`package-card-${pkg.id}`}
              >
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <Heart className="w-16 h-16 text-primary mx-auto mb-2" />
                    <Badge className="bg-primary text-white">Sacred Ritual</Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">{pkg.name}</h3>
                    <p className="text-muted-foreground mb-3">{pkg.description}</p>
                    
                    <div className="flex items-center text-muted-foreground text-sm mb-3">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  {/* Rituals */}
                  <div className="mb-4">
                    <h4 className="font-medium text-card-foreground mb-2">Rituals Included:</h4>
                    <div className="space-y-1">
                      {pkg.rituals.slice(0, 3).map((ritual, index) => (
                        <div key={index} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-3 h-3 mr-2 text-primary" />
                          <span>{ritual}</span>
                        </div>
                      ))}
                      {pkg.rituals.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{pkg.rituals.length - 3} more rituals
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="mb-4">
                    <h4 className="font-medium text-card-foreground mb-2">Included:</h4>
                    <div className="flex flex-wrap gap-1">
                      {pkg.inclusions.slice(0, 3).map((inclusion, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {inclusion}
                        </Badge>
                      ))}
                      {pkg.inclusions.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{pkg.inclusions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mb-4 p-3 bg-muted rounded-lg">
                    <h4 className="font-medium text-card-foreground mb-1 text-sm">Requirements:</h4>
                    <p className="text-xs text-muted-foreground">{pkg.requirements}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">₹{pkg.price.toLocaleString()}</span>
                    <Button
                      onClick={() => handlePackageEnquiry(pkg.id)}
                      data-testid={`enquire-package-${pkg.id}`}
                    >
                      Book Service
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <EnquiryModal 
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        defaultServiceType="shraddha"
        defaultServiceId={selectedPackage}
      />
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />
      
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </div>
  );
}
