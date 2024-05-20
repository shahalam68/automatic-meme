interface PokemonTCG {
    id: string;
    images: {
      logo: string;
      symbol: string;
    },
    legalities: {
      unlimited: string;
    },
    name: string;
    printedTotal: number;
    ptcgoCode: string;
    releaseDate: string;
    series: string;
    total: number;
    updatedAt: string;
  }