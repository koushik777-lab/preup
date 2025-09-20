import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

const enquirySchema = z.object({
  serviceType: z.string().min(1, "Please select a service"),
  serviceId: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  serviceDate: z.string().min(1, "Please select a service date"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type EnquiryForm = z.infer<typeof enquirySchema>;

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceType?: string;
  defaultServiceId?: string;
}

export default function EnquiryModal({ 
  isOpen, 
  onClose, 
  defaultServiceType,
  defaultServiceId 
}: EnquiryModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<EnquiryForm>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      serviceType: defaultServiceType || "",
      serviceId: defaultServiceId || "",
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      serviceDate: "",
      message: "",
    },
  });

  const enquiryMutation = useMutation({
    mutationFn: async (data: EnquiryForm) => {
      if (!user) throw new Error("User not authenticated");
      
      const enquiryData = {
        ...data,
        userId: user.id,
      };
      
      return apiRequest("POST", "/api/enquiries", enquiryData);
    },
    onSuccess: async (response) => {
      const enquiry = await response.json();
      
      // Send WhatsApp message
      try {
        await sendWhatsAppMessage({
          name: enquiry.name,
          email: enquiry.email,
          phone: enquiry.phone,
          serviceType: enquiry.serviceType,
          serviceDate: enquiry.serviceDate,
          message: enquiry.message,
        });
      } catch (error) {
        console.warn("WhatsApp message failed:", error);
      }

      queryClient.invalidateQueries({ queryKey: ["/api/enquiries"] });
      queryClient.invalidateQueries({ queryKey: ["/api/enquiries/user", user?.id] });
      
      toast({
        title: "Enquiry Sent Successfully!",
        description: "We will contact you soon. A WhatsApp message has been sent to our team.",
      });
      
      form.reset();
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Failed to Send Enquiry",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EnquiryForm) => {
    if (!user) {
      toast({
        title: "Please Login First",
        description: "You need to login to send an enquiry.",
        variant: "destructive",
      });
      return;
    }
    
    enquiryMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto" data-testid="enquiry-modal">
        <DialogHeader>
          <DialogTitle>Send Enquiry</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll get back to you soon.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="service-type-select">
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="store">Spiritual Store</SelectItem>
                      <SelectItem value="travel">Sacred Travel</SelectItem>
                      <SelectItem value="accommodation">Spiritual Accommodation</SelectItem>
                      <SelectItem value="shraddha">Shraddha Kriya</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="enquiry-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} data-testid="enquiry-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} data-testid="enquiry-phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="serviceDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} data-testid="service-date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={4} 
                      placeholder="Please describe your requirements..."
                      data-testid="enquiry-message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                className="flex-1"
                data-testid="cancel-enquiry"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={enquiryMutation.isPending}
                data-testid="submit-enquiry"
              >
                {enquiryMutation.isPending ? "Sending..." : "Send Enquiry"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
