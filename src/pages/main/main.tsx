import { Link } from "react-router-dom";
import styles from "./main.module.css";
import { useAuth } from "../../shared/auth-provider/auth-provider";

export const Main = () => {
  const auth = useAuth();
  const name = auth?.user || "Anonymous";
  return (
    <div className={styles.container}>
      <h1>
        <p>Hello {name}!</p>
        From Rick
        <Link to={`secret`}>and</Link>
        Morty
      </h1>
    </div>
  );
};
