"use client"
import { IoSearch } from "react-icons/io5";
import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import searchItems from "./searchItems";

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

const SearchBar = () => {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-44 h-10 border-0 font-body text-gray-500 tracking-wider rounded-3xl flex    justify-start gap-3 bg-bgColor sm:w-72"
                >
                    <IoSearch className="text-xl" />
                    {value
                        ? searchItems.find((framework) => framework.value === value)?.label
                        : "Search fuel..."}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-72 p-0 font-body">
                <Command className='bg-bgColor'>
                    <CommandInput placeholder="Search fuel..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No Results found.</CommandEmpty>
                        <CommandGroup>
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