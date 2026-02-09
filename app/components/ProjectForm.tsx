"use client";

import { Project, Technology } from "@prisma/client";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	ModalContent,
} from "@nextui-org/react";
import { addProjects, updateProject } from "@/lib/actions/projects.action";
import Image from "next/image";
import { toast } from "react-toastify";

interface ProjectFormProps {
	type: "create" | "update";
	skills: Technology[];
	project?: Project & { technologies: string[] };
}

const ProjectForm = ({ type, skills, project }: ProjectFormProps) => {
	const router = useRouter();

	// ================= STATE =================
	const [title, setTitle] = useState(project?.title || "");
	const [description, setDescription] = useState(project?.description || "");
	const [ctaText, setCtaText] = useState(project?.ctaText || "");
	const [ctaLink, setCtaLink] = useState(project?.ctaLink || "");
	const [arrayTechnologies, setArrayTechnologies] = useState<string[]>([]);
	const [image, setImage] = useState<string | null>(project?.image || null);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// ================= LOAD EXISTING TECH =================
	useEffect(() => {
		if (type === "update" && project?.technologies) {
			setArrayTechnologies(
				project.technologies.map((t: any) =>
					typeof t === "string" ? t : String(t.id),
				),
			);
		}
	}, [type, project]);

	// ================= IMAGE TO BASE64 =================
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = () => setImage(reader.result as string);
		reader.readAsDataURL(file);
	};

	// ================= TOGGLE SKILL =================
	const toggleSkill = (skillId: string) => {
		setArrayTechnologies((prev) => {
			if (prev.includes(skillId)) {
				return prev.filter((id) => id !== skillId); // REMOVE
			}
			return [...prev, skillId]; // ADD
		});
	};

	// ================= SUBMIT =================
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		const projectData = {
			title,
			description,
			image: image || "",
			ctaText,
			ctaLink,
			technologies: arrayTechnologies,
		};

		try {
			if (type === "create") {
				await addProjects(projectData);
				router.push("/projects");
				toast.success("Project created successfully!");
			} else if (type === "update" && project?.id) {
				await updateProject(projectData, project.id);
				router.push("/projects");
				toast.success("Project updated successfully!");
			}
		} catch (error) {
			toast.error(
				"An error occurred while saving the project. Please try again.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	// ================= UI =================
	return (
		<MaxWidthWrapper>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center justify-center min-h-screen space-y-4">
				{/* ================= TEXT FIELDS ================= */}
				<div className="flex w-full gap-4">
					<Input
						label="Project Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						variant="bordered"
						required
					/>
					<Input
						label="Project Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						variant="bordered"
						required
					/>
				</div>

				<div className="flex w-full gap-4">
					<Input
						label="CTA Text"
						value={ctaText}
						onChange={(e) => setCtaText(e.target.value)}
						variant="bordered"
					/>
					<Input
						label="CTA Link"
						value={ctaLink}
						onChange={(e) => setCtaLink(e.target.value)}
						variant="bordered"
					/>
				</div>

				{/* ================= SKILLS BUTTON ================= */}
				<Button onClick={() => setIsModalOpen(true)} className="w-full">
					Select Skills
				</Button>

				{/* ================= MODAL ================= */}
				<Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
					<ModalContent>
						<ModalHeader>Select Technologies</ModalHeader>

						<ModalBody>
							<div className="grid grid-cols-1 gap-3">
								{skills.map((skill) => {
									const isSelected = arrayTechnologies.some(
										(id) => String(id) === String(skill.id),
									);

									return (
										<button
											key={skill.id}
											type="button"
											onClick={() => toggleSkill(skill.id)}
											className={`
                        flex items-center gap-2 p-3 rounded-xl border transition-all
                        ${
													isSelected
														? "bg-green-500/10 border-green-500 ring-1 ring-green-500"
														: "bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 hover:border-neutral-500"
												}
                      `}>
											{/* Fake checkbox */}
											<div
												className={`
                          w-5 h-5 rounded border flex items-center justify-center text-xs
                          ${
														isSelected
															? "bg-green-500 border-green-500 text-white"
															: "border-gray-400"
													}
                        `}>
												{isSelected ? "✓" : ""}
											</div>

											{/* Icon */}
											<div
												style={{ backgroundColor: skill.backgroundColor }}
												className="p-1 rounded">
												<Image
													src={skill.image}
													className="aspect-square"
													width={26}
													height={26}
													alt={skill.name}
												/>
											</div>

											<span className="text-sm font-medium">{skill.name}</span>
										</button>
									);
								})}
							</div>
						</ModalBody>

						<ModalFooter>
							<Button onClick={() => setIsModalOpen(false)}>Done</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>

				{/* ================= IMAGE ================= */}
				<Input type="file" accept="image/*" onChange={handleImageChange} />

				{image && (
					<img
						src={image}
						alt="preview"
						className="w-32 h-32 object-cover rounded-lg"
					/>
				)}

				{/* ================= SUBMIT ================= */}
				<Button type="submit" color="primary" isDisabled={isLoading}>
					{isLoading
						? "Saving..."
						: type === "create"
							? "Create Project"
							: "Update Project"}
				</Button>
			</form>
		</MaxWidthWrapper>
	);
};

export default ProjectForm;
