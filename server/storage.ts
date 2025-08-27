import { 
  type User, 
  type InsertUser, 
  type SoilData, 
  type InsertSoilData,
  type ChatMessage,
  type InsertChatMessage,
  type DiseaseDetection,
  type InsertDiseaseDetection 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createSoilData(soilData: InsertSoilData & { userId: string }): Promise<SoilData>;
  getSoilDataByUser(userId: string): Promise<SoilData[]>;
  createChatMessage(message: InsertChatMessage & { userId: string }): Promise<ChatMessage>;
  getChatMessagesByUser(userId: string): Promise<ChatMessage[]>;
  createDiseaseDetection(detection: InsertDiseaseDetection & { userId: string }): Promise<DiseaseDetection>;
  getDiseaseDetectionsByUser(userId: string): Promise<DiseaseDetection[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private soilData: Map<string, SoilData>;
  private chatMessages: Map<string, ChatMessage>;
  private diseaseDetections: Map<string, DiseaseDetection>;

  constructor() {
    this.users = new Map();
    this.soilData = new Map();
    this.chatMessages = new Map();
    this.diseaseDetections = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createSoilData(insertSoilData: InsertSoilData & { userId: string }): Promise<SoilData> {
    const id = randomUUID();
    const soilDataEntry: SoilData = { 
      ...insertSoilData, 
      id, 
      userId: insertSoilData.userId,
      location: insertSoilData.location || null,
      humidity: insertSoilData.humidity || null,
      createdAt: new Date() 
    };
    this.soilData.set(id, soilDataEntry);
    return soilDataEntry;
  }

  async getSoilDataByUser(userId: string): Promise<SoilData[]> {
    return Array.from(this.soilData.values()).filter(
      (data) => data.userId === userId
    );
  }

  async createChatMessage(insertMessage: InsertChatMessage & { userId: string }): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      userId: insertMessage.userId,
      language: insertMessage.language || null,
      createdAt: new Date()
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getChatMessagesByUser(userId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).filter(
      (message) => message.userId === userId
    );
  }

  async createDiseaseDetection(insertDetection: InsertDiseaseDetection & { userId: string }): Promise<DiseaseDetection> {
    const id = randomUUID();
    const detection: DiseaseDetection = {
      ...insertDetection,
      id,
      userId: insertDetection.userId,
      imagePath: insertDetection.imagePath || null,
      plantType: insertDetection.plantType || null,
      recommendations: insertDetection.recommendations || null,
      createdAt: new Date()
    };
    this.diseaseDetections.set(id, detection);
    return detection;
  }

  async getDiseaseDetectionsByUser(userId: string): Promise<DiseaseDetection[]> {
    return Array.from(this.diseaseDetections.values()).filter(
      (detection) => detection.userId === userId
    );
  }
}

export const storage = new MemStorage();
