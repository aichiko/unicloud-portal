import DateTimeComponent from "./DateTimeComponent";

interface InformListItemProps {
  title: string;
  content: string;
  firstItem: boolean;
  // date?: Date;
  // dateString?: string;
}

function InformListItem({ title, content, firstItem = false }: InformListItemProps) {

  const titleColor = firstItem ? "text-[#2769AF]" : "text-[#212834]";

  return (
    <div className="flex flex-col items-start py-4">
      <span className={`text-xl font-bold line-clamp-1 mb-4 ${titleColor}`}>{title}</span>
      <span className="text-[14px] text-[#888888] line-clamp-2">{content}</span>
    </div>
  );
}

export default InformListItem;