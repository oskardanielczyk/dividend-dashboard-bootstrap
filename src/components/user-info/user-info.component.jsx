import { useContext } from "react";
import { Container } from "react-bootstrap";

import { UserInfoContext } from "../../contexts/user-info/user-info.context";
import { ReactComponent as UserLogo } from "../../assets/person.svg";

const UserInfo = () => {
  const [userInfoData] = useContext(UserInfoContext);

  return (
    <Container>
      <div className="d-flex justify-content-between">
        <div>
          <span>
            {`Wartość inwestycji: ${userInfoData.walletBalance} PLN, zmiana dzienna: `}
            <span className="text-danger">{`${userInfoData.walletDayChange}%`}</span>
          </span>
        </div>
        <div>
          {`${userInfoData.name}`} <UserLogo />
        </div>
      </div>
    </Container>
  );
};

export default UserInfo;
