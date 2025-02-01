"use client";

import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {Experience} from "@prisma/client";
import React from "react";

const ExperienceTable = ({experience = []}: { experience?: Experience[] }) => {
    return (
        <Table aria-label="Experience Table" className="text-slate-800 dark:text-neutral-200 mt-10">
            <TableHeader>
                <TableColumn>S.No</TableColumn>
                <TableColumn>Title</TableColumn>
                <TableColumn>Desc</TableColumn>
                <TableColumn>Date</TableColumn>
            </TableHeader>
            <TableBody items={experience.map((exp, index) => ({...exp, index: index + 1}))}>
                {(exp: Experience & { index: number }) => (
                    <TableRow key={exp.id}>
                        <TableCell>{exp.index}</TableCell>
                        <TableCell>{exp.title}</TableCell>
                        <TableCell>{exp.shortDesc}</TableCell>
                        <TableCell>{exp.date}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default ExperienceTable;
