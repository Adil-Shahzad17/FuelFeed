import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signinValidation } from "../../validation/AuthValidation"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Button,
    Input
} from "@/components/ui/components"
import { power } from "@/constants/Images/images"
import { Link } from "react-router-dom"
import { useLoginMutation } from "@/lib/tanstack/querys_mutations"
import Loader from "@/constants/Loading/Loader"

export default function Signin() {

    const { isPending, isError, error, mutateAsync } = useLoginMutation()

    const form = useForm({
        resolver: zodResolver(signinValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // Submit Form
    const onSubmit = (data, e) => {
        e.preventDefault();
        mutateAsync(data)
    };


    return (

        <div className="w-full max-w-[500px] px-4 flex flex-col gap-4">

            <div className="flex flex-col gap-3 items-center text-center">
                <img src={power} alt="Fuel Feed" width="60px" height="60px" />
                <h1 className="text-4xl font-bold font-title">
                    Welcome to <span
                        className="inline-block font-icon text-mainColor font-semibold text-6xl">Fuel Feed</span></h1>
                <p className="text-md text-altColor">
                    Login to your Fuel Feed account
                </p>
                {
                    isError && <p className="text-md text-mainColor">
                        {error.message}
                    </p>
                }
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="your@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a strong password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit"
                        className={`w-full dark:text-white bg-mainColor mt-5 
                                            ${isPending ? 'opacity-50 pointer-events-none' : ''}`}

                        disabled={isPending} >
                        Login
                    </Button>
                </form>

            </Form>
            <div className="text-center text-sm font-body mx-auto">
                Don&apos;t have an account?{" "}
                <Link to="/_auth/signup" className="underline underline-offset-4">
                    Sign up
                </Link>

                {
                    isPending && <Loader className="mt-5" />
                }
            </div>
        </div>
    )
}