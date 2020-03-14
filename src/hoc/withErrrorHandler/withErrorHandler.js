import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux";

const WithErrorHandler = (WrappedComponent, axios) => {
  return function Home(props) {
    const [error, setError] = useState(null);

    const reqInterceptors = axios.interceptors.request.use(null, req => {
      setError(null);
      return req;
    });
    const resInterceptors = axios.interceptors.response.use(null, err => {
      setError(err);
    });

    useEffect(() => {
      return () => {
        console.log("rendering", resInterceptors.reqInterceptors);
        axios.interceptors.request.eject(reqInterceptors);
        axios.interceptors.response.eject(resInterceptors);
      };
    }, [reqInterceptors, resInterceptors]);

    const clickedHandler = () => {
      setError(null);
    };

    return (
      <Aux>
        <Modal modalClosed={clickedHandler} show={error}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default WithErrorHandler;
