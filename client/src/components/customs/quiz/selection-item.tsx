import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CreateQuizType } from "@/lib/type";
import {
  UseFormRegister,
  Controller,
  Control,
} from "react-hook-form";

interface SelectItemProps {
  name: keyof CreateQuizType;
  choice: string[] | number[];
  register: UseFormRegister<CreateQuizType>;
  control: Control<CreateQuizType, any>;
  isNumber?: boolean;
}

export const SelectionItem = (props: SelectItemProps) => {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {props.name}
      </label>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => (
          <Select
            onValueChange={(value) => {
              if(props.isNumber) field.onChange(parseInt(value));
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
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};
