"use client";

import { isValidUrl } from "@/lib/validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Scissors } from "lucide-react";
import { createSimpleLink } from "@/services/links";
import { useState } from "react";
import { toast } from "sonner";

const simpleLinkFormSchema = z.object({
  link: z
    .string()
    .min(2, { message: "Min. 2 character" })
    .refine((s) => isValidUrl(s), { message: "Invalid Link" }),
});

type SimpleLinkFormType = z.infer<typeof simpleLinkFormSchema>;

export const SimpleLinkForm = () => {
  const form = useForm<SimpleLinkFormType>({
    resolver: zodResolver(simpleLinkFormSchema),
    defaultValues: { link: "" },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: SimpleLinkFormType) => {
    setIsLoading(true);
    try {
      await createSimpleLink(values.link);
      toast("Link telah dipangkas");
    } catch {
      toast("Link gagal dipangkas");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row w-full max-w-7xl px-4 mx-auto mt-12 justify-center gap-2"
      >
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormControl className="flex-1 w-full sm:w-96">
                <Input placeholder="Masukkan link disini" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          <Scissors />
          {isLoading ? <>Memangkas</> : <>Pangkas</>}
        </Button>
      </form>
    </Form>
  );
};
