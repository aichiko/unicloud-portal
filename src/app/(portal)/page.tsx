import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "区域智汇病理云平台",
  description: "欢迎来到区域智汇病理云平台",
};

function Page() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center mt-10">欢迎来到区域智汇病理云平台</h1>
      <p className="text-center mt-4">请使用左侧菜单导航进行操作。</p>
      <div className="flex justify-center mt-10">
        <button className="btn btn-primary">开始使用</button>
      </div>
    </div>
  );
}

export default Page;
