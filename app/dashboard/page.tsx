import { DropZone } from "@/features/ingestion/Dropzone";

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">your AWS waste report</h1>
      <DropZone />
    </main>
  );
}
