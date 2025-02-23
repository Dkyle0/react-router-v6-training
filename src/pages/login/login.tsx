import { useAuth } from "../../shared/auth-provider/auth-provider";
import styles from "./login.module.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const auth = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userName = String(formData.get("username"));
    auth?.signin(userName, () => {
      navigate(from, {
        replace: true,
      });
    });
  };

  if (auth?.user !== null) {
    return <Navigate to={from} />;
  }
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h2>Авторизация</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Логин..." name="username" />
          <input type="password" placeholder="Пароль..." />

          <div className={styles.buttons}>
            <button type="submit">Авторизация</button>
          </div>
        </form>
      </div>
    </div>
  );
};
