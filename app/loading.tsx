export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 rounded-full border-2 border-transparent animate-spin"
          style={{
            borderTopColor: "#B8860B",
            borderRightColor: "#D4A017",
          }}
        />
        <p
          className="text-[#B8860B]/60 text-sm"
          style={{ letterSpacing: "0.2em" }}
        >
          جاري التحميل...
        </p>
      </div>
    </div>
  );
}
