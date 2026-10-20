"use client";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteNote } from "@/actions/dashboard";
import { deleteLegacyMeetingNote } from "@/actions/dashboard";
export function DeleteNoteButton({
  id,
  title,
  meeting = false,
}: {
  id: string;
  title: string;
  meeting?: boolean;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="min-h-11">
          حذف یادداشت
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>حذف این یادداشت؟</AlertDialogTitle>
          <AlertDialogDescription>
            «{title}» برای همیشه از حساب شما پاک می‌شود.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="min-h-11">انصراف</AlertDialogCancel>
          <form action={meeting ? deleteLegacyMeetingNote : deleteNote}>
            <input type="hidden" name="id" value={id} />
            <AlertDialogAction
              type="submit"
              variant="destructive"
              className="min-h-11"
            >
              حذف یادداشت
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
