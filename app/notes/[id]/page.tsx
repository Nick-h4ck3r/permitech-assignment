"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NoteForm } from "@/components/NoteForm";
import { getNotes } from "@/lib/api";

interface Note {
  _id: string;
  title: string;
  body: string;
  tags: string[];
}

export default function NotePage() {
  const [note, setNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setIsLoading(true);
        const notes = await getNotes();
        const foundNote = notes.find((n: Note) => n._id === id);
        if (foundNote) {
          setNote(foundNote);
          setError(null);
        } else {
          setError("Note not found");
        }
      } catch (error) {
        console.error("Failed to fetch note:", error);
        setError("Failed to fetch note. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!note) return <div>Note not found</div>;

  return (
    <div className="container mx-auto mt-8">
      {isEditing ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
          <NoteForm initialData={note} />
          <Button
            onClick={() => setIsEditing(false)}
            className="mt-4"
            variant={"outline"}
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
          <p className="mb-4">{note.body}</p>
          <div className="mb-4">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="mr-2 text-sm text-gray-500"
              >
                #{tag}
              </span>
            ))}
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            className="mr-2"
          >
            Edit
          </Button>
          <Button
            onClick={() => router.push("/notes")}
            variant="outline"
          >
            Back to Notes
          </Button>
        </>
      )}
    </div>
  );
}
