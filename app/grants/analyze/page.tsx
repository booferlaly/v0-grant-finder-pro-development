import { AIDocumentAnalyzer } from "@/components/grants/ai-document-analyzer"

export const metadata = {
  title: "AI Document Analyzer | GrantGrunt",
  description: "Extract key information from grant documents with AI",
}

export default function AIDocumentAnalyzerPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">AI Document Analyzer</h1>
        <p className="text-muted-foreground">
          Upload grant documents to automatically extract key information and requirements using AI.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AIDocumentAnalyzer />

        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">How It Works</h2>
            <ol className="space-y-4">
              <li className="flex">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0 text-sm">
                  1
                </span>
                <div>
                  <p className="font-medium">Upload a grant document</p>
                  <p className="text-sm text-muted-foreground">
                    Upload a PDF, DOC, or TXT file containing grant information
                  </p>
                </div>
              </li>

              <li className="flex">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0 text-sm">
                  2
                </span>
                <div>
                  <p className="font-medium">AI analyzes the document</p>
                  <p className="text-sm text-muted-foreground">
                    Our AI extracts key information like deadlines, eligibility, and requirements
                  </p>
                </div>
              </li>

              <li className="flex">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0 text-sm">
                  3
                </span>
                <div>
                  <p className="font-medium">Review and save</p>
                  <p className="text-sm text-muted-foreground">
                    Review the extracted information and save it to your grant database
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Recently Analyzed</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">USDA Community Food Projects</div>
                  <div className="text-sm text-muted-foreground">Analyzed: 3 days ago</div>
                </div>
                <button className="text-sm text-primary hover:underline">View</button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">NEA Arts Education Program</div>
                  <div className="text-sm text-muted-foreground">Analyzed: 1 week ago</div>
                </div>
                <button className="text-sm text-primary hover:underline">View</button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">EPA Environmental Justice Grants</div>
                  <div className="text-sm text-muted-foreground">Analyzed: 2 weeks ago</div>
                </div>
                <button className="text-sm text-primary hover:underline">View</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
