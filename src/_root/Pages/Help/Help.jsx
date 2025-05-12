import React from 'react'
import { about1, about2, about3 } from '@/constants/Images/images'
import { Separator } from '@/components/ui/components'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/components"

const Help = () => {
    return (
        <div className="h-screen w-full mx-auto p-2 pb-8 flex flex-col gap-3 overflow-y-auto">

            <div className="flex flex-col gap-5 items-center py-5 ">
                <img
                    src={about3}
                    alt="Follow That Dream"
                    className="w-full h-52 object-cover rounded-lg shadow-md shadow-gray-500"
                />

                <h1 className="text-3xl md:text-4xl text-center font-bold font-heading text-gray-900 mt-3 dark:text-white">
                    Our Mission

                </h1>
                <p className="text-gray-600 font-body text-center dark:text-white">
                    Our mission is to build a digital space where motivation fuels action. We believe in a social media experience that uplifts, inspires, and empowers people to become their best selves.
                </p>

                <Separator />

                <img
                    src={about1}
                    alt="Follow That Dream"
                    className="w-full h-full object-cover rounded-lg shadow-md shadow-gray-500"
                />

                <h2 className="text-3xl md:text-4xl text-center font-bold font-heading text-gray-900 mt-3 dark:text-white">
                    About Us
                </h2>
                <h3 className="text-xl font-bold font-heading text-mainColor">
                    Welcome to the anti-doomscrolling revolution.
                </h3>

                <p className="text-gray-600 mb-4 font-body dark:text-white">
                    Our platform was built on a simple yet powerful idea: social media shouldn’t waste your time—it should change your life. In an online world overwhelmed by meaningless content and attention-seeking posts, we’ve created a space that exists solely to motivate, inspire, and energize.
                    <br />
                    <br />
                    We are a visual-first social media platform where only motivational images and content related to self-improvement, discipline, productivity, and personal growth are allowed. No drama. No clickbait. No distractions. Just pure, positive fuel to get you moving.
                    <br />
                    <br />
                    But that’s not all—we’ve built in a unique feature to make sure this platform doesn’t become just another time sink. Once you close the app, you’ll be restricted from accessing it for 2 hours, giving you the space to take action on the inspiration you just received. There’s also a 20-minute grace period in case you closed it by accident or had to deal with something important. After that, it’s time to get off the screen and get into your life.
                    <br />
                    <br />
                    We’re not here to keep you scrolling. We’re here to spark something real.
                    <br />
                    Whether you're building better habits, chasing a goal, or just need a push to get back on track—our community is here to lift you up, one picture at a time.
                    <br />
                    <br />
                    Welcome to your new feed.
                    <br />
                    Welcome to FuelFeed.
                    <br />
                    Let’s grow—then go.
                </p>
            </div>

            <Separator />

            <h4 className="text-2xl font-bold font-heading text-mainColor">
                FAQ's
            </h4>

            <Accordion type="single" collapsible className="w-full dark:text-white flex flex-col gap-5 pb-5">
                <AccordionItem value="item-1">
                    <AccordionTrigger className='font-heading font-bold'> Why would people close this app if it's just like other social media platforms?</AccordionTrigger>
                    <AccordionContent className='font-body '>
                        Because unlike typical social media, our platform is designed to ignite a spark, not drain your time. People naturally leave once they've seen enough motivating content—they feel inspired to take action in real life instead of endlessly scrolling.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className='font-heading font-bold'> Why does the app restrict access for 2 hours after closing?</AccordionTrigger>
                    <AccordionContent className='font-body '>
                        To help users avoid falling into the trap of doomscrolling. Motivation should lead to movement, not mindless consumption. The restriction gives you space to act on what inspired you.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className='font-heading font-bold'> For how long will I be restricted after closing the app?</AccordionTrigger>
                    <AccordionContent className='font-body '>
                        You’ll be restricted for 2 hours, but there’s a 20-minute grace window. If you closed the app by mistake or had to attend something urgent, you can reopen it within those 20 minutes. After that, the lock period activates to give you space to reflect and execute on your goals.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className='font-heading font-bold'> Why doesn’t the app show a countdown timer for when I can log in again?</AccordionTrigger>
                    <AccordionContent className='font-body '>
                        Because we don’t want you fixating on when you can scroll again—we want you focused on using that time to do something meaningful. Our goal is to shift your attention from waiting to winning.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Separator />

            <img
                src={about2}
                alt="Follow That Dream"
                className="w-full h-full object-cover rounded-lg shadow-md shadow-gray-500"
            />
            <Separator />

        </div>
    )
}

export default Help