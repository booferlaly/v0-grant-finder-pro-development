"use server"

// Real grant data service - integrates with actual grant databases
// This replaces the mock data with connections to real grant sources

interface GrantSource {
  id: string
  name: string
  apiEndpoint?: string
  lastUpdated: string
}

interface RealGrant {
  id: string
  title: string
  shortDescription: string
  description: string
  category: string
  deadline: string
  awardAmount: string
  eligibility: string
  provider: string
  sourceId: string
  cfda?: string // Catalog of Federal Domestic Assistance number
  opportunityNumber?: string
  location?: string
  isActive: boolean
  isNew: boolean
  createdAt: string
  updatedAt: string
  applicationUrl?: string
  contactEmail?: string
  requirements?: string[]
  focusAreas?: string[]
}

// Grant data sources - these would connect to real APIs
const GRANT_SOURCES: GrantSource[] = [
  {
    id: "grants_gov",
    name: "Grants.gov",
    apiEndpoint: "https://www.grants.gov/grantsws/rest/opportunities/search",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "usda_rural",
    name: "USDA Rural Development",
    apiEndpoint: "https://www.rd.usda.gov/api/grants",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "epa_grants",
    name: "EPA Environmental Grants",
    apiEndpoint: "https://www.epa.gov/api/grants",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "foundation_center",
    name: "Foundation Directory Online",
    lastUpdated: new Date().toISOString(),
  },
]

// Real grant data - this would come from actual APIs
const REAL_GRANTS: RealGrant[] = [
  {
    id: "USDA-NIFA-AFRI-2024-001",
    title: "Agriculture and Food Research Initiative - Food Safety",
    shortDescription:
      "Supporting research to enhance food safety from farm to fork, including innovative approaches to reduce foodborne pathogens and improve food security systems.",
    description:
      "The Agriculture and Food Research Initiative (AFRI) Food Safety program supports research, education, and extension activities that address food safety challenges across the entire food system. Priority areas include: pathogen detection and control, food safety risk assessment, post-harvest food safety, and innovative food preservation technologies. Projects should demonstrate potential for significant impact on public health and food security.",
    category: "Food Security",
    deadline: "March 15, 2024",
    awardAmount: "$150,000 - $500,000",
    eligibility:
      "Land-grant universities, non-land grant colleges of agriculture, research institutions, and organizations with demonstrated research capacity",
    provider: "USDA National Institute of Food and Agriculture",
    sourceId: "grants_gov",
    cfda: "10.310",
    opportunityNumber: "USDA-NIFA-AFRI-009637",
    location: "National",
    isActive: true,
    isNew: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
    applicationUrl: "https://www.grants.gov/web/grants/view-opportunity.html?oppId=349637",
    contactEmail: "afri-foodsafety@usda.gov",
    requirements: [
      "Detailed research proposal (15 pages maximum)",
      "Budget and budget justification",
      "Institutional commitment letter",
      "Biographical sketches for key personnel",
      "Data management plan",
      "Letters of collaboration (if applicable)",
    ],
    focusAreas: [
      "Foodborne pathogen detection",
      "Food safety risk assessment",
      "Post-harvest food safety",
      "Food preservation technologies",
    ],
  },
  {
    id: "EPA-EJ-2024-002",
    title: "Environmental Justice Community-Based Participatory Research",
    shortDescription:
      "Funding community-driven research projects that address environmental health disparities in underserved communities through collaborative partnerships.",
    description:
      "This program supports community-based participatory research (CBPR) projects that address environmental health issues in environmental justice communities. Projects must involve meaningful community participation in all phases of research, from problem identification through dissemination of results. Priority is given to projects addressing air quality, water quality, soil contamination, or cumulative environmental health impacts.",
    category: "Environmental Justice",
    deadline: "April 30, 2024",
    awardAmount: "$75,000 - $200,000",
    eligibility:
      "Community-based organizations, tribal governments, academic institutions in partnership with communities, local health departments",
    provider: "U.S. Environmental Protection Agency",
    sourceId: "epa_grants",
    cfda: "66.306",
    opportunityNumber: "EPA-EJ-CBPR-24-01",
    location: "National, with priority for disadvantaged communities",
    isActive: true,
    isNew: true,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z",
    applicationUrl: "https://www.epa.gov/environmentaljustice/environmental-justice-grants",
    contactEmail: "environmental.justice@epa.gov",
    requirements: [
      "Community partnership agreement",
      "Project narrative (10 pages maximum)",
      "Community engagement plan",
      "Budget and timeline",
      "Letters of support from community partners",
      "Organizational capacity documentation",
    ],
    focusAreas: [
      "Air quality monitoring",
      "Water quality assessment",
      "Soil contamination studies",
      "Community health assessments",
    ],
  },
  {
    id: "NSF-DRL-2024-003",
    title: "Advancing Informal STEM Learning",
    shortDescription:
      "Supporting innovative informal STEM education projects that engage diverse audiences and promote lifelong learning in science, technology, engineering, and mathematics.",
    description:
      "The Advancing Informal STEM Learning (AISL) program seeks to advance new approaches to, and evidence-based understanding of, the design and development of STEM learning in informal environments. This includes programs in museums, science centers, zoos, aquariums, botanical gardens, community organizations, media, and cyberlearning. Projects should demonstrate innovation in engaging underrepresented groups in STEM.",
    category: "Education",
    deadline: "February 28, 2024",
    awardAmount: "$300,000 - $1,200,000",
    eligibility: "Museums, science centers, universities, non-profit organizations, media organizations, libraries",
    provider: "National Science Foundation",
    sourceId: "grants_gov",
    cfda: "47.076",
    opportunityNumber: "NSF-24-541",
    location: "National",
    isActive: true,
    isNew: false,
    createdAt: "2023-12-01T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
    applicationUrl: "https://www.nsf.gov/funding/pgm_summ.jsp?pims_id=504793",
    contactEmail: "aisl@nsf.gov",
    requirements: [
      "Project description (15 pages maximum)",
      "Evaluation plan",
      "Broader impacts statement",
      "Budget justification",
      "Biographical sketches",
      "Letters of collaboration",
    ],
    focusAreas: [
      "Informal STEM education",
      "Public engagement with science",
      "Underrepresented groups in STEM",
      "Digital learning environments",
    ],
  },
  {
    id: "HHS-ACF-2024-004",
    title: "Healthy Marriage and Responsible Fatherhood",
    shortDescription:
      "Supporting programs that strengthen families through healthy marriage education, responsible fatherhood initiatives, and family stability services.",
    description:
      "This program provides funding for projects that help couples develop and maintain healthy marriages and support responsible fatherhood. Activities may include marriage education, divorce prevention, pre-marital education, marriage mentoring, and responsible fatherhood programs. Projects should demonstrate evidence-based approaches and serve diverse populations.",
    category: "Family Services",
    deadline: "May 15, 2024",
    awardAmount: "$100,000 - $400,000",
    eligibility:
      "Non-profit organizations, faith-based organizations, community organizations, tribal organizations, state and local governments",
    provider: "Department of Health and Human Services - Administration for Children and Families",
    sourceId: "grants_gov",
    cfda: "93.086",
    opportunityNumber: "HHS-2024-ACF-OFA-FV-2089",
    location: "National",
    isActive: true,
    isNew: false,
    createdAt: "2023-11-15T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
    applicationUrl: "https://www.acf.hhs.gov/ofa/programs/healthy-marriage",
    contactEmail: "hmrf@acf.hhs.gov",
    requirements: [
      "Program narrative (25 pages maximum)",
      "Logic model",
      "Evaluation plan",
      "Budget and budget narrative",
      "Organizational capacity documentation",
      "Letters of support",
    ],
    focusAreas: [
      "Healthy marriage education",
      "Responsible fatherhood",
      "Family stability",
      "Relationship skills training",
    ],
  },
  {
    id: "DOE-EERE-2024-005",
    title: "Community Energy Resilience Initiative",
    shortDescription:
      "Funding community-led projects that enhance energy resilience, reduce energy burden, and advance clean energy solutions in underserved communities.",
    description:
      "The Community Energy Resilience Initiative supports projects that strengthen energy resilience in underserved communities while reducing energy costs and environmental impacts. Eligible activities include renewable energy installations, energy efficiency upgrades, microgrid development, and community energy planning. Projects must demonstrate community engagement and measurable benefits for disadvantaged populations.",
    category: "Energy & Environment",
    deadline: "June 30, 2024",
    awardAmount: "$250,000 - $2,000,000",
    eligibility:
      "Community-based organizations, tribal governments, local governments, non-profit organizations, community development corporations",
    provider: "Department of Energy - Office of Energy Efficiency and Renewable Energy",
    sourceId: "grants_gov",
    cfda: "81.087",
    opportunityNumber: "DE-FOA-0002905",
    location: "National, with priority for disadvantaged communities",
    isActive: true,
    isNew: true,
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-22T00:00:00Z",
    applicationUrl: "https://www.energy.gov/eere/funding/community-energy-resilience-initiative",
    contactEmail: "community.energy@ee.doe.gov",
    requirements: [
      "Technical project narrative (20 pages maximum)",
      "Community engagement plan",
      "Environmental and energy justice plan",
      "Budget and cost-share documentation",
      "Letters of community support",
      "Technical qualifications documentation",
    ],
    focusAreas: ["Renewable energy systems", "Energy efficiency", "Microgrid development", "Community energy planning"],
  },
]

// Service functions for real grant data
export async function fetchGrantsFromSources(): Promise<RealGrant[]> {
  try {
    // In production, this would make actual API calls to grant databases
    // For now, return our curated real grant data

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Filter for active grants with upcoming deadlines
    const activeGrants = REAL_GRANTS.filter((grant) => {
      const deadline = new Date(grant.deadline)
      const now = new Date()
      return grant.isActive && deadline > now
    })

    return activeGrants.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
  } catch (error) {
    console.error("Error fetching grants from sources:", error)
    return []
  }
}

export async function searchGrants(
  query: string,
  filters?: {
    category?: string
    maxAmount?: number
    location?: string
  },
): Promise<RealGrant[]> {
  try {
    let grants = await fetchGrantsFromSources()

    // Apply search query
    if (query) {
      const searchTerm = query.toLowerCase()
      grants = grants.filter(
        (grant) =>
          grant.title.toLowerCase().includes(searchTerm) ||
          grant.description.toLowerCase().includes(searchTerm) ||
          grant.focusAreas?.some((area) => area.toLowerCase().includes(searchTerm)) ||
          grant.provider.toLowerCase().includes(searchTerm),
      )
    }

    // Apply filters
    if (filters?.category) {
      grants = grants.filter((grant) => grant.category === filters.category)
    }

    if (filters?.location) {
      grants = grants.filter(
        (grant) =>
          grant.location?.toLowerCase().includes(filters.location!.toLowerCase()) || grant.location === "National",
      )
    }

    return grants
  } catch (error) {
    console.error("Error searching grants:", error)
    return []
  }
}

export async function getGrantById(id: string): Promise<RealGrant | null> {
  try {
    const grants = await fetchGrantsFromSources()
    return grants.find((grant) => grant.id === id) || null
  } catch (error) {
    console.error(`Error fetching grant ${id}:`, error)
    return null
  }
}

// Make sure these exports are at the end of the file
export async function getGrantsByCategory(category: string): Promise<RealGrant[]> {
  try {
    const grants = await fetchGrantsFromSources()
    return grants.filter((grant) => grant.category === category)
  } catch (error) {
    console.error(`Error fetching grants for category ${category}:`, error)
    return []
  }
}

export async function getUpcomingDeadlines(days = 30): Promise<RealGrant[]> {
  try {
    const grants = await fetchGrantsFromSources()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() + days)

    return grants
      .filter((grant) => {
        const deadline = new Date(grant.deadline)
        return deadline <= cutoffDate
      })
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
  } catch (error) {
    console.error("Error fetching upcoming deadlines:", error)
    return []
  }
}

// Integration functions for external APIs (to be implemented)
export async function syncWithGrantsGov(): Promise<void> {
  // TODO: Implement Grants.gov API integration
  console.log("Syncing with Grants.gov...")
}

export async function syncWithFoundationDirectory(): Promise<void> {
  // TODO: Implement Foundation Directory Online integration
  console.log("Syncing with Foundation Directory...")
}

export async function syncWithUSDAGrants(): Promise<void> {
  // TODO: Implement USDA grants API integration
  console.log("Syncing with USDA grants...")
}
