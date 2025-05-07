import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FaShare } from 'react-icons/fa'

const ShareAlert = ({ post }) => {

    console.log(post.$id);


    const [copy, setCopy] = React.useState('false')
    const ref = React.useRef(null)

    const copyLink = () => {
        if (ref.current && ref.current.value) {
            navigator.clipboard.writeText(ref.current.value)
                .then(() => {
                    console.log(ref.current.value);
                    setCopy(!copy)
                })
        }
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="px-2 flex items-center space-x-4 font-body text-base font-medium hover:bg-gray-100 p-2 rounded cursor-pointer dark:hover:bg-dark_hoverColor">
                    <FaShare size={24} />
                    <span>Share</span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md dark:bg-dark_bgColor dark:text-white">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this post.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={post.$id}
                            readOnly
                            ref={ref}
                        />
                    </div>
                    <Button type="text" size="sm" className={`px-3 ${!copy && 'bg-hoverColor'}`}
                        onClick={() => copyLink()}>
                        {
                            copy ? <>
                                <span className="sr-only">Copy</span>
                                <Copy />
                            </> :
                                <>
                                    <span className="sr-only">Copy</span>
                                    <Check color='black' />
                                </>
                        }

                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ShareAlert