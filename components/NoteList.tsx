"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getNotes, searchNotes } from "@/lib/api";

interface Note {
  _id: string;
  title: string;
  body: string;
  tags: string[];
}

export function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchNotes = async (query: string = "") => {
    try {
      setIsLoading(true);
      const fetchedNotes = query ? await searchNotes(query) : await getNotes();
      setNotes(fetchedNotes);
      setError(null);
    } catch (error: any) {
      console.error("Failed to fetch notes:", error);
      setError(`Failed to fetch notes: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchNotes(searchQuery);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="mb-4"
      >
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit">Search</Button>
        </div>
      </form>

      <div className="space-y-4">
        {notes.length === 0 ? (
          <p>
            No notes found.{" "}
            {searchQuery ? "Try a different search query or " : ""}Create your
            first note!
          </p>
        ) : (
          notes.map((note) => (
            <Card key={note._id}>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{note.body.substring(0, 100)}...</p>
                <div className="mt-2">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="mr-2 text-sm text-gray-500"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link href={`/notes/${note._id}`}>
                  <Button className="mt-4">View Note</Button>
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
