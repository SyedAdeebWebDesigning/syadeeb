import React from 'react'
import {getExperiences} from "@/lib/actions/experience.action";
import {Experience} from "@prisma/client";
import Link from "next/link";
import {Button} from "@nextui-org/button";

const Page = async () => {
    const data = await getExperiences()
    const experience = JSON.parse(JSON.stringify(data)) as Experience[]

    if (experience.length === 0) {
        return (
            <div className={'flex flex-col items-center justify-center min-h-screen text-xl'}>
                <h1 className={'text-neutral-800 dark:text-neutral-200 font-semibold'}>No experience found</h1>
                <Link href={'/experience/new'} className={'mt-2'}>
                    <Button color={'primary'} size={'lg'} className={''}>Create
                        New Experience</Button>
                </Link>
            </div>
        )
    }
    return (
        <div>Page</div>
    )
}
export default Page
