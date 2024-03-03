import NavBar from "../component/navbar-main";
import BookingHistoryCard from "../component/card-history";
import '../css/history.css'

const BookingHistory = () => {

  return (
    <div>
      <NavBar />
      <div className="history-main">
        <h1>ประวัติการจอง</h1>
        <BookingHistoryCard/>
      </div>
    </div>
  );
};

export default BookingHistory;