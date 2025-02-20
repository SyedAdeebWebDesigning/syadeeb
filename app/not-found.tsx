"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Custom404() {
	const router = useRouter();
	return (
		<div
			className={
				"min-h-screen flex items-center justify-center text-black dark:text-white"
			}>
			<div className={"flex flex-col text-center "}>
				<h2 className={" text-9xl font-extrabold logo-text"}>
					<span className={"text-primary"}>4</span>
					<span> 0 </span>
					<span className={"text-primary"}>4</span>
				</h2>
				<p className={"text-9xl font-bold logo-text"}>
					<span className={""}>p</span>age <span className={"mx-2"}>not</span>{" "}
					<span className={""}>f</span>ound.
				</p>
				<Link
					href={"/"}
					className={"bg-primary text-white  py-4 rounded-md mt-4"}>
					Go back home
				</Link>
			</div>
		</div>
	);
}
