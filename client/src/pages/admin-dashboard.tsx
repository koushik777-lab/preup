import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  MapPin, 
  Bed, 
  FileText, 
  MessageSquare,
  Edit,
  Trash2,
  Plus,
  Eye
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Enquiry, Product, Travel, Accommodation, ShraddhaPackage, Banner } from "@shared/schema";

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  // Redirect if not admin
  if (!user || !isAdmin) {
    setLocation("/");
    return null;
  }

  // Data queries
  const { data: enquiries = [] } = useQuery<Enquiry[]>({
    queryKey: ["/api/enquiries"],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: travels = [] } = useQuery<Travel[]>({
    queryKey: ["/api/travels"],
  });

  const { data: accommodations = [] } = useQuery<Accommodation[]>({
    queryKey: ["/api/accommodations"],
  });

  const { data: shraddhaPackages = [] } = useQuery<ShraddhaPackage[]>({
    queryKey: ["/api/shraddha-packages"],
  });

  const { data: banners = [] } = useQuery<Banner[]>({
    queryKey: ["/api/banners"],
  });

  // Update enquiry status mutation
  const updateEnquiryMutation = useMutation({
    mutationFn: async ({ id, status, adminNotes }: { id: string; status: string; adminNotes?: string }) => {
      return apiRequest("PUT", `/api/enquiries/${id}`, { status, adminNotes });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/enquiries"] });
      toast({
        title: "Status Updated",
        description: "Enquiry status has been updated successfully.",
      });
    },
  });

  // Delete enquiry mutation
  const deleteEnquiryMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/enquiries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/enquiries"] });
      toast({
        title: "Enquiry Deleted",
        description: "Enquiry has been deleted successfully.",
      });
    },
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

  const getServiceTypeDisplay = (serviceType: string) => {
    const types: Record<string, string> = {
      store: "Spiritual Store",
      travel: "Sacred Travel",
      accommodation: "Spiritual Accommodation",
      shraddha: "Shraddha Kriya"
    };
    return types[serviceType] || serviceType;
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const stats = {
    totalEnquiries: enquiries.length,
    pending: enquiries.filter(e => e.status === "pending").length,
    ontouch: enquiries.filter(e => e.status === "ontouch").length,
    confirmed: enquiries.filter(e => e.status === "confirm").length,
    totalProducts: products.length,
    totalTravels: travels.length,
    totalAccommodations: accommodations.length,
    totalShraddhaPackages: shraddhaPackages.length,
  };

  const handleStatusUpdate = (id: string, newStatus: string) => {
    updateEnquiryMutation.mutate({ id, status: newStatus });
  };

  const handleViewEnquiry = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsEnquiryModalOpen(true);
  };

  const handleUpdateEnquiryNotes = (notes: string) => {
    if (selectedEnquiry) {
      updateEnquiryMutation.mutate({ 
        id: selectedEnquiry.id, 
        status: selectedEnquiry.status, 
        adminNotes: notes 
      });
      setIsEnquiryModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8" data-testid="admin-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your spiritual e-commerce platform</p>
          </div>
          <Button 
            onClick={() => setLocation("/")}
            variant="outline"
            data-testid="back-to-home"
          >
            ← Back to Website
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Enquiries</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalEnquiries}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <FileText className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">On Touch</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.ontouch}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="enquiries" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
            <TabsTrigger value="products">Products ({stats.totalProducts})</TabsTrigger>
            <TabsTrigger value="travels">Travel ({stats.totalTravels})</TabsTrigger>
            <TabsTrigger value="accommodations">Stays ({stats.totalAccommodations})</TabsTrigger>
            <TabsTrigger value="shraddha">Shraddha ({stats.totalShraddhaPackages})</TabsTrigger>
            <TabsTrigger value="banners">Banners</TabsTrigger>
          </TabsList>

          {/* Enquiries Tab */}
          <TabsContent value="enquiries">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Enquiry Management</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enquiries.map((enquiry) => (
                        <TableRow key={enquiry.id} data-testid={`enquiry-row-${enquiry.id}`}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{enquiry.name}</div>
                              <div className="text-sm text-muted-foreground">{enquiry.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{getServiceTypeDisplay(enquiry.serviceType)}</TableCell>
                          <TableCell>{formatDate(enquiry.createdAt!)}</TableCell>
                          <TableCell>
                            <Select
                              value={enquiry.status}
                              onValueChange={(value) => handleStatusUpdate(enquiry.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="ontouch">On Touch</SelectItem>
                                <SelectItem value="confirm">Confirmed</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewEnquiry(enquiry)}
                                data-testid={`view-enquiry-${enquiry.id}`}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteEnquiryMutation.mutate(enquiry.id)}
                                className="text-destructive hover:text-destructive"
                                data-testid={`delete-enquiry-${enquiry.id}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Products Management</h2>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>
                
                <div className="text-center py-12 text-muted-foreground">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4" />
                  <p>Product management interface will be implemented here</p>
                  <p className="text-sm">Create, edit, and manage spiritual store items</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Travel Tab */}
          <TabsContent value="travels">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Travel Packages Management</h2>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Package
                  </Button>
                </div>
                
                <div className="text-center py-12 text-muted-foreground">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <p>Travel package management interface will be implemented here</p>
                  <p className="text-sm">Create, edit, and manage spiritual travel packages</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accommodations Tab */}
          <TabsContent value="accommodations">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Accommodations Management</h2>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Accommodation
                  </Button>
                </div>
                
                <div className="text-center py-12 text-muted-foreground">
                  <Bed className="w-16 h-16 mx-auto mb-4" />
                  <p>Accommodation management interface will be implemented here</p>
                  <p className="text-sm">Create, edit, and manage spiritual accommodations</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shraddha Tab */}
          <TabsContent value="shraddha">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Shraddha Packages Management</h2>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Package
                  </Button>
                </div>
                
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4" />
                  <p>Shraddha package management interface will be implemented here</p>
                  <p className="text-sm">Create, edit, and manage ritual packages</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Banners Tab */}
          <TabsContent value="banners">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Homepage Banners</h2>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Banner
                  </Button>
                </div>
                
                <div className="text-center py-12 text-muted-foreground">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4" />
                  <p>Banner management interface will be implemented here</p>
                  <p className="text-sm">Create, edit, and manage homepage banners</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enquiry Detail Modal */}
      <Dialog open={isEnquiryModalOpen} onOpenChange={setIsEnquiryModalOpen}>
        <DialogContent className="max-w-2xl" data-testid="enquiry-detail-modal">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
          </DialogHeader>
          
          {selectedEnquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Customer Name</label>
                  <p className="text-sm text-muted-foreground">{selectedEnquiry.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground">{selectedEnquiry.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="text-sm text-muted-foreground">{selectedEnquiry.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Service Date</label>
                  <p className="text-sm text-muted-foreground">{selectedEnquiry.serviceDate}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Service Type</label>
                <p className="text-sm text-muted-foreground">{getServiceTypeDisplay(selectedEnquiry.serviceType)}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium">Message</label>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{selectedEnquiry.message}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium">Current Status</label>
                <div className="mt-1">{getStatusBadge(selectedEnquiry.status)}</div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Admin Notes</label>
                <Textarea
                  defaultValue={selectedEnquiry.adminNotes || ""}
                  placeholder="Add notes for this enquiry..."
                  onBlur={(e) => handleUpdateEnquiryNotes(e.target.value)}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
