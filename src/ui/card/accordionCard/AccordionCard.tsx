import { FaRegBookmark, FaRegUser } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { VscLinkExternal } from "react-icons/vsc";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  event: {
    id: number;
    title: string;
    date: string;
    address: string;
    limit: number;
    current: number;
  };
};

/**
 * イベント情報を表示するカード
 */
export const AccordionCard = ({ event }: Props) => {
  // const accordionRef = useRef<HTMLDivElement>(null);
  // const doggleAccordion = () => {
  //   if (accordionRef.current) {
  //     const isOpen = accordionRef.current.ariaExpanded === "true";
  //     const dataState = isOpen ? "open" : "closed";
  //     accordionRef.current.setAttribute("data-state", dataState);
  //   }
  // }
  // const closeAccordion = () => {
  //   if (accordionRef.current) {
  //     accordionRef.current.setAttribute("data-state", "closed");
  //   }
  // }
  return (
    <Card className="relative">
      <AccordionItem value={`item-${event.id.toString()}`}>
        <AccordionTrigger>
          <div className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-bookmark-primary bg-transparent">
            <FaRegBookmark className="text-lg text-bookmark-primary" />
          </div>
          <CardHeader>
            <CardTitle className="text-base">{event.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex flex-col gap-y-1.5">
              <div className="flex items-center justify-start gap-2 text-sm text-custom-gray-7070">
                <IoCalendarOutline className="text-lg" />
                {event.date}
              </div>
              <div className="flex items-center justify-start gap-2 text-sm text-custom-gray-7070">
                <LiaMapMarkerAltSolid className="text-2xl" />
                {event.address}
              </div>
              <div className="flex items-center justify-start gap-2 text-sm text-custom-gray-7070">
                <FaRegUser />
                {event.current}/{event.limit}
              </div>
            </div>
          </CardContent>
        </AccordionTrigger>
        <AccordionContent>
          <div className="text-base font-bold">イベント概要</div>
          <p className="text-sm text-custom-gray-7070">概要</p>
          <div className="mt-3 text-base font-bold">アクセス</div>
          <div className="mt-3 flex h-10 w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-bookmark-primary text-sm text-custom-fontcolor transition-all hover:bg-custom-sub">
            詳しくみる
            <VscLinkExternal />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Card>
  );
};
