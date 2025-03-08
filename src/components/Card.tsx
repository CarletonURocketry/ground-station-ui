import type * as React from "react";

interface CardProps {
	title: string;
	children: React.ReactNode;
	className?: string;
}

function Card({ title, children, className = "" }: CardProps) {
	return (
		<div
			className={`bg-white p-4 md:p-6 rounded-lg border border-[#D8DADA] min-h-[250px] h-[300px] ${className}`}
		>
			<h2 className="text-lg font-semibold mb-2 md:mb-4">{title}</h2>
			<div className="h-[calc(100%-2.5rem)]">{children}</div>
		</div>
	);
}

export default Card;
