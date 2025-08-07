
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "联系我们",
  description: "如有疑问，请通过以下方式联系我们。",
};

function ContactUsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">联系我们</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            如有任何疑问或合作需求，请通过以下方式与我们联系，我们将竭诚为您服务。
          </p>
        </div>

        {/* 图片展示区域 */}
          <div className="flex justify-center items-center p-8">
            <div className="max-w-4xl w-full">
              <Image
                src="/contact_us.jpg"
                alt="联系我们"
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

export default ContactUsPage;
