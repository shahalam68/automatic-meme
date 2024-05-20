import Link from "next/link";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { FC } from "react";

const SingleSet: FC<{ setProps: Set }> = ({ setProps }) => {
  const { images, name, total, series } = setProps;
  return (
    <div className="flex flex-col justify-between h-full max-w-xs rounded shadow-lg bg-white p-4">
      <div>
        <img className="w-full" src={images.logo} alt={name} />
      </div>
      <div className="px-6 py-4 flex-grow">
        <div className="font-bold text-xl mb-2">{name}</div>
      </div>
      <div className="px-6 pb-4">
        <Link href="/sets">
          <button className="border-2 border-yellow-500  hover:border-yellow-500 rounded-lg px-4 py-2  font-bold text-gray-800 hover:bg-yellow-500 transition duration-300 ease-in-out">
            See all Sets
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleSet;
