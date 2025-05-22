import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { CardData } from "@/types/CardData";
import "./Card.scss";

interface Props {
	card: CardData;
	rotation: number;
	isHinted: boolean;
	isActive: boolean;
	handleClick: () => void;
}

import cardBack from "@/assets/images/card-back.png";

const Card = function ({ card, rotation, isHinted, isActive = false, handleClick }: Props) {
	const [imageLoaded, setImageLoaded] = useState(false);
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			className={`card ${isHinted ? "card--hinted" : ""} ${
				!isActive || !imageLoaded ? "card--inactive" : ""
			}`}
			onClick={() => {
				if (!isHinted) handleClick();
			}}
			layout={!shouldReduceMotion}
			initial={{ rotate: !isActive ? 0 : rotation || 0 }}
			animate={{ rotate: !isActive ? 0 : rotation || 0 }}
			transition={
				shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 60 }
			}
		>
			<img
				key={card.code}
				src={imageLoaded ? card.image : cardBack}
				alt={`${card.value} of ${card.suit}`}
				className="card__image"
				onLoad={() => setImageLoaded(true)}
			/>
		</motion.div>
	);
};

export default Card;
