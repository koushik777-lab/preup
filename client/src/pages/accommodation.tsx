import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MapPin, Users, Wifi, Car, Utensils, Coffee } from "lucide-react";
import EnquiryModal from "@/components/enquiry-modal";
import LoginModal from "@/components/login-modal";
import RegisterModal from "@/components/register-modal";
import { useAuth } from "@/lib/auth";
import type { Accommodation } from "@shared/schema";

export default function AccommodationPage() {
  const { user } = useAuth();
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: accommodations = [], isLoading } = useQuery<Accommodation[]>({
    queryKey: ["/api/accommodations"],
  });

  const filteredAccommodations = accommodations.filter(accommodation =>
    accommodation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    accommodation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    accommodation.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    accommodation.amenities.some(amenity => amenity.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAccommodationEnquiry = (accommodationId: string) => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      setSelectedAccommodation(accommodationId);
      setIsEnquiryModalOpen(true);
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('wifi') || lowerAmenity.includes('internet')) return <Wifi className="w-4 h-4" />;
    if (lowerAmenity.includes('parking') || lowerAmenity.includes('car')) return <Car className="w-4 h-4" />;
    if (lowerAmenity.includes('food') || lowerAmenity.includes('meal') || lowerAmenity.includes('restaurant')) return <Utensils className="w-4 h-4" />;
    if (lowerAmenity.includes('tea') || lowerAmenity.includes('coffee') || lowerAmenity.includes('breakfast')) return <Coffee className="w-4 h-4" />;
    return <MapPin className="w-4 h-4" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading accommodations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20" data-testid="accommodation-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="accommodation-title">
            Spiritual Accommodations
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="accommodation-description">
            Find peaceful and sacred accommodations near holy ghats and temples, perfect for your spiritual retreat and pilgrimage
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search accommodations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            data-testid="accommodation-search"
          />
        </div>

        {/* Accommodations Grid */}
        {filteredAccommodations.length === 0 ? (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground mb-2">No accommodations found</p>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search terms" : "Accommodations will be available soon"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAccommodations.map((accommodation) => (
              <Card 
                key={accommodation.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow"
                data-testid={`accommodation-card-${accommodation.id}`}
              >
                {/* Image Carousel */}
                <div className="relative h-48">
                  {accommodation.images.length > 1 ? (
                    <Carousel className="w-full h-full">
                      <CarouselContent>
                        {accommodation.images.map((image, index) => (
                          <CarouselItem key={index}>
                            <img 
                              src={image || "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400"}
                              alt={`${accommodation.name} - Image ${index + 1}`}
                              className="w-full h-48 object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400";
                              }}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>
                  ) : (
                    <img 
                      src={accommodation.images[0] || "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400"}
                      alt={accommodation.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400";
                      }}
                    />
                  )}
                  <Badge className="absolute top-2 left-2 bg-primary text-white">
                    {accommodation.roomType}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">{accommodation.name}</h3>
                    <p className="text-muted-foreground mb-3">{accommodation.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{accommodation.location}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Up to {accommodation.maxGuests} guests</span>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-4">
                    <h4 className="font-medium text-card-foreground mb-2">Amenities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {accommodation.amenities.slice(0, 4).map((amenity, index) => (
                        <div key={index} className="flex items-center text-xs text-muted-foreground">
                          {getAmenityIcon(amenity)}
                          <span className="ml-1">{amenity}</span>
                        </div>
                      ))}
                      {accommodation.amenities.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{accommodation.amenities.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-primary">₹{accommodation.price}</span>
                      <span className="text-muted-foreground text-sm">/night</span>
                    </div>
                    <Button
                      onClick={() => handleAccommodationEnquiry(accommodation.id)}
                      data-testid={`enquire-accommodation-${accommodation.id}`}
                    >
                      Book Now
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
        defaultServiceType="accommodation"
        defaultServiceId={selectedAccommodation}
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
