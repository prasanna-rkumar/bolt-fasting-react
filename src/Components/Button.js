const Button = ({ children, primary, secondary, onClick }) => (
  <button onClick={onClick} className={`rounded-md text-sm py-1 px-3 ${primary && 'text-white bg-green'} ${secondary && ' text-black bg-gray-400'}`}>{children}</button>
);

export default Button;
