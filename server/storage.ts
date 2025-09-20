import { randomUUID } from "crypto";
import type { 
  User, InsertUser, Product, InsertProduct, Travel, InsertTravel,
  Accommodation, InsertAccommodation, ShraddhaPackage, InsertShraddhaPackage,
  Enquiry, InsertEnquiry, Banner, InsertBanner
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  
  // Travel
  getTravels(): Promise<Travel[]>;
  getTravel(id: string): Promise<Travel | undefined>;
  createTravel(travel: InsertTravel): Promise<Travel>;
  updateTravel(id: string, travel: Partial<InsertTravel>): Promise<Travel>;
  deleteTravel(id: string): Promise<void>;
  
  // Accommodation
  getAccommodations(): Promise<Accommodation[]>;
  getAccommodation(id: string): Promise<Accommodation | undefined>;
  createAccommodation(accommodation: InsertAccommodation): Promise<Accommodation>;
  updateAccommodation(id: string, accommodation: Partial<InsertAccommodation>): Promise<Accommodation>;
  deleteAccommodation(id: string): Promise<void>;
  
  // Shraddha Packages
  getShraddhaPackages(): Promise<ShraddhaPackage[]>;
  getShraddhaPackage(id: string): Promise<ShraddhaPackage | undefined>;
  createShraddhaPackage(shraddhaPackage: InsertShraddhaPackage): Promise<ShraddhaPackage>;
  updateShraddhaPackage(id: string, updates: Partial<InsertShraddhaPackage>): Promise<ShraddhaPackage>;
  deleteShraddhaPackage(id: string): Promise<void>;
  
  // Enquiries
  getEnquiries(): Promise<Enquiry[]>;
  getEnquiry(id: string): Promise<Enquiry | undefined>;
  getUserEnquiries(userId: string): Promise<Enquiry[]>;
  createEnquiry(enquiry: InsertEnquiry): Promise<Enquiry>;
  updateEnquiry(id: string, enquiry: Partial<InsertEnquiry>): Promise<Enquiry>;
  deleteEnquiry(id: string): Promise<void>;
  
  // Banners
  getBanners(): Promise<Banner[]>;
  getBanner(id: string): Promise<Banner | undefined>;
  createBanner(banner: InsertBanner): Promise<Banner>;
  updateBanner(id: string, banner: Partial<InsertBanner>): Promise<Banner>;
  deleteBanner(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private products: Map<string, Product> = new Map();
  private travels: Map<string, Travel> = new Map();
  private accommodations: Map<string, Accommodation> = new Map();
  private shraddhaPackages: Map<string, ShraddhaPackage> = new Map();
  private enquiries: Map<string, Enquiry> = new Map();
  private banners: Map<string, Banner> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Create admin user
    const adminId = randomUUID();
    const admin: User = {
      id: adminId,
      name: "Admin User",
      email: "admin@shivasadhana.in",
      password: "admin123",
      role: "admin",
      createdAt: new Date(),
    };
    this.users.set(adminId, admin);

    // Sample products
    const rudraksha: Product = {
      id: randomUUID(),
      name: "Original Rudraksha Mala",
      description: "Authentic 108 bead Rudraksha mala for meditation and spiritual practices",
      price: 2500,
      images: ["https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=500"],
      category: "Malas",
      inStock: 25,
      createdAt: new Date(),
    };
    this.products.set(rudraksha.id, rudraksha);

    // Sample travel package
    const kedarnath: Travel = {
      id: randomUUID(),
      name: "Kedarnath Spiritual Journey",
      description: "Sacred pilgrimage to Lord Shiva's abode in the Himalayas",
      price: 25000,
      duration: "5 days 4 nights",
      destinations: ["Haridwar", "Kedarnath", "Badrinath"],
      images: ["https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=500"],
      inclusions: ["Accommodation", "Meals", "Transportation", "Guide"],
      exclusions: ["Personal expenses", "Insurance"],
      maxPeople: 15,
      createdAt: new Date(),
    };
    this.travels.set(kedarnath.id, kedarnath);

    // Sample accommodation
    const ghatView: Accommodation = {
      id: randomUUID(),
      name: "Sacred Ghat View Room",
      description: "Peaceful accommodation overlooking the holy Ganges ghats",
      price: 3500,
      location: "Dashashwamedh Ghat, Varanasi",
      amenities: ["River View", "AC", "WiFi", "Temple Nearby"],
      images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500"],
      maxGuests: 4,
      roomType: "Deluxe",
      createdAt: new Date(),
    };
    this.accommodations.set(ghatView.id, ghatView);

    // Sample shraddha package
    const pindDaan: ShraddhaPackage = {
      id: randomUUID(),
      name: "Complete Pind Daan Service",
      description: "Traditional ancestral worship ceremony with experienced purohits",
      price: 5100,
      duration: "Full day ceremony",
      inclusions: ["Purohit services", "All materials", "Ceremony guidance"],
      rituals: ["Pind Daan", "Ganga Aarti", "Ancestral prayers"],
      requirements: "Family details and ceremony date",
      createdAt: new Date(),
    };
    this.shraddhaPackages.set(pindDaan.id, pindDaan);

    // Sample banner
    const heroBanner: Banner = {
      id: randomUUID(),
      title: "Your Spiritual Journey Begins Here",
      subtitle: "Connecting faith, culture, and travel experiences in the sacred land of Varanasi",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920",
      ctaText: "Start Your Journey",
      ctaLink: "/store",
      isActive: 1,
      order: 0,
      createdAt: new Date(),
    };
    this.banners.set(heroBanner.id, heroBanner);
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || "customer",
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      inStock: insertProduct.inStock ?? 0,
      createdAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product> {
    const product = this.products.get(id);
    if (!product) throw new Error("Product not found");
    
    const updated = { ...product, ...updates };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<void> {
    this.products.delete(id);
  }

  // Travel
  async getTravels(): Promise<Travel[]> {
    return Array.from(this.travels.values());
  }

  async getTravel(id: string): Promise<Travel | undefined> {
    return this.travels.get(id);
  }

  async createTravel(insertTravel: InsertTravel): Promise<Travel> {
    const id = randomUUID();
    const travel: Travel = { 
      ...insertTravel, 
      id,
      createdAt: new Date(),
    };
    this.travels.set(id, travel);
    return travel;
  }

  async updateTravel(id: string, updates: Partial<InsertTravel>): Promise<Travel> {
    const travel = this.travels.get(id);
    if (!travel) throw new Error("Travel package not found");
    
    const updated = { ...travel, ...updates };
    this.travels.set(id, updated);
    return updated;
  }

  async deleteTravel(id: string): Promise<void> {
    this.travels.delete(id);
  }

  // Accommodation
  async getAccommodations(): Promise<Accommodation[]> {
    return Array.from(this.accommodations.values());
  }

  async getAccommodation(id: string): Promise<Accommodation | undefined> {
    return this.accommodations.get(id);
  }

  async createAccommodation(insertAccommodation: InsertAccommodation): Promise<Accommodation> {
    const id = randomUUID();
    const accommodation: Accommodation = { 
      ...insertAccommodation, 
      id,
      createdAt: new Date(),
    };
    this.accommodations.set(id, accommodation);
    return accommodation;
  }

  async updateAccommodation(id: string, updates: Partial<InsertAccommodation>): Promise<Accommodation> {
    const accommodation = this.accommodations.get(id);
    if (!accommodation) throw new Error("Accommodation not found");
    
    const updated = { ...accommodation, ...updates };
    this.accommodations.set(id, updated);
    return updated;
  }

  async deleteAccommodation(id: string): Promise<void> {
    this.accommodations.delete(id);
  }

  // Shraddha Packages
  async getShraddhaPackages(): Promise<ShraddhaPackage[]> {
    return Array.from(this.shraddhaPackages.values());
  }

  async getShraddhaPackage(id: string): Promise<ShraddhaPackage | undefined> {
    return this.shraddhaPackages.get(id);
  }

  async createShraddhaPackage(shraddhaPackage: InsertShraddhaPackage): Promise<ShraddhaPackage> {
    const id = randomUUID();
    const shraddhaPackageData: ShraddhaPackage = { 
      ...shraddhaPackage, 
      id,
      createdAt: new Date(),
    };
    this.shraddhaPackages.set(id, shraddhaPackageData);
    return shraddhaPackageData;
  }

  async updateShraddhaPackage(id: string, updates: Partial<InsertShraddhaPackage>): Promise<ShraddhaPackage> {
    const existingPackage = this.shraddhaPackages.get(id);
    if (!existingPackage) throw new Error("Shraddha package not found");
    
    const updated = { ...existingPackage, ...updates };
    this.shraddhaPackages.set(id, updated);
    return updated;
  }

  async deleteShraddhaPackage(id: string): Promise<void> {
    this.shraddhaPackages.delete(id);
  }

  // Enquiries
  async getEnquiries(): Promise<Enquiry[]> {
    return Array.from(this.enquiries.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getEnquiry(id: string): Promise<Enquiry | undefined> {
    return this.enquiries.get(id);
  }

  async getUserEnquiries(userId: string): Promise<Enquiry[]> {
    return Array.from(this.enquiries.values())
      .filter(enquiry => enquiry.userId === userId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createEnquiry(insertEnquiry: InsertEnquiry): Promise<Enquiry> {
    const id = randomUUID();
    const enquiry: Enquiry = { 
      ...insertEnquiry, 
      id,
      serviceId: insertEnquiry.serviceId || null,
      status: insertEnquiry.status || "pending",
      adminNotes: insertEnquiry.adminNotes || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.enquiries.set(id, enquiry);
    return enquiry;
  }

  async updateEnquiry(id: string, updates: Partial<InsertEnquiry>): Promise<Enquiry> {
    const enquiry = this.enquiries.get(id);
    if (!enquiry) throw new Error("Enquiry not found");
    
    const updated = { ...enquiry, ...updates, updatedAt: new Date() };
    this.enquiries.set(id, updated);
    return updated;
  }

  async deleteEnquiry(id: string): Promise<void> {
    this.enquiries.delete(id);
  }

  // Banners
  async getBanners(): Promise<Banner[]> {
    return Array.from(this.banners.values()).sort((a, b) => a.order - b.order);
  }

  async getBanner(id: string): Promise<Banner | undefined> {
    return this.banners.get(id);
  }

  async createBanner(insertBanner: InsertBanner): Promise<Banner> {
    const id = randomUUID();
    const banner: Banner = { 
      ...insertBanner, 
      id,
      isActive: insertBanner.isActive ?? 1,
      order: insertBanner.order ?? 0,
      createdAt: new Date(),
    };
    this.banners.set(id, banner);
    return banner;
  }

  async updateBanner(id: string, updates: Partial<InsertBanner>): Promise<Banner> {
    const banner = this.banners.get(id);
    if (!banner) throw new Error("Banner not found");
    
    const updated = { ...banner, ...updates };
    this.banners.set(id, updated);
    return updated;
  }

  async deleteBanner(id: string): Promise<void> {
    this.banners.delete(id);
  }
}

export const storage = new MemStorage();
