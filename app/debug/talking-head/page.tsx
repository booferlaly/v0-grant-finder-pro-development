"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TalkingHeadDebugPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Talking Head Debug</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Common Issues</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Component not rendering</li>
                <li>Click events not working</li>
                <li>Animation issues</li>
                <li>State management problems</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Solutions</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ensure "use client" directive is present</li>
                <li>Check for event handler binding issues</li>
                <li>Verify z-index is high enough</li>
                <li>Check for CSS conflicts</li>
              </ul>
            </div>

            <Button onClick={() => (window.location.href = "/")}>Return to Dashboard</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Implementation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Sidebar Navigation</h3>
              <p>
                Ensure that the sidebar buttons are correctly linked to their respective components or actions. Check
                for any missing event handlers or incorrect paths.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Talking Head Hope</h3>
              <p>
                Verify that the "Talking Head Hope" component is correctly imported and used. Check for any missing
                props or incorrect configurations.
              </p>
            </div>

            <Button onClick={() => (window.location.href = "/")}>Return to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
