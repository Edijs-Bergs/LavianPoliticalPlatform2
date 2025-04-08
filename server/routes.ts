import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCandidateSchema, insertProgramSectionSchema, insertProgramItemSchema, insertContactMessageSchema, insertSuggestionSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints for candidates
  app.get("/api/candidates", async (_req: Request, res: Response) => {
    try {
      const candidates = await storage.getCandidates();
      res.json(candidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      res.status(500).json({ error: "Failed to fetch candidates" });
    }
  });

  app.get("/api/candidates/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid candidate ID" });
      }
      
      const candidate = await storage.getCandidate(id);
      if (!candidate) {
        return res.status(404).json({ error: "Candidate not found" });
      }
      
      res.json(candidate);
    } catch (error) {
      console.error("Error fetching candidate:", error);
      res.status(500).json({ error: "Failed to fetch candidate" });
    }
  });

  app.post("/api/candidates", async (req: Request, res: Response) => {
    try {
      const candidateData = insertCandidateSchema.parse(req.body);
      const newCandidate = await storage.createCandidate(candidateData);
      res.status(201).json(newCandidate);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating candidate:", error);
      res.status(500).json({ error: "Failed to create candidate" });
    }
  });

  // API endpoints for program sections
  
  // API endpoint for complete program sections with their items
  app.get("/api/program-sections/complete", async (_req: Request, res: Response) => {
    try {
      const sections = await storage.getProgramSections();
      
      const sectionsWithItems = await Promise.all(
        sections.map(async (section) => {
          const items = await storage.getProgramItems(section.id);
          return {
            ...section,
            items: items.map(item => item.content)
          };
        })
      );
      
      res.json(sectionsWithItems);
    } catch (error) {
      console.error("Error fetching complete program sections:", error);
      res.status(500).json({ error: "Failed to fetch complete program sections" });
    }
  });
  
  app.get("/api/program-sections", async (_req: Request, res: Response) => {
    try {
      const sections = await storage.getProgramSections();
      res.json(sections);
    } catch (error) {
      console.error("Error fetching program sections:", error);
      res.status(500).json({ error: "Failed to fetch program sections" });
    }
  });

  app.get("/api/program-sections/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid section ID" });
      }
      
      const section = await storage.getProgramSection(id);
      if (!section) {
        return res.status(404).json({ error: "Program section not found" });
      }
      
      res.json(section);
    } catch (error) {
      console.error("Error fetching program section:", error);
      res.status(500).json({ error: "Failed to fetch program section" });
    }
  });

  app.post("/api/program-sections", async (req: Request, res: Response) => {
    try {
      const sectionData = insertProgramSectionSchema.parse(req.body);
      const newSection = await storage.createProgramSection(sectionData);
      res.status(201).json(newSection);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating program section:", error);
      res.status(500).json({ error: "Failed to create program section" });
    }
  });

  // API endpoints for program items
  app.get("/api/program-sections/:sectionId/items", async (req: Request, res: Response) => {
    try {
      const sectionId = parseInt(req.params.sectionId);
      if (isNaN(sectionId)) {
        return res.status(400).json({ error: "Invalid section ID" });
      }
      
      const items = await storage.getProgramItems(sectionId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching program items:", error);
      res.status(500).json({ error: "Failed to fetch program items" });
    }
  });

  app.post("/api/program-items", async (req: Request, res: Response) => {
    try {
      const itemData = insertProgramItemSchema.parse(req.body);
      const newItem = await storage.createProgramItem(itemData);
      res.status(201).json(newItem);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating program item:", error);
      res.status(500).json({ error: "Failed to create program item" });
    }
  });

  // API endpoint for contact messages
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const newMessage = await storage.createContactMessage(messageData);
      res.status(201).json(newMessage);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating contact message:", error);
      res.status(500).json({ error: "Failed to create contact message" });
    }
  });

  // API endpoints for suggestions
  app.get("/api/suggestions", async (_req: Request, res: Response) => {
    try {
      const suggestions = await storage.getSuggestions();
      res.json(suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      res.status(500).json({ error: "Failed to fetch suggestions" });
    }
  });

  app.get("/api/suggestions/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid suggestion ID" });
      }
      
      const suggestion = await storage.getSuggestion(id);
      if (!suggestion) {
        return res.status(404).json({ error: "Suggestion not found" });
      }
      
      res.json(suggestion);
    } catch (error) {
      console.error("Error fetching suggestion:", error);
      res.status(500).json({ error: "Failed to fetch suggestion" });
    }
  });

  app.post("/api/suggestions", async (req: Request, res: Response) => {
    try {
      const suggestionData = insertSuggestionSchema.parse(req.body);
      const newSuggestion = await storage.createSuggestion(suggestionData);
      res.status(201).json(newSuggestion);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating suggestion:", error);
      res.status(500).json({ error: "Failed to create suggestion" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
