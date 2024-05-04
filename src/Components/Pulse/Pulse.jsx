import IconsContainer from "./IconsContainer.jsx";
import styles from "./Pulse.module.css";

const Pulse = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] bg-[#EDEDED] h-[1100px] md:h-[800px] lg:h-[700px] xl:h-[550px]">
        <div className="ms-0 md:ms-8 mt-12 md:mt-0 flex flex-col justify-start md:justify-center items-center gap-10 px-8">
          <h2 className="text-4xl md:text-5xl font-bold leading-snug md:leading-tight self-start text-[#1B1B1B]">
            DOLBY ATMOS <br /> SOUND FEATURE
          </h2>

          <p className=" text-md font-semibold text-[#909090]">
            Experience immersive audio with AirPods featuring Dolby Atmos. Enjoy
            spatial sound for a rich, multi-dimensional listening experience
            that feels like you&apos;re in the heart of the action.
          </p>

          <IconsContainer />
        </div>

        <div className="grid place-items-center relative mt-[-12rem] md:mt-0">
          {/* <div className={styles.circle}>agag</div> */}
          <img
            src="https://wpbingosite.com/wordpress/dimita/wp-content/themes/dimita/images/banner1-3.png"
            alt="banner"
            className="absolute"
          />

          <div className={styles.circle}></div>

          <img
            src="https://wpbingosite.com/wordpress/dimita/wp-content/webp-express/webp-images/uploads/2019/12/banner1-2.png.webp"
            alt="airpod"
            className="absolute w-[50%] md:w-[45%] lg:w-[35%]"
          />
        </div>
      </div>
    </>
  );
};

export default Pulse;
