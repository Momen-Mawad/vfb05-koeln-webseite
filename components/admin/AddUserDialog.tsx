"use client";

// app/components/admin/AddUserDialog.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/models/model-types";
import { Plus } from "lucide-react";

// Define the form validation schema using Zod
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name muss mindestens 2 Zeichen lang sein." }),
  email: z
    .string()
    .email({ message: "Bitte geben Sie eine gültige E-Mail an." }),
  password: z
    .string()
    .min(8, { message: "Passwort muss mindestens 8 Zeichen lang sein." }),
  role: z.nativeEnum(UserRole),
});

interface AddUserDialogProps {
  onUserAdded: () => void; // Callback to refresh the user list
}

export default function AddUserDialog({ onUserAdded }: AddUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: UserRole.SPIELER,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Benutzer konnte nicht erstellt werden.");
      }

      // Success
      setOpen(false); // Close the dialog
      form.reset(); // Reset the form
      onUserAdded(); // Trigger the refresh callback
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
        <div>
          <Button variant="outline" size="icon" className="md:hidden">
            <Plus />
          </Button>
          <Button className="hidden md:inline-flex">Benutzer hinzufügen</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neuen Benutzer anlegen</DialogTitle>
          <DialogDescription>
            Füllen Sie die Details aus, um ein neues Benutzerkonto zu erstellen.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Max Mustermann" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-Mail</FormLabel>
                  <FormControl>
                    <Input placeholder="max@beispiel.de" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passwort</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rolle</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie eine Rolle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.SPIELER}>Spieler</SelectItem>
                      <SelectItem value={UserRole.TRAINER}>Trainer</SelectItem>
                      <SelectItem value={UserRole.VERWALTUNG}>
                        Verwaltung
                      </SelectItem>
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
                : "Benutzer erstellen"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
