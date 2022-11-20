import { useContext } from "react";
import { Container } from "react-bootstrap";

import { UserContext } from "../../contexts/user/user.context";
import { ReactComponent as UserLogo } from "../../assets/person.svg";

const UserInfo = () => {
  const { userLoginData } = useContext(UserContext);

  return (
    <Container>
      <div className="d-flex justify-content-between">
        <div>
          <span>
            {`Wartość inwestycji: 14564 PLN, zmiana dzienna: `}
            <span className="text-danger">{`-34%`}</span>
          </span>
        </div>
        <div>
          {userLoginData ? `${userLoginData.userEmail}` : "Niezalogowany"}{" "}
          <UserLogo />
        </div>
      </div>
    </Container>
  );
};

export default UserInfo;
