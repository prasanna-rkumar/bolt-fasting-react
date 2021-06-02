const TextFormField = (props) => (
  <div className="mb-4 box-border">
    <label className="text-xs text-gray-500 font-medium">
      {props.label}
      <input
        className="block border-2 border-gray text-black text-base border-opacity-50 rounded w-full h-11 pl-3 focus:outline-none focus:ring focus:border-primary focus:border-opacity-50"
        {...props}
      />
    </label>
  </div>
);

export default TextFormField
