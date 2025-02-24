import HeroSection from "@/app/components/HeroSection";
import NavBar from "@/app/components/NavBar";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { Experience } from "@/app/components/Experience";
import Heading from "@/app/components/Heading";
import { Projects } from "@/app/components/Projects";
import RedirectToDashboard from "@/app/components/redirectToDashboard";
import Skills from "@/app/components/Skills";
import Contact from "@/app/components/Contact";
import { getExperiences } from "@/lib/actions/experience.action";
import { getProjects } from "@/lib/actions/projects.action";

export default async function Home() {
	const data = await getExperiences();
	const experience = JSON.parse(JSON.stringify(data));

	const projectData = await getProjects();
	const projects = JSON.parse(JSON.stringify(projectData));
	return (
		<>
			<div className={"fixed right-2 bottom-2 z-[999]"}>
				<RedirectToDashboard />
			</div>
			<section className="border-b border-black/10 dark:border-white/10 sticky top-0 text-black dark:text-white z-[999]">
				<NavBar />
			</section>
			<section id={"#hero"} className="overflow-x-hidden">
				<HeroSection />
			</section>
			<section id="experience" className={""}>
				<MaxWidthWrapper>
					<div className={""}>
						<Heading text={"Experience"} id={"Experience"} />
					</div>
					<Experience timeline={experience} />
				</MaxWidthWrapper>
			</section>
			<section id="projects">
				<MaxWidthWrapper>
					<div>
						<Heading text={"Projects"} id={"Projects"} />
					</div>
					<Projects projects={projects} />
				</MaxWidthWrapper>
			</section>
			<section id="skills">
				<MaxWidthWrapper>
					<div>
						<Heading text={"Skills"} id={"Skills"} />
					</div>
					<Skills />
				</MaxWidthWrapper>
			</section>
			<section id="contact" className={"pb-10"}>
				<MaxWidthWrapper>
					<div>
						<Heading text={"Contact"} id={"Contact"} />
					</div>
					<Contact />
				</MaxWidthWrapper>
			</section>
		</>
	);
}
