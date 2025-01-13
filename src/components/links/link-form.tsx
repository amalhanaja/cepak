import { isValidSlug, isValidUrl } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LinkType } from "@/db/schema";
import { createLinkWithSlug, updateLinkById } from "@/services/links";

const linkFormSchema = z.object({
  link: z
    .string()
    .min(2, { message: "Min. 2 character" })
    .refine((s) => isValidUrl(s), { message: "Invalid Link" }),
  slug: z
    .string()
    .optional()
    .refine((s) => isValidSlug(s), { message: "Invalid Slug" }),
});

type LinkFormType = z.infer<typeof linkFormSchema>;

type Props = {
  link?: LinkType;
  onSuccess: () => void;
};

export const LinkForm = ({ link, onSuccess }: Props) => {
  const form = useForm<LinkFormType>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: { link: link?.link ?? "", slug: link?.slug ?? "" },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: LinkFormType) => {
    setIsLoading(true);
    console.log(values);
    try {
      if (!link) {
        await createLinkWithSlug(values.link, values.slug ?? "");
      } else {
        await updateLinkById(link.id, values.link, values.slug ?? "");
      }
      toast("Link telah disubmit");
      onSuccess();
    } catch {
      toast("Link gagal disubmit");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">{field.name}</FormLabel>
              <FormControl>
                <Input
                  placeholder="Cth: https://github.com/amalhanaja"
                  {...field}
                />
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
              <FormLabel className="capitalize">
                {field.name} (Opsional)
              </FormLabel>
              <FormControl>
                <Input placeholder="Cth: kejutan-tahun-baru" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="mt-6">
          {isLoading ? <>Submitting</> : <>Submit</>}
        </Button>
      </form>
    </Form>
  );
};
