import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Calendar, Package, TrendingUp, Eye, Plus } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import EnquiryModal from "@/components/enquiry-modal";
import type { Enquiry } from "@shared/schema";

export default function CustomerDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  const { data: enquiries = [], isLoading } = useQuery<Enquiry[]>({
    queryKey: ["/api/enquiries/user", user?.id],
    enabled: !!user,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="status-pending">Pending</Badge>;
      case "ontouch":
        return <Badge className="status-ontouch">On Touch</Badge>;
      case "confirm":
        return <Badge className="status-confirm">Confirmed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getServiceDisplayName = (serviceType: string) => {
    switch (serviceType) {
      case "store":
        return "Spiritual Store";
      case "travel":
        return "Sacred Travel";
      case "accommodation":
        return "Spiritual Accommodation";
      case "shraddha":
        return "Shraddha Kriya";
      default:
        return serviceType;
    }
  };

  const stats = {
    totalEnquiries: enquiries.length,
    pending: enquiries.filter(e => e.status === "pending").length,
    ontouch: enquiries.filter(e => e.status === "ontouch").length,
    confirmed: enquiries.filter(e => e.status === "confirm").length,
  };

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20" data-testid="customer-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground" data-testid="dashboard-title">
              My Spiritual Dashboard
            </h1>
            <p className="text-muted-foreground">Track your enquiries and spiritual journey</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsEnquiryModalOpen(true)}
              data-testid="new-enquiry-button"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Enquiry
            </Button>
            <Button variant="outline" onClick={logout} data-testid="logout-button">
              Logout
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground" data-testid="user-name">
                    {user.name}
                  </h3>
                  <p className="text-muted-foreground" data-testid="user-email">
                    {user.email}
                  </p>
                </div>
                
                {/* Statistics */}
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Enquiries</span>
                    <span className="font-semibold" data-testid="total-enquiries">
                      {stats.totalEnquiries}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pending</span>
                    <span className="font-semibold text-yellow-600" data-testid="pending-count">
                      {stats.pending}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">On Touch</span>
                    <span className="font-semibold text-blue-600" data-testid="ontouch-count">
                      {stats.ontouch}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Confirmed</span>
                    <span className="font-semibold text-green-600" data-testid="confirmed-count">
                      {stats.confirmed}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Enquiry History */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-card-foreground">Enquiry History</h2>
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                
                {enquiries.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-xl text-muted-foreground mb-2">No enquiries yet</p>
                    <p className="text-muted-foreground mb-4">
                      Start your spiritual journey by making your first enquiry
                    </p>
                    <Button onClick={() => setIsEnquiryModalOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Make Your First Enquiry
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enquiries.map((enquiry) => (
                      <Card key={enquiry.id} className="border" data-testid={`enquiry-${enquiry.id}`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-card-foreground">
                              {getServiceDisplayName(enquiry.serviceType)}
                            </h3>
                            {getStatusBadge(enquiry.status)}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span>Service Date: {enquiry.serviceDate}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span>Enquired: {new Date(enquiry.createdAt!).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {enquiry.message}
                          </p>
                          
                          {enquiry.adminNotes && (
                            <div className="bg-muted p-3 rounded-lg mb-3">
                              <p className="text-sm font-medium text-card-foreground mb-1">Admin Notes:</p>
                              <p className="text-sm text-muted-foreground">{enquiry.adminNotes}</p>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">
                              Last updated: {new Date(enquiry.updatedAt!).toLocaleDateString()}
                            </span>
                            <Button variant="outline" size="sm" data-testid={`view-enquiry-${enquiry.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </div>
  );
}
