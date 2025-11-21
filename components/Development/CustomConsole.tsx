import { ReactNode } from 'react';

interface Props {
	open: boolean,
	children?: ReactNode,
}

export default function CustomConsole({open, children}: Props) {
		if (open) return (
		<div className="fixed w-full h-1/4 z-10 bg-black/60">
			{children}
		</div>
    )
}