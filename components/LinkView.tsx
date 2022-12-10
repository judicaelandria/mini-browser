import Link from "next/link";

interface LinkViewProps {
  size: number[];
  point: number[];
  link: string;
}

export const LinkView = ({ size, point, link }: LinkViewProps) => {
  const width = size[0];
  const height = size[1];
  const x = point[0];
  const y = point[1];
  return (
    <div
      className="rounded-lg absolute z-50"
      style={{ width, height, top: y, left: x }}
      draggable
    >
      <div
        className="w-full h-[calc(100%_-_100px)] relative bg-cover bg-center bg-no-repeat rounded-t-lg"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1670349697577-49106a9c2e4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=985&q=80)",
        }}
      ></div>
      <div className="bg-white p-2">
        <span className="text-lg text-black">Tldraw</span>
        <p className="truncate text-xs text-black/60 h-full mb-2 mt-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          quibusdam facere necessitatibus culpa tempora reprehenderit, omnis
          voluptas molestiae neque. Exercitationem excepturi fugiat sequi
          voluptatibus nam corporis facilis, aperiam consectetur reprehenderit!
        </p>
        <Link href={link} target="_blank">
          <span className="mt-4 text-sm text-blue-600 cursor-pointer hover:underline duration-200 transition-all">
            Learn more
          </span>
        </Link>
      </div>
    </div>
  );
};
