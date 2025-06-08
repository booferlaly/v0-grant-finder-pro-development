"use server"

import { xai } from "@ai-sdk/xai"
import { generateText } from "ai"

// Grant matching using Grok
export async function matchGrantsToProfile(profile: any, availableGrants: any[]) {
  const profileText = JSON.stringify(profile)
  const grantsText = JSON.stringify(availableGrants)

  const prompt = `
    You are an expert grant matcher. Given a nonprofit profile and a list of available grants,
    rank the grants by how well they match the nonprofit's mission, focus areas, and capabilities.
    
    Nonprofit Profile:
    ${profileText}
    
    Available Grants:
    ${grantsText}
    
    For each grant, provide:
    1. A match score from 0-100
    2. Key reasons for the match
    3. Potential areas to strengthen in the application
    
    Return the results as a JSON array of objects with the following structure:
    { grantId, matchScore, matchReasons: [], improvementAreas: [] }
  `

  const { text } = await generateText({
    model: xai("grok-beta"),
    prompt,
    temperature: 0.2,
    maxTokens: 2000,
  })

  try {
    return JSON.parse(text)
  } catch (e) {
    console.error("Failed to parse AI response:", e)
    return []
  }
}

// Grant writing assistance using Grok
export async function improveGrantWriting(section: string, content: string, grantRequirements: string) {
  const prompt = `
    You are an expert grant writer. Improve the following ${section} section for a grant application.
    
    Grant Requirements:
    ${grantRequirements}
    
    Current Content:
    ${content}
    
    Provide specific improvements focusing on:
    1. Clarity and conciseness
    2. Alignment with grant requirements
    3. Compelling narrative
    4. Measurable outcomes
    5. Addressing potential concerns
    
    Return only the improved content without explanations.
  `

  const { text } = await generateText({
    model: xai("grok-beta"),
    prompt,
    temperature: 0.7,
    maxTokens: 1500,
  })

  return text
}

// Application review
export async function reviewApplication(application: any, grantCriteria: any) {
  const applicationText = JSON.stringify(application)
  const criteriaText = JSON.stringify(grantCriteria)

  const prompt = `
    You are an expert grant reviewer. Analyze this grant application against the evaluation criteria.
    
    Application:
    ${applicationText}
    
    Evaluation Criteria:
    ${criteriaText}
    
    Provide a detailed review including:
    1. Overall score (0-100)
    2. Strengths of the application
    3. Weaknesses and areas for improvement
    4. Specific feedback for each section
    5. Recommendations for improving the application
    
    Return the results as a JSON object with the following structure:
    { overallScore, strengths: [], weaknesses: [], sectionFeedback: {}, recommendations: [] }
  `

  const { text } = await generateText({
    model: xai("grok-beta"),
    prompt,
    temperature: 0.3,
    maxTokens: 2000,
  })

  try {
    return JSON.parse(text)
  } catch (e) {
    console.error("Failed to parse AI response:", e)
    return {
      overallScore: 0,
      strengths: [],
      weaknesses: [],
      sectionFeedback: {},
      recommendations: [],
    }
  }
}

// Document analysis
export async function analyzeGrantDocument(documentText: string) {
  const prompt = `
    You are an expert in grant analysis. Extract key information from this grant document.
    
    Document:
    ${documentText}
    
    Extract and structure the following information:
    1. Grant name and provider
    2. Funding amount and range
    3. Eligibility requirements
    4. Application deadlines
    5. Focus areas and priorities
    6. Evaluation criteria
    7. Reporting requirements
    8. Key contacts
    
    Return the results as a structured JSON object.
  `

  const { text } = await generateText({
    model: xai("grok-beta"),
    prompt,
    temperature: 0.2,
    maxTokens: 1500,
  })

  try {
    return JSON.parse(text)
  } catch (e) {
    console.error("Failed to parse AI response:", e)
    return {}
  }
}

// Hope assistant chat
export async function getHopeResponse(messages: any[], userProfile: any) {
  const userProfileText = JSON.stringify(userProfile)
  const recentMessages = messages
    .slice(-10)
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n")

  const prompt = `
    You are Hope, an AI grant assistant for GrantGrunt. You help nonprofits find, apply for, and manage grants.
    
    User Profile:
    ${userProfileText}
    
    Recent conversation:
    ${recentMessages}
    
    Provide a helpful, concise response that directly addresses the user's question or need.
    Focus on actionable advice related to grants, fundraising, and nonprofit management.
    If you don't know something, say so rather than making up information.
  `

  // Choose model based on query complexity
  const isComplexQuery = messages[messages.length - 1].content.length > 100
  const model = xai("grok-beta")

  const { text } = await generateText({
    model,
    prompt,
    temperature: 0.7,
    maxTokens: 1000,
  })

  return text
}
