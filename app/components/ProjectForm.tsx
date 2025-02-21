"use client";

import { Project, Technology } from "@prisma/client";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	Button,
	Input,
	CheckboxGroup,
	Checkbox,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	ModalContent,
} from "@nextui-org/react";
import { addProjects, updateProject } from "@/lib/actions/projects.action";
import Image from "next/image";

interface ProjectFormProps {
	type: "create" | "update";
	skills: Technology[];
	project?: Project & { technologies: string[] };
}

const ProjectForm = ({ type, skills, project }: ProjectFormProps) => {
	const router = useRouter();

	// ✅ State for form fields
	const [title, setTitle] = useState(project?.title || "");
	const [description, setDescription] = useState(project?.description || "");
	const [ctaText, setCtaText] = useState(project?.ctaText || "");
	const [ctaLink, setCtaLink] = useState(project?.ctaLink || "");
	const [arrayTechnologies, setArrayTechnologies] = useState<string[]>([]);
	const [image, setImage] = useState<string | null>(project?.image || null);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// ✅ Ensure technologies are pre-selected for update mode
	useEffect(() => {
		if (type === "update" && project?.technologies) {
			setArrayTechnologies([...project.technologies]); // ✅ Ensuring state updates properly
		}
	}, [type, project]);

	console.log(arrayTechnologies);

	// ✅ Convert image file to Base64 string
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	// ✅ Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const projectData = {
				title,
				description,
				image: image || "", // Ensure image is not null
				ctaText,
				ctaLink,
				technologies: arrayTechnologies, // ✅ Store selected technology IDs
			};

			console.log("Submitted Data:", projectData);

			if (type === "create") {
				await addProjects(projectData);
				// Reset form
				setTitle("");
				setDescription("");
				setCtaText("");
				setCtaLink("");
				setArrayTechnologies([]);
				setImage(null);
			} else if (type === "update" && project?.id) {
				await updateProject(projectData, project.id);
			}

			// Redirect to projects page
			router.push("/projects");
		} catch (error) {
			console.error("Error submitting project:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<MaxWidthWrapper>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center justify-center min-h-screen space-y-4">
				<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
					<Input
						label="Project Title"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="bg-neutral-100 dark:bg-neutral-800 rounded-xl text-black dark:text-white"
						color="default"
						variant="bordered"
						required
					/>
					<Input
						label="Project Description"
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="bg-neutral-100 dark:bg-neutral-800 rounded-xl text-black dark:text-white"
						color="default"
						variant="bordered"
						required
					/>
				</div>
				<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
					<Input
						label="Call to Action Text"
						type="text"
						value={ctaText}
						onChange={(e) => setCtaText(e.target.value)}
						className="bg-neutral-100 dark:bg-neutral-800 rounded-xl text-black dark:text-white"
						color="default"
						variant="bordered"
					/>
					<Input
						label="Call to Action Link"
						type="text"
						value={ctaLink}
						onChange={(e) => setCtaLink(e.target.value)}
						className="bg-neutral-100 dark:bg-neutral-800 rounded-xl text-black dark:text-white"
						color="default"
						variant="bordered"
					/>
				</div>
				<Button
					onClick={() => setIsModalOpen(true)}
					className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-xl text-black dark:text-white">
					Add Skills
				</Button>

				{/* ✅ Technology Selection Modal */}
				<Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
					<ModalContent>
						<ModalHeader>Select Technologies</ModalHeader>
						<ModalBody>
							<CheckboxGroup
								label="Technologies"
								value={arrayTechnologies} // Ensure it is controlled
								onValueChange={setArrayTechnologies} // Updates state correctly
							>
								{skills.map((skill) => (
									<Checkbox key={skill.id} value={skill.id}>
										<div className="flex items-center">
											<div
												style={{ backgroundColor: skill.backgroundColor }}
												className="p-2 rounded-md">
												<Image
													src={skill.image}
													width={20}
													height={20}
													className="object-contain aspect-square"
													alt={skill.name}
												/>
											</div>
											<div>
												<h3 className="ml-2 font-semibold text-neutral-700 dark:text-neutral-300">
													{skill.name}
												</h3>
												<h3 className="ml-2 text-xs text-neutral-700 dark:text-neutral-300">
													{skill.shortDescription}
												</h3>
											</div>
										</div>
									</Checkbox>
								))}
							</CheckboxGroup>
						</ModalBody>
						<ModalFooter>
							<Button onClick={() => setIsModalOpen(false)}>Close</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>

				{/* ✅ File Upload */}
				<Input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					color="default"
					variant="bordered"
					className="bg-neutral-100 dark:bg-neutral-800 rounded-xl text-black dark:text-white"
					required={type === "create"}
				/>
				{image && (
					<img src={image} alt="Selected" className="w-32 h-32 object-cover" />
				)}

				<Button type="submit" color="primary" size="lg" isDisabled={isLoading}>
					{isLoading
						? "Submitting..."
						: type === "create"
							? "Create Project"
							: "Update Project"}
				</Button>
			</form>
		</MaxWidthWrapper>
	);
};

export default ProjectForm;
