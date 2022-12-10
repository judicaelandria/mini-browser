import {
  ChangeEvent,
  DetailedHTMLProps,
  HTMLAttributes,
  KeyboardEvent,
  useCallback,
  useState,
} from "react";
import { isValidURL } from "../libs/url";
import { Spinner } from "./Spinner";

interface IFrameProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size: number[];
  point: number[];
}

export const IFrame = ({ size, point, ...rest }: IFrameProps) => {
  const [url, setUrl] = useState<string>("");
  const [navigationLink, setNavigationLink] = useState<string>("");
  const [loadingContent, setLoadingContent] = useState(false);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUrl(event.target.value);
    },
    [setUrl]
  );

  const handleNavigate = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setLoadingContent(true);
        if (isValidURL(url)) {
          if (url.includes("youtube")) {
            const splitted = url.split("com/");
            const embeddedLink = splitted[0] + "com/embed/" + splitted[1];
            setNavigationLink(embeddedLink);
          } else {
            if (!url.includes("https://")) {
              setUrl("https://" + url);
              setNavigationLink("https://" + url);
            } else setNavigationLink(url);
          }
        } else {
          setNavigationLink("https://google.com/search?q=" + url);
        }
      }
    },
    [url, setNavigationLink]
  );

  const width = size[0];
  const height = size[1];
  const x = point[0];
  const y = point[1];

  return (
    <div
      className="rounded-lg absolute bg-[#E6E6E6] p-2 pointer-events-auto"
      style={{ width, height, top: y, left: x }}
      {...rest}
    >
      <div className="w-full flex justify-center items-center mb-2 relative">
        <div className="relative w-3/4 h-6">
          <input
            type="text"
            className="w-full h-full rounded-full bg-white text-xs px-3 truncate"
            value={url}
            onChange={handleChange}
            onKeyDown={handleNavigate}
            placeholder="https://"
          />
          {loadingContent ? (
            <Spinner className="absolute right-2 top-1.5" />
          ) : null}
        </div>
      </div>
      <div className="w-full h-[calc(100%_-_32px)] rounded-lg bg-white">
        {navigationLink.length === 0 ? (
          <div className="w-full h-full"></div>
        ) : (
          <iframe
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            id="mini-browser-view"
            src={navigationLink}
            className="w-full h-full"
            onLoad={() => setLoadingContent(false)}
          />
        )}
      </div>
    </div>
  );
};
