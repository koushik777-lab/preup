import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, Globe } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background py-20" data-testid="about-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="about-title">
            About Shiva Sadhana
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="about-subtitle">
            Your Spiritual Partner - Connecting faith, culture, and travel experiences together
          </p>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-16">
          <img 
            src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400"
            alt="Varanasi Ghats"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl font-serif font-bold mb-4">Preserving Sacred Traditions</h2>
              <p className="text-lg max-w-2xl mx-auto">
                Connecting pilgrims with the divine essence of India's most sacred destinations
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="p-8">
            <CardContent className="p-0">
              <div className="flex items-center mb-6">
                <Heart className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-2xl font-bold text-card-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                At Shiva Sadhana, our mission is to reconnect people with the roots of spirituality, tradition, and conscious living by offering soulful journeys, sacred products, and holistic experiences. We are committed to preserving and promoting the divine essence of sacred places like Varanasi, Banaras, and Ayodhya.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardContent className="p-0">
              <div className="flex items-center mb-6">
                <Globe className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-2xl font-bold text-card-foreground">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To become a globally trusted spiritual and cultural bridge that opens new paths beyond our physical boundaries, inspiring seekers worldwide to experience authentic devotion, ancient wisdom, and spiritual transformation through carefully curated journeys and experiences.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground">The principles that guide our spiritual service</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Authenticity</h3>
              <p className="text-muted-foreground text-sm">We provide genuine spiritual experiences rooted in ancient traditions</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground text-sm">Building connections between spiritual seekers worldwide</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Excellence</h3>
              <p className="text-muted-foreground text-sm">Delivering exceptional service with attention to every detail</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Tradition</h3>
              <p className="text-muted-foreground text-sm">Preserving ancient wisdom for future generations</p>
            </div>
          </div>
        </div>

        {/* Company Story */}
        <Card className="p-8 mb-16">
          <CardContent className="p-0">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4">
                Founded in the sacred city of Varanasi, Shiva Sadhana emerged from a deep desire to bridge the gap between modern seekers and ancient spiritual wisdom. Our journey began with a simple observation: while millions visit India's sacred sites, many leave without truly experiencing their transformative power.
              </p>
              <p className="mb-4">
                We recognized the need for authentic guidance, genuine spiritual products, and meaningful experiences that go beyond mere tourism. Thus, Shiva Sadhana was born - not just as a business, but as a sacred mission to facilitate genuine spiritual connections.
              </p>
              <p className="mb-4">
                Today, we serve pilgrims and spiritual seekers from around the world, offering everything from traditional Pind Daan ceremonies to carefully curated spiritual journeys. Our team of experienced guides, learned purohits, and dedicated staff ensure that every interaction with us brings you closer to the divine.
              </p>
              <p>
                Located in the heart of Varanasi, we are perfectly positioned to offer authentic experiences in one of the world's oldest continuously inhabited cities. Our services extend beyond Varanasi to cover major pilgrimage sites across India, always maintaining our commitment to authenticity and spiritual integrity.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">Visit Our Sacred Space</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Office Address</h3>
                <p className="text-muted-foreground">
                  B 37/171, Birdopur, Dr. Usha Gupta Lane<br />
                  Mahmoorganj, Varanasi – 221010<br />
                  Uttar Pradesh, India
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
                <p className="text-muted-foreground">
                  Phone: +91-8069377929<br />
                  Email: team@shivasadhana.in<br />
                  Available: 24/7 for spiritual guidance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
