import { pgTable, text, serial, integer, boolean, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table for authentication (preserved from original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Candidates table for the political campaign
export const candidates = pgTable("candidates", {
  id: serial("id").primaryKey(),
  party: text("party").notNull(),
  region: text("region").notNull(),
  photo: text("photo").notNull(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  additionalTitle: text("additionalTitle"),
  about: text("about").notNull(),
  orderNumber: integer("orderNumber").notNull(),
});

// Program sections table for the political campaign
export const programSections = pgTable("programSections", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  icon: text("icon").notNull(),
  goal: text("goal").notNull(),
});

// Program items table for the individual items in each section
export const programItems = pgTable("programItems", {
  id: serial("id").primaryKey(),
  sectionId: integer("sectionId").notNull().references(() => programSections.id),
  content: text("content").notNull(),
});

// Contact messages from the website visitors
export const contactMessages = pgTable("contactMessages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

// Suggestions from website visitors
export const suggestions = pgTable("suggestions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  suggestion: text("suggestion").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCandidateSchema = createInsertSchema(candidates).omit({
  id: true,
});

export const insertProgramSectionSchema = createInsertSchema(programSections).omit({
  id: true,
});

export const insertProgramItemSchema = createInsertSchema(programItems).omit({
  id: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export const insertSuggestionSchema = createInsertSchema(suggestions).omit({
  id: true,
  createdAt: true,
});

// Define types for insert operations
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertCandidate = z.infer<typeof insertCandidateSchema>;
export type InsertProgramSection = z.infer<typeof insertProgramSectionSchema>;
export type InsertProgramItem = z.infer<typeof insertProgramItemSchema>;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type InsertSuggestion = z.infer<typeof insertSuggestionSchema>;

// Define types for select operations
export type User = typeof users.$inferSelect;
export type Candidate = typeof candidates.$inferSelect;
export type ProgramSection = typeof programSections.$inferSelect;
export type ProgramItem = typeof programItems.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type Suggestion = typeof suggestions.$inferSelect;

// Define relations
export const programSectionsRelations = relations(programSections, ({ many }) => ({
  items: many(programItems),
}));

export const programItemsRelations = relations(programItems, ({ one }) => ({
  section: one(programSections, {
    fields: [programItems.sectionId],
    references: [programSections.id],
  }),
}));
