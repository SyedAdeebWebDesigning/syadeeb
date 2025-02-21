"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@heroui/table";
import { Technology } from "@prisma/client";
import React, { useState } from "react";
import Image from "next/image";
import { Checkbox, Link } from "@nextui-org/react";
import { toggleDisplaySkill } from "@/lib/actions/skills.action";

const SkillTable = ({ skill = [] }: { skill?: Technology[] }) => {
	// ✅ Store state locally
	const [skills, setSkills] = useState<Technology[]>(skill);

	// ✅ Function to toggle display
	const handleToggle = async (id: string) => {
		// Find the skill and update locally first
		setSkills((prevSkills) =>
			prevSkills.map((s) =>
				s.id === id ? { ...s, showOnSkill: !s.showOnSkill } : s
			)
		);

		// ✅ Call the backend function to update the DB
		await toggleDisplaySkill(id);
	};

	return (
		<Table
			aria-label="Skill Table"
			className="text-slate-800 dark:text-neutral-200 mt-10">
			<TableHeader>
				<TableColumn>S.No</TableColumn>
				<TableColumn>Name</TableColumn>
				<TableColumn>Desc</TableColumn>
				<TableColumn>Display Skill</TableColumn>
			</TableHeader>
			<TableBody
				items={skills.map((skill, index) => ({ ...skill, index: index + 1 }))}>
				{(skill: Technology & { index: number }) => (
					<TableRow key={skill.id}>
						<TableCell>{skill.index}.</TableCell>
						<TableCell>
							<Link
								href={`/skills/${skill.id}`}
								className="flex items-center justify-start">
								<div
									style={{ backgroundColor: skill.backgroundColor }}
									className="rounded-md">
									<Image
										width={50}
										height={50}
										className="p-2 aspect-square"
										objectFit="contain"
										src={skill.image}
										alt={skill.name}
									/>
								</div>
								<h3 className="ml-2 dark:text-white text-black">
									{skill.name}
								</h3>
							</Link>
						</TableCell>
						<TableCell>{skill.shortDescription}</TableCell>
						<TableCell>
							<div>
								<Checkbox
									className="text-white"
									size="lg"
									isSelected={skill.showOnSkill} // ✅ Reflect local state
									onChange={() => handleToggle(skill.id)} // ✅ Update instantly
								/>
							</div>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default SkillTable;
