const Error = ({ msg }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {msg}
    </div>
  );
};

export default Error;
