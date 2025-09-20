import { useState } from "react";
import { useForm, useFieldArray, type FieldPathByValue, type Control } from "react-hook-form";
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
import type { Enquiry, Product, Travel, Accommodation, ShraddhaPackage, Banner, InsertProduct, InsertTravel, InsertAccommodation, InsertShraddhaPackage, InsertBanner } from "@shared/schema";
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
  
  // Banner states
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

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

  // Banner mutations
  const createBannerMutation = useMutation({
    mutationFn: async (data: InsertBanner) => {
      return apiRequest("POST", "/api/banners", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      setIsBannerModalOpen(false);
      setEditingBanner(null);
      toast({ title: "Success", description: "Banner created successfully." });
    },
  });

  const updateBannerMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertBanner> }) => {
      return apiRequest("PUT", `/api/banners/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      setIsBannerModalOpen(false);
      setEditingBanner(null);
      toast({ title: "Success", description: "Banner updated successfully." });
    },
  });

  const deleteBannerMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/banners/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      toast({ title: "Success", description: "Banner deleted successfully." });
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
                  <Button onClick={() => {
                    setEditingBanner(null);
                    setIsBannerModalOpen(true);
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Banner
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Subtitle</TableHead>
                        <TableHead>CTA Text</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {banners.map((banner) => (
                        <TableRow key={banner.id}>
                          <TableCell>
                            <div className="font-medium">{banner.title}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground truncate max-w-xs">{banner.subtitle}</div>
                          </TableCell>
                          <TableCell>{banner.ctaText}</TableCell>
                          <TableCell>{banner.order}</TableCell>
                          <TableCell>
                            <Badge variant={banner.isActive ? "default" : "secondary"}>
                              {banner.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingBanner(banner);
                                  setIsBannerModalOpen(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteBannerMutation.mutate(banner.id)}
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
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
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
          <TravelForm 
            travel={editingTravel}
            onSubmit={(data) => {
              if (editingTravel) {
                updateTravelMutation.mutate({ id: editingTravel.id, data });
              } else {
                createTravelMutation.mutate(data);
              }
            }}
            onCancel={() => {
              setIsTravelModalOpen(false);
              setEditingTravel(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Accommodation Modal */}
      <Dialog open={isAccommodationModalOpen} onOpenChange={setIsAccommodationModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingAccommodation ? "Edit Accommodation" : "Add Accommodation"}</DialogTitle>
          </DialogHeader>
          <AccommodationForm 
            accommodation={editingAccommodation}
            onSubmit={(data) => {
              if (editingAccommodation) {
                updateAccommodationMutation.mutate({ id: editingAccommodation.id, data });
              } else {
                createAccommodationMutation.mutate(data);
              }
            }}
            onCancel={() => {
              setIsAccommodationModalOpen(false);
              setEditingAccommodation(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Shraddha Package Modal */}
      <Dialog open={isShraddhaModalOpen} onOpenChange={setIsShraddhaModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingShraddha ? "Edit Shraddha Package" : "Add Shraddha Package"}</DialogTitle>
          </DialogHeader>
          <ShraddhaPackageForm 
            shraddhaPackage={editingShraddha}
            onSubmit={(data) => {
              if (editingShraddha) {
                updateShraddhaPackageMutation.mutate({ id: editingShraddha.id, data });
              } else {
                createShraddhaPackageMutation.mutate(data);
              }
            }}
            onCancel={() => {
              setIsShraddhaModalOpen(false);
              setEditingShraddha(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Banner Modal */}
      <Dialog open={isBannerModalOpen} onOpenChange={setIsBannerModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBanner ? "Edit Banner" : "Add Banner"}</DialogTitle>
          </DialogHeader>
          <BannerForm 
            banner={editingBanner}
            onSubmit={(data) => {
              if (editingBanner) {
                updateBannerMutation.mutate({ id: editingBanner.id, data });
              } else {
                createBannerMutation.mutate(data);
              }
            }}
            onCancel={() => {
              setIsBannerModalOpen(false);
              setEditingBanner(null);
            }}
          />
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

  const form = useForm<InsertProduct>({
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
        
        <StringArrayField form={form} name="images" label="Product Images (URLs)" placeholder="Enter image URL" />
        
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

// Travel Form Component
interface TravelFormProps {
  travel?: Travel | null;
  onSubmit: (data: InsertTravel) => void;
  onCancel: () => void;
}

function TravelForm({ travel, onSubmit, onCancel }: TravelFormProps) {
  const travelSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(1, "Price must be greater than 0"),
    duration: z.string().min(1, "Duration is required"),
    maxPeople: z.number().min(1, "Max people must be at least 1"),
    destinations: z.array(z.string()).min(1, "At least one destination is required"),
    images: z.array(z.string()).min(1, "At least one image URL is required"),
    inclusions: z.array(z.string()).min(1, "At least one inclusion is required"),
    exclusions: z.array(z.string()).min(1, "At least one exclusion is required")
  });

  const form = useForm<InsertTravel>({
    resolver: zodResolver(travelSchema),
    defaultValues: {
      name: travel?.name || "",
      description: travel?.description || "",
      price: travel?.price || 0,
      duration: travel?.duration || "",
      maxPeople: travel?.maxPeople || 1,
      destinations: travel?.destinations || [""],
      images: travel?.images || [""],
      inclusions: travel?.inclusions || [""],
      exclusions: travel?.exclusions || [""]
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter travel package name" {...field} />
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
                <Textarea placeholder="Enter package description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-3 gap-4">
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
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 5 Days 4 Nights" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="maxPeople"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max People</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="1" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <StringArrayField form={form} name="destinations" label="Destinations" />
        <StringArrayField form={form} name="images" label="Image URLs" />
        <StringArrayField form={form} name="inclusions" label="Inclusions" />
        <StringArrayField form={form} name="exclusions" label="Exclusions" />
        
        <Separator />
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {travel ? "Update Package" : "Create Package"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Accommodation Form Component
interface AccommodationFormProps {
  accommodation?: Accommodation | null;
  onSubmit: (data: InsertAccommodation) => void;
  onCancel: () => void;
}

function AccommodationForm({ accommodation, onSubmit, onCancel }: AccommodationFormProps) {
  const accommodationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(1, "Price must be greater than 0"),
    location: z.string().min(1, "Location is required"),
    roomType: z.string().min(1, "Room type is required"),
    maxGuests: z.number().min(1, "Max guests must be at least 1"),
    amenities: z.array(z.string()).min(1, "At least one amenity is required"),
    images: z.array(z.string()).min(1, "At least one image URL is required")
  });

  const form = useForm<InsertAccommodation>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      name: accommodation?.name || "",
      description: accommodation?.description || "",
      price: accommodation?.price || 0,
      location: accommodation?.location || "",
      roomType: accommodation?.roomType || "",
      maxGuests: accommodation?.maxGuests || 1,
      amenities: accommodation?.amenities || [""],
      images: accommodation?.images || [""]
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accommodation Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter accommodation name" {...field} />
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
                <Textarea placeholder="Enter accommodation description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="roomType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Deluxe Room, Suite" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per Night (₹)</FormLabel>
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
            name="maxGuests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Guests</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="1" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <StringArrayField form={form} name="amenities" label="Amenities" placeholder="Enter amenity" />
        <StringArrayField form={form} name="images" label="Image URLs" placeholder="Enter image URL" />
        
        <Separator />
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {accommodation ? "Update Accommodation" : "Create Accommodation"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Shraddha Package Form Component
interface ShraddhaPackageFormProps {
  shraddhaPackage?: ShraddhaPackage | null;
  onSubmit: (data: InsertShraddhaPackage) => void;
  onCancel: () => void;
}

function ShraddhaPackageForm({ shraddhaPackage, onSubmit, onCancel }: ShraddhaPackageFormProps) {
  const shraddhaSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(1, "Price must be greater than 0"),
    duration: z.string().min(1, "Duration is required"),
    requirements: z.string().min(1, "Requirements are required"),
    inclusions: z.array(z.string()).min(1, "At least one inclusion is required"),
    rituals: z.array(z.string()).min(1, "At least one ritual is required")
  });

  const form = useForm<InsertShraddhaPackage>({
    resolver: zodResolver(shraddhaSchema),
    defaultValues: {
      name: shraddhaPackage?.name || "",
      description: shraddhaPackage?.description || "",
      price: shraddhaPackage?.price || 0,
      duration: shraddhaPackage?.duration || "",
      requirements: shraddhaPackage?.requirements || "",
      inclusions: shraddhaPackage?.inclusions || [""],
      rituals: shraddhaPackage?.rituals || [""]
    }
  });


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter shraddha package name" {...field} />
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
                <Textarea placeholder="Enter package description" {...field} />
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
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 3 hours, 1 day" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter requirements for the ritual" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <StringArrayField form={form} name="inclusions" label="Inclusions" placeholder="Enter inclusion" />
        <StringArrayField form={form} name="rituals" label="Rituals" placeholder="Enter ritual" />
        
        <Separator />
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {shraddhaPackage ? "Update Package" : "Create Package"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Banner Form Component
interface BannerFormProps {
  banner?: Banner | null;
  onSubmit: (data: InsertBanner) => void;
  onCancel: () => void;
}

function BannerForm({ banner, onSubmit, onCancel }: BannerFormProps) {
  const bannerSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().min(1, "Subtitle is required"),
    image: z.string().min(1, "Image URL is required"),
    ctaText: z.string().min(1, "CTA text is required"),
    ctaLink: z.string().min(1, "CTA link is required"),
    isActive: z.number().min(0).max(1),
    order: z.number().min(0, "Order must be 0 or greater")
  });

  const form = useForm<z.infer<typeof bannerSchema>>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: banner?.title || "",
      subtitle: banner?.subtitle || "",
      image: banner?.image || "",
      ctaText: banner?.ctaText || "",
      ctaLink: banner?.ctaLink || "",
      isActive: banner?.isActive || 1,
      order: banner?.order || 0
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter banner title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter banner subtitle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="ctaText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CTA Button Text</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Learn More" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ctaLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CTA Button Link</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., /store" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
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
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select 
                    value={field.value.toString()} 
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Active</SelectItem>
                      <SelectItem value="0">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Separator />
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {banner ? "Update Banner" : "Create Banner"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Reusable StringArrayField component for proper focus handling
interface StringArrayFieldProps<T extends Record<string, any>> {
  form: any;
  name: FieldPathByValue<T, string[]>;
  label: string;
  placeholder?: string;
  addLabel?: string;
}

function StringArrayField<T extends Record<string, any>>({ 
  form, 
  name, 
  label, 
  placeholder = "",
  addLabel 
}: StringArrayFieldProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: name as any
  });

  return (
    <div>
      <FormLabel>{label}</FormLabel>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-2 mt-2">
          <Input
            placeholder={placeholder || `Enter ${label.toLowerCase().slice(0, -1)}`}
            {...form.register(`${name}.${index}` as const)}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => remove(index)}
            disabled={fields.length === 1}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append("")}
        className="mt-2"
      >
        <Plus className="w-4 h-4 mr-2" />
        {addLabel || `Add ${label.slice(0, -1)}`}
      </Button>
    </div>
  );
}
