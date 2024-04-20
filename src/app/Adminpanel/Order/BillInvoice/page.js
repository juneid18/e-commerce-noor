"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import Image from "next/image";

const Page = ({ searchParams }) => {
  const [formateddate, setformateddate] = useState();

  const printInvoice = () => {
    window.print();
  };
  useEffect(() => {
    const date = new Date(searchParams.date);
    const formattedDate = date.toLocaleDateString("en-GB");
    console.log(formattedDate);
    setformateddate(formattedDate);
  }, [searchParams.date]);

  return (
    <>
      <div className="invoice-wrapper" id="print-area">
        <div className="invoice">
          <div className="invoice-container">
            <div className="invoice-head">
              <div className="invoice-head-top">
                <div className="invoice-head-top-left text-start">
                  <Image
                    width={30}
                    height={100}
                    alt="image"
                    src="https://images.squarespace-cdn.com/content/v1/58cfbd7f20099e8bad829da6/1525094406207-P20LY6LIM8Q7QIJHYAJZ/NOOR.jpg"
                  />
                </div>
                <div className="invoice-head-top-right text-end">
                  <h3>Invoice</h3>
                </div>
              </div>
              <div className="hr"></div>
              <div className="invoice-head-middle">
                <div className="invoice-head-middle-left text-start">
                  <p>
                    <span className="text-bold">Date</span>: {formateddate}
                  </p>
                </div>
                <div className="invoice-head-middle-right text-end">
                  <p>
                    <span className="text-bold">Invoice No:</span>
                    {searchParams.ID}
                  </p>
                </div>
              </div>
              <div className="hr"></div>
              <div className="invoice-head-bottom">
                <div className="invoice-head-bottom-left">
                  <ul>
                    <li className="text-bold">Invoiced To:</li>
                    <li>{searchParams.address}</li>
                  </ul>
                </div>
                <div className="invoice-head-bottom-right">
                  <ul className="text-end">
                    <li className="text-bold">Pay To:</li>
                    <li>noor Inc.</li>
                    <li>415002 IN. Enterprise</li>
                    <li>noor@enterprice.com</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="overflow-view">
              <div className="invoice-body">
                <table>
                  <thead>
                    <tr>
                      <td className="text-bold">Product</td>
                      <td className="text-bold">Description</td>
                      <td className="text-bold">Rate</td>
                      <td className="text-bold">QTY</td>
                      <td className="text-bold">Amount</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{searchParams.title}</td>
                      <td>{searchParams.quantity}</td>
                      <td>₹{searchParams.price}</td>
                      <td>{searchParams.quantity}</td>
                      <td className="text-end">
                        ₹{searchParams.price * searchParams.quantity}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="invoice-body-bottom">
                  <div className="invoice-body-info-item">
                    <div className="info-item-td text-end text-bold">
                      Total:
                    </div>
                    <div className="info-item-td text-end">
                      ₹{searchParams.price * searchParams.quantity}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="invoice-foot text-center">
              <p>
                <span className="text-bold text-center">NOTE:&nbsp;</span>This
                is computer generated receipt and does not require physical
                signature.
              </p>

              <div className="invoice-btns">
                <button
                  type="button"
                  className="invoice-btn"
                  onClick={printInvoice}
                >
                  <span>
                    <i className="fa-solid fa-print"></i>
                  </span>
                  <span>Print</span>
                </button>
                <button type="button" className="invoice-btn">
                  <span>
                    <i className="fa-solid fa-download"></i>
                  </span>
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
