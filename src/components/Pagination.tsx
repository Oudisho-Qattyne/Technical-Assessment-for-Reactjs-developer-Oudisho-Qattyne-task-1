import { useEffect, useState } from "react";

interface PaginationInterface {
    links: string;
    onSelect: (page: number) => void;
    pageNumber: number
}


const Pagination = ({ links, onSelect, pageNumber }: PaginationInterface) => {
    const [prev, setPrev] = useState<number>(0)
    const [next, setNext] = useState<number>(0)
    const [firstPages, setFirstPages] = useState<number[]>([])
    const [pages, setPages] = useState<number[]>([])

    const checkForInCommon = (firstArray: number[], secondArray: number[]) => {
        for (const number of firstArray) {
            for (const number2 of secondArray) {
                if (number == number2) {
                    return true
                }
            }
        }
        return false
    }

    const handlePages = (prev: number, next: number) => {
        let pages = []
        let firstPages = [1, 2, 3]

        if (prev > 0) {
            pages.push(prev)

            console.log(pageNumber);

        }
        pages.push(pageNumber)
        if (next > 0) {
            pages.push(next)
        }
        if (checkForInCommon(pages, firstPages)) {

            const uniqueToFirstPages: number[] = pages.filter(item => !firstPages.includes(item));

            const newPages = firstPages.concat(uniqueToFirstPages)
            console.log(newPages);
            setFirstPages([])
            pages = newPages
        }
        else {
            setFirstPages(firstPages)
        }

        setPages(pages)
    }


    useEffect(() => {
        let prev = 0
        let next = 0
        switch (typeof (links)) {
            case "string":
                const pagination = links.split(',');
                for (const link of pagination) {

                    const [url, rel] = link.split(";")
                    const match = url.replace("per_page", "").match(/page=(\d+)/);
                    const page_number = match ? parseInt(match[1]) : 1;
                    if (rel.includes("next")) {
                        next = page_number
                        setNext(page_number)
                    }
                    else if (rel.includes("prev")) {
                        prev = page_number
                        setPrev(page_number)
                    }
                }
                break
        }
        handlePages(prev, next)
    }, [pageNumber])


    return (
        <div className="relative flex justify-evenly items-center p-3">
            <button className="relative text-sm py-2 px-3 rounded-lg dark:hover:bg-custom-gray-hover hover:bg-leight select-none cursor-pointer duration-150 disabled:text-secondary disabled:cursor-not-allowed dark:disabled:hover:bg-dark disabled:hover:bg-leight" disabled={prev == 0} onClick={() => onSelect(prev)}>&lt; Previous</button>
            <div className="relative flex justify-center items-center gap-3">
                {
                    firstPages?.map(page =>
                        <button className="relative text-sm py-2 px-3 rounded-lg dark:hover:bg-custom-gray-hover hover:bg-leight select-none cursor-pointer duration-150 disabled:text-secondary disabled:cursor-not-allowed dark:disabled:hover:bg-dark disabled:hover:bg-leight" disabled={next == 0} onClick={() => onSelect(page)} style={page == pageNumber ? { background: "var(--color-blue-700)", color: "white" } : {}}>{page}</button>
                    )
                }
                {
                    firstPages.length > 0 && <p>...</p>
                }
                {
                    pages?.map(page =>
                        <button className="relative text-sm py-2 px-3 rounded-lg dark:hover:bg-custom-gray-hover hover:bg-leight select-none cursor-pointer duration-150 disabled:text-secondary disabled:cursor-not-allowed dark:disabled:hover:bg-dark disabled:hover:bg-leight" disabled={next == 0} onClick={() => onSelect(page)} style={page == pageNumber ? { background: "var(--color-blue-700)", color: "white" } : {}}>{page}</button>
                    )
                }
            </div >
            <button className="relative text-sm py-2 px-3 rounded-lg dark:hover:bg-custom-gray-hover hover:bg-leight select-none cursor-pointer duration-150 disabled:text-secondary disabled:cursor-not-allowed dark:disabled:hover:bg-dark disabled:hover:bg-leight" disabled={next == 0} onClick={() => onSelect(next)}>Next &gt;</button>
        </div >
    )
}

export default Pagination