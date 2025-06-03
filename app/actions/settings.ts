"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export type OrganizationInfo = {
  name: string
  ein: string
  mission: string
  founded: string
  employees: string
  address: string
}

export type ProgramInfo = {
  programName: string
  programDesc: string
  impact: string
}

export type FinancialInfo = {
  budget: string
  fiscalYear: string
  fundingSources: string
}

export type ContactInfo = {
  primaryName: string
  primaryTitle: string
  primaryEmail: string
  primaryPhone: string
  secondaryName: string
  secondaryTitle: string
  secondaryEmail: string
  secondaryPhone: string
}

export type AutoApplySettings = {
  enabled: boolean
  minMatchScore: string
  maxGrantAmount: string
  requireApproval: boolean
}

export type ProfileSettings = {
  orgInfo: OrganizationInfo
  programInfo: ProgramInfo
  financialInfo: FinancialInfo
  contactInfo: ContactInfo
  autoApplySettings: AutoApplySettings
  organizationId: string
}

export async function saveProfileSettings(settings: ProfileSettings) {
  try {
    // First, check if the organization exists
    const { data: existingOrg, error: fetchError } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", settings.organizationId)
      .single()

    if (fetchError && fetchError.code !== "PGSQL_ERROR_NO_ROWS") {
      throw new Error(`Error fetching organization: ${fetchError.message}`)
    }

    // If organization exists, update it; otherwise, insert a new record
    if (existingOrg) {
      // Update organization info
      const { error: updateError } = await supabase
        .from("organizations")
        .update({
          name: settings.orgInfo.name,
          ein: settings.orgInfo.ein,
          mission: settings.orgInfo.mission,
          founded: settings.orgInfo.founded,
          employees: settings.orgInfo.employees,
          address: settings.orgInfo.address,
          updated_at: new Date().toISOString(),
        })
        .eq("id", settings.organizationId)

      if (updateError) {
        throw new Error(`Error updating organization: ${updateError.message}`)
      }

      // Update program info
      const { error: programError } = await supabase.from("programs").upsert({
        organization_id: settings.organizationId,
        name: settings.programInfo.programName,
        description: settings.programInfo.programDesc,
        impact: settings.programInfo.impact,
        updated_at: new Date().toISOString(),
      })

      if (programError) {
        throw new Error(`Error updating program: ${programError.message}`)
      }

      // Update financial info
      const { error: financialError } = await supabase.from("financials").upsert({
        organization_id: settings.organizationId,
        budget: settings.financialInfo.budget,
        fiscal_year_end: settings.financialInfo.fiscalYear,
        funding_sources: settings.financialInfo.fundingSources,
        updated_at: new Date().toISOString(),
      })

      if (financialError) {
        throw new Error(`Error updating financials: ${financialError.message}`)
      }

      // Update contacts
      const { error: contactsError } = await supabase.from("contacts").upsert({
        organization_id: settings.organizationId,
        primary_name: settings.contactInfo.primaryName,
        primary_title: settings.contactInfo.primaryTitle,
        primary_email: settings.contactInfo.primaryEmail,
        primary_phone: settings.contactInfo.primaryPhone,
        secondary_name: settings.contactInfo.secondaryName,
        secondary_title: settings.contactInfo.secondaryTitle,
        secondary_email: settings.contactInfo.secondaryEmail,
        secondary_phone: settings.contactInfo.secondaryPhone,
        updated_at: new Date().toISOString(),
      })

      if (contactsError) {
        throw new Error(`Error updating contacts: ${contactsError.message}`)
      }

      // Update auto-apply settings
      const { error: settingsError } = await supabase.from("auto_apply_settings").upsert({
        organization_id: settings.organizationId,
        enabled: settings.autoApplySettings.enabled,
        min_match_score: Number.parseInt(settings.autoApplySettings.minMatchScore),
        max_grant_amount: Number.parseInt(settings.autoApplySettings.maxGrantAmount.replace(/[^0-9]/g, "")),
        require_approval: settings.autoApplySettings.requireApproval,
        updated_at: new Date().toISOString(),
      })

      if (settingsError) {
        throw new Error(`Error updating auto-apply settings: ${settingsError.message}`)
      }
    } else {
      // Insert new organization and related data
      const { data: newOrg, error: insertOrgError } = await supabase
        .from("organizations")
        .insert({
          id: settings.organizationId,
          name: settings.orgInfo.name,
          ein: settings.orgInfo.ein,
          mission: settings.orgInfo.mission,
          founded: settings.orgInfo.founded,
          employees: settings.orgInfo.employees,
          address: settings.orgInfo.address,
        })
        .select()
        .single()

      if (insertOrgError) {
        throw new Error(`Error creating organization: ${insertOrgError.message}`)
      }

      // Insert all related data
      await Promise.all([
        supabase.from("programs").insert({
          organization_id: settings.organizationId,
          name: settings.programInfo.programName,
          description: settings.programInfo.programDesc,
          impact: settings.programInfo.impact,
        }),
        supabase.from("financials").insert({
          organization_id: settings.organizationId,
          budget: settings.financialInfo.budget,
          fiscal_year_end: settings.financialInfo.fiscalYear,
          funding_sources: settings.financialInfo.fundingSources,
        }),
        supabase.from("contacts").insert({
          organization_id: settings.organizationId,
          primary_name: settings.contactInfo.primaryName,
          primary_title: settings.contactInfo.primaryTitle,
          primary_email: settings.contactInfo.primaryEmail,
          primary_phone: settings.contactInfo.primaryPhone,
          secondary_name: settings.contactInfo.secondaryName,
          secondary_title: settings.contactInfo.secondaryTitle,
          secondary_email: settings.contactInfo.secondaryEmail,
          secondary_phone: settings.contactInfo.secondaryPhone,
        }),
        supabase.from("auto_apply_settings").insert({
          organization_id: settings.organizationId,
          enabled: settings.autoApplySettings.enabled,
          min_match_score: Number.parseInt(settings.autoApplySettings.minMatchScore),
          max_grant_amount: Number.parseInt(settings.autoApplySettings.maxGrantAmount.replace(/[^0-9]/g, "")),
          require_approval: settings.autoApplySettings.requireApproval,
        }),
      ])
    }

    // Revalidate the path to refresh the data
    revalidatePath("/profile/auto-apply")
    return { success: true, message: "Settings saved successfully" }
  } catch (error) {
    console.error("Error saving profile settings:", error)
    return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred" }
  }
}

export async function getProfileSettings(organizationId: string) {
  try {
    // Fetch organization info
    const { data: orgData, error: orgError } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", organizationId)
      .single()

    if (orgError) {
      throw new Error(`Error fetching organization: ${orgError.message}`)
    }

    // Fetch program info
    const { data: programData, error: programError } = await supabase
      .from("programs")
      .select("*")
      .eq("organization_id", organizationId)
      .single()

    if (programError) {
      throw new Error(`Error fetching program: ${programError.message}`)
    }

    // Fetch financial info
    const { data: financialData, error: financialError } = await supabase
      .from("financials")
      .select("*")
      .eq("organization_id", organizationId)
      .single()

    if (financialError) {
      throw new Error(`Error fetching financials: ${financialError.message}`)
    }

    // Fetch contacts
    const { data: contactsData, error: contactsError } = await supabase
      .from("contacts")
      .select("*")
      .eq("organization_id", organizationId)
      .single()

    if (contactsError) {
      throw new Error(`Error fetching contacts: ${contactsError.message}`)
    }

    // Fetch auto-apply settings
    const { data: settingsData, error: settingsError } = await supabase
      .from("auto_apply_settings")
      .select("*")
      .eq("organization_id", organizationId)
      .single()

    if (settingsError) {
      throw new Error(`Error fetching auto-apply settings: ${settingsError.message}`)
    }

    // Format the data to match our frontend structure
    return {
      orgInfo: {
        name: orgData.name,
        ein: orgData.ein,
        mission: orgData.mission,
        founded: orgData.founded,
        employees: orgData.employees,
        address: orgData.address,
      },
      programInfo: {
        programName: programData.name,
        programDesc: programData.description,
        impact: programData.impact,
      },
      financialInfo: {
        budget: financialData.budget,
        fiscalYear: financialData.fiscal_year_end,
        fundingSources: financialData.funding_sources,
      },
      contactInfo: {
        primaryName: contactsData.primary_name,
        primaryTitle: contactsData.primary_title,
        primaryEmail: contactsData.primary_email,
        primaryPhone: contactsData.primary_phone,
        secondaryName: contactsData.secondary_name,
        secondaryTitle: contactsData.secondary_title,
        secondaryEmail: contactsData.secondary_email,
        secondaryPhone: contactsData.secondary_phone,
      },
      autoApplySettings: {
        enabled: settingsData.enabled,
        minMatchScore: settingsData.min_match_score.toString(),
        maxGrantAmount: settingsData.max_grant_amount.toString(),
        requireApproval: settingsData.require_approval,
      },
    }
  } catch (error) {
    console.error("Error fetching profile settings:", error)
    throw error
  }
}

export async function autoApplyToAllEligibleGrants() {
  // TODO: Implement the logic to auto-apply to all eligible grants
  console.log("Auto-applying to all eligible grants - not implemented yet")
  return { success: false, message: "Not implemented yet" }
}
