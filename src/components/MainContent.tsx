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

  const [namesToShow, setNamesToShow] = useState<IBabyName[]>(allBabyNames);

  // Return a button of baby name
  function BabyNameButton(babyName: IBabyName): JSX.Element {
    return (
      <button
        className={babyName.sex === "m" ? "button-male" : "button-female"}
      >
        {babyName.name}
      </button>
    );
  }

  function SearchBar(): JSX.Element {
    return (
      <>
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setNamesToShow(filterByName(allBabyNames, e.target.value));
            console.log("My search is:", e.target.value);
          }}
          placeholder="Search names"
        ></input>
      </>
    );
  }

  function filterByName(allNames: IBabyName[], search: string): IBabyName[] {
    const namesToShow = [];
    for (const item of allNames) {
      if (item.name.toLowerCase().includes(search.toLowerCase())) {
        namesToShow.push(item);
      }
    }
    return namesToShow;
  }

  return (
    <>
      <h1>Baby Name Selector</h1>
      <SearchBar />
      <br />
      <br />
      {namesToShow.map(BabyNameButton)}
    </>
  );
}
