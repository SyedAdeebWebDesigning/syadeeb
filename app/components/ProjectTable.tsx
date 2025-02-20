"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@heroui/table";
import { Project } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { Link } from "@nextui-org/react";

const ProjectTable = ({ project = [] }: { project?: Project[] }) => {
	return (
		<Table
			aria-label="project Table"
			className="text-slate-800 dark:text-neutral-200 mt-10">
			<TableHeader>
				<TableColumn>S.No</TableColumn>
				<TableColumn>Name</TableColumn>
				<TableColumn>Desc</TableColumn>
			</TableHeader>
			<TableBody
				items={project.map((project, index) => ({
					...project,
					index: index + 1,
				}))}>
				{(project: Project & { index: number }) => (
					<TableRow key={project.id}>
						<TableCell>{project.index}. </TableCell>
						<TableCell>
							<Link
								href={`/projects/${project.id}`}
								className={"flex items-center justify-start"}>
								<div className={"rounded-md"}>
									<Image
										width={50}
										height={50}
										className={"p-2 "}
										objectFit={"contain"}
										src={project.image}
										alt={project.title}
									/>
								</div>
								<h3 className={"ml-2 dark:text-white text-black"}>
									{project.title}
								</h3>
							</Link>
						</TableCell>
						<TableCell className="line-clamp-2">
							{project.description}
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default ProjectTable;
