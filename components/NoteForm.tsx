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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const noteData = {
      title,
      body,
      tags: tags.split(",").map((tag) => tag.trim()),
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
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
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
