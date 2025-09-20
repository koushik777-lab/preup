import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertEnquirySchema, insertProductSchema, insertTravelSchema, insertAccommodationSchema, insertShraddhaPackageSchema, insertBannerSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      
      const user = await storage.createUser(userData);
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(400).json({ message: "Registration failed" });
    }
  });

  // Products routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: "Failed to create product" });
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const product = await storage.updateProduct(id, updates);
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteProduct(id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete product" });
    }
  });

  // Travel routes
  app.get("/api/travels", async (req, res) => {
    try {
      const travels = await storage.getTravels();
      res.json(travels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch travel packages" });
    }
  });

  app.post("/api/travels", async (req, res) => {
    try {
      const travelData = insertTravelSchema.parse(req.body);
      const travel = await storage.createTravel(travelData);
      res.json(travel);
    } catch (error) {
      res.status(400).json({ message: "Failed to create travel package" });
    }
  });

  app.put("/api/travels/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const travel = await storage.updateTravel(id, updates);
      res.json(travel);
    } catch (error) {
      res.status(400).json({ message: "Failed to update travel package" });
    }
  });

  app.delete("/api/travels/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteTravel(id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete travel package" });
    }
  });

  // Accommodations routes
  app.get("/api/accommodations", async (req, res) => {
    try {
      const accommodations = await storage.getAccommodations();
      res.json(accommodations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch accommodations" });
    }
  });

  app.post("/api/accommodations", async (req, res) => {
    try {
      const accommodationData = insertAccommodationSchema.parse(req.body);
      const accommodation = await storage.createAccommodation(accommodationData);
      res.json(accommodation);
    } catch (error) {
      res.status(400).json({ message: "Failed to create accommodation" });
    }
  });

  app.put("/api/accommodations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const accommodation = await storage.updateAccommodation(id, updates);
      res.json(accommodation);
    } catch (error) {
      res.status(400).json({ message: "Failed to update accommodation" });
    }
  });

  app.delete("/api/accommodations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteAccommodation(id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete accommodation" });
    }
  });

  // Shraddha packages routes
  app.get("/api/shraddha-packages", async (req, res) => {
    try {
      const packages = await storage.getShraddhaPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch shraddha packages" });
    }
  });

  app.post("/api/shraddha-packages", async (req, res) => {
    try {
      const packageData = insertShraddhaPackageSchema.parse(req.body);
      const shraddhaPackage = await storage.createShraddhaPackage(packageData);
      res.json(shraddhaPackage);
    } catch (error) {
      res.status(400).json({ message: "Failed to create shraddha package" });
    }
  });

  app.put("/api/shraddha-packages/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const shraddhaPackage = await storage.updateShraddhaPackage(id, updates);
      res.json(shraddhaPackage);
    } catch (error) {
      res.status(400).json({ message: "Failed to update shraddha package" });
    }
  });

  app.delete("/api/shraddha-packages/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteShraddhaPackage(id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete shraddha package" });
    }
  });

  // Enquiries routes
  app.get("/api/enquiries", async (req, res) => {
    try {
      const enquiries = await storage.getEnquiries();
      res.json(enquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch enquiries" });
    }
  });

  app.get("/api/enquiries/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const enquiries = await storage.getUserEnquiries(userId);
      res.json(enquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user enquiries" });
    }
  });

  app.post("/api/enquiries", async (req, res) => {
    try {
      const enquiryData = insertEnquirySchema.parse(req.body);
      const enquiry = await storage.createEnquiry(enquiryData);
      res.json(enquiry);
    } catch (error) {
      res.status(400).json({ message: "Failed to create enquiry" });
    }
  });

  app.put("/api/enquiries/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const enquiry = await storage.updateEnquiry(id, updates);
      res.json(enquiry);
    } catch (error) {
      res.status(400).json({ message: "Failed to update enquiry" });
    }
  });

  app.delete("/api/enquiries/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteEnquiry(id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete enquiry" });
    }
  });

  // Banners routes
  app.get("/api/banners", async (req, res) => {
    try {
      const banners = await storage.getBanners();
      res.json(banners);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch banners" });
    }
  });

  app.post("/api/banners", async (req, res) => {
    try {
      const bannerData = insertBannerSchema.parse(req.body);
      const banner = await storage.createBanner(bannerData);
      res.json(banner);
    } catch (error) {
      res.status(400).json({ message: "Failed to create banner" });
    }
  });

  app.put("/api/banners/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const banner = await storage.updateBanner(id, updates);
      res.json(banner);
    } catch (error) {
      res.status(400).json({ message: "Failed to update banner" });
    }
  });

  app.delete("/api/banners/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBanner(id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete banner" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
