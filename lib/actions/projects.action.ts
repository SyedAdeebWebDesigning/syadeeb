"use server";

import prisma from "@/lib/prisma";

interface ProjectData {
	title: string;
	description: string;
	image: string;
	ctaText: string;
	ctaLink: string;
	technologies: string[];
}

// ✅ Fetch all projects with their technologies
export const getProjects = async () => {
	try {
		const projects = await prisma.project.findMany();

		// Fetch technologies separately using the stored IDs
		const projectsWithTechnologies = await Promise.all(
			projects.map(async (project) => {
				const technologies = await prisma.technology.findMany({
					where: { id: { in: project.technologies } },
				});
				return { ...project, technologies };
			}),
		);

		return projectsWithTechnologies ?? null;
	} catch (error: any) {
		console.error("Error fetching projects:", error);
		throw new Error("Failed to fetch projects. Please try again.");
	}
};

// ✅ Fetch a single project by ID
export const getProject = async (projectId: string) => {
	try {
		const project = await prisma.project.findUnique({
			where: { id: projectId },
		});

		if (!project) {
			throw new Error("Project not found");
		}

		// Fetch technologies separately using the stored IDs
		const technologies = await prisma.technology.findMany({
			where: { id: { in: project.technologies } },
		});

		return { ...project, technologies };
	} catch (error: any) {
		console.error("Error fetching project:", error);
		throw new Error("Failed to fetch project. Please try again.");
	}
};

// ✅ Add a new project with an array of technology names
export const addProjects = async (data: ProjectData) => {
	try {
		const { title, description, image, ctaText, ctaLink, technologies } = data;

		// Fetch technology IDs based on names
		const existingTechnologies = await prisma.technology.findMany({
			where: { name: { in: technologies } },
		});

		// Extract just the IDs
		const technologyIds = existingTechnologies.map((tech) => tech.id);

		// Create a new project and store the technology IDs
		const newProject = await prisma.project.create({
			data: {
				title,
				description,
				image,
				ctaText,
				ctaLink,
				technologies: technologyIds, // ✅ Storing technology IDs as String[]
			},
		});

		return newProject;
	} catch (error) {
		console.error("Error adding project:", error);
		throw new Error("Failed to add project. Please try again.");
	}
};

// ✅ Update an existing project
export const updateProject = async (
	project: ProjectData,
	projectId: string,
) => {
	try {
		const {
			title,
			description,
			image,
			ctaText,
			ctaLink,
			technologies = [],
		} = project;

		// 🔥 Normalize → always string IDs
		const technologyIds = technologies.map((tech: any) =>
			typeof tech === "string" ? tech : String(tech.id),
		);

		const updatedProject = await prisma.project.update({
			where: { id: projectId },
			data: {
				title,
				description,
				image,
				ctaText,
				ctaLink,
				technologies: technologyIds, // pure string[]
			},
		});

		return updatedProject;
	} catch (error) {
		console.error("❌ Error updating project:", error);
		throw new Error("⚠️ Failed to update project. Please try again.");
	}
};
