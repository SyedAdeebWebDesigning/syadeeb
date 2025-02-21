import ProjectForm from "@/app/components/ProjectForm";
import { getTechnologies } from "@/lib/actions/skills.action";

interface pageProps {}

const page = async ({}: pageProps) => {
	const data = await getTechnologies();
	const skills = JSON.parse(JSON.stringify(data));
	return (
		<div>
			<ProjectForm type="create" skills={skills} />
		</div>
	);
};

export default page;
