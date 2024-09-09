import { useEffect, useState } from 'react';

const quotes = [
  "After all, tomorrow is another day.",
  "Fear is the mind killer",
  "Carpe diem. Seize the day, boys. Make your lives extraordinary",
  "Life is like a box of chocolates, you never know what you're gonna get.",
  "You never really understand a person until you consider things from his point of view... Until you climb inside of his skin and walk around in it",
  "There's no place like home.",
  "Our lives are defined by opportunities, even the ones we miss.",
  "It's only after we've lost everything that we're free to do anything.",
  "Kindness isn't weakness, but strength.",
  "Great men are not born great, they grow great.",
  "I have always depended on the kindness of strangers",
  "You don't need a compass to find your direction in life.",
  "May the odds be ever in your favor.",
  "Life is not the amount of breaths you take. It's the moments that take your breath away.",
  "Dreams feel real while we're in them. It's only when we wake up that we realize something was actually strange.",
  "I'm not afraid of storms, for I'm learning how to sail my ship.",
  "Happiness can be found even in the darkest of times if only one remembers to turn on the light.",
  "I feel on the verge of madness or greatness",
  "Our survival instinct is our greatest source of inspiration.",
  "The greatest trick the devil ever pulled was convincing the world he didn't exist."
];

const sources = [
  "Gone with the Wind", "Dune", "Dead Poets Society",
  "Forrest Gump", "To Kill a Mockingbird", "The Wizard of Oz",
  "The Curious Case of Benjamin Button", "Fight Club", "Cinderella",
  "The Godfather", "A Streetcar Named Desire",
  "North Star", "The Hunger Games", "Hitch",
  "Inception", "Little Women", "Harry Potter and The Prisoner of Azkaban",
  "American Psycho", "Interstellar", "The Usual Suspect"
];

const years = [
  1950, 2020, 1989, 1994, 1962, 1939, 2008, 1999, 2021, 1972,
  1951, 2022, 2012, 2005, 2010, 2019, 2004, 2000, 2014, 1995
];

type QuoteData = {
  index: number;
  quote: string;
  source: string;
  year: number;
};

const getRandomQuote = (): QuoteData => {
  const rand = Math.floor(Math.random() * quotes.length);
  return {
    index: rand,
    quote: quotes[rand],
    source: sources[rand],
    year: years[rand],
  };
};

const Quote = () => {
  const [quoteData, setQuoteData] = useState<QuoteData>(getRandomQuote());

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteData(getRandomQuote());
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-5">
      <h1 className="xl:text-3xl md:text-2xl sm:text-xl lg:text-3xl text-center max-w-100 text-white">{quoteData.quote}</h1>
      <p className="text-2xl mt-2 text-center bg-gradient-to-r from-blue-100 to-indigo-500 text-transparent bg-clip-text">
        {quoteData.source} ({quoteData.year})
      </p>
    </div>
  );
};

export default Quote;
