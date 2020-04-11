import * as React from "react";

const useRedditApi = () => {
  const [data, setData] = React.useState<[] | any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [url, setUrl] = React.useState<string>(
    "https://www.reddit.com/r/pics/.json?jsonp="
  );

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      // console.log("loading", loading);
      try {
        const resp = await fetch(url);
        const json = await resp.json();

        json.data.children.shift();
        setData(json.data.children.map((c: any) => c.data));

        setIsLoading(false);
        // console.log("done loading", loading);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        console.log("error", error.message);
      }
    };
    fetchData();
  }, [setData]);
  return { data, isLoading, error };
};

export default useRedditApi;
