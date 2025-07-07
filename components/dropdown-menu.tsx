import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { twMerge } from "tailwind-merge"

interface DropdownMenuProps {
    options: { label: string; value: string; description: string }[]
    label: string
    selected: string | null
    setSelected: (value: string) => void
}

export function DropdownMenu({
    options,
    label,
    selected,
    setSelected,
}: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelect = (value: string) => {
        setSelected(value)
        setIsOpen(false)
    }

    return (
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:bg-muted transition-colors rounded-full p-2 pl-3"
            >
                {selected ? options.find((option) => option.value === selected)?.label : label}
                <ChevronDown
                    className={twMerge(
                        "transition-all duration-300 size-4 mt-1",
                        isOpen ? "rotate-180" : "",
                    )}
                    aria-hidden="true"
                />
            </button>

            <div
                className={twMerge(
                    "absolute top-full right-0 bg-card text-card-foreground shadow-lg rounded-xl p-1 max-w-[300px] border border-border transform transition-all duration-200 origin-top animate-in fade-in slide-in-from-top-2",
                    isOpen ? "opacity-100 mt-0" : "opacity-0 invisible -mt-4",
                )}
            >
                <ul>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSelect(option.value)
                                }
                            }}
                        >
                            <button
                                type="button"
                                className="w-full text-left grid p-2 px-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                            >
                                <span className="text-md whitespace-nowrap font-semibold">
                                    {option.label}
                                </span>
                                <span className="text-muted-foreground text-sm whitespace-nowrap">
                                    {option.description}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
