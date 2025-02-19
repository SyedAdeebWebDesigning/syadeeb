"use client";

import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {Technology} from "@prisma/client";
import React from "react";
import Image from "next/image";

const SkillTable = ({skill = []}: { skill?: Technology[] }) => {
    return (
        <Table aria-label="Skill Table" className="text-slate-800 dark:text-neutral-200 mt-10">
            <TableHeader>
                <TableColumn>S.No</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>Desc</TableColumn>

            </TableHeader>
            <TableBody items={skill.map((skill, index) => ({...skill, index: index + 1}))}>
                {(skill: Technology & { index: number }) => (
                    <TableRow key={skill.id}>
                        <TableCell>{skill.index}</TableCell>
                        <TableCell>
                            <div className={'flex items-center justify-start'}>
                                <div style={{backgroundColor: skill.backgroundColor}} className={'rounded-md'}>
                                    <Image
                                        width={50}
                                        height={50}
                                        className={'p-2 '}
                                        objectFit={'contain'}
                                        src={skill.image}
                                        alt={skill.name}
                                    />
                                </div>
                                <h3 className={'ml-2'}>{skill.name}</h3>
                            </div>
                        </TableCell>
                        <TableCell>{skill.shortDescription}</TableCell>

                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default SkillTable;
