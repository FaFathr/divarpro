import React from "react";
import { checkOtp } from "../../services/auth";
import { setCookie } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/user";
import styles from "./CheckOtpForm.module.css"
function CheckOtpForm({ code, setCode, mobile, setStep }) {
  const navigate = useNavigate();
  const { refetch } = useQuery(["profile"], getProfile);
  const submitHandler = async (event) => {
    event.preventDefault();
    if (code.length !== 5) return;
    const { response, error } = await checkOtp(mobile, code);
    console.log({ error, response });
    if (response) {
      setCookie(response.data);
      navigate("/");
      refetch();
    }
    if (error) console.log(error.response.data.message);
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کئ پیامک شده</p>
      <span>کئ پیامک شده به این شماره {mobile}را وارد نمایید.</span>
      <label htmlFor="input">کدتایید را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="کدتایید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button onClick={() => setStep(1)} className={styles.backbutton} >تغییر شماره موبایل</button>
    </form>
  );
}

export default CheckOtpForm;
