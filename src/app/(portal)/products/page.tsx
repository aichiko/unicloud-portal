import React from 'react';
import Image from 'next/image';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: '产品服务',
  description: '优云智能医疗科技产品服务中心',
};

// 产品图片数组
const productImages = [
  '/products_scan.jpg',
  '/products_30X.jpg', 
  '/products_480.jpg',
  '/products_tct.jpg',
  '/products_tissue.jpg'
];

function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50  py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">产品服务</h1>
        </div>

      {/* 产品图片展示区域 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-12">
          {productImages.map((image, index) => (
            <div key={index} className="flex justify-center">
              <div className="w-full max-w-4xl">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
                  <Image
                    src={image}
                    alt={`产品图片 ${index + 1}`}
                    width={1200}
                    height={600}
                    className="w-full h-auto object-contain"
                    priority={index < 2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;