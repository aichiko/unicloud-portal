import logger from "@/utils/logger";
import dayjs from "dayjs";


interface DateTimeComponentProps {
  date?: Date;
  dateString?: string;
  dateFormat?: string;
}

function DateTimeComponent({
  date,
  dateString,
  dateFormat = 'YYYY-MM-DD'
}: DateTimeComponentProps) {

  if (!date && !dateString) {
    return null;
  }

  if (dateString) {
    // 尝试多种格式解析
    let parsedDate;
    if (dateFormat) {
      // 使用指定格式解析
      parsedDate = dayjs(dateString, dateFormat, true); // strict parsing
    } else {
      // 自动解析
      parsedDate = dayjs(dateString);
    }

    if (parsedDate.isValid()) {
      date = parsedDate.toDate();
    } else {
      // 如果解析失败，尝试标准格式
      parsedDate = dayjs(dateString);
      if (parsedDate.isValid()) {
        date = parsedDate.toDate();
      }
    }
  }

  const day = date ? dayjs(date).format('DD') : '';
  const year = date ? dayjs(date).format('YYYY') : '';
  const month = date ? dayjs(date).format('MM') : '';

  return (
    <div className="flex flex-col items-start justify-center text-center">
      {/* 大号日期 */}
      <div className="text-6xl font-bold text-[#888888] text-center">
        {day}
      </div>
      {/* 年月信息 */}
      <div className="text-lg text-[#888888] mt-1 text-center">
        {year}.{month}
      </div>
    </div>
  );
}

export default DateTimeComponent;
