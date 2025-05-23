import "./Loader.scss";

import cardBack from "@/assets/images/card-back.png";

const Loader = () => {
	const block = "loader";

	return (
		<div className={block}>
			<div className={`${block}__card`}>
				<img className={`${block}__card-image`} src={cardBack} alt="" />
				<p className={`${block}__message`}>
					Shuffling<span className="dots"></span>
				</p>
			</div>
		</div>
	);
};

export default Loader;
