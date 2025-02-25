import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteRoadmap } from "@/hooks/roadmap";

interface DeleteRoadmapDialogProps {
  roadmapId: string | undefined;
}

export function DeleteRoadmapDialog({
  roadmapId,
}: DeleteRoadmapDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const mutation = useDeleteRoadmap();

  const onDelete = async () => {
    if (!roadmapId) return;
    await mutation.mutateAsync(roadmapId);
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
        >
          刪除
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>確認刪除</AlertDialogTitle>
          <AlertDialogDescription>
            您確定要刪除此學習路線圖嗎？此操作無法撤銷。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>確認刪除</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
