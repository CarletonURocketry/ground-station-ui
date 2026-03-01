import { Skeleton } from "@/components/ui/skeleton";

export const RecordingsLoadingSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </>
  );
};
