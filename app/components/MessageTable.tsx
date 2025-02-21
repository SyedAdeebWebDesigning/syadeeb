"use client";

import { Contact } from "@prisma/client";
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";

interface MessageTableProps {
	messages: Contact[];
}

const MessageTable = ({ messages }: MessageTableProps) => {
	return (
		<div>
			<Table
				aria-label="message Table"
				className="text-slate-800 dark:text-neutral-200 mt-10">
				<TableHeader>
					<TableColumn>S.No</TableColumn>
					<TableColumn>Name</TableColumn>
					<TableColumn>Message</TableColumn>
					<TableColumn>Date</TableColumn>
				</TableHeader>
				<TableBody
					items={messages.map((message, index) => ({
						...message,
						index: index + 1,
					}))}>
					{(message: Contact & { index: number }) => (
						<TableRow key={message.id}>
							<TableCell>{message.index}.</TableCell>
							<TableCell>{message.name}</TableCell>
							<TableCell>{message.message}</TableCell>
							<TableCell>{message.createdAt as any}</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};

export default MessageTable;
