import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";

class FetchError extends Error {
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.name = "FetchError";
    this.status = status;
    this.statusText = statusText;
  }
}

export const fetchResourceViewerData: LoaderFunction = async (
  args: LoaderFunctionArgs
): Promise<{ results: IInfoData[]; currentData: IInfoData | null }> => {
  const url = args.request.url;
  const parsedUrl = new URL(url);
  const pathSegments = parsedUrl.pathname.split("/");
  const name = pathSegments[1];
  const id = pathSegments[2];

  const responseURL = id
    ? `https://rickandmortyapi.com/api/${name}/${id}`
    : `https://rickandmortyapi.com/api/${name}`;

  const response = await fetch(responseURL);

  if (!response.ok) {
    throw new FetchError(
      "Resource not found",
      response.status,
      response.statusText
    );
  }

  const data = await response.json();

  return id
    ? { results: [], currentData: data }
    : { results: data.results, currentData: null };
};
