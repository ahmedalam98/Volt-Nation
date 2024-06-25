import styles from "./FooterSubscribe.module.css";

const FooterSubscribe = () => {
  return (
    <div className="flex flex-col gap-8 md:gap-0 md:flex-row items-center justify-between h-fit md:h-[60px] mx-12 mb-12">
      {/* <div className="pb-10">
        <h4 className="mb-4 text-lg tracking-widest text-center text-white">
          Subsribe To Our Newsletter
        </h4>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <input
            className="shadow appearance-none border rounded w-[240px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email Address"
          />

          <button className={styles.subBtn}>Subscribe</button>
        </div>
      </div> */}

      <div className="flex flex-col items-center justify-center gap-3 ">
        <div className={`flex gap-5 ${styles.cardsContainer}`}>
          <img src="./cards_all.svg" alt="visa" />
        </div>

        <p className="mt-5 tracking-widest text-gray-400 text-md md:mt-0">
          &#169; 2024 VoltNation{" "}
        </p>
      </div>
    </div>
  );
};

export default FooterSubscribe;
