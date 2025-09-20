import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EnquiryModal from "@/components/enquiry-modal";
import LoginModal from "@/components/login-modal";
import RegisterModal from "@/components/register-modal";
import ServiceCard from "@/components/service-card";
import { useAuth } from "@/lib/auth";
import type { Banner } from "@shared/schema";

export default function Home() {
  const { user } = useAuth();
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const { data: banners = [] } = useQuery<Banner[]>({
    queryKey: ["/api/banners"],
  });

  const activeBanners = banners.filter(banner => banner.isActive === 1);
  const heroBanner = activeBanners[0] || {
    title: "Your Spiritual Journey Begins Here",
    subtitle: "Connecting faith, culture, and travel experiences in the sacred land of Varanasi",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    ctaText: "Start Your Journey",
    ctaLink: "/store"
  };

  const services = [
    {
      name: "Spiritual Store",
      description: "Authentic spiritual items, blessed malas, and sacred artifacts",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240",
      type: "store"
    },
    {
      name: "Sacred Travel",
      description: "Guided pilgrimages to India's most sacred destinations",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240",
      type: "travel"
    },
    {
      name: "Spiritual Stays",
      description: "Peaceful accommodations near sacred ghats and temples",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240",
      type: "accommodation"
    },
    {
      name: "Shraddha Kriya",
      description: "Sacred rituals and Pind Daan services in Varanasi",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240",
      type: "shraddha"
    }
  ];

  const handleServiceClick = (serviceType: string) => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      setSelectedService(serviceType);
      setIsEnquiryModalOpen(true);
    }
  };

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Mumbai",
      content: "The Pind Daan ceremony was conducted with such reverence and authenticity. Shiva Sadhana made our spiritual journey truly meaningful."
    },
    {
      name: "Priya Sharma", 
      location: "Delhi",
      content: "Excellent accommodation near the ghats. The peaceful environment helped me connect with my inner self."
    },
    {
      name: "Amit Patel",
      location: "Ahmedabad",
      content: "The spiritual travel package to Kedarnath was life-changing. Professional guides and perfect arrangements."
    }
  ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: `url('${heroBanner.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 fade-in" data-testid="hero-title">
            {heroBanner.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 fade-in" data-testid="hero-subtitle">
            {heroBanner.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in">
            <Button 
              size="lg"
              className="bg-primary hover:bg-accent text-white px-8 py-4 text-lg font-semibold transition-all transform hover:scale-105"
              onClick={() => handleServiceClick("store")}
              data-testid="hero-cta-primary"
            >
              {heroBanner.ctaText}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold transition-all"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="hero-cta-secondary"
            >
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="services-title">
              Sacred Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="services-description">
              Experience authentic spiritual practices, comfortable accommodations, and guided journeys through India's most sacred destinations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.type}
                name={service.name}
                description={service.description}
                image={service.image}
                onClick={() => handleServiceClick(service.type)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6" data-testid="about-title">
                Our Sacred Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                At Shiva Sadhana, our mission is to reconnect people with the roots of spirituality, tradition, and conscious living by offering soulful journeys, sacred products, and holistic experiences.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We strive to preserve and promote the divine essence of sacred places like Varanasi, Banaras, and Ayodhya, while supporting spiritual seekers through authentic services.
              </p>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">3000+</div>
                  <div className="text-muted-foreground">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">5+</div>
                  <div className="text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Spiritual Guidance" 
                className="rounded-xl shadow-lg w-full" 
              />
              <div className="absolute inset-0 gradient-overlay rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="testimonials-title">
              Sacred Experiences
            </h2>
            <p className="text-xl text-muted-foreground">
              Hear from souls who found peace on their spiritual journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6" data-testid={`testimonial-${index}`}>
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="flex text-secondary">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{testimonial.content}</p>
                  <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modals */}
      <EnquiryModal 
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        defaultServiceType={selectedService}
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
