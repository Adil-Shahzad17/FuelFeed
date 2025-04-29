"use client"
import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { power } from "@/constants/Images/images"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot, Button
} from "@/components/ui/components"
import { useSelector } from "react-redux"

export default function OTP() {
    const [value, setValue] = React.useState("")

    const auth = useSelector((state) => state.auth)
    console.log(auth);

    const submitOTP = () => {
        console.log(value);
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
            </div>

            <div className="space-y-5 flex flex-col items-center">
                <InputOTP
                    maxLength={6}
                    value={value}
                    onChange={(value) => setValue(value)}
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
                    {value === "" ? (
                        <>Enter your one-time password.</>
                    ) : (
                        <>You entered: {value}</>
                    )}
                </div>

                <Button onClick={submitOTP}>
                    Submit
                </Button>
            </div>
        </div>

    )
}
