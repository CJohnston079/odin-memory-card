import { motion, useReducedMotion } from "framer-motion";
import "./Card.scss";

interface Props {
	name: string;
	rotation: number;
	hinted: boolean;
	onClick: () => void;
}

const Card = function ({ name, rotation, hinted, onClick }: Props) {
	const shouldReduceMotion = useReducedMotion();
	const isRed = name.includes("♦️") || name.includes("♥️");

	return (
		<motion.div
			className={`card ${isRed ? "card--red" : ""} ${hinted ? "card--hinted" : ""}`}
			onClick={onClick}
			layout={!shouldReduceMotion}
			initial={{ rotate: rotation || 0 }}
			animate={{ rotate: rotation || 0 }}
			transition={
				shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 60 }
			}
		>
			<span className="card__text">{name}</span>
		</motion.div>
	);
};

export default Card;
