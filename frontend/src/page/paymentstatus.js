import NavBar from "../component/navbar-main";
import PaymentStatusCard from "../component/card-paymentstatus";
import '../css/paymentstatus.css'

const PaymentStatus = () => {

  return (
    <div>
      <NavBar />
      <div className="card-container">
        <h1>สถานะการชำระเงิน</h1>
          <PaymentStatusCard/>
      </div>
    </div>
  );
};

export default PaymentStatus;