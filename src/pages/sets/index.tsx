import { useUpdateSetsName } from "@/hook/pokemon-set-hooks";
import { useSets } from "@/hook/useSets";
import { QueryKeys } from "@/models/enums";
import { getAllSets } from "@/service/pokemon.service";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { useState } from "react";

export const getStaticProps: GetStaticProps<{
  dehydratedState: DehydratedState;
}> = async () => {
  console.log("i am server");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.sets],
    queryFn: async () => {
      const sets = await getAllSets();
      return sets;
    },
  });
  console.log("i am server");
  return { props: { dehydratedState: dehydrate(queryClient) }, revalidate: 30 };
};

const SetList = (props: any) => {
  console.log(props);

  const { data: sets, isLoading, isError } = useSets();
  const { mutate: updateName } = useUpdateSetsName();
  const [setName, setSetName] = useState('');

  // Sort the sets data by release date in descending order
  const sortedSets = sets?.slice().sort((a: Set, b: Set) => {
    const dateA = new Date(a.releaseDate);
    const dateB = new Date(b.releaseDate);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="px-3 flex flex-wrap">
      {isLoading && "Loading.."}
      {sortedSets?.map((set: Set) => {
        return (
          <div key={set.id} className="flex px-3 flex-col">
            <Link href={`sets/${set.id}`}>
              <div className="relative w-[100px] h-[100px]">
                <Image src={set?.images.logo || ""} fill alt="set logo" />
              </div>
              <div>{set?.name || "loading.."}</div>
            </Link>
            <div>
              <input
                name="set-name"
                type="text"
                placeholder="Edit Set Name"
                onKeyUp={(e) => {
                  setSetName(e.currentTarget.value);
                }}
              />
              <button
                onClick={() => {
                  if (setName) {
                    updateName({
                      setId: set.id,
                      setName: setName,
                    });
                  }
                }}
              >
                Edit Set Name
              </button>
            </div>
          </div>
        );
      })}
      {isError && "Error"}
    </div>
  );
};

export default SetList;
