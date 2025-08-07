import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "区域智汇病理云平台",
  description: "欢迎来到区域智汇病理云平台",
};

function Page() {
  return (
    <div className="flex flex-col">
      {
        Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="bg-amber-400 h-36 p-4 m-2 rounded shadow">
            <p>这是一个示例内容块 {i + 1}</p>
          </div>
        ))
      }
    </div>
  );
}

export default Page;
