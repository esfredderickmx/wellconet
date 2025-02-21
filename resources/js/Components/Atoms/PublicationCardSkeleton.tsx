import { Skeleton } from "@/Components/ui/skeleton";

export function PublicationCardSkeleton({count = 1}: { count?: number }) {
	return (
		<>
			{Array.from({length: count}).map((_, index) => (
				<div key={index} className="flex flex-col h-full">
					<Skeleton className="h-48 w-full rounded-lg"/>
					<div className="grow p-4 flex flex-col">
						<div className="flex justify-between items-start gap-4 mb-2">
							<Skeleton className="h-8 basis-2/3"/>
							<Skeleton className="h-5 basis-1/4"/>
						</div>
						<Skeleton className="h-5 w-3/4 mb-4"/>
						<Skeleton className="h-4 w-3/5 self-end"/>
					</div>
					<div className="p-4 pt-0 flex items-end justify-end gap-2.5">
						<Skeleton className="h-7 w-7"/>
						<Skeleton className="h-7 w-20"/>
					</div>
				</div>
			))}
		</>
	);
}