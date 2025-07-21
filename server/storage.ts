import { products, contacts, users, type Product, type InsertProduct, type Contact, type InsertContact, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private contacts: Map<number, Contact>;
  private currentUserId: number;
  private currentProductId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.contacts = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentContactId = 1;
    
    this.initializeProducts();
  }

  private initializeProducts() {
    const initialProducts: Omit<Product, 'id'>[] = [
      {
        name: "Oh My Greens",
        slug: "oh-my-greens",
        description: "A zesty super-green blend packed with nutrients and designed to energize your day. Contains kale, spinach, apple, lemon, and cucumber.",
        price: "299",
        originalPrice: null,
        calories: 80,
        category: "juices",
        imageUrl: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        ingredients: ["kale", "spinach", "apple", "lemon", "cucumber"],
        featured: true,
        inStock: true,
      },
      {
        name: "Rise and Shine",
        slug: "rise-and-shine",
        description: "Eye-opening blend of carrots, oranges, apple and lemon designed to promote eye health and provide natural energy.",
        price: "249",
        originalPrice: null,
        calories: 130,
        category: "juices",
        imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        ingredients: ["carrots", "oranges", "apple", "lemon"],
        featured: true,
        inStock: true,
      },
      {
        name: "Immune Shot",
        slug: "immune-shot",
        description: "Healthful, invigorating kick with ginger, turmeric and apple to boost immunity and provide natural wellness support.",
        price: "99",
        originalPrice: null,
        calories: 34,
        category: "shots",
        imageUrl: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        ingredients: ["ginger", "turmeric", "apple"],
        featured: true,
        inStock: true,
      },
      {
        name: "Lovely Red",
        slug: "lovely-red",
        description: "Vibrant blend of beets, cucumber, apple with refreshing taste and powerful nutrients for cardiovascular health.",
        price: "279",
        originalPrice: null,
        calories: 100,
        category: "juices",
        imageUrl: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        ingredients: ["beets", "cucumber", "apple", "lemon"],
        featured: true,
        inStock: true,
      },
      {
        name: "Pink Dragon",
        slug: "pink-dragon",
        description: "Dragon fruit, pineapple, banana with almond milk base for tropical refreshment and antioxidant power.",
        price: "239",
        originalPrice: null,
        calories: 180,
        category: "smoothies",
        imageUrl: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        ingredients: ["dragon fruit", "pineapple", "banana", "almond milk"],
        featured: true,
        inStock: true,
      },
      {
        name: "Ever Green",
        slug: "ever-green",
        description: "Mango, pineapple, kale, spinach and figs with almond milk base for the perfect green smoothie experience.",
        price: "259",
        originalPrice: null,
        calories: 150,
        category: "smoothies",
        imageUrl: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        ingredients: ["mango", "pineapple", "kale", "spinach", "figs", "almond milk"],
        featured: true,
        inStock: true,
      },
      {
        name: "3-Day Juice Cleanse",
        slug: "3-day-juice-cleanse",
        description: "Complete 3-day detox with 22 bottles of organic juices for full body cleansing and rejuvenation.",
        price: "3999",
        originalPrice: "4599",
        calories: null,
        category: "cleanses",
        imageUrl: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        ingredients: ["various organic juices"],
        featured: true,
        inStock: true,
      },
      {
        name: "Vegan Protein Shake",
        slug: "vegan-protein-shake",
        description: "Protein in chocolate or vanilla flavor with bananas and almond milk base for post-workout nutrition.",
        price: "199",
        originalPrice: null,
        calories: 220,
        category: "smoothies",
        imageUrl: "https://images.unsplash.com/photo-1552948753-f146ccacd57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        ingredients: ["plant protein", "bananas", "almond milk"],
        featured: true,
        inStock: true,
      },
      {
        name: "Mean Green",
        slug: "mean-green",
        description: "Robust blend of parsley, celery, cucumber, cilantro, apple and lemon packed with nutrients and health benefits.",
        price: "269",
        originalPrice: null,
        calories: 60,
        category: "juices",
        imageUrl: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        ingredients: ["parsley", "celery", "cucumber", "cilantro", "apple", "lemon"],
        featured: false,
        inStock: true,
      },
      {
        name: "Cool as a Cucumber",
        slug: "cool-as-a-cucumber",
        description: "Refreshing mix of cucumber, orange, apple and lemon designed to lower blood pressure and promote healthy digestion.",
        price: "229",
        originalPrice: null,
        calories: 100,
        category: "juices",
        imageUrl: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        ingredients: ["cucumber", "orange", "apple", "lemon"],
        featured: false,
        inStock: true,
      },
      {
        name: "Island Breeze Smoothie",
        slug: "island-breeze-smoothie",
        description: "Tropical smoothie with strawberries, pineapple, bananas and almond milk base for a taste of paradise.",
        price: "219",
        originalPrice: null,
        calories: 160,
        category: "smoothies",
        imageUrl: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        ingredients: ["strawberries", "pineapple", "bananas", "almond milk"],
        featured: false,
        inStock: true,
      },
      {
        name: "1-Day Juice Cleanse",
        slug: "1-day-juice-cleanse",
        description: "Perfect introduction to cleansing with 8 bottles of organic juices for a gentle one-day reset.",
        price: "1599",
        originalPrice: "1799",
        calories: null,
        category: "cleanses",
        imageUrl: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        ingredients: ["various organic juices"],
        featured: false,
        inStock: true,
      },
    ];

    initialProducts.forEach((product) => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category,
    );
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.featured,
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
