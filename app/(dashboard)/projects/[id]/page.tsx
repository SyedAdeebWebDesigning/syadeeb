import ProjectForm from "@/app/components/ProjectForm";
import { getProject } from "@/lib/actions/projects.action";
import { getTechnologies } from "@/lib/actions/skills.action";

interface pageProps {
	params: {
		id: string;
	};
}

const page = async ({ params }: pageProps) => {
	const { id } = params;
	const data = await getProject(id);
	const project = JSON.parse(JSON.stringify(data));
	const skillsData = await getTechnologies();
	const skills = JSON.parse(JSON.stringify(skillsData));
	return (
		<div>
			<ProjectForm project={project} skills={skills} type="update" />
		</div>
	);
};

export default page;
