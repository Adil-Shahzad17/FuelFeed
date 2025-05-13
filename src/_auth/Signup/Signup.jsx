import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { power } from "@/constants/Images/images"
import { signupValidation } from "../../validation/AuthValidation"
import { Link } from "react-router-dom"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Button,
    Input,
    Checkbox,
} from "@/components/ui/components"
import { useSigninMutation } from "@/lib/tanstack/querys_mutations"
import Loader from "@/constants/Loading/Loader"

export default function Signup() {

    const { mutateAsync, error, isError, isPending } = useSigninMutation()

    const form = useForm({
        resolver: zodResolver(signupValidation),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            sellPrivacy: false
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
                        className="inline-block font-icon text-mainColor font-normal text-6xl">Fuel Feed</span></h1>
                <p className="text-md text-altColor">
                    Create your account now, fill in to get started.
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
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >User Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="prototype-17" {...field} autoComplete="name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="your@email.com" {...field} autoComplete="email" />
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
                                    <Input placeholder="Enter a strong password" {...field} autoComplete="current-password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Confirm your Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} autoComplete="new-password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="sellPrivacy"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <div className="flex gap-3 mt-5">
                                    <FormControl>
                                        <Checkbox id="terms" {...field}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className='dark:border dark:border-white' />
                                    </FormControl>
                                    <FormLabel className="text-sm pt-[1px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ">
                                        I consent to surrender my privacy to this corporation.
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit"
                        className={`w-full dark:text-white bg-mainColor mt-5 
                        ${isPending ? 'opacity-50 pointer-events-none' : ''}`}

                        disabled={isPending} >
                        Sign up
                    </Button>
                </form>

            </Form>
            <div className="text-center text-sm font-body mx-auto">
                Already have an account?{" "}
                <Link to="/_auth/signin" className="underline underline-offset-4">
                    Sign in
                </Link>

                {
                    isPending && <Loader className="mt-5" />
                }

            </div>


        </div>
    )
}
