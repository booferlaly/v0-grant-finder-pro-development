// Mock auth functions - replace with your actual auth implementation
export async function getCurrentUser() {
  // Simulate getting current user
  return {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
  }
}
