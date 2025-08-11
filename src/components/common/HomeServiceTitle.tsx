
function HomeServiceTitle({ title }: { title: string }) {
  return (
    <div className="text-xl font-semibold h-9 min-w-32 bg-[#2769AF] text-white flex">
      {/* 居中显示 */}
      <span className="my-auto ml-6">{`${title}  >  `}</span>
    </div>
  );
}

export default HomeServiceTitle;