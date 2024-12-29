import { Checkbox } from "@/components/ui/checkbox";
import { CreateQuizType } from "@/lib/type";
import { Controller, UseFormRegister } from "react-hook-form";

interface MultipleCheckboxProps {
  className?: string;
  id: string;
  label: string;
  register: UseFormRegister<CreateQuizType>;
  control: any;
}

export const MultipleCheckbox = (props: MultipleCheckboxProps) => {
  return (
    <div className={`flex items-center space-x-2 ${props.className || ""}`}>
      <Controller
        name="mul_answer"
        control={props.control}
        render={({ field }) => (
          <>
            <Checkbox
              id={props.id}
              checked={field.value || false} 
              onCheckedChange={field.onChange}
            />
            <label
              htmlFor={props.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {props.label}
            </label>
          </>
        )}
      />
    </div>
  );
};
