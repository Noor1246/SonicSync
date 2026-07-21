const SkeletonCard = () => {
  return (
    <div
      className="
        min-w-[210px]
        w-[210px]

        rounded-3xl

        bg-white/5

        border
        border-white/10

        overflow-hidden

        animate-pulse
      "
    >
      {/* Image */}
      <div className="h-48 w-full bg-white/10" />

      <div className="p-4">

        <div className="h-5 w-3/4 rounded bg-white/10 mb-3" />

        <div className="h-4 w-1/2 rounded bg-white/10 mb-2" />

        <div className="h-3 w-1/3 rounded bg-white/10" />

      </div>
    </div>
  );
};

export default SkeletonCard;