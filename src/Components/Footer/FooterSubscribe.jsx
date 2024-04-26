import styles from "./FooterSubscribe.module.css";

const FooterSubscribe = () => {
  return (
    <div className=" bg-[#1B1B1B]">
      <div className="flex flex-col gap-8 md:gap-0 md:flex-row items-center justify-between h-fit md:h-[140px] mx-10">
        <p className=" text-md tracking-widest text-gray-400 mt-5 md:mt-0">
          &#169; 2024 by VoltNation{" "}
        </p>

        <div>
          <h4 className="text-white text-center mb-4 text-lg tracking-widest">
            Subsribe To Our Newsletter
          </h4>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <input
              className="shadow appearance-none border rounded w-[240px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email Address"
            />

            <button className={styles.subBtn}>Subscribe</button>
          </div>
        </div>

        <div className={`flex gap-5 ${styles.cardsContainer}`}>
          <img src="https://www.svgrepo.com/show/328127/visa.svg" alt="visa" />
          <img
            src="https://www.svgrepo.com/show/328121/mastercard.svg"
            alt="mastercard"
          />
          <img
            src="https://www.svgrepo.com/show/328122/paypal.svg"
            alt="paypal"
          />
          <img
            src="https://www.svgrepo.com/show/328132/discover.svg"
            alt="discover"
          />
        </div>
      </div>
    </div>
  );
};

export default FooterSubscribe;
