import ProjectForm from "@/app/components/ProjectForm";
import { getSkills } from "@/lib/actions/skills.action";

interface pageProps {}

const page = async ({}: pageProps) => {
	const data = await getSkills();
	const skills = JSON.parse(JSON.stringify(data));
	return (
		<div>
			<ProjectForm type="create" skills={skills} />
		</div>
	);
};

export default page;
