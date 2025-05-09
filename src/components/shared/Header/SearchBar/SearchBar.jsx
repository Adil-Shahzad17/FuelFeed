"use client"
import { IoSearch } from "react-icons/io5";
import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Button, Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/components"
import searchItems from "./searchItems";
import { useAllPostsQuery } from "@/lib/tanstack/querys_mutations";


const SearchBar = () => {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const { refetch } = useAllPostsQuery(value)

    React.useEffect(() => {
        refetch()
    }, [value])

    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-44 h-10 border-0 font-body text-gray-500 tracking-wider rounded-3xl flex justify-start gap-3 bg-bgColor sm:w-72 dark:bg-dark_hoverColor dark:text-white"
                >
                    <IoSearch className="text-xl" />
                    {value
                        ? searchItems.find((framework) => framework.value === value)?.label
                        : "Search fuel..."}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-72 p-0 font-body">
                <Command className='bg-bgColor dark:bg-dark_hoverColor dark:text-white'>
                    <CommandInput placeholder="Search fuel..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No Results found.</CommandEmpty>
                        <CommandGroup className='dark:text-white'>
                            {searchItems.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {framework.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default SearchBar