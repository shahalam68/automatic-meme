

import { useUpdateSetName } from "@/hook/pokemon-set-hooks";
import { useSet } from "@/hook/useSet";
import { useSets } from "@/hook/useSets";
import { QueryKeys } from "@/models/enums";
import { getAllSets, getSetById } from "@/service/pokemon.service";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { useEffect, useState } from "react";

export const getStaticPaths: GetStaticPaths = async (context) => {
  let allSets = await getAllSets();
  let listOfSetIdObjects = allSets.map((x) => {
    return { params: { setId: x.id } };
  });

  return { paths: listOfSetIdObjects.splice(0, 10), fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<{
  dehydratedState: DehydratedState;
}> = async ({ params }) => {
  const setId = params?.setId as string;
  console.log("I am server");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.set, setId],
    queryFn: async () => {
      const set = await getSetById(setId);
      // console.log(set);
      return set;
    },
  });
  console.log("I am server");
  return { props: { dehydratedState: dehydrate(queryClient) }, revalidate: 30 };
};

const SetPage = (props: any) => {
  console.log(props);
  // Router.params.setid
  // console.log(props);

  const router = useRouter();
  const {
    data: set,
    isLoading,
    isError,
  } = useSet(router?.query?.setId as string);
  const { mutate: updateName } = useUpdateSetName();
  const [setName, setSetName] = useState(set?.name);
  console.log(set);

  return (
    <div className="px-3 flex flex-wrap">
      {isLoading && "Loading.."}
      {!isLoading && !isError && !set && "Set not found"}
      {set && (
        <div className="flex px-3 flex-col">
          <div className="relative w-[100px] h-[100px]">
            <Image src={set?.images?.logo || ""} fill alt="set logo" />
          </div>
          <div>{set.name || "Loading.."}</div>
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
                    setId: router.query.setId as string,
                    setName: setName,
                  });
                }
              }}
            >Edit Set Name</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetPage;
