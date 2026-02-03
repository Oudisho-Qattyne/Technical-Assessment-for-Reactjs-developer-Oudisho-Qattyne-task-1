
interface SearchProps  {
    value:string,
    onChange : (search:string) => any
    doSearch : () => void
}
import { CiSearch } from "react-icons/ci";

const Search = ({value , onChange , doSearch} : SearchProps) => {
    
    return(
        <div className="relative w-full h-7 flex flex-row justify-center items-center rounded-md overflow-hidden border border-custom-gray-border">
            <input className="relative w-full border-custom-gray p-1" placeholder="search" value={value} onChange={e => {onChange(e.target.value);
            }}/>
            <button className="relative h-full aspect-square flex justify-center items-center bg-leight hover:bg-custom-gray-hover dark:bg-custom-gray  border border-custom-gray-border cursor-pointer duration-150" onClick={doSearch}>
                <CiSearch className="relative text-custom-gray-border"/>
            </button>
        </div>
    )
}

export default Search