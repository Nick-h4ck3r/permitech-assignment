"use client";

import { getPublishedNote } from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Note {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  published: boolean;
}

const GetPublishedNotePage = () => {
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setIsLoading(true);
        const note = await getPublishedNote(id);
        if (note) {
          setNote(note);
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
      <h1 className="text-2xl font-bold mb-4">{note?.title}</h1>
      <p className="mb-4">{note?.body}</p>
      <div className="mb-4">
        {note?.tags.map((tag) => (
          <span
            key={tag}
            className="mr-2 text-sm text-gray-500"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GetPublishedNotePage;
