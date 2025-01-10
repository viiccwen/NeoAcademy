import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CreateQuizType } from "@/lib/type";
import { UseFormRegister, Controller, Control } from "react-hook-form";

interface SelectItemProps {
  label: string;
  name: keyof CreateQuizType;
  choice: string[] | number[];
  register: UseFormRegister<CreateQuizType>;
  control: Control<CreateQuizType, any>;
  translate?: (value: string) => string;
  isNumber?: boolean;
}

export const SelectionItem = (props: SelectItemProps) => {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-300"
      >
        {props.label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => (
          <Select
            onValueChange={(value) => {
              if (props.isNumber) field.onChange(parseInt(value));
              else field.onChange(value);
            }}
            value={field.value?.toString()}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={props.name} />
            </SelectTrigger>
            <SelectContent>
              {props.choice.map((item, index) => (
                <SelectItem key={index} value={item.toString()}>
                  {props.translate ? props.translate(item.toString()) : item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};
