import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import type { Enquiry, Product, Travel, Accommodation, ShraddhaPackage, Banner, InsertProduct, InsertTravel, InsertAccommodation, InsertShraddhaPackage } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  
  // Modal states for different entities
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);
  const [isAccommodationModalOpen, setIsAccommodationModalOpen] = useState(false);
  const [isShraddhaModalOpen, setIsShraddhaModalOpen] = useState(false);
  
  // Edit states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingTravel, setEditingTravel] = useState<Travel | null>(null);
  const [editingAccommodation, setEditingAccommodation] = useState<Accommodation | null>(null);
  const [editingShraddha, setEditingShraddha] = useState<ShraddhaPackage | null>(null);

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

  // Product mutations
  const createProductMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      return apiRequest("POST", "/api/products", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setIsProductModalOpen(false);
      setEditingProduct(null);
      toast({ title: "Success", description: "Product created successfully." });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertProduct> }) => {
      return apiRequest("PUT", `/api/products/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setIsProductModalOpen(false);
      setEditingProduct(null);
      toast({ title: "Success", description: "Product updated successfully." });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Success", description: "Product deleted successfully." });
    },
  });

  // Travel mutations
  const createTravelMutation = useMutation({
    mutationFn: async (data: InsertTravel) => {
      return apiRequest("POST", "/api/travels", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/travels"] });
      setIsTravelModalOpen(false);
      setEditingTravel(null);
      toast({ title: "Success", description: "Travel package created successfully." });
    },
  });

  const updateTravelMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertTravel> }) => {
      return apiRequest("PUT", `/api/travels/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/travels"] });
      setIsTravelModalOpen(false);
      setEditingTravel(null);
      toast({ title: "Success", description: "Travel package updated successfully." });
    },
  });

  const deleteTravelMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/travels/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/travels"] });
      toast({ title: "Success", description: "Travel package deleted successfully." });
    },
  });

  // Accommodation mutations
  const createAccommodationMutation = useMutation({
    mutationFn: async (data: InsertAccommodation) => {
      return apiRequest("POST", "/api/accommodations", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/accommodations"] });
      setIsAccommodationModalOpen(false);
      setEditingAccommodation(null);
      toast({ title: "Success", description: "Accommodation created successfully." });
    },
  });

  const updateAccommodationMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertAccommodation> }) => {
      return apiRequest("PUT", `/api/accommodations/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/accommodations"] });
      setIsAccommodationModalOpen(false);
      setEditingAccommodation(null);
      toast({ title: "Success", description: "Accommodation updated successfully." });
    },
  });

  const deleteAccommodationMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/accommodations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/accommodations"] });
      toast({ title: "Success", description: "Accommodation deleted successfully." });
    },
  });

  // Shraddha Package mutations
  const createShraddhaPackageMutation = useMutation({
    mutationFn: async (data: InsertShraddhaPackage) => {
      return apiRequest("POST", "/api/shraddha-packages", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shraddha-packages"] });
      setIsShraddhaModalOpen(false);
      setEditingShraddha(null);
      toast({ title: "Success", description: "Shraddha package created successfully." });
    },
  });

  const updateShraddhaPackageMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertShraddhaPackage> }) => {
      return apiRequest("PUT", `/api/shraddha-packages/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shraddha-packages"] });
      setIsShraddhaModalOpen(false);
      setEditingShraddha(null);
      toast({ title: "Success", description: "Shraddha package updated successfully." });
    },
  });

  const deleteShraddhaPackageMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/shraddha-packages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shraddha-packages"] });
      toast({ title: "Success", description: "Shraddha package deleted successfully." });
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
                  <Button onClick={() => {
                    setEditingProduct(null);
                    setIsProductModalOpen(true);
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-muted-foreground truncate max-w-xs">{product.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>₹{product.price}</TableCell>
                          <TableCell>{product.inStock}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingProduct(product);
                                  setIsProductModalOpen(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteProductMutation.mutate(product.id)}
                                className="text-destructive hover:text-destructive"
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

          {/* Travel Tab */}
          <TabsContent value="travels">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Travel Packages Management</h2>
                  <Button onClick={() => {
                    setEditingTravel(null);
                    setIsTravelModalOpen(true);
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Package
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Max People</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {travels.map((travel) => (
                        <TableRow key={travel.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{travel.name}</div>
                              <div className="text-sm text-muted-foreground truncate max-w-xs">{travel.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>{travel.duration}</TableCell>
                          <TableCell>₹{travel.price}</TableCell>
                          <TableCell>{travel.maxPeople}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingTravel(travel);
                                  setIsTravelModalOpen(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteTravelMutation.mutate(travel.id)}
                                className="text-destructive hover:text-destructive"
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

          {/* Accommodations Tab */}
          <TabsContent value="accommodations">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Accommodations Management</h2>
                  <Button onClick={() => {
                    setEditingAccommodation(null);
                    setIsAccommodationModalOpen(true);
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Accommodation
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Room Type</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Max Guests</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {accommodations.map((accommodation) => (
                        <TableRow key={accommodation.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{accommodation.name}</div>
                              <div className="text-sm text-muted-foreground truncate max-w-xs">{accommodation.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>{accommodation.location}</TableCell>
                          <TableCell>{accommodation.roomType}</TableCell>
                          <TableCell>₹{accommodation.price}</TableCell>
                          <TableCell>{accommodation.maxGuests}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingAccommodation(accommodation);
                                  setIsAccommodationModalOpen(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteAccommodationMutation.mutate(accommodation.id)}
                                className="text-destructive hover:text-destructive"
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

          {/* Shraddha Tab */}
          <TabsContent value="shraddha">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Shraddha Packages Management</h2>
                  <Button onClick={() => {
                    setEditingShraddha(null);
                    setIsShraddhaModalOpen(true);
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Package
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {shraddhaPackages.map((shraddha) => (
                        <TableRow key={shraddha.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{shraddha.name}</div>
                              <div className="text-sm text-muted-foreground truncate max-w-xs">{shraddha.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>{shraddha.duration}</TableCell>
                          <TableCell>₹{shraddha.price}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingShraddha(shraddha);
                                  setIsShraddhaModalOpen(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteShraddhaPackageMutation.mutate(shraddha.id)}
                                className="text-destructive hover:text-destructive"
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

      {/* Product Modal */}
      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <ProductForm 
            product={editingProduct}
            onSubmit={(data) => {
              if (editingProduct) {
                updateProductMutation.mutate({ id: editingProduct.id, data });
              } else {
                createProductMutation.mutate(data);
              }
            }}
            onCancel={() => {
              setIsProductModalOpen(false);
              setEditingProduct(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Travel Modal */}
      <Dialog open={isTravelModalOpen} onOpenChange={setIsTravelModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTravel ? "Edit Travel Package" : "Add Travel Package"}</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center text-muted-foreground">
            <p>Travel form component will be implemented</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Accommodation Modal */}
      <Dialog open={isAccommodationModalOpen} onOpenChange={setIsAccommodationModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingAccommodation ? "Edit Accommodation" : "Add Accommodation"}</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center text-muted-foreground">
            <p>Accommodation form component will be implemented</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Shraddha Package Modal */}
      <Dialog open={isShraddhaModalOpen} onOpenChange={setIsShraddhaModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingShraddha ? "Edit Shraddha Package" : "Add Shraddha Package"}</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center text-muted-foreground">
            <p>Shraddha package form component will be implemented</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Form Components
interface ProductFormProps {
  product?: Product | null;
  onSubmit: (data: InsertProduct) => void;
  onCancel: () => void;
}

function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(1, "Price must be greater than 0"),
    category: z.string().min(1, "Category is required"),
    inStock: z.number().min(0, "Stock must be 0 or greater"),
    images: z.array(z.string()).min(1, "At least one image URL is required")
  });

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      category: product?.category || "",
      inStock: product?.inStock || 0,
      images: product?.images || [""]
    }
  });

  const handleImageChange = (index: number, value: string) => {
    const currentImages = form.getValues("images");
    const newImages = [...currentImages];
    newImages[index] = value;
    form.setValue("images", newImages);
  };

  const addImageField = () => {
    const currentImages = form.getValues("images");
    form.setValue("images", [...currentImages, ""]);
  };

  const removeImageField = (index: number) => {
    const currentImages = form.getValues("images");
    if (currentImages.length > 1) {
      form.setValue("images", currentImages.filter((_, i) => i !== index));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (₹)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="inStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Spiritual Books, Meditation Items" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div>
          <FormLabel>Product Images (URLs)</FormLabel>
          {form.watch("images").map((image, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <Input
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeImageField(index)}
                disabled={form.watch("images").length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addImageField}
            className="mt-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Image
          </Button>
        </div>
        
        <Separator />
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {product ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
