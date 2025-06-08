import { AIWritingAssistant } from "@/components/proposal/ai-writing-assistant"

export const metadata = {
  title: "AI Writing Assistant | GrantGrunt",
  description: "Improve your grant proposals with AI assistance",
}

export default function AIWritingPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">AI Writing Assistant</h1>
        <p className="text-muted-foreground">
          Use AI to improve your grant proposals and application sections for better success rates.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AIWritingAssistant />

        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Writing Tips</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Be clear and concise in your language</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Use data and evidence to support your claims</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Align your proposal with the funder's priorities</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Include measurable outcomes and evaluation methods</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Address potential challenges and mitigation strategies</span>
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Recent Proposals</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Community Food Security Initiative</div>
                  <div className="text-sm text-muted-foreground">Last edited: 2 days ago</div>
                </div>
                <button className="text-sm text-primary hover:underline">Edit</button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Youth Education Program</div>
                  <div className="text-sm text-muted-foreground">Last edited: 1 week ago</div>
                </div>
                <button className="text-sm text-primary hover:underline">Edit</button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Environmental Sustainability Project</div>
                  <div className="text-sm text-muted-foreground">Last edited: 2 weeks ago</div>
                </div>
                <button className="text-sm text-primary hover:underline">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
