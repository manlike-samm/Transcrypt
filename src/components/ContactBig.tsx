import React, { useContext, useEffect, useState } from "react";

import { ISt } from "../interfaces";

import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
// import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortAddress";

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
}: ISt): JSX.Element => {
  return (
    <div
      className="bg-white m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-2xl hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a
            href={`https://goerli.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className=" text-slate-800 text-base">
              From: {shortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://goerli.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className=" text-slate-800 text-base">
              To: {shortenAddress(addressTo)}
            </p>
          </a>
          <p className=" text-slate-800 text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className=" text-slate-800 text-base">Message: {message}</p>
            </>
          )}
        </div>
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-sky-400 font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};
const ContactBig: React.FC = () => {
  const {
    currentAccount,
    connectWallet,
    sendTransaction,
    formData,
    isLoading,
    setFormData,
    transactions,
  } = useContext(TransactionContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); //to prevent the form from loading after submission

    if (
      !formData.addressTo ||
      !formData.amount ||
      !formData.keyword ||
      !formData.message
    )
      return alert("Please fill all fields");

    sendTransaction();
  };

  return (
    <>
      <div className=" flex flex-col sm:flex-row items-center w-5/6 sm:w-fit h-full bg-sky-100 bg-gradient-to-tr rounded-xl px-8 mx-auto">
        <div className="p-3 mt-10 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism ">
          <div className="flex justify-between flex-col w-full h-full">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                <SiEthereum fontSize={21} color="#fff" />
              </div>
            </div>
            <div>
              <p className="text-white font-light text-sm">
                {currentAccount && shortenAddress(currentAccount)}
              </p>
              <p className="text-white font-semibold text-lg mt-1">Ethereum</p>
            </div>
          </div>
        </div>
        <div className=" bg-sky-100 p-4 sm:p-8 sm:w-[400px] rounded-xl ">
          {currentAccount ? (
            <div></div>
          ) : (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
          <form className=" space-y-2">
            <input
              type="text"
              name="addressTo"
              value={formData?.addressTo}
              onChange={(e) => handleChange(e)}
              className=" w-full rounded p-2 bg-neutral-200 outline-none"
              placeholder="Address to"
              required
            />
            <input
              type="number"
              name="amount"
              step="0.0001"
              value={formData?.amount}
              onChange={(e) => handleChange(e)}
              className=" w-full rounded p-2 bg-neutral-200 outline-none"
              placeholder="Amount"
              required
            />
            <input
              type="text"
              name="keyword"
              value={formData?.keyword}
              onChange={handleChange}
              className=" w-full rounded p-2 bg-neutral-200 outline-none"
              placeholder="Keyword(Gif)"
              required
            />
            <textarea
              name="message"
              value={formData?.message}
              onChange={(e) => handleChange(e)}
              cols={30}
              className=" w-full p-2 bg-neutral-200 text-black outline-none rounded"
              placeholder="Enter Message"
              required
            ></textarea>

            <button
              type="button"
              className="bg-indigo-900 text-white font-semibold py-2 px-4 w-full rounded hover:cursor-pointer hover:bg-indigo-500 eth-card"
              onClick={(e) => handleSubmit(e)}
            >
              {!isLoading ? "Send Funds" : "Sending..."}
            </button>
            {/* <span>{done && "Thanks for Contacting me"}</span> */}
          </form>
        </div>
      </div>
      <div className="flex w-5/6 sm:h-full justify-center 2xl:px-20 gradient-bg-transactions mx-auto">
        <div className="flex flex-col md:p-12 py-8 px-4">
          {currentAccount ? (
            <h3 className=" text-zinc-700 text-3xl text-center sm:my-2">
              Latest Transactions
            </h3>
          ) : (
            <h3 className=" text-zinc-700 text-3xl text-center my-2">
              Connect your account to see the latest transactions
            </h3>
          )}

          <div className="flex flex-wrap justify-center items-center mt-4 sm:mt-10">
            {[...transactions]?.reverse().map((transaction, i) => (
              <TransactionsCard key={i} {...transaction} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactBig;
