import { useSets } from "@/hook/useSets";
import { QueryKeys } from "@/models/enums";
import { getAllSets } from "@/service/pokemon.service";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

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

  // Sort the sets data by release date in descending order
  const sortedSets = sets?.slice().sort((a: Set, b: Set) => {
    const dateA = new Date(a.releaseDate);
    const dateB = new Date(b.releaseDate);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="px-3 flex flex-wrap gap-3 justify-center ">
      {isLoading && "Loading.."}
      {sortedSets?.map((set: Set) => {
        return (
          <div key={set.id} className="w-1/5 px-3 ">
            <Link href={`sets/${set.id}`}>
              <div className="relative w-full h-[100px] mb-4 ">
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
              <button className="border-2 border-yellow-500 hover:border-yellow-500 rounded-lg px-4 py-2 font-bold text-gray-800 hover:bg-yellow-500 transition duration-300 ease-in-out">
                Quick View
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
