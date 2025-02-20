import { getProjects } from "@/lib/actions/projects.action";
import { Link } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import ProjectTable from "@/app/components/ProjectTable";

interface pageProps {}

const page = async ({}: pageProps) => {
	const data = await getProjects();
	const projects = JSON.parse(JSON.stringify(data));

	if (projects.length === 0) {
		return (
			<div
				className={
					"flex flex-col items-center justify-center min-h-screen text-xl"
				}>
				<h1 className={"text-neutral-800 dark:text-neutral-200 font-semibold"}>
					No projects found
				</h1>
				<Link href={"/projects/new"} className={"mt-2"}>
					<Button color={"primary"} size={"lg"} className={"text-white"}>
						Create New Projects
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<MaxWidthWrapper>
			<div>
				<h3 className={"text-2xl text-black dark:text-white"}>Skills</h3>
				<ProjectTable project={projects} />
				<Link href={"/projects/new"} className={""}>
					<Button color={"primary"} size={"md"} className={"mt-2 text-white"}>
						Create New Project
					</Button>
				</Link>
			</div>
		</MaxWidthWrapper>
	);
};

export default page;
