import { useState } from "react"
import { IoIosArrowDropdownCircle } from "react-icons/io";

interface SelectProps {
    value?: any
    placeholder: string
    onChange: (value: any) => void
    data: any[]
}

const Select = ({ value, placeholder, onChange, data }: SelectProps) => {
    const [openSelect, setOpenSelect] = useState(false)
    return (
        <div className="relative w-24  rounded-lg  dark:hover:bg-custom-gray-hover hover:bg-leight-foreground cursor-pointer transform duration-300" >
            <div className="relative w-full flex flex-row justify-between items-center p-2"
             onClick={() => setOpenSelect(prev => !prev)}>
                <p className="relative text  select-none"  >
                    {
                        value ? value.item : placeholder
                    }
                </p>
                <IoIosArrowDropdownCircle className="relative text-dark dark:text-white transform duration-300" style={{rotate: openSelect ? "180deg" : "0deg"}} />
            </div>
            {
                openSelect &&
                <div className="absolute top-12 divide-y divide-custom-gray-border w-24 max-h-60  z-105 rounded-lg border border-custom-gray-border overflow-hidden">
                    {
                        data.map(item => 
                            <div key={item.id} className="relative w-full p-3 dark:bg-custom-gray bg-leight-foreground cursor-pointer dark:hover:bg-custom-gray-hover hover:bg-leight duration-150"  onClick={() => {
                                onChange(item)
                                setOpenSelect(false)
                            }} style={{background : value.id == item.id ? "dark" : "custom-gray"}}>
                                    <p>{item.item}</p>
                                </div>
                        )
                    }
                </div>
            }
        </div>
    )
}

export default Select