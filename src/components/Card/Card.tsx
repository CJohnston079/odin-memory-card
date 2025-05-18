import { motion, useReducedMotion } from "framer-motion";
import type { CardData } from "@/types/CardData";
import "./Card.scss";

interface Props {
	card: CardData;
	rotation: number;
	hinted: boolean;
	isActive: boolean;
	onClick: () => void;
}

const Card = function ({ card, rotation, hinted, isActive = false, onClick }: Props) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			className={`card ${hinted ? "card--hinted" : ""} ${!isActive ? "card--inactive" : ""}`}
			onClick={onClick}
			layout={!shouldReduceMotion}
			initial={{ rotate: rotation || 0 }}
			animate={{ rotate: rotation || 0 }}
			transition={
				shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 60 }
			}
		>
			<img
				key={card.code}
				src={card.images.png}
				alt={`${card.value} of ${card.suit}`}
				className="card__image"
			/>
		</motion.div>
	);
};

export default Card;
