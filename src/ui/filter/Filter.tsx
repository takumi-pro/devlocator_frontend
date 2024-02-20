"use client";

import { Dialog, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMonths, format } from "date-fns";
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineFilterAlt } from "react-icons/md";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DAYS_TO_ADD_FOR_NEXT_DAY } from "@/const/date";
import { cn } from "@/lib/utils";
import { dateRangeToString } from "@/utils/date";
import { buildQueryString } from "@/utils/params";

type SearchDataType = {
  keyword: string;
  date:
    | {
        from: Date;
        to: Date | undefined;
      }
    | undefined;
  prefecture: string;
  category: string[];
};

/**
 * 絞り込みボタン
 * クリックすると絞り込みダイアログが表示される
 */
export const Filter = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [searchData, setSearchData] = useState<SearchDataType>({
    keyword: "",
    date: undefined,
    prefecture: "",
    category: [],
  });

  const FormSchema = z.object({
    category: z.array(z.string()),
    date: z.object({
      from: z.date(),
      to: z.date().optional(),
    }),
    keyword: z.string(),
    prefecture: z.string(),
  });

  const today = new Date();
  const oneMonthLater = addMonths(today, DAYS_TO_ADD_FOR_NEXT_DAY);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keyword: "",
      date: {
        from: today,
        to: oneMonthLater,
      },
      prefecture: "",
      category: [],
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const keyword = data.keyword;
    const category = data.category;
    const date = data.date;

    // const dateRangeString = `${date.from.toDateString()} - ${date.to?.toDateString()}`;
    const dateStrings = dateRangeToString(date.from, date.to);
    setSearchData({ ...data, date: { from: date.from, to: date.to } });
    const queryString = buildQueryString({
      keyword,
      category: category.join(","),
      date: dateStrings,
    });
    router.push(`/${queryString}`);
  };

  const checkRef = useRef<HTMLButtonElement>(null);

  // TODO: 別ファイルで管理
  // イベント内容
  const eventContents = [
    { id: "mokumoku", label: "もくもく会" },
    { id: "lt", label: "LT" },
    { id: "reading", label: "輪読会" },
    { id: "handson", label: "ハンズオン" },
    { id: "social", label: "交流会" },
  ];

  // 技術・ツール
  const techContents = [
    { id: "go", label: "Go" },
    { id: "ruby", label: "Ruby" },
    { id: "java", label: "Java" },
    { id: "php", label: "PHP" },
    { id: "python", label: "Python" },
    { id: "javascript", label: "JavaScript" },
    { id: "typescript", label: "TypeScript" },
    { id: "swift", label: "Swift" },
    { id: "kotlin", label: "Kotlin" },
    { id: "flutter", label: "Flutter" },
    { id: "react", label: "React" },
    { id: "next", label: "Next" },
    { id: "vue", label: "Vue" },
    { id: "nuxt", label: "Nuxt" },
    { id: "rails", label: "Rails" },
    { id: "laravel", label: "Laravel" },
    { id: "docker", label: "Docker" },
    { id: "kubernetes", label: "Kubernetes" },
  ];

  // ポジション
  const areaContents = [
    { id: "sre", label: "SRE" },
    { id: "infra", label: "インフラ" },
    { id: "backend", label: "バックエンド" },
    { id: "frontend", label: "フロントエンド" },
    { id: "pm", label: "PM" },
    { id: "cto", label: "CTO" },
  ];

  return (
    <>
      <div className="absolute left-3 top-3 z-10 mobile:left-6">
        {/* TODO: ボタンはuiに切り出す */}
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-between rounded-xl border border-sub bg-white px-4 py-1.5 text-sm font-medium text-custom-fontcolor transition-all  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          <div className="mr-2 flex cursor-pointer items-center justify-between">
            <MdOutlineFilterAlt className="mr-1 text-xl text-custom-main" />
            <span>絞り込み</span>
          </div>
          <span
            id="search-condision"
            className="flex h-7 max-w-filter-mobile flex-row items-center justify-start gap-1 overflow-scroll whitespace-nowrap mobile:max-w-filter-tablet tablet:max-w-filter"
          >
            {/* TODO: コンポーネントで管理 */}
            {Boolean(searchData.category.length) &&
              searchData.category.map((cate) => (
                <span
                  className="rounded-full bg-custom-sub px-3 py-1 text-sm font-normal text-custom-fontcolor"
                  key={cate}
                >
                  {cate}
                </span>
              ))}
            {searchData.date && (
              <span className="rounded-full bg-custom-sub px-3 py-1 text-sm font-normal text-custom-fontcolor">
                {format(searchData.date.from, "yyyy年MM月dd日")}
                {searchData.date?.to &&
                  ` - ${format(searchData.date.to, "yyyy年MM月dd日")}`}
              </span>
            )}
          </span>
        </div>
      </div>

      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex  min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* TODO: Dialogはuiに切り出す */}
                <Dialog.Panel className="max-h-lg-dialog max-w-lg-dialog overflow-scroll rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className={cn("grid gap-2")}>
                    {/* TODO: formの切り出し */}
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-wrap justify-between gap-4">
                          <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem className="flex flex-col justify-center">
                                <FormLabel className="font-bold">
                                  開催日
                                </FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      id="date"
                                      variant={"outline"}
                                      className={cn(
                                        "w-[300px] justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      <IoCalendarOutline className="mr-2 h-4 w-4" />
                                      {field.value?.from ? (
                                        field.value.to ? (
                                          <>
                                            {format(
                                              field.value.from,
                                              "yyyy/MM/dd"
                                            )}{" "}
                                            -{" "}
                                            {format(
                                              field.value.to,
                                              "yyyy/MM/dd"
                                            )}
                                          </>
                                        ) : (
                                          format(field.value.from, "yyyy/MM/dd")
                                        )
                                      ) : (
                                        <span>日付を選択してください</span>
                                      )}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      initialFocus
                                      mode="range"
                                      defaultMonth={field.value?.from}
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      numberOfMonths={2}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="prefecture"
                            render={() => (
                              <FormItem className="flex w-48 flex-col justify-center">
                                <FormLabel className="font-bold">
                                  地域
                                </FormLabel>
                                <Select disabled>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="地域を選択" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="m@example.com">
                                      東京都
                                    </SelectItem>
                                    <SelectItem value="m@google.com">
                                      神奈川県
                                    </SelectItem>
                                    <SelectItem value="m@support.com">
                                      大阪府
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem className="mt-3 max-h-category overflow-y-scroll">
                              <FormLabel className="font-bold">
                                カテゴリー選択
                              </FormLabel>
                              <FormDescription>イベント内容</FormDescription>
                              <div className="flex flex-wrap gap-x-2 gap-y-3">
                                {eventContents.map((eventContent) => (
                                  <FormField
                                    key={eventContent.id}
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                      <div>
                                        {/* TODO: 配列で管理 */}
                                        <FormItem key={eventContent.id}>
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(
                                                eventContent.label
                                              )}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([
                                                      ...field.value,
                                                      eventContent.label,
                                                    ])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) =>
                                                          value !==
                                                          eventContent.label
                                                      )
                                                    );
                                              }}
                                              ref={checkRef}
                                            >
                                              {eventContent.label}
                                            </Checkbox>
                                          </FormControl>
                                        </FormItem>
                                      </div>
                                    )}
                                  />
                                ))}
                              </div>
                              <FormDescription>技術・ツール</FormDescription>
                              <div className="flex flex-wrap gap-x-2 gap-y-3">
                                {techContents.map((techContent) => (
                                  <FormField
                                    key={techContent.id}
                                    control={form.control}
                                    name="category"
                                    render={() => (
                                      <FormItem key={techContent.id}>
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              techContent.label
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    techContent.label,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !==
                                                        techContent.label
                                                    )
                                                  );
                                            }}
                                            ref={checkRef}
                                          >
                                            {techContent.label}
                                          </Checkbox>
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                ))}
                              </div>
                              <FormDescription>ポジション</FormDescription>
                              <div className="flex flex-wrap gap-x-2 gap-y-3">
                                {areaContents.map((areaContent) => (
                                  <FormField
                                    key={areaContent.id}
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                      <div>
                                        {/* TODO: 配列で管理 */}
                                        <FormItem key={areaContent.id}>
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(
                                                areaContent.label
                                              )}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([
                                                      ...field.value,
                                                      areaContent.label,
                                                    ])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) =>
                                                          value !==
                                                          areaContent.label
                                                      )
                                                    );
                                              }}
                                              ref={checkRef}
                                            >
                                              {areaContent.label}
                                            </Checkbox>
                                          </FormControl>
                                        </FormItem>
                                      </div>
                                    )}
                                  />
                                ))}
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="keyword"
                          render={({ field }) => (
                            <FormItem className="mt-3">
                              <FormLabel className="font-bold">
                                キーワード検索
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="キーワードでイベントを検索"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div className="mt-5 flex items-center justify-end">
                          <div
                            onClick={() => setOpen(false)}
                            className="w-20 cursor-pointer text-sm text-custom-fontcolor opacity-75"
                          >
                            閉じる
                          </div>
                          <Button
                            onClick={() => setOpen(false)}
                            className="w-20 bg-custom-main drop-shadow-lg hover:bg-custom-main-hover"
                            type="submit"
                          >
                            保存
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
