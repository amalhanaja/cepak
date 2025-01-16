"use client";

import { LinkType } from "@/db/schema";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteLink } from "@/services/links";

type Props = {
  link: LinkType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const LinkDeleteConfirmationDialog = ({
  link,
  open,
  onOpenChange,
}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteLink(link.id);
      onOpenChange(false);
      toast("Link berhasil dihapus");
    } catch {
      toast("Link gagal dihapus");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin akan menghapus?</AlertDialogTitle>
          <AlertDialogDescription>
            Link &quot;/{link.slug}&quot; akan dihapus secara permanent.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={confirmDelete}
          >
            <Trash2 />
            {isDeleting ? <>Menghapus</> : <>Hapus</>}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
