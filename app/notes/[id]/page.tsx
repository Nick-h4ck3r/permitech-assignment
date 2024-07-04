"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { NoteForm } from "@/components/NoteForm";
import { getNotes } from "@/lib/api";

export default function EditNotePage() {
  const [note, setNote] = useState(null);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const notes = await getNotes();
        const foundNote = notes.find((n: any) => n._id === id);
        setNote(foundNote);
      } catch (error) {
        console.error("Failed to fetch note:", error);
      }
    };

    fetchNote();
  }, [id]);

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      <NoteForm initialData={note} />
    </div>
  );
}
