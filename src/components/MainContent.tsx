import { useState } from "react";
import unsortedBabyNames from "../babyNamesData.json";

interface IBabyName {
  id: number;
  name: string;
  sex: string;
}

export function MainContent(): JSX.Element {
  const [search, setSearch] = useState<string>("");

  // Sort baby names alphabetically
  const allBabyNames = unsortedBabyNames.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  // Return a button of baby name
  const BabyNameButton = (babyName: IBabyName): JSX.Element => {
    return (
      <button
        className={
          babyName.sex.toLowerCase() === "m" ? "button-male" : "button-female"
        }
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

  return (
    <>
      <h1>Baby Name Selector</h1>
      <SearchBar />
      <br />
      <br />
      {allBabyNames
        .filter((item) => {
          if (search === "") {
            return item;
          } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
            return item;
          } else {
            return null;
          }
        })
        .map(BabyNameButton)}
    </>
  );
}
