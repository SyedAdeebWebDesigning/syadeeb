import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import MessageTable from "@/app/components/MessageTable";
import { getMessages } from "@/lib/actions/contact.action";

import { Contact } from "@prisma/client";

interface pageProps {}

const page = async ({}: pageProps) => {
	const data = await getMessages();
	const messages = JSON.parse(JSON.stringify(data)) as Contact[];

	if (messages.length === 0) {
		return (
			<div className="dark:text-white text-black text-3xl min-h-screen flex items-center justify-center">
				No messages
			</div>
		);
	}
	return (
		<div>
			<MaxWidthWrapper>
				<h3 className="text-black dark:text-white text-2xl">Contact</h3>
				<MessageTable messages={messages} />
			</MaxWidthWrapper>
		</div>
	);
};

export default page;
