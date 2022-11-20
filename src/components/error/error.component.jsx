const Error = (props) => {
  return (
    <div className={`alert ${props.className}`} role="alert">
      {props.msg}
    </div>
  );
};

export default Error;
