"use client";

// app/components/admin/EditUserDialog.tsx
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
import { IUser } from "@/models/User";
import { UserRole } from "@/models/model-types";
import { Pencil } from "lucide-react";

// We only validate the fields we are editing. Password is not edited here.
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name muss mindestens 2 Zeichen lang sein." }),
  role: z.nativeEnum(UserRole),
});

interface EditUserDialogProps {
  user: IUser;
  onUserUpdated: () => void;
}

export default function EditUserDialog({
  user,
  onUserUpdated,
}: EditUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Pre-fill the form with the user's current data
    defaultValues: {
      name: user.name || "",
      role: user.role.valueOf() as UserRole,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    try {
      const response = await fetch(`/api/admin/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || "Benutzer konnte nicht aktualisiert werden."
        );
      }

      setOpen(false);
      onUserUpdated();
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
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Benutzer bearbeiten</DialogTitle>
          <DialogDescription>
            Ändern Sie die Details für {user.name}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                        <SelectValue />
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
                ? "Wird gespeichert..."
                : "Änderungen speichern"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
