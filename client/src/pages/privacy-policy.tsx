import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Lock, Users } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background py-20" data-testid="privacy-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="privacy-title">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Your privacy and data security are sacred to us
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: December 20, 2024
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <Shield className="w-8 h-8 text-primary mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At Shiva Sadhana, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                  <strong> shivasadhana.in</strong> or use our services. We take your privacy seriously and have implemented appropriate 
                  measures to protect your personal data.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <Eye className="w-8 h-8 text-primary mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">Personal Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  When you visit shivasadhana.in, we automatically collect certain information about your device, including information 
                  about your web browser, IP address, time zone, and some of the installed cookies on your device. Additionally, as you 
                  browse the site, we collect information about the individual web pages or products you view, what websites or search 
                  terms referred you to the site, and how you interact with the site.
                </p>
                
                <h3 className="text-lg font-semibold text-card-foreground mb-3">We collect the following types of information:</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Contact Information:</strong> Name, email address, phone number, postal address</li>
                  <li><strong>Service Information:</strong> Details about requested services, preferences, special requirements</li>
                  <li><strong>Payment Information:</strong> Billing information, payment method details (processed securely through third-party providers)</li>
                  <li><strong>Usage Information:</strong> How you interact with our website, pages visited, time spent</li>
                  <li><strong>Device Information:</strong> Browser type, operating system, IP address, device identifiers</li>
                  <li><strong>Communication Records:</strong> Records of communications between you and our team</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <Users className="w-8 h-8 text-primary mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  Our primary purpose for collecting and using personal information is to provide you with exceptional spiritual services 
                  and experiences. We use the information we collect to:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Process and fulfill your service requests and bookings</li>
                  <li>Communicate with you about your inquiries and reservations</li>
                  <li>Provide customer support and respond to your questions</li>
                  <li>Send you important updates about your services</li>
                  <li>Improve our website and services based on your feedback</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Comply with legal obligations and protect our rights</li>
                  <li>Prevent fraud and ensure the security of our services</li>
                </ul>
                
                <p className="text-muted-foreground mt-4">
                  We may also use your information to contact you via WhatsApp, email, or phone to follow up on your inquiries 
                  and provide you with information about our spiritual services and offerings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <Lock className="w-8 h-8 text-primary mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">Data Protection & Security</h2>
                <p className="text-muted-foreground mb-4">
                  We take the protection of your personal data seriously and have implemented appropriate technical and organizational 
                  measures to protect your information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                
                <h3 className="text-lg font-semibold text-card-foreground mb-3">Our security measures include:</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Secure Socket Layer (SSL) encryption for data transmission</li>
                  <li>Regular security assessments and updates</li>
                  <li>Restricted access to personal data on a need-to-know basis</li>
                  <li>Secure storage of physical and electronic records</li>
                  <li>Regular staff training on data protection practices</li>
                  <li>Incident response procedures for data breaches</li>
                </ul>
                
                <p className="text-muted-foreground mt-4">
                  While we strive to protect your personal information, please note that no method of transmission over the internet 
                  or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to protecting your 
                  data to the best of our ability.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">Your Rights and Choices</h2>
            <p className="text-muted-foreground mb-4">
              You have certain rights regarding your personal information, and we are committed to honoring these rights:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Access Rights</h3>
                <p className="text-muted-foreground">You have the right to request access to the personal information we hold about you.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Correction Rights</h3>
                <p className="text-muted-foreground">You can request that we correct any inaccurate or incomplete personal information.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Deletion Rights</h3>
                <p className="text-muted-foreground">You may request that we delete your personal information, subject to certain exceptions.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Opt-out Rights</h3>
                <p className="text-muted-foreground">You can opt out of receiving marketing communications from us at any time.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cookies and Tracking */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files 
              that are stored on your device when you visit our website.
            </p>
            
            <h3 className="text-lg font-semibold text-card-foreground mb-3">Types of cookies we use:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and enhance your experience</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
            </ul>
            
            <p className="text-muted-foreground mt-4">
              You can control cookies through your browser settings. However, please note that disabling certain cookies may affect 
              the functionality of our website.
            </p>
          </CardContent>
        </Card>

        {/* Third Party Services */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground mb-4">
              We may use third-party services to help us operate our website and provide our services. These third parties have 
              access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose 
              or use it for any other purpose.
            </p>
            
            <h3 className="text-lg font-semibold text-card-foreground mb-3">Third-party services we may use include:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Payment processing services</li>
              <li>Email service providers</li>
              <li>WhatsApp Business API</li>
              <li>Website analytics tools</li>
              <li>Customer support platforms</li>
              <li>Booking and reservation systems</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy, your personal information, or wish to exercise your rights, 
              please contact us:
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
          </CardContent>
        </Card>

        {/* Policy Updates */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, 
              legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this 
              page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically to stay 
              informed about how we are protecting your information.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
