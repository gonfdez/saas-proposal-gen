"use client"

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
import { useTranslations } from "next-intl";

interface ProfileDialogProps {
  onProfileCreated: () => void;
  isFirstProfile?: boolean;
}

export const NewProfileDialog: React.FC<ProfileDialogProps> = ({ onProfileCreated, isFirstProfile = false }) => {
  const t = useTranslations("dashboard.newProfileDialog");
  const [open, setOpen] = useState(false);

  const profileFormSchema = z.object({
    type: z.enum(["personal", "brand"], { error: t("error.type") }),
    name: z.string().min(2, t("error.name")),
    role: z.string().min(3, t("error.role")),
    valueProposition: z.string().min(10, t("error.valueProposition")),
    targetAudience: z.string().min(10, t("error.targetAudience")),
    toneOfVoice: z.enum(["professional","inspiring","technical","friendly"], { error: t("error.toneOfVoice") }),
  });
  type ProfileFormValues = z.infer<typeof profileFormSchema>;
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
    console.log("Form values:", values);
    form.reset();
    setOpen(false);
    onProfileCreated();
  }

  const triggerButton = isFirstProfile ? (
    <Button className="w-full lg:w-fit">
      <PlusCircle className="mr-2 h-4 w-4" />
      {t("createFirstProfile")}
    </Button>
  ) : (
    <Button variant="outline" className="w-full lg:w-fit">
      <PlusCircle className="mr-2 h-4 w-4" />
      {t("createNewProfile")}
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{t("type.label")}</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="personal" />
                        </FormControl>
                        <FormLabel className="font-normal">{t("type.personal")}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="brand" />
                        </FormControl>
                        <FormLabel className="font-normal">{t("type.brand")}</FormLabel>
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
                  <FormLabel>{t("name.label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("name.placeholder")} {...field} />
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
                  <FormLabel>{t("role.label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("role.placeholder")} {...field} />
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
                  <FormLabel>{t("valueProposition.label")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t("valueProposition.placeholder")} className="resize-none" {...field} />
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
                  <FormLabel>{t("targetAudience.label")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t("targetAudience.placeholder")} className="resize-none" {...field} />
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
                  <FormLabel>{t("toneOfVoice.label")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("toneOfVoice.placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="professional">{t("toneOfVoice.professional")}</SelectItem>
                      <SelectItem value="inspiring">{t("toneOfVoice.inspiring")}</SelectItem>
                      <SelectItem value="technical">{t("toneOfVoice.technical")}</SelectItem>
                      <SelectItem value="friendly">{t("toneOfVoice.friendly")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {t("submit")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
