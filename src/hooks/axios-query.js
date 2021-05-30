import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../Context/AxiosContext";

export const useQuery = (url) => {
  const { axiosClient } = useContext(AxiosContext);
  const [{ error, isLoading, data }, setState] = useState({
    isLoading: true,
  })

  useEffect(() => {
    axiosClient.get(url)
      .then(resp => setState((prevState) => ({
        ...prevState,
        isLoading: false,
        data: resp.data
      })))
      .catch(err => setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: err
      })))
  }, [url, axiosClient])

  return [error, isLoading, data]
}

export const useLazyQuery = (url) => {
  const { axiosClient } = useContext(AxiosContext);
  const [{ error, isLoading, data }, setState] = useState({
    isLoading: true,
  })

  const fetchData = () => {
    axiosClient.get(url)
      .then(resp => setState((prevState) => ({
        ...prevState,
        isLoading: false,
        data: resp.data
      })))
      .catch(err => setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: err
      })))
  }

  return [
    { error, isLoading, data },
    fetchData
  ]
}

export const useMutation = (url, body) => {
  const { axiosClient } = useContext(AxiosContext);
  const [{ error, isLoading, data }, setState] = useState({
    isLoading: false,
  })

  const mutate = (bodyData = body) => {
    setState(prevState => ({
      ...prevState,
      isLoading: true
    }))
    axiosClient.post(url, bodyData)
      .then(resp => setState((prevState) => ({
        ...prevState,
        isLoading: false,
        data: resp.data
      })))
      .catch(err => setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: err
      })))
  }

  useEffect(() => {

  }, [url, body, axiosClient])

  return [
    { error, isLoading, data },
    mutate
  ]
}
