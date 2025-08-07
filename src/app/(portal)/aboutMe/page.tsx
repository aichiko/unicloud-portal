import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "关于我们",
  description: "了解我们的使命、愿景和团队。",
};

function AboutMePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">关于我们</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            我们是一家专注于数字病理和人工智能技术的高科技企业，致力于推动医疗诊断技术的创新与发展。
          </p>
        </div>

        {/* 图片展示区域 */}
          <div className="flex justify-center items-center p-8">
            <div className="max-w-4xl w-full">
              <Image
                src="/about_me.jpg"
                alt="关于我们"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg shadow-md object-contain"
                priority
              />
            </div>
          </div>
      </div>
    </div>
  );
}

export default AboutMePage;