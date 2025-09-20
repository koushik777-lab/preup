import { Card, CardContent } from "@/components/ui/card";
import { FileText, Users, Shield, Gavel } from "lucide-react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-background py-20" data-testid="terms-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="terms-title">
            Terms & Conditions
          </h1>
          <p className="text-xl text-muted-foreground">
            The sacred agreement that guides our spiritual partnership
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: December 20, 2024
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <FileText className="w-8 h-8 text-primary mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to Shiva Sadhana. These Terms and Conditions ("Terms") govern your use of our website 
                  <strong> shivasadhana.in</strong> and all related services, products, and spiritual experiences we provide. 
                  By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part 
                  of these terms, you may not access our services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Description */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <Users className="w-8 h-8 text-primary mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">1. Services Description</h2>
                <p className="text-muted-foreground mb-4">
                  Shiva Sadhana provides spiritual services, products, and experiences including but not limited to:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Spiritual Products</h3>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      <li>• Authentic Rudraksha malas</li>
                      <li>• Sacred artifacts and items</li>
                      <li>• Blessed spiritual accessories</li>
                      <li>• Traditional prayer materials</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Spiritual Services</h3>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      <li>• Pind Daan ceremonies</li>
                      <li>• Vedic rituals and pujas</li>
                      <li>• Spiritual consultations</li>
                      <li>• Custom ceremony arrangements</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Travel & Accommodation</h3>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      <li>• Pilgrimage travel packages</li>
                      <li>• Sacred site accommodations</li>
                      <li>• Guided spiritual tours</li>
                      <li>• Customized itineraries</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Educational Content</h3>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      <li>• Spiritual articles and insights</li>
                      <li>• Cultural heritage information</li>
                      <li>• Ritual guidance materials</li>
                      <li>• Digital spiritual resources</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Responsibilities */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <Shield className="w-8 h-8 text-primary mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">2. User Responsibilities</h2>
                <p className="text-muted-foreground mb-4">
                  By using our services, you agree to:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Account Information</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Provide accurate, current, and complete information</li>
                      <li>• Maintain the security of your account credentials</li>
                      <li>• Update your information as needed</li>
                      <li>• Notify us immediately of any unauthorized use</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Respectful Conduct</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Respect the spiritual nature of our services</li>
                      <li>• Follow appropriate conduct during ceremonies</li>
                      <li>• Treat our staff and other participants with respect</li>
                      <li>• Adhere to cultural and religious protocols</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Payment Obligations</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Make payments as agreed upon booking</li>
                      <li>• Provide valid payment information</li>
                      <li>• Pay any applicable taxes or fees</li>
                      <li>• Comply with our refund and cancellation policies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking and Cancellation */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">3. Booking and Cancellation Policy</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Booking Confirmation</h3>
                <p className="text-muted-foreground">
                  All bookings are subject to availability and confirmation. We reserve the right to cancel or modify 
                  bookings due to unforeseen circumstances, including but not limited to weather conditions, religious 
                  calendar changes, or safety concerns.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Payment Terms</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Full payment may be required at the time of booking for certain services</li>
                  <li>• Partial payments may be accepted for travel packages with balance due before service</li>
                  <li>• All prices are in Indian Rupees (INR) unless otherwise specified</li>
                  <li>• Additional charges may apply for customizations or special requests</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Cancellation by Customer</h3>
                <p className="text-muted-foreground">
                  Cancellation terms vary by service type and are detailed in our Refund Policy. Generally, cancellations 
                  must be made within specified timeframes to be eligible for refunds. Some services may have non-refundable 
                  components due to advance preparations or third-party bookings.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Cancellation by Shiva Sadhana</h3>
                <p className="text-muted-foreground">
                  We reserve the right to cancel services in cases of force majeure, safety concerns, or circumstances 
                  beyond our control. In such cases, we will provide full refunds or offer alternative arrangements.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">4. Intellectual Property Rights</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                The content on our website, including but not limited to text, graphics, logos, images, videos, and software, 
                is the property of Shiva Sadhana or its content suppliers and is protected by copyright, trademark, and other 
                intellectual property laws.
              </p>
              
              <div>
                <h3 className="font-semibold text-card-foreground mb-2">Permitted Use</h3>
                <p className="text-muted-foreground">
                  You may view, download, and print content from our website for personal, non-commercial use only. 
                  You may not modify, distribute, transmit, display, perform, reproduce, publish, license, create derivative 
                  works from, transfer, or sell any content without our written permission.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-card-foreground mb-2">User-Generated Content</h3>
                <p className="text-muted-foreground">
                  Any content you submit to us (reviews, testimonials, photos) becomes our property and may be used for 
                  promotional purposes. You grant us a non-exclusive, worldwide, royalty-free license to use such content.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <Gavel className="w-8 h-8 text-primary mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">5. Limitation of Liability</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    While we strive to provide the highest quality spiritual services and experiences, please understand the 
                    following limitations:
                  </p>
                  
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Service Disclaimer</h3>
                    <p className="text-muted-foreground">
                      Our spiritual services are provided for religious and cultural purposes. We make no guarantees about 
                      specific outcomes or results from spiritual practices, rituals, or ceremonies.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Third-Party Services</h3>
                    <p className="text-muted-foreground">
                      For travel and accommodation services, we work with third-party providers. While we carefully select 
                      our partners, we are not liable for their actions or failures to provide services.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Personal Belongings</h3>
                    <p className="text-muted-foreground">
                      Participants are responsible for their personal belongings during ceremonies, travels, and stays. 
                      We recommend securing valuables and obtaining appropriate travel insurance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy and Data Protection */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">6. Privacy and Data Protection</h2>
            <p className="text-muted-foreground mb-4">
              Your privacy is important to us. Our collection, use, and protection of your personal information is 
              governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our 
              services, you consent to our privacy practices as described in our Privacy Policy.
            </p>
            
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-muted-foreground text-sm">
                Please review our Privacy Policy for detailed information about how we handle your personal data, 
                including contact information, payment details, and service preferences.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">7. Governing Law and Jurisdiction</h2>
            <p className="text-muted-foreground mb-4">
              These Terms and Conditions are governed by and construed in accordance with the laws of India. 
              Any disputes arising from or relating to these Terms or our services shall be subject to the 
              exclusive jurisdiction of the courts in Varanasi, Uttar Pradesh, India.
            </p>
            
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">Dispute Resolution</h3>
              <p className="text-muted-foreground">
                We encourage resolving any disputes through direct communication first. If a resolution cannot 
                be reached, disputes will be handled through the appropriate legal channels in accordance with 
                Indian law.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">8. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective 
              immediately upon posting on our website. Your continued use of our services after changes have been 
              posted constitutes acceptance of the revised Terms. We recommend reviewing these Terms periodically 
              to stay informed of any updates.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-card-foreground mb-2">Email</h3>
                <p className="text-muted-foreground">team@shivasadhana.in</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-card-foreground mb-2">Phone</h3>
                <p className="text-muted-foreground">+91-8069377929</p>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="font-semibold text-card-foreground mb-2">Address</h3>
                <p className="text-muted-foreground">
                  B 37/171, Birdopur, Dr. Usha Gupta Lane<br />
                  Mahmoorganj, Varanasi – 221010<br />
                  Uttar Pradesh, India
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-muted-foreground text-sm">
                <strong>Effective Date:</strong> These Terms and Conditions are effective as of December 20, 2024. 
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
