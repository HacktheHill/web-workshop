import styles from "@/styles/Card.module.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CardProps = {
	title: string;
	number: string;
	icon: IconProp;
	color: string;
};

export default function Card({ title, number, icon, color }: CardProps) {
	return (
		<section className={styles.card} style={{ borderColor: color }}>
			<FontAwesomeIcon icon={icon} style={{ color }} className={styles.icon} />
			<h3>{title}</h3>
			<p className={styles.number}>{number}</p>
		</section>
	);
}
