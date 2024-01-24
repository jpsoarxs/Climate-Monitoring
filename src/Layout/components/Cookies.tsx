import { useState } from "react";
import { MaterialSymbol } from "react-material-symbols";

export default function Cookies() {
  const [hidden, setHidden] = useState(false);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 absolute bg-white dark:bg-gray-600 shadow-md right-5 bottom-5 rounded ${
        hidden && "hidden"
      }`}
    >
      <div className="relative">
        <button
          className="text-gray-500 dark:text-white text-sm float-end absolute right-1 top-[8px]"
          onClick={() => setHidden(!hidden)}
        >
          <MaterialSymbol icon="close" size={16} className="mr-1" />
        </button>
        <p className="text-gray-500 dark:text-white text-sm py-5 px-6">
          This site uses <strong>location</strong> to improve your experience.
        </p>
      </div>
    </div>
  );
}
