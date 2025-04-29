import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { power } from "@/constants/Images/images"
import { formSchema } from "../../validation/AuthValidation"
import { Link, useNavigate } from "react-router-dom"
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
import { useDispatch } from "react-redux"
import { draftLogin } from "@/lib/store/authSlice"

export default function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            sellPrivacy: false
        },
    })

    const onSubmit = (data) => {
        dispatch(draftLogin(data))
        console.log(data);
        navigate("/_auth/otp");
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
                                    <Input placeholder="prototype-17" {...field} />
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

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Confirm your Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
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

                    <Button type="submit" className="w-full bg-mainColor mt-5">Login</Button>
                </form>

            </Form>
            <div className="text-center text-sm font-body">
                Already have an account?{" "}
                <Link to="/_auth/signin" className="underline underline-offset-4">
                    Sign in
                </Link>
            </div>
        </div>
    )
}
