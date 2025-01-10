import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SelectionItem } from "./selection-item";
import { MultipleCheckbox } from "./multiple-checkbox";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories, difficulties, options, questions } from "@/lib/type";
import { createQuizSchema, CreateQuizType } from "@/lib/type";
import { useCreateQuiz } from "@/hooks/quiz";
import { translateCategory, translateDifficulty } from "@/lib/utils";

interface CreateQuizFormProps {
  className?: string;
}

export const CreateQuizForm = (props: CreateQuizFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<CreateQuizType>({
    resolver: zodResolver(createQuizSchema),
    mode: "onChange",
    defaultValues: {
      multipleAnswers: false,
    },
  });

  // Handle quiz creation
  const mutation = useCreateQuiz();

  const onSubmit: SubmitHandler<CreateQuizType> = async (formdata) => {
    mutation.mutate(formdata);
  };

  return (
    <Card className={props.className}>
      <CardHeader>
        <CardTitle>
          <h1 className="text-3xl font-bold">New Quiz</h1>
          <h2 className="text-sm text-gray-500">
            NeoAcademy - AI 驅動的線上測驗平台
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Quiz Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              名稱 <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="輸入..."
              className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Category & Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectionItem
            label="種類"
              name="category"
              choice={categories}
              register={register}
              control={control}
              translate={translateCategory}
            />
            <SelectionItem
              label="難度"
              name="difficulty"
              choice={difficulties}
              register={register}
              control={control}
              translate={translateDifficulty}
            />
          </div>

          {/* Number of Problems & Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectionItem
            label="題數"
              name="question"
              choice={questions}
              register={register}
              control={control}
              isNumber={true}
            />
            <SelectionItem
            label="選項"
              name="option"
              choice={options}
              register={register}
              control={control}
              isNumber={true}
            />
          </div>

          {/* Multiple Answers Checkbox */}
          <div className="flex items-center space-x-2">
            <MultipleCheckbox
              id="mul_answer"
              label="允許複選題"
              register={register}
              control={control}
            />
          </div>

          {/* Remarks (Optional) */}
          <div>
            <label
              htmlFor="remarks"
              className="block text-sm font-medium text-gray-300"
            >
              額外附註
            </label>
            <Textarea className="h-[100px] mt-1" {...register("remarks")} />
            {errors.remarks && (
              <p className="text-sm text-red-500 mt-1">
                {errors.remarks.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
            disabled={!isValid || mutation.isPending}
          >
            {mutation.isPending ? "產生測驗中..." : "建立測驗"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
