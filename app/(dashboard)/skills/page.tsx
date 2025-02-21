import React from "react";
import { getTechnologies } from "@/lib/actions/skills.action";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";

import SkillTable from "@/app/components/SkillTable";
import { Technology } from "@prisma/client";

const Page = async () => {
	const data = await getTechnologies();
	const skills = JSON.parse(JSON.stringify(data)) as Technology[];


	if (skills.length === 0) {
		return (
			<div
				className={
					"flex flex-col items-center justify-center min-h-screen text-xl"
				}>
				<h1 className={"text-neutral-800 dark:text-neutral-200 font-semibold"}>
					No skills found
				</h1>
				<Link href={"/skills/new"} className={"mt-2"}>
					<Button color={"primary"} size={"lg"} className={""}>
						Create New Skills
					</Button>
				</Link>
			</div>
		);
	}
	return (
		<div>
			<MaxWidthWrapper>
				<div>
					<h3 className={"text-2xl text-black dark:text-white"}>Skills</h3>

					<SkillTable skill={skills} />
					<Link href={"/skills/new"} className={""}>
						<Button color={"primary"} size={"md"} className={"mt-2"}>
							Create New Skill
						</Button>
					</Link>
				</div>
			</MaxWidthWrapper>
		</div>
	);
};
export default Page;
