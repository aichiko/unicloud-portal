import Image from "next/image";
import NewsBgImg from "@/assets/bg_NEWS.png";

/**
 * NewsTitle component
 * @returns JSX.Element
 */
function NewsTitle() {

  return (
    <div className="flex items-center justify-center py-8 relative mt-12">
      {/* 居中显示 */}
      <Image src={NewsBgImg} alt="News Background" className="inset-0 absolute left-1/2 transform -translate-x-1/2 top-4" width={215} />

      <div className="flex items-center space-x-4 max-w-3/4 w-full z-10">
        {/* 左侧装饰 */}
        <div className="flex items-center flex-1">
          {/* 横线 */}
          <div className="mx-4 flex-1 h-px bg-[#E8E8E8]"></div>
          {/* 小色块 */}
          <div className="w-4 h-4 bg-[#2769AF]"></div>
        </div>
        
        {/* 中间文字 */}
        <div className="px-4">
          <span className="text-3xl font-bold text-[#212834] whitespace-nowrap">
            更多资讯
          </span>
        </div>
        
        {/* 右侧装饰 */}
        <div className="flex items-center flex-1">
          {/* 小色块 */}
          <div className="w-4 h-4 bg-[#2769AF]"></div>
          {/* 横线 */}
          <div className="mx-4 flex-1 h-px bg-[#E8E8E8]"></div>
        </div>
      </div>
    </div>
  );
}

export default NewsTitle;