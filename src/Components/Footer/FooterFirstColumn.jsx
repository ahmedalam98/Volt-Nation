import styles from "./FooterSubscribe.module.css";

const FooterFirstColumn = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-5 md:items-start">
      <div>
        <h3 className="text-xl font-bold tracking-widest">CONTACT US</h3>

        <p className="text-gray-400 ">voltnation44@gmail.com</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 mb-8">
        <div className={`flex gap-5 ${styles.cardsContainer}`}>
          <img src="./cards_all.svg" alt="visa" />
        </div>

        <p className="mt-5 tracking-widest text-gray-400 text-md md:mt-0">
          &#169; 2024 VoltNation
        </p>
      </div>
    </div>
  );
};

export default FooterFirstColumn;
