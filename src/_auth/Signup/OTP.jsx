"use client"
import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { power } from "@/constants/Images/images"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot, Button
} from "@/components/ui/components"
import Loader from "@/constants/Loading/Loader"
import { useOTPLoginMutation } from "@/lib/tanstack/querys_mutations"

export default function OTP() {


    const { isPending, isError, error, mutateAsync } = useOTPLoginMutation()
    const [otp, setOtp] = React.useState("")

    const submitOTP = () => {
        mutateAsync(otp)
    }


    return (
        <div className="space-y-10">
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

            <div className="space-y-5 flex flex-col items-center">
                <InputOTP
                    maxLength={6}
                    otp={otp}
                    onChange={(otp) => setOtp(otp)}
                    pattern={REGEXP_ONLY_DIGITS}
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                <div className="text-center text-md text-altColor">
                    {otp === "" ? (
                        <>Enter your one-time password.</>
                    ) : (
                        <>You entered: {otp}</>
                    )}
                </div>

                <Button onClick={submitOTP}
                    disabled={isPending}
                    className={`${isPending && 'opacity-50 pointer-events-none'} 'font-icon'`}>
                    Submit
                </Button>

                {
                    isPending && <Loader />
                }
            </div>
        </div>

    )
}
