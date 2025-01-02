import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { SelectionItem } from "./selection-item";
import { MultipleCheckbox } from "./multiple-checkbox";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { categories, difficulties, options, problems } from "@/lib/type";
import { createQuizSchema, CreateQuizType } from "@/lib/type";
import { useCreateQuiz } from "@/hooks/create-quiz";

interface CreateQuizFormProps {
  className?: string;
}

export const CreateQuizForm = (props: CreateQuizFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateQuizType>({
    resolver: zodResolver(createQuizSchema),
    mode: "onChange",
    defaultValues: {
      mul_answer: false,
    },
  });

  // change mutationFn to createQuiz
  const mutation = useCreateQuiz();

  const onSubmit: SubmitHandler<CreateQuizType> = (formdata) => {
    mutation.mutate(formdata);
  };

  return (
    <Card className={props.className}>
      <CardHeader>
        <CardTitle>
          <h1 className="text-3xl">Create Quiz</h1>
          <h2 className="text-sm text-gray-500">NeoAcademy</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 mt-5">
            {/* name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Input
                type="text"
                placeholder="Quiz Name"
                className="mt-1"
                {...register("name")}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex w-full gap-4">
                {/* category */}
                <div className="flex flex-1 flex-col">
                  <SelectionItem
                    name="category"
                    choice={categories}
                    register={register}
                    control={control}
                  />
                </div>

                {/* difficulty */}
                <div className="flex flex-1 flex-col">
                  <SelectionItem
                    name="difficulty"
                    choice={difficulties}
                    register={register}
                    control={control}
                  />
                </div>
              </div>

              <div className="flex w-full gap-4">
                {/* problems */}
                <div className="flex flex-1 flex-col">
                  <SelectionItem
                    name="problem"
                    choice={problems}
                    register={register}
                    control={control}
                    isNumber={true}
                  />
                </div>

                {/* Options */}
                <div className="flex flex-1 flex-col">
                  <SelectionItem
                    name="option"
                    choice={options}
                    register={register}
                    control={control}
                    isNumber={true}
                  />
                </div>
              </div>
            </div>

            {/* multiple */}
            <div className="flex items-center space-x-2">
              <MultipleCheckbox
                id="mul_answer"
                label="Multiple Correct Answers"
                register={register}
                control={control}
              />
            </div>

            {/* remarks */}
            <div>
              <label
                htmlFor="remarks"
                className="block text-sm font-medium text-gray-700"
              >
                Any Remarks?
              </label>
              <Textarea className="h-[100px]" {...register("remarks")} />
              {errors.remarks && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.remarks.message}
                </p>
              )}
            </div>

            {/* submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={!isValid || mutation.isPending}
            >
              {mutation.isPending ? "Generating Quiz..." : "Generate Quiz"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
