import Game from "@/components/Game";

const Root = () => {
	return (
		<main className="main fb-col-wrapper">
			<header className="main__header">
				<h1 className="main__heading">Memory card</h1>
			</header>
			<Game />
		</main>
	);
};

export default Root;
