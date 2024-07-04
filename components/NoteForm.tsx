"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createNote, updateNote } from "@/lib/api";

interface NoteFormProps {
  initialData?: {
    _id: string;
    title: string;
    body: string;
    tags: string[];
  };
}

export function NoteForm({ initialData }: NoteFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [body, setBody] = useState(initialData?.body || "");
  const [tags, setTags] = useState(initialData?.tags.join(", ") || "");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title cannot be blank");
      return;
    }

    if (!body.trim()) {
      setError("Body cannot be blank");
      return;
    }

    const noteData = {
      title,
      body,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    try {
      if (initialData) {
        await updateNote(initialData._id, noteData);
      } else {
        await createNote(noteData);
      }
      router.push("/notes");
    } catch (error) {
      console.error("Failed to save note:", error);
      setError("Failed to save note. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {error && <p className="text-red-500">{error}</p>}
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={5}
      />
      <Input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <Button type="submit">
        {initialData ? "Update Note" : "Create Note"}
      </Button>
    </form>
  );
}
