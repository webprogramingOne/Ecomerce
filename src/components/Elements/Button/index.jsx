/* eslint-disable react/prop-types */
const Button = (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    children,
    classname = "bg-black",
    onClick = () => {},
    type = "button",
  } = props;
  return (
    <div>
      <button
        className={`h-10 px-6 font-semibold rounded-md ${classname} text-white`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};
export default Button;
