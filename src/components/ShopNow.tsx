import React, { useEffect, useState } from 'react';
import { PokemonTCG} from 'pokemon-tcg-sdk-typescript';
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { getAllSets } from '@/service/pokemon.service';
import SingleSet from './SingleSet';

const ShopNow = () => {
  const [sets, setSets] = useState<Set[]>([]);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const allSets = await getAllSets();
        console.log(allSets);
        setSets(allSets);
      } catch (error) {
        console.error('Error fetching sets:', error);
      }
    };
    fetchSets();
  }, []);
  return (
    <div className="w-100 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ml-5">
    {sets.slice(0, 10).map((set) => (
      <SingleSet key={set.id} setProps={set} />
    ))}
  </div>
  );
};

export default ShopNow;
