import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, XCircle, Clock, CreditCard } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background py-20" data-testid="refund-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="refund-title">
            Refund Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Your satisfaction and trust are sacred to us
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: December 20, 2024
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <RefreshCw className="w-8 h-8 text-primary mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">Our Commitment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At Shiva Sadhana, we are committed to delivering spiritual products, services, and experiences that truly connect 
                  with your soul. Your satisfaction and trust are sacred to us. This Refund Policy outlines the terms under which 
                  refunds may be issued and ensures transparency in all our transactions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Eligibility for Refund */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <Badge className="bg-green-100 text-green-800 border-green-200 mt-1">
                <span className="text-sm">✓</span>
              </Badge>
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">1. Eligibility for Refund</h2>
                <p className="text-muted-foreground mb-4">
                  You are eligible for a refund under the following conditions:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-muted-foreground">
                        <strong>Cancellation within 24 hours:</strong> You requested a cancellation within 24 hours of placing 
                        your order (before shipment or service initiation).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-muted-foreground">
                        <strong>Damaged or defective products:</strong> You received a damaged, defective, or incorrect product.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-muted-foreground">
                        <strong>Service mismatch:</strong> The product or service did not match the description provided on our website.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-muted-foreground">
                        <strong>Service not delivered:</strong> The online service or consultation was not delivered due to a 
                        technical or scheduling fault from our side.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Non-Refundable Items */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <XCircle className="w-8 h-8 text-destructive mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">2. Non-Refundable Items and Services</h2>
                <p className="text-muted-foreground mb-4">
                  We do not offer refunds for:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                    <div>
                      <p className="text-muted-foreground">
                        <strong>Digital downloads:</strong> E-books, PDFs, guided meditations once delivered.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                    <div>
                      <p className="text-muted-foreground">
                        <strong>Custom-made or personalized items:</strong> Personalized pooja items, name-engraved malas.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                    <div>
                      <p className="text-muted-foreground">
                        <strong>Services already delivered:</strong> Spiritual consultations, pooja performed.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                    <div>
                      <p className="text-muted-foreground">
                        <strong>Products damaged due to customer mishandling:</strong> Items damaged after delivery due to 
                        improper care or handling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeframe */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <Clock className="w-8 h-8 text-primary mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">3. Timeframe for Requesting a Refund</h2>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-muted-foreground">
                      <strong>Refund requests must be submitted within 7 days</strong> of receiving the product or service.
                    </p>
                  </div>
                  
                  <p className="text-muted-foreground">
                    Beyond this period, we will not be able to process your refund request. However, we are always available 
                    to address any concerns or issues you may have with our products or services.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Refund Process */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <CreditCard className="w-8 h-8 text-primary mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">4. Refund Process</h2>
                <p className="text-muted-foreground mb-4">
                  To request a refund, please follow these steps:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">1</Badge>
                    <div>
                      <h3 className="font-semibold text-card-foreground">Contact Our Team</h3>
                      <p className="text-muted-foreground">
                        Email us at <strong>team@shivasadhana.in</strong> or call <strong>+91-8069377929</strong> with your 
                        order details and reason for refund.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">2</Badge>
                    <div>
                      <h3 className="font-semibold text-card-foreground">Provide Documentation</h3>
                      <p className="text-muted-foreground">
                        Include order number, photos (if applicable), and detailed description of the issue.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">3</Badge>
                    <div>
                      <h3 className="font-semibold text-card-foreground">Review Process</h3>
                      <p className="text-muted-foreground">
                        Our team will review your request within 2-3 business days and contact you with our decision.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">4</Badge>
                    <div>
                      <h3 className="font-semibold text-card-foreground">Refund Processing</h3>
                      <p className="text-muted-foreground">
                        If approved, refunds will be processed within 5-7 business days to your original payment method.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Special Circumstances */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">5. Special Circumstances</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Travel Packages</h3>
                <p className="text-muted-foreground">
                  For spiritual travel packages, cancellation charges may apply based on the timing of cancellation and 
                  third-party booking policies. Detailed cancellation terms will be provided at the time of booking.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Accommodation Bookings</h3>
                <p className="text-muted-foreground">
                  Accommodation refunds are subject to the specific property's cancellation policy, which will be clearly 
                  communicated during the booking process.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Ritual Services</h3>
                <p className="text-muted-foreground">
                  Once ritual preparations have begun or materials have been purchased specifically for your ceremony, 
                  partial refunds may apply to cover the costs already incurred.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Processing Times */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">6. Processing Times and Methods</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-card-foreground mb-2">Processing Time</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Request review: 2-3 business days</li>
                  <li>• Refund processing: 5-7 business days</li>
                  <li>• Bank processing: 3-5 additional days</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-card-foreground mb-2">Refund Methods</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Original payment method</li>
                  <li>• Bank transfer (if original method unavailable)</li>
                  <li>• Store credit (by mutual agreement)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">Contact Us for Refunds</h2>
            <p className="text-muted-foreground mb-4">
              If you need to request a refund or have questions about our refund policy, please contact us:
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
                <strong>Note:</strong> We are committed to resolving any issues amicably and will work with you to find 
                a satisfactory solution. Your spiritual journey and satisfaction are our top priorities.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
