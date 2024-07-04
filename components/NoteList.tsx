"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getNotes } from "@/lib/api";

interface Note {
  _id: string;
  title: string;
  body: string;
  tags: string[];
}

export function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await getNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="space-y-4">
      {notes.map((note) => (
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
      ))}
    </div>
  );
}
