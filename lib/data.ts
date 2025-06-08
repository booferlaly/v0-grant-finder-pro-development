"use server"

// This is a placeholder for your actual data access layer
// In a real application, you would connect to your database

export async function getUserProfile() {
  // In a real app, you would fetch this from your database
  return {
    id: "user-1",
    name: "Leftover Love",
    mission: "Reducing food waste and addressing food insecurity in underserved communities",
    focusAreas: ["Food Security", "Environmental Sustainability", "Community Development"],
    location: "Portland, OR",
    foundedYear: 2018,
    employees: 12,
    annualBudget: 450000,
    preferences: {
      minAmount: 5000,
      maxAmount: 100000,
      locations: ["Oregon", "Washington", "California"],
      grantTypes: ["Program", "Operational", "Capacity Building"],
    },
  }
}

export async function getAvailableGrants() {
  // In a real app, you would fetch this from your database
  return [
    {
      id: "grant-1",
      title: "Healthy Food Financing Initiative",
      provider: "Oregon Community Foundation",
      amount: "$50,000",
      deadline: "August 15, 2023",
      category: "Food Security",
      description:
        "Supports projects that increase access to fresh, healthy food in underserved communities through innovative food recovery and distribution models.",
    },
    {
      id: "grant-2",
      title: "Neighborhood Economic Development Grant",
      provider: "Prosper Portland",
      amount: "$25,000",
      deadline: "July 31, 2023",
      category: "Community Development",
      description:
        "Provides funding for neighborhood-based initiatives that strengthen local food systems and create economic opportunities in underserved communities.",
    },
    {
      id: "grant-3",
      title: "Community Food Projects Grant",
      provider: "USDA",
      amount: "$15,000",
      deadline: "September 30, 2023",
      category: "Food Systems",
      description:
        "Supports community-based food projects that help promote self-sufficiency and food security in low-income communities.",
    },
    {
      id: "grant-4",
      title: "Environmental Sustainability Innovation Fund",
      provider: "Meyer Memorial Trust",
      amount: "$35,000",
      deadline: "October 15, 2023",
      category: "Environmental Sustainability",
      description:
        "Funds innovative projects that address environmental challenges while promoting social equity and community resilience.",
    },
  ]
}

export async function getGrantRequirements() {
  // In a real app, you would fetch this from your database or from the selected grant
  return `
    Grant Requirements:
    
    1. Project Summary (max 500 words)
    - Clear description of the project
    - Alignment with grant priorities
    - Expected outcomes and impact
    
    2. Statement of Need (max 750 words)
    - Evidence of community need
    - Data supporting the problem statement
    - Gap in services being addressed
    
    3. Goals and Objectives (max 500 words)
    - Specific, measurable, achievable, relevant, and time-bound (SMART) objectives
    - Clear connection between activities and outcomes
    - Realistic timeline for implementation
    
    4. Methodology (max 1000 words)
    - Detailed description of activities
    - Evidence-based approaches
    - Innovative elements
    - Partnerships and collaborations
    
    5. Evaluation Plan (max 500 words)
    - Methods for measuring success
    - Data collection and analysis approach
    - Reporting mechanisms
    
    6. Sustainability Plan (max 500 words)
    - Strategy for continuing the project beyond grant funding
    - Potential funding sources
    - Community support and buy-in
    
    7. Budget and Justification (max 500 words)
    - Detailed budget breakdown
    - Justification for expenses
    - Cost-effectiveness
    
    8. Organization Background (max 500 words)
    - Organizational capacity
    - Relevant experience
    - Track record of success
  `
}
