import facts from "../facts.json";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const flattenedFacts = Object.entries(facts).reduce((prev, [year, facts]) => {
	return [...prev, ...facts.map((f) => ({ year, ...f }))];
}, []);

const Fact = ({ year, field, fact }) => (
	<div className="fact">
		<p className="message">
			{field}, {year}
		</p>
		<p className="title">{fact}</p>
	</div>
);

const randomIndex = () => Math.floor(Math.random() * flattenedFacts.length);

const Home = () => {
	const router = useRouter();
	const factIndex = parseInt(router.query.index, 10) % flattenedFacts.length;

	return (
		<main>
			<div
				style={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Fact {...flattenedFacts[factIndex]} />
				<button
					onClick={() => {
						const newIndex = Math.floor(Math.random() * flattenedFacts.length);
						router.push(`/?index=${newIndex}`);
					}}
				>
					New research
				</button>
			</div>
			<div>
				<p className="footer">
					Powered by the{" "}
					<a
						href="https://en.wikipedia.org/wiki/List_of_Ig_Nobel_Prize_winners#cite_note-252"
						target="_blank"
					>
						Ig Nobel Prize
					</a>
				</p>
				<p className="footer"> Created by digIT '20 and '21 with love</p>
			</div>
		</main>
	);
};

export async function getServerSideProps(context) {
	if (context.query.index === undefined || isNaN(context.query.index)) {
		return {
			props: {},
			redirect: {
				destination: `/?index=${randomIndex()}`,
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

export default Home;
