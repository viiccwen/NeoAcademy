import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
  showSubmitDialog: boolean;
  setShowSubmitDialog: (show: boolean) => void;
  confirmSubmitQuiz: () => void;
}

export const ConfirmDialog = ({
  showSubmitDialog,
  setShowSubmitDialog,
  confirmSubmitQuiz,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>提交測驗答案</DialogTitle>
        </DialogHeader>
        <p className="text-gray-300">
          你確定要提交測驗嗎？提交後將無法更改答案。
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
            取消
          </Button>
          <Button variant="default" onClick={confirmSubmitQuiz}>
            確認
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
