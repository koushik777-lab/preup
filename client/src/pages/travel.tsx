import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Clock } from "lucide-react";
import EnquiryModal from "@/components/enquiry-modal";
import LoginModal from "@/components/login-modal";
import RegisterModal from "@/components/register-modal";
import { useAuth } from "@/lib/auth";
import type { Travel } from "@shared/schema";

export default function TravelPage() {
  const { user } = useAuth();
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: travels = [], isLoading } = useQuery<Travel[]>({
    queryKey: ["/api/travels"],
  });

  const filteredTravels = travels.filter(travel =>
    travel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    travel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    travel.destinations.some(dest => dest.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleTravelEnquiry = (travelId: string) => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      setSelectedTravel(travelId);
      setIsEnquiryModalOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading travel packages...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20" data-testid="travel-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="travel-title">
            Sacred Travel Packages
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="travel-description">
            Embark on transformative spiritual journeys to India's most sacred destinations with expert guidance and authentic experiences
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            data-testid="travel-search"
          />
        </div>

        {/* Travel Packages Grid */}
        {filteredTravels.length === 0 ? (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground mb-2">No travel packages found</p>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search terms" : "Travel packages will be available soon"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTravels.map((travel) => (
              <Card 
                key={travel.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow"
                data-testid={`travel-card-${travel.id}`}
              >
                <img 
                  src={travel.images[0] || "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=400"}
                  alt={travel.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=400";
                  }}
                />
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">{travel.name}</h3>
                    <p className="text-muted-foreground mb-3">{travel.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{travel.destinations.join(", ")}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{travel.duration}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Max {travel.maxPeople} people</span>
                      </div>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="mb-4">
                    <h4 className="font-medium text-card-foreground mb-2">Included:</h4>
                    <div className="flex flex-wrap gap-1">
                      {travel.inclusions.slice(0, 3).map((inclusion, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {inclusion}
                        </Badge>
                      ))}
                      {travel.inclusions.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{travel.inclusions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">₹{travel.price.toLocaleString()}</span>
                    <Button
                      onClick={() => handleTravelEnquiry(travel.id)}
                      data-testid={`enquire-travel-${travel.id}`}
                    >
                      Book Package
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
        defaultServiceType="travel"
        defaultServiceId={selectedTravel}
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
