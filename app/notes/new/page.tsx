import { NoteForm } from "@/components/NoteForm";

export default function NewNotePage() {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Create New Note</h1>
      <NoteForm />
    </div>
  );
}
