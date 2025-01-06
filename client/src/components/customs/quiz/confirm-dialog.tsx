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
} : ConfirmDialogProps) => {
  return (
    <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Submission</DialogTitle>
        </DialogHeader>
        <p className="text-gray-300">
          Are you sure you want to submit the quiz? You cannot change your
          answers after submission.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
            Cancel
          </Button>
          <Button variant="default" onClick={confirmSubmitQuiz}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
