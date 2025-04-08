import { 
  users, candidates, programSections, programItems, contactMessages, suggestions,
  type User, type InsertUser, 
  type Candidate, type InsertCandidate,
  type ProgramSection, type InsertProgramSection,
  type ProgramItem, type InsertProgramItem,
  type ContactMessage, type InsertContactMessage,
  type Suggestion, type InsertSuggestion
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Extend the storage interface with methods for our campaign data
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Candidate methods
  getCandidates(): Promise<Candidate[]>;
  getCandidate(id: number): Promise<Candidate | undefined>;
  createCandidate(candidate: InsertCandidate): Promise<Candidate>;
  
  // Program section methods
  getProgramSections(): Promise<ProgramSection[]>;
  getProgramSection(id: number): Promise<ProgramSection | undefined>;
  createProgramSection(section: InsertProgramSection): Promise<ProgramSection>;
  
  // Program item methods
  getProgramItems(sectionId: number): Promise<ProgramItem[]>;
  getProgramItem(id: number): Promise<ProgramItem | undefined>;
  createProgramItem(item: InsertProgramItem): Promise<ProgramItem>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Suggestion methods
  getSuggestions(): Promise<Suggestion[]>;
  getSuggestion(id: number): Promise<Suggestion | undefined>;
  createSuggestion(suggestion: InsertSuggestion): Promise<Suggestion>;
}

// Database implementation of the storage interface
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Candidate methods
  async getCandidates(): Promise<Candidate[]> {
    return await db.select().from(candidates).orderBy(candidates.orderNumber);
  }
  
  async getCandidate(id: number): Promise<Candidate | undefined> {
    const [candidate] = await db.select().from(candidates).where(eq(candidates.id, id));
    return candidate;
  }
  
  async createCandidate(candidate: InsertCandidate): Promise<Candidate> {
    const [newCandidate] = await db.insert(candidates).values(candidate).returning();
    return newCandidate;
  }
  
  // Program section methods
  async getProgramSections(): Promise<ProgramSection[]> {
    return await db.select().from(programSections);
  }
  
  async getProgramSection(id: number): Promise<ProgramSection | undefined> {
    const [section] = await db.select().from(programSections).where(eq(programSections.id, id));
    return section;
  }
  
  async createProgramSection(section: InsertProgramSection): Promise<ProgramSection> {
    const [newSection] = await db.insert(programSections).values(section).returning();
    return newSection;
  }
  
  // Program item methods
  async getProgramItems(sectionId: number): Promise<ProgramItem[]> {
    return await db.select().from(programItems).where(eq(programItems.sectionId, sectionId));
  }
  
  async getProgramItem(id: number): Promise<ProgramItem | undefined> {
    const [item] = await db.select().from(programItems).where(eq(programItems.id, id));
    return item;
  }
  
  async createProgramItem(item: InsertProgramItem): Promise<ProgramItem> {
    const [newItem] = await db.insert(programItems).values(item).returning();
    return newItem;
  }
  
  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }
  
  // Suggestion methods
  async getSuggestions(): Promise<Suggestion[]> {
    return await db.select().from(suggestions).orderBy(suggestions.createdAt);
  }
  
  async getSuggestion(id: number): Promise<Suggestion | undefined> {
    const [suggestion] = await db.select().from(suggestions).where(eq(suggestions.id, id));
    return suggestion;
  }
  
  async createSuggestion(suggestion: InsertSuggestion): Promise<Suggestion> {
    const [newSuggestion] = await db.insert(suggestions).values(suggestion).returning();
    return newSuggestion;
  }
}

// Export an instance of the database storage
export const storage = new DatabaseStorage();
