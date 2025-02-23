import styles from "./infoPage.module.css";

interface ICurrentData {
  id: number;
  name: string;
  air_date?: string;
  dimension?: string;
  episode?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  image?: string;
  created?: string;
}

interface IInfoPage {
  currentData: ICurrentData | null | undefined;
  errorMessage: string;
  title: string;
}

export const InfoPage = ({ currentData, errorMessage, title }: IInfoPage) => {
  return currentData ? (
    <div className={styles.container}>
      <h1>{currentData.name}</h1>
      {currentData.dimension && (
        <p>
          <strong>Dimension:</strong> {currentData.dimension}
        </p>
      )}
      {currentData.image && (
        <img src={currentData.image} alt={currentData.name} />
      )}
      {currentData.status && (
        <p>
          <strong>Status:</strong> {currentData.status}
        </p>
      )}
      {title === "Эпизоды" && currentData.episode && (
        <p>
          <strong>Episode:</strong> {currentData.episode}
        </p>
      )}
      {currentData.air_date && (
        <p>
          <strong>Air_date:</strong> {currentData.air_date}
        </p>
      )}
      {currentData.species && (
        <p>
          <strong>Species:</strong> {currentData.species}
        </p>
      )}
      {(title === "Персонажи" || title === "Локации") && (
        <p>
          <strong>Type:</strong> {currentData.type || "N/A"}
        </p>
      )}
      {currentData.gender && (
        <p>
          <strong>Gender:</strong> {currentData.gender}
        </p>
      )}
      {currentData.created && (
        <p>
          <strong>Created:</strong>{" "}
          {new Date(currentData.created).toLocaleDateString()}
        </p>
      )}
    </div>
  ) : (
    <h1>Ошибка: {errorMessage}</h1>
  );
};
