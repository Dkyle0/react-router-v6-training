import { useEffect } from 'react';

interface List {
	name: string;
}

export const useListSortEffect = (list: List[], dependenc: boolean) => {
	useEffect(() => {
		dependenc
			? list.sort((a, b) => a.name.localeCompare(b.name))
			: list.sort((a, b) => b.name.localeCompare(a.name));
	}, [dependenc, list]);
};
