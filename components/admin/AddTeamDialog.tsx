// components/admin/AddTeamDialog.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IUser } from "@/models/User";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name muss mindestens 2 Zeichen lang sein." }),
  liga: z.string().optional(),
  slug: z
    .string()
    .min(2, { message: "Slug muss mindestens 2 Zeichen lang sein." }),
  image: z
    .string()
    .url({ message: "Bitte geben Sie eine gültige URL an." })
    .optional()
    .or(z.literal("")),

  trainer: z.string().optional(), // We'll pass the trainer's ID
});

interface AddTeamDialogProps {
  onTeamAdded: () => void;
}

export default function AddTeamDialog({ onTeamAdded }: AddTeamDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trainers, setTrainers] = useState<IUser[]>([]);

  // Fetch trainers when the dialog is opened
  useEffect(() => {
    if (open) {
      const fetchTrainers = async () => {
        const res = await fetch("/api/admin/users?role=Trainer");
        const data = await res.json();
        setTrainers(data);
      };
      fetchTrainers();
    }
  }, [open]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", liga: "", slug: "" },
  });

  // Auto-generate slug from name
  const teamName = form.watch("name");
  useEffect(() => {
    const slug = teamName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    form.setValue("slug", slug);
  }, [teamName, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    try {
      const response = await fetch("/api/admin/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Team konnte nicht erstellt werden.");
      }

      setOpen(false);
      form.reset();
      onTeamAdded();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ein unbekannter Fehler ist aufgetreten."
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Team hinzufügen</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neues Team anlegen</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teamname</FormLabel>
                  <FormControl>
                    <Input placeholder="z.B. U17-Junioren" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug (URL)</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="liga"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Liga</FormLabel>
                  <FormControl>
                    <Input placeholder="z.B. Bezirksliga" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bild-URL (Cloudinary)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://res.cloudinary.com/..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="trainer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trainer</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie einen Trainer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">Kein Trainer</SelectItem>
                      {trainers.map((t) => (
                        <SelectItem key={String(t._id)} value={String(t._id)}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting
                ? "Wird erstellt..."
                : "Team erstellen"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
