import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AIButton } from "@/components/customs/quiz/ai-button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories, CreateRoadmapSchema, CreateRoadmapType } from "@/lib/type";
import { useCreateRoadmap } from "@/hooks/roadmap";
import { translateCategory } from "@/lib/utils";
import { Toaster } from "sonner";

export default function CreateRoadmap() {
  const navigate = useNavigate();
  const mutation = useCreateRoadmap();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<CreateRoadmapType>({
    resolver: zodResolver(CreateRoadmapSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<CreateRoadmapType> = async (formdata) => {
    setIsSubmitting(true);
    mutation.mutate(formdata);
  };

  return (
    <>
      <Toaster richColors />
      <div className="min-h-screen p-4 md:p-8">
        <div className="mx-auto max-w-2xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6 gap-2"
            onClick={() => navigate("/roadmap")}
          >
            <ArrowLeft className="h-4 w-4" />
            返回
          </Button>

          {/* Main Card */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">創建學習路徑</CardTitle>
              <CardDescription>
                設定您的學習路徑基本訊息，創建後可以增加具體的學習章節。
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                {/* Basic Info Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">基本訊息</CardTitle>
                    <CardDescription>
                      填寫路徑的基本訊息，讓 AI 了解這個路徑的主要內容。
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        路徑名稱
                      </label>
                      <Input
                        id="name"
                        placeholder="例如：JavaScript 完整入門指南"
                        {...register("name")}
                      />
                      {errors.name && (
                        <span className=" text-red-500 text-sm">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="topic" className="text-sm font-medium">
                        主題分類
                      </label>
                      <Controller
                        name="topic"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="選擇主題分類" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((item, index) => (
                                <SelectItem key={index} value={item.toString()}>
                                  {translateCategory(item.toString())}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.topic && (
                        <span className="text-sm text-red-500">
                          {errors.topic.message}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Description Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">路徑描述</CardTitle>
                    <CardDescription>
                      詳細描述這個學習路徑的目標、適合對象和預期成果。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      id="description"
                      placeholder="描述這個學習路徑的內容、目標和適合的學習者..."
                      className="min-h-[120px]"
                      {...register("description")}
                    />

                    {errors.description && (
                      <span className=" text-red-500 text-sm">
                        {errors.description.message}
                      </span>
                    )}
                  </CardContent>
                </Card>
              </CardContent>

              <CardFooter className="flex justify-end gap-4">
                <AIButton
                  className="w-full"
                  type="submit"
                  text={isSubmitting ? "創建中" : "創建路徑"}
                  disabled={isSubmitting}
                />
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
