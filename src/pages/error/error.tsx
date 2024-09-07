import styles from './error.module.css';

export const Error = ({ title }: { title: string }) => {
	return (
		<>
			<div className={styles.container}>
				<h1>{title}</h1>
			</div>
		</>
	);
};
