"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import type { PlaybookStep, UserProfile } from "@/lib/types";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

interface FollowUpContext {
  step: PlaybookStep;
  user: UserProfile;
  previousQuestions?: string[];
}

export async function askFollowUp(
  question: string,
  context: FollowUpContext
): Promise<string> {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return "I'm sorry, but the AI service is currently unavailable. Please try again later.";
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `You are a helpful financial advisor specializing in helping international students navigate the US financial system. 

The user is asking a follow-up question about this specific playbook step:

Step Title: ${context.step.title}
Step Explanation: ${context.step.explanation}
Recommendation: ${context.step.recommendation.name} - ${context.step.recommendation.description}
Why We Recommend This: ${context.step.recommendation.whyWeRecommend}

User Profile:
- Country of Origin: ${context.user.countryOfOrigin}
- Visa Type: ${context.user.visaType}
- Has SSN: ${context.user.hasSSN ? "Yes" : "No"}
- Has US Bank Account: ${context.user.hasBankAccount ? "Yes" : "No"}
- Sends Money Home: ${context.user.sendsMoneyHome}

Provide a helpful, accurate, and personalized response. Be concise but thorough. If you're unsure about specific details, acknowledge that and suggest reliable sources for more information. Keep your response to 2-4 sentences when possible, but provide more detail if the question requires it.`;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I'm ready to answer follow-up questions about this step in a helpful and personalized way." }],
        },
      ],
    });

    const result = await chat.sendMessage(question);
    const response = result.response.text();

    return response.trim();
  } catch (error) {
    console.error("Error in askFollowUp:", error);
    return "I'm sorry, but I couldn't process your question right now. Please try again later.";
  }
}
