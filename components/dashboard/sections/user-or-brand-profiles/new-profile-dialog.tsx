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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const profileFormSchema = z.object({
  type: z.enum(["personal", "brand"],
    { error: "Selecciona un tipo de perfil." }
  ),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  role: z.string().min(3, "El rol es demasiado corto."),
  valueProposition: z
    .string()
    .min(10, "Describe tu propuesta de valor con más detalle."),
  targetAudience: z
    .string()
    .min(10, "Describe tu público objetivo con más detalle."),
  toneOfVoice: z.enum(
    ["profesional", "inspirador", "tecnico", "cercano"],
    { error: "Selecciona un tono de voz." }
  ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileDialogProps {
  onProfileCreated: () => void;
  isFirstProfile?: boolean;
}

export const NewProfileDialog: React.FC<ProfileDialogProps> = ({ onProfileCreated, isFirstProfile = false }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      type: "personal",
      name: "",
      role: "",
      valueProposition: "",
      targetAudience: "",
    },
  });

  async function onSubmit(values: ProfileFormValues) {
    // TODO: Aquí va tu lógica para guardar en Supabase.
    console.log("Datos del formulario a guardar:", values);

    // Simulamos que la operación fue exitosa
    form.reset();
    setOpen(false);
    onProfileCreated(); // Llamamos a la función para refrescar la lista
  }

  const triggerButton = isFirstProfile ? (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      Crear Primer Perfil
    </Button>
  ) : (
    <Button variant="outline">
      <PlusCircle className="mr-2 h-4 w-4" />
      Crear Nuevo Perfil
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Perfil</DialogTitle>
          <DialogDescription>
            Completa los detalles de esta identidad. La IA la usará para
            adaptar el tono y el contenido.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de Perfil</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="personal" />
                        </FormControl>
                        <FormLabel className="font-normal">Personal</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="brand" />
                        </FormControl>
                        <FormLabel className="font-normal">Marca</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Perfil</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Juan Pérez o Acme Corp" {...field} />
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
                  <FormLabel>¿Quién soy? (Mi Rol)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Consultor de Marketing, Diseñador Freelance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="valueProposition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Qué hago/vendo? (Propuesta de Valor)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: Ayudo a empresas a..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mi Público Objetivo</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: Directores de marketing en startups tecnológicas"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="toneOfVoice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tono de Voz</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tono para la IA" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="profesional">Profesional y cercano</SelectItem>
                      <SelectItem value="inspirador">Inspirador y motivacional</SelectItem>
                      <SelectItem value="tecnico">Técnico y didáctico</SelectItem>
                      <SelectItem value="cercano">Divertido e informal</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Guardar Perfil
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};