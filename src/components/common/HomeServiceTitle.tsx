
function HomeServiceTitle({ title }: { title: string }) {
  return (
    <div className="text-xl font-semibold h-9 bg-[#2769AF] text-white inline-flex w-fit">
      {/* 居中显示 */}
      <span className="my-auto mx-6">{`${title}  >  `}</span>
    </div>
  );
}

export default HomeServiceTitle;