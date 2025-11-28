/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, Search, Trash2, Edit, Calendar, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  color: string;
}

const colorOptions = [
  { name: "Blue", value: " border-blue-200" },
  { name: "Green", value: " border-green-200" },
  { name: "Yellow", value: " border-yellow-200" },
  { name: "Pink", value: "bg-pink-50 border-pink-200" },
  { name: "Purple", value: "bg-purple-50 border-purple-200" },
  { name: "Gray", value: " -200" },
];

export default function PersonalNote() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
      color: colorOptions[0].value,
    },
  });

  // Load notes from localStorage on component mount
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem("personalNotes");
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes);
        if (Array.isArray(parsedNotes)) {
          setNotes(parsedNotes);
        } else {
          console.error("Invalid notes format in localStorage");
        }
      }
    } catch (error) {
      console.error("Failed to parse notes from localStorage", error);
      toast.error("Failed to load notes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("personalNotes", JSON.stringify(notes));
      } catch (error) {
        console.error("Failed to save notes to localStorage", error);
        toast.error("Failed to save notes");
      }
    }
  }, [notes, isLoading]);

  // Filter notes based on search query and selected tag
  useEffect(() => {
    let result = notes;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query) ||
          note.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedTag) {
      result = result.filter((note) => note.tags.includes(selectedTag));
    }

    // Sort pinned notes first, then by updatedAt
    result.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    setFilteredNotes(result);
  }, [notes, searchQuery, selectedTag]);

  const getAllTags = () => {
    const tagSet = new Set<string>();
    notes.forEach((note) => {
      note.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet);
  };

  const onSubmit = (data: any) => {
    const tags = data.tags
      .split(",")
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag !== "");

    if (editingNote) {
      // Update existing note
      const updatedNotes = notes.map((note) =>
        note.id === editingNote.id
          ? {
              ...note,
              title: data.title,
              content: data.content,
              tags,
              color: data.color,
              updatedAt: new Date().toISOString(),
            }
          : note
      );
      setNotes(updatedNotes);
      toast.success("Note updated successfully!");
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        title: data.title,
        content: data.content,
        tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPinned: false,
        color: data.color,
      };
      setNotes([newNote, ...notes]);
      toast.success("Note created successfully!");
    }

    form.reset();
    setDialogOpen(false);
    setEditingNote(null);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    toast.success("Note deleted successfully!");
  };

  const togglePinNote = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  const openEditDialog = (note: Note) => {
    setEditingNote(note);
    form.setValue("title", note.title);
    form.setValue("content", note.content);
    form.setValue("tags", note.tags.join(", "));
    form.setValue("color", note.color);
    setDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const resetForm = () => {
    form.reset();
    setEditingNote(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto ">
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold ">Personal Notes</h1>
            <p className=" mt-1">
              Capture your thoughts and ideas
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" /> New Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingNote ? "Edit Note" : "Create New Note"}
                </DialogTitle>
                <DialogDescription>
                  {editingNote
                    ? "Update your note details"
                    : "Add a new note to your collection"}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Note title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your note here..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (comma separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="tag1, tag2, tag3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Note Color</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {colorOptions.map((color) => (
                            <div
                              key={color.value}
                              className={cn(
                                "w-8 h-8 rounded-full cursor-pointer border-2",
                                color.value,
                                field.value === color.value &&
                                  "ring-2 ring-offset-2 ring-blue-500"
                              )}
                              onClick={() => field.onChange(color.value)}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingNote ? "Update" : "Create"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  h-4 w-4" />
                <Input
                  placeholder="Search notes..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(null)}
                >
                  All Notes
                </Button>
                {getAllTags().map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full  flex items-center justify-center mb-4">
                  <Edit className="h-8 w-8 " />
                </div>
                <h3 className="text-lg font-medium  mb-1">
                  No notes found
                </h3>
                <p className=" mb-4">
                  {searchQuery || selectedTag
                    ? "Try adjusting your search or filters"
                    : "Create your first note to get started"}
                </p>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetForm}>
                      <Plus className="mr-2 h-4 w-4" /> Create Note
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <Card
                key={note.id}
                className={cn(
                  "flex flex-col h-full transition-all hover:shadow-md",
                  note.color
                )}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => togglePinNote(note.id)}
                      >
                        <Star
                          className={cn(
                            "h-4 w-4",
                            note.isPinned
                              ? "fill-yellow-400 text-yellow-400"
                              : ""
                          )}
                        />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-xs flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(note.updatedAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ScrollArea className="flex-1 mb-4">
                    <p className="text-sm whitespace-pre-line">
                      {note.content}
                    </p>
                  </ScrollArea>

                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {note.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(note)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteNote(note.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
