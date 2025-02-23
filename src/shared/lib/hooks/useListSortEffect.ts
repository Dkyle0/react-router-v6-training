import { useEffect } from "react";

interface List {
  name: string;
}

export const useListSortEffect = (list: List[], dependenc: boolean) => {
  useEffect(() => {
    list.sort((a, b) =>
      dependenc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }, [dependenc, list]);
};
