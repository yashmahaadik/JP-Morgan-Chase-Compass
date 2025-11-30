import { GoogleGenAI } from "@google/genai";
import { Account, Goal, ChatMessage } from "../types";

// This function simulates an AI advisor analyzing the user's data
export const generateFinancialInsight = async (accounts: Account[], goals: Goal[]): Promise<string> => {
  // Check if API key is available
  if (!process.env.API_KEY) {
    console.warn("API_KEY not found in environment. Returning mock data.");
    return "Ensure you're maximizing your employer match on that 401(k). It's essentially free money that compounds over time.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Construct a context-aware prompt
    const totalAssets = accounts.reduce((acc, curr) => curr.balance > 0 ? acc + curr.balance : acc, 0);
    const totalDebt = accounts.reduce((acc, curr) => curr.balance < 0 ? acc + Math.abs(curr.balance) : acc, 0);
    
    const prompt = `
      Act as a concise, friendly financial advisor for "Chase Compass", a JPMC product for Gen Z investors.
      Here is the user's financial snapshot:
      - Total Assets: $${totalAssets.toFixed(2)}
      - Total Liabilities: $${totalDebt.toFixed(2)}
      - Accounts: ${accounts.map(a => `${a.name} (${a.type}): $${a.balance}`).join(', ')}
      - Goal: ${goals.length > 0 ? goals[0].name + ' ($' + goals[0].targetAmount + ')' : 'No specific goals yet'}

      Provide ONE single, short (max 2 sentences), actionable, and encouraging financial tip or observation based on this specific data. Use a modern, energetic tone suitable for Gen Z. Do not use markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Keep diversifying your portfolio to minimize risk while maintaining growth potential.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Market conditions are fluctuating. Consider reviewing your automated savings contributions.";
  }
};

export const chatWithCompass = async (message: string, accounts: Account[], goals: Goal[], history: ChatMessage[]): Promise<string> => {
  if (!process.env.API_KEY) {
     return "I'm currently in offline mode, but I'd love to help you track your spending once I'm back online!";
  }

  try {
     const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
     
     const totalAssets = accounts.reduce((acc, curr) => curr.balance > 0 ? acc + curr.balance : acc, 0);
     const totalDebt = accounts.reduce((acc, curr) => curr.balance < 0 ? acc + Math.abs(curr.balance) : acc, 0);

     const context = `
      You are "Compass", a hyper-personalized financial assistant for Gen Z by J.P. Morgan Chase.
      User Context:
      - Net Worth: $${(totalAssets - totalDebt).toFixed(2)}
      - Debt: $${totalDebt.toFixed(2)}
      - Accounts: ${accounts.map(a => `${a.name} ($${a.balance})`).join(', ')}
      
      Your personality:
      - Encouraging, emoji-friendly 🚀, concise, and financially savvy.
      - You simplify complex financial jargon.
      - NEVER give specific investment advice (buying X stock). Focus on habits, savings, and education.
     `;

     const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction: context }
     });

     // Feed simple history (last 3 messages to save tokens/complexity for this prototype)
     const recentHistory = history.slice(-3).map(h => ({
         role: h.role,
         parts: [{ text: h.text }]
     }));
     
     // In a real app we would hydrate the chat history here, but for this stateless prototype 
     // we will just send the new message with the system instruction context doing the heavy lifting.
     
     const result = await chat.sendMessage({ message: message });
     return result.text;

  } catch (error) {
      console.error("Chat Error:", error);
      return "I'm having a little trouble connecting to the financial grid right now. Try again in a sec!";
  }
}