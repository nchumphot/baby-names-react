import { useState } from "react";
import unsortedBabyNames from "../babyNamesData.json";

interface IBabyName {
  id: number;
  name: string;
  sex: string;
}

export function MainContent(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [favourites, setFavourites] = useState<IBabyName[]>([]);
  const [sexFilter, setSexFilter] = useState<string>("All");
  const sexFilterOptions = ["All", "Girls", "Boys"];

  // Sort baby names alphabetically
  const allBabyNames = unsortedBabyNames.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  // Return a normal button of baby name
  const BabyNameButton = (babyName: IBabyName): JSX.Element => {
    return (
      <button
        key={babyName.id}
        type="button"
        className={
          babyName.sex.toLowerCase() === "m" ? "button-male" : "button-female"
        }
        onClick={() => setFavourites((favourites) => [...favourites, babyName])}
      >
        {babyName.name}
      </button>
    );
  };

  // Return a 'favourite' button
  const FavouriteButton = (babyName: IBabyName): JSX.Element => {
    const returnArray = favourites.filter((item) => item !== babyName && item);
    return (
      <button
        key={babyName.id}
        type="button"
        className={
          babyName.sex.toLowerCase() === "m" ? "button-male" : "button-female"
        }
        onClick={() => setFavourites(returnArray)}
      >
        {babyName.name}
      </button>
    );
  };

  const SearchBar = (): JSX.Element => {
    return (
      <>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            console.log("My search is:", e.target.value);
          }}
          placeholder="Search..."
        ></input>
      </>
    );
  };

  const radioButton = (item: string): JSX.Element => {
    return (
      <>
        <input
          type="radio"
          name="sex-filter"
          value={item}
          id={item}
          checked={sexFilter === item}
          onChange={(e) => setSexFilter(e.target.value)}
        />
        <label htmlFor={item}>{item}</label>
      </>
    );
  };

  return (
    <>
      <h1>Baby Name Selector</h1>
      <SearchBar />
      {sexFilterOptions.map(radioButton)}
      <br />
      <br />
      {favourites.length === 0 ? (
        <h2>Select your favourite baby names and they will appear here.</h2>
      ) : (
        <h2>Favourites:</h2>
      )}
      {favourites
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
        .map(FavouriteButton)}
      {favourites.length !== 0 && (
        <p>To remove names from Favourites, simply click it again.</p>
      )}
      {favourites.length === 0 && <br />}
      <hr />
      {allBabyNames
        .filter((item) => {
          // filter by search
          if (search === "") {
            return item;
          } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
            return item;
          } else {
            return null;
          }
        })
        .filter((item) => {
          // do not show favourite names
          return !favourites.includes(item) && item;
        })
        .filter((item) => {
          // filter by sex
          if (sexFilter === "All") {
            return item;
          } else if (sexFilter === "Girls") {
            return item.sex.toLowerCase() === "f" && item;
          } else if (sexFilter === "Boys") {
            return item.sex.toLowerCase() === "m" && item;
          } else {
            return null;
          }
        })
        .map(BabyNameButton)}
      <hr />
    </>
  );
}
