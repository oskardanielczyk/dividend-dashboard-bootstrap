import { useContext, useState } from "react";
import { Container, Button } from "react-bootstrap";

import { UserContext } from "../../contexts/user/user.context";
import { ReactComponent as UserLogo } from "../../assets/person.svg";
import AddStockModal from "../add-stock-modal/add-stock-modal.component";

const UserInfo = () => {
  const [modalShow, setModalShow] = useState(false);
  const { userLoginData } = useContext(UserContext);

  // Funkcje otwierające oraz zamykające modala
  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  return (
    <>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span>
              {`Wartość inwestycji: 14564 PLN, zmiana dzienna: `}
              <span className="text-danger">{`-34%`}</span>
            </span>
          </div>
          <div className="d-flex justify-content-end align-items-center gap-2">
            <div>
              {userLoginData ? `${userLoginData.userEmail}` : "Niezalogowany"}{" "}
            </div>
            <UserLogo />
            <Button variant="outline-success" onClick={handleShow}>
              Dodaj transakcję
            </Button>
          </div>
        </div>
      </Container>

      <AddStockModal show={modalShow} handleClose={handleClose} />
    </>
  );
};

export default UserInfo;
