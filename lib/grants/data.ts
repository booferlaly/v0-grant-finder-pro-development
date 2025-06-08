import {
  fetchGrantsFromSources,
  searchGrants,
  getGrantById as getRealGrantById,
  getUpcomingDeadlines as getRealUpcomingDeadlines,
} from "./real-data-service"

// Updated to use real grant data instead of mock data
export async function getAvailableGrants() {
  try {
    return await fetchGrantsFromSources()
  } catch (error) {
    console.error("Failed to fetch available grants:", error)
    return []
  }
}

export async function getGrantById(id: string) {
  try {
    return await getRealGrantById(id)
  } catch (error) {
    console.error(`Failed to fetch grant ${id}:`, error)
    return null
  }
}

export async function searchAvailableGrants(query: string, filters?: any) {
  try {
    return await searchGrants(query, filters)
  } catch (error) {
    console.error("Failed to search grants:", error)
    return []
  }
}

export async function getGrantsByFocusArea(focusArea: string) {
  try {
    const grants = await fetchGrantsFromSources()
    return grants.filter((grant) =>
      grant.focusAreas?.some((area) => area.toLowerCase().includes(focusArea.toLowerCase())),
    )
  } catch (error) {
    console.error(`Failed to fetch grants for focus area ${focusArea}:`, error)
    return []
  }
}

// Export the missing functions
export async function getUpcomingDeadlines(days = 30) {
  try {
    return await getRealUpcomingDeadlines(days)
  } catch (error) {
    console.error("Failed to fetch upcoming deadlines:", error)
    return []
  }
}

export async function getFeaturedGrants() {
  try {
    const grants = await fetchGrantsFromSources()
    const upcoming = await getUpcomingDeadlines(14)

    // Return new grants and those with upcoming deadlines
    return grants.filter((grant) => grant.isNew || upcoming.some((u) => u.id === grant.id)).slice(0, 6)
  } catch (error) {
    console.error("Failed to fetch featured grants:", error)
    return []
  }
}

export async function getGrantStatistics() {
  try {
    const grants = await fetchGrantsFromSources()
    const upcomingDeadlines = await getUpcomingDeadlines(30)

    return {
      totalActive: grants.length,
      newThisWeek: grants.filter((g) => g.isNew).length,
      upcomingDeadlines: upcomingDeadlines.length,
      categories: [...new Set(grants.map((g) => g.category))].length,
      totalFunding: grants.reduce((sum, grant) => {
        // Extract max amount from range like "$150,000 - $500,000"
        const amounts = grant.awardAmount.match(/\$[\d,]+/g)
        if (amounts && amounts.length > 1) {
          const maxAmount = Number.parseInt(amounts[1].replace(/[$,]/g, ""))
          return sum + maxAmount
        }
        return sum
      }, 0),
    }
  } catch (error) {
    console.error("Failed to fetch grant statistics:", error)
    return {
      totalActive: 0,
      newThisWeek: 0,
      upcomingDeadlines: 0,
      categories: 0,
      totalFunding: 0,
    }
  }
}
