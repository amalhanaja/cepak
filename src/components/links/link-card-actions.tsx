"use client";

import { LinkType } from "@/db/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash2Icon } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { LinkFormDialog } from "./link-form-dialog";
import { useState } from "react";
import { LinkDeleteConfirmationDialog } from "./link-delete-confirmation-dialog";

type Props = {
  link: LinkType;
};

export const LinkCardActions = ({ link }: Props) => {
  const { isSignedIn } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="self-start">
          <EllipsisVertical className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            disabled={!isSignedIn}
            onClick={() => setIsEditing(true)}
          >
            <Pencil />
            <span>Edit</span>
            {!isSignedIn && <span> (required sign in)</span>}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setIsDeleting(true)}
          >
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LinkFormDialog
        open={isEditing}
        onOpenChange={setIsEditing}
        link={link}
      />
      <LinkDeleteConfirmationDialog
        open={isDeleting}
        onOpenChange={setIsDeleting}
        link={link}
      />
    </>
  );
};
