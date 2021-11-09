import { useState } from "react";
import unsortedBabyNames from "../babyNamesData.json";

interface IBabyName {
    id: number,
    name: string,
    sex: string
}

// Sort baby names alphabetically
const babyNames = unsortedBabyNames.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

function BabyNameButton(babyName: IBabyName): JSX.Element {
    return (
        <button>{babyName.name}</button>
    );
}

export function MainContent(): JSX.Element {
    return(
        <>
            <h1>Baby Name Selector</h1>
            {babyNames.map(BabyNameButton)}
        </>
    )
}
