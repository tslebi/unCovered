import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/wallet/connectors";
import Web3 from "web3";
import NumericInput from "react-numeric-input";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";

export default function Home() {
  let web3 = new Web3(Web3.givenProvider);
  const [value, setValue] = useState(1);
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  const sendHandler = () => {
    console.log("dasdas", value, typeof value);
    web3.eth.sendTransaction({
      from: account,
      to: "0x6Bb7290d7F6F48bAab6D1e387E5234A655449f20",
      value: web3.utils.toWei(value.toString(), "ether") * 0.1,
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        backgroundColor: "black",
        letterSpacing: "2px",
        fontWeight: "300",
        fontFamily: "Oswald",
      }}
    >
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div>
        <div
          style={{
            fontSize: "90px",
            fontWeight: "400",
            color: "white",
            lineHeight: "68px",
            letterSpacing: "6px",
          }}
        >
          Unc0vered
        </div>
        <div
          style={{
            textAlign: "end",
            fontWeight: "400",
            fontSize: "36px",
            color: "white",
            letterSpacing: "6px",
          }}
        >
          NFT
        </div>
      </div>
      <div
        style={{
          height: "3px",
          width: "35%",
          backgroundColor: "white",
          marginTop: "20px",
        }}
      ></div>
      <button
        style={{
          marginTop: "30px",
          borderWidth: "2px",
          color: "white",
          padding: "10px 14px",
          fontSize: "20px",
        }}
        onClick={() => {
          if (active && account) {
          } else {
            connect();
          }
        }}
      >
        {active && account
          ? `Wallet Connected: ${account}`
          : "Connect Wallet with MetaMask"}
      </button>
      <div
        style={{
          color: "white",
          fontSize: "30px",
          marginTop: "40px",
          marginBottom: "30px",
        }}
      >
        Total Minted: 556 /10000
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ color: "white", fontSize: "30px" }}>I want to mint</div>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value.toFixed(2));
          }}
          style={{
            height: "30px",
            marginLeft: "6px",
            marginRight: "6px",
            width: "50px",
            padding: "3px 6px",
            borderRadius: "6px",
          }}
          min="1"
          max="10"
          type="number"
        />
        <div style={{ color: "white", fontSize: "30px" }}>mannequin(s)</div>
      </div>
      <button
        onClick={() => {
          if (active) {
            sendHandler();
          } else {
            return;
          }
        }}
        type="button"
        style={{
          marginTop: "30px",
          borderWidth: "2px",
          color: "white",
          padding: "10px 14px",
          fontSize: "20px",
        }}
      >
        {active
          ? `Mint ${value} mannequin(s) for ${
              value * 0.1
            } ETH + Network gas fees`
          : "Wallet is not connected"}
      </button>
      <div
        style={{
          height: "3px",
          width: "65%",
          backgroundColor: "white",
          marginTop: "24px",
          marginBottom: "60px",
        }}
      ></div>
    </div>
  );
}
