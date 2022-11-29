import { useContext, useState } from "react";
import { Container, Button } from "react-bootstrap";

import { UserContext } from "../../contexts/user/user.context";
import { StocksContext } from "../../contexts/stocks/stocks.context";
import { ReactComponent as UserLogo } from "../../assets/person.svg";
import AddStockModal from "../add-stock-modal/add-stock-modal.component";
import StockHistoryModal from "../stock-info-modal/stock-history-modal.component";

const UserInfo = () => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [historyModalShow, setHistoryModalShow] = useState(false);
  const { userLoginData } = useContext(UserContext);
  const {
    state: { portfolioValue },
  } = useContext(StocksContext);

  // Funkcje otwierające oraz zamykające modala AddModal
  const handleAddModalShow = () => setAddModalShow(true);
  const handleAddModalClose = () => setAddModalShow(false);

  // Funkcje otwierające oraz zamykające modala HistoryModal
  const handleHistoryModalShow = () => setHistoryModalShow(true);
  const handleHistoryModalClose = () => setHistoryModalShow(false);

  return (
    <>
      <Container>
        <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center">
          <div className="d-flex flex-row gap-2">
            <div className="shadow-none p-2 rounded bg-dark text-white">
              <p className="fs-6 mb-0 text-center">Wartość portfela</p>
              <p className="fs-5 fw-bold mb-0 text-center">{`$${portfolioValue.toFixed(
                2
              )}`}</p>
            </div>
            <div className="shadow-none p-2 rounded bg-danger text-white">
              <p className="fs-6 mb-0 text-center">Zmiana dzienna</p>
              <p className="fs-5 fw-bold mb-0 text-center">-34%</p>
            </div>
          </div>
          <div className="d-flex flex-lg-row flex-column gap-2 align-items-center">
            <div className="d-flex flex-row gap-2 align-items-center">
              <div>
                {userLoginData ? `${userLoginData.userName}` : "Niezalogowany"}{" "}
              </div>
              <div>
                <UserLogo />
              </div>
            </div>
            <div className="d-flex gap-2">
              <Button
                size="sm"
                variant="outline-success"
                onClick={handleAddModalShow}
              >
                Dodaj transakcję
              </Button>
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={handleHistoryModalShow}
              >
                Historia transakcji
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <AddStockModal show={addModalShow} handleClose={handleAddModalClose} />
      <StockHistoryModal
        show={historyModalShow}
        handleClose={handleHistoryModalClose}
      />
    </>
  );
};

export default UserInfo;
