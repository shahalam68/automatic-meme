import Modal from "@/components/Modal";
import { useSets } from "@/hook/useSets";
import { QueryKeys } from "@/models/enums";
import { getAllSets } from "@/service/pokemon.service";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { useState } from "react";

import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export const getStaticProps: GetStaticProps<{
  dehydratedState: DehydratedState;
}> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.sets],
    queryFn: async () => {
      const sets = await getAllSets();
      return sets;
    },
  });

  return { props: { dehydratedState: dehydrate(queryClient) }, revalidate: 30 };
};

const SetList = (props: {item:PokemonTCG.Set}) => {
  const { data: sets, isLoading, isError } = useSets();
  const sortedSets = sets?.slice().sort((a: Set, b: Set) => {
    const dateA = new Date(a.releaseDate);
    const dateB = new Date(b.releaseDate);
    return dateB.getTime() - dateA.getTime();
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedSet, setSelectedSet] = useState< any>(null);

  const handleModalOpen = (set:any) => {
    setShowModal(true);
    setSelectedSet(set);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedSet(null);
  };

  return (
    <div className="px-3 flex flex-wrap gap-6 mt-4 justify-center">
      {isLoading && "Loading.."}
      {sortedSets?.map((set: Set) => {
        return (
          <div key={set.id} className="w-1/5 p-5 shadow-xl">
            <Link href={`sets/${set.id}`}>
              <div className="relative w-full h-[100px] mb-4">
                <Image
                  src={set?.images.logo || ""}
                  layout="fill"
                  objectFit="cover"
                  alt="set logo"
                />
              </div>
              <div className="text-center">{set?.name || "loading.."}</div>
            </Link>
            <div className="w-full flex justify-center mt-6">
              <button
                onClick={() => handleModalOpen(set)} // Pass the clicked set to handleModalOpen
                className="border-2 border-yellow-500 hover:border-yellow-500 rounded-lg px-4 py-2 font-bold text-gray-800 hover:bg-yellow-500 transition duration-300 ease-in-out"
              >
                Quick View
              </button>
            </div>
          </div>
        );
      })}
      {showModal && (
        <Modal set={selectedSet} handleModalClose={handleModalClose} />
      )}
      {isError && "Error"}
    </div>
  );
};

export default SetList;
