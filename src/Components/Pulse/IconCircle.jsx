/*eslint-disable react/prop-types*/
const IconCircle = ({ children }) => {
  return (
    <div
      className="rounded-full grid place-items-center w-20 h-20"
      style={{ backgroundColor: "var(--color-var2)" }}
    >
      {children}
    </div>
  );
};

export default IconCircle;
