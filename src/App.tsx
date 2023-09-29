import { useState } from "react";
import "./App.css";

function App() {
  const mockPayments: Payment[] = [
    {
      transactionID: 1,
      date: new Date(),
      description: "Test payment 1",
      amount: 5.0,
    },
    {
      transactionID: 2,
      date: new Date("2023-09-19"),
      description: "Test payment 2",
      amount: 10.0,
    },
    {
      transactionID: 3,
      date: new Date("2023-09-09"),
      description: "Test payment 3",
      amount: 20.0,
    },
  ];

  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showError, setShowError] = useState<boolean>(false);

  interface Payment {
    transactionID: Number;
    date: Date;
    description: string;
    amount: Number;
  }

  const renderPayments = payments.map((payment) => {
    return (
      <li key={payment.transactionID.toString()}>
        <p>Transaction ID: {payment.transactionID.toString()}</p>
        <p>Date: {payment.date.toDateString()}</p>
        <p>Description: {payment.description}</p>
        <p>Amount: ${payment.amount.toString()}</p>
      </li>
    );
  });

  const filterPayments = function () {
    if (startDate > endDate) {
      setShowError(true);
      return null;
    }

    setShowError(false);
    const filteredPayments = mockPayments.filter((payment) => {
      return (
        payment.date.getTime() <= endDate.getTime() &&
        payment.date.getTime() >= startDate.getTime()
      );
    });
    setPayments(filteredPayments);
  };
  return (
    <>
      {showError && <p>Please select valid input dates</p>}
      <div>
        <label htmlFor="startDate">Enter start date</label>
        <input
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setStartDate(new Date(e.currentTarget.value))
          }
          type="date"
          name="startDate"
          id="startDate"
        />
      </div>
      <div>
        <label htmlFor="endDate">Enter end date</label>
        <input
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setEndDate(new Date(e.currentTarget.value))
          }
          type="date"
          name="endDate"
          id="endDate"
        />
      </div>
      <button onClick={filterPayments}>Submit</button>
      <div style={{ marginTop: 40 }}>
        <ul>{renderPayments}</ul>
      </div>
    </>
  );
}

export default App;
