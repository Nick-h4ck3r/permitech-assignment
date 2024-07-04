import { NoteList } from "@/components/NoteList";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotesPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Your Notes</h1>
          <Link href="/notes/new">
            <Button>Create New Note</Button>
          </Link>
        </div>
        <NoteList />
      </div>
    </ProtectedRoute>
  );
}
