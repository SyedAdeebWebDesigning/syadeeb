import React from 'react'
import {getExperiences} from "@/lib/actions/experience.action";
import {Experience} from "@prisma/client";
import Link from "next/link";
import {Button} from "@nextui-org/button";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import ExperienceTable from "@/app/components/ExperienceTable";

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
        <div>
            <MaxWidthWrapper>
                <div>
                    <h3 className={'text-2xl text-black dark:text-white'}>Experience</h3>

                    <ExperienceTable experience={experience}/>
                    <Link href={'/experience/new'} className={''}>
                        <Button color={'primary'} size={'md'} className={'mt-2'}>Create
                            New Experience</Button>
                    </Link>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}
export default Page
