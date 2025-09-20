import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Award } from "lucide-react";

export default function Squad() {
  const teamMembers = [
    {
      name: "Pandit Raj Kumar Sharma",
      role: "Head Purohit",
      experience: "25+ Years",
      specialization: "Vedic Rituals & Pind Daan",
      location: "Varanasi",
      description: "Master of ancient Vedic traditions with deep knowledge of Sanskrit scriptures and ritual procedures.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "Sita Devi",
      role: "Spiritual Guide",
      experience: "15+ Years",
      specialization: "Women's Spiritual Practices",
      location: "Varanasi",
      description: "Dedicated to guiding women through sacred rituals and spiritual practices with compassion and wisdom.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "Amit Kumar",
      role: "Travel Coordinator",
      experience: "10+ Years",
      specialization: "Pilgrimage Planning",
      location: "Varanasi",
      description: "Expert in organizing spiritual journeys across India with focus on authentic experiences and safety.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "Dr. Priya Shastri",
      role: "Sanskrit Scholar",
      experience: "20+ Years",
      specialization: "Vedic Texts & Mantras",
      location: "Varanasi",
      description: "PhD in Sanskrit with expertise in Vedic literature and proper pronunciation of sacred mantras.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "Ravi Shankar",
      role: "Guest Relations Manager",
      experience: "8+ Years",
      specialization: "Customer Experience",
      location: "Varanasi",
      description: "Ensures every guest receives personalized attention and has a transformative spiritual experience.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "Lakshmi Sharma",
      role: "Accommodation Coordinator",
      experience: "12+ Years",
      specialization: "Hospitality Management",
      location: "Varanasi",
      description: "Manages spiritual accommodations ensuring comfort and peaceful environment for guests.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-20" data-testid="squad-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="squad-title">
            Our Sacred Squad
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="squad-description">
            Meet our dedicated team of spiritual guides, learned purohits, and experienced coordinators who make your sacred journey meaningful and authentic
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <div className="text-muted-foreground">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100+</div>
            <div className="text-muted-foreground">Years Combined Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5000+</div>
            <div className="text-muted-foreground">Ceremonies Conducted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Support Available</div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`team-member-${index}`}>
              <div className="relative h-64">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300";
                  }}
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-white">
                    {member.experience}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-card-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  
                  <div className="flex items-center text-muted-foreground text-sm mb-2">
                    <Award className="w-4 h-4 mr-2" />
                    <span>{member.specialization}</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{member.location}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Philosophy */}
        <Card className="p-8 mb-16">
          <CardContent className="p-0">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Our Team Philosophy</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Expertise</h3>
                  <p className="text-muted-foreground text-sm">
                    Our team combines traditional knowledge with modern understanding to serve you better
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
                  <p className="text-muted-foreground text-sm">
                    We're available 24/7 to guide you through your spiritual journey with patience and care
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Personal Touch</h3>
                  <p className="text-muted-foreground text-sm">
                    Every interaction is personalized to meet your unique spiritual needs and preferences
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Our Team */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Connect with Our Team</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Have questions about our services or need spiritual guidance? Our experienced team is here to help you on your sacred journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+918069377929" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
              data-testid="call-team"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Us: +91-8069377929
            </a>
            <a 
              href="mailto:team@shivasadhana.in" 
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
              data-testid="email-team"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email: team@shivasadhana.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
