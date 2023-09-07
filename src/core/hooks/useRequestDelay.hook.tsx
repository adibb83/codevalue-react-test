/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { getRandomArbitrary } from "../helpers/global-func";
import { SnackbarSeverity } from "../models/snackbar.modle";
import { toast } from "react-toastify";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAIL: "fail",
};

function useRequestDelay(
  delayTime = 5000,
  initData: any[] = [],
  initCurrentRecord: Object = {}
) {
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [data, useData] = useState<any[]>(initData);
  const [error, setError] = useState("");
  const [doneCallBack, setDoneCallBack] = useState<boolean>(true);
  const [currentRecord, setCurrentRecord] = useState<any>(initCurrentRecord);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    async function delayFunc() {
      setDoneCallBack(false);
      console.log("delayFunc");
      try {
        await delay(delayTime);
        useData(data);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        openSnackbarMessage("Data fetched successfully");
      } catch (error: React.SetStateAction<string | any>) {
        setRequestStatus(REQUEST_STATUS.FAIL);
        setError(error);
        setSnackbarErrorMessage(error.message);
      } finally {
        setDoneCallBack(true);
      }
    }
    delayFunc();
  },[]);

  const setSnackbarErrorMessage = (error: string) => {
    console.log("errorMessage");
    toast(error);
  };

  const openSnackbarMessage = (
    message: string,
    severity: SnackbarSeverity = SnackbarSeverity.Success
  ) => {
    console.log("openSnackbarMessage");
    toast(message);
  };

  function updateRecord(record: any) {
    const originalData = [...data];
    const newData = data.map((rec) => {
      return rec.id === record.id ? record : rec;
    });

    async function delayFunc() {
      setDoneCallBack(false);
      try {
        useData(newData);
        await delay(delayTime);
        openSnackbarMessage("Product updated successfully");
      } catch (error: React.SetStateAction<string | any>) {
        console.log(error);
        useData(originalData);
        setSnackbarErrorMessage(error.message);
      } finally {
        setDoneCallBack(true);
      }
    }

    delayFunc();
  }

  function insertRecord(record: any) {
    // A random number is enough for this case. in real life we will get it from the server
    record.id = getRandomArbitrary(1000, 5);
    const originalData = [...data];
    const newData = [record, ...data];
    setDoneCallBack(false);
    async function delayFunc() {
      try {
        useData(newData);
        await delay(delayTime);
        openSnackbarMessage("Product was created successfully");
      } catch (error: React.SetStateAction<string | any>) {
        console.log(error);
        useData(originalData);
        setSnackbarErrorMessage(error.message);
      } finally {
        setDoneCallBack(true);
      }
    }

    delayFunc();
  }

  function deleteRecord(record: any) {
    const originalData = [...data];
    const newData = data.filter((rec) => rec.id !== record.id);
    setDoneCallBack(false);
    async function delayFunc() {
      try {
        useData(newData);
        await delay(delayTime);
        openSnackbarMessage("Product was deleted");
      } catch (error: React.SetStateAction<string | any>) {
        console.log(error);
        useData(originalData);
        setSnackbarErrorMessage(error.message);
      } finally {
        setDoneCallBack(true);
      }
    }

    delayFunc();
  }

  function setActiveRecord(record: any) {
    setCurrentRecord(record);
  }

  return {
    data,
    requestStatus,
    doneCallBack,
    error,
    currentRecord,
    setActiveRecord,
    updateRecord,
    insertRecord,
    deleteRecord,
  };
}

export default useRequestDelay;
