import DateTimeComponent from "./DateTimeComponent";

interface InformListItemProps {
  title: string;
  content?: string;
  firstItem?: boolean;
  // date?: Date;
  // dateString?: string;
}

function InformListItem({ title, content, firstItem = false }: InformListItemProps) {

  const titleColor = firstItem ? "text-[#2769AF]" : "text-[#212834]";

  // 处理 HTML 内容，去除标签并清理文本
  const processContent = (htmlContent?: string): string => {
    if (!htmlContent) return '无';
    
    // 去除 HTML 标签
    const textContent = htmlContent.replace(/<[^>]*>/g, '');
    
    // 去除多余的空白字符和换行符
    const cleanedContent = textContent
      .replace(/\s+/g, ' ')  // 将多个空白字符替换为单个空格
      .replace(/&nbsp;/g, ' ')  // 替换 HTML 实体
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .trim();
    
    // 如果清理后的内容为空或只有空白字符，返回默认文本
    return cleanedContent || '暂无内容描述';
  };

  const displayContent = processContent(content);

  return (
    <div className="flex flex-col items-start py-4">
      <span className={`text-xl font-bold line-clamp-1 mb-4 ${titleColor}`}>{title}</span>
      <span className="text-[14px] text-[#888888] line-clamp-2">{displayContent}</span>
    </div>
  );
}

export default InformListItem;