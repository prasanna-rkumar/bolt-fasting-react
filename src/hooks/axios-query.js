import { useCallback, useEffect, useState } from "react";
import { get, post } from "../axios-helper";

export const useQuery = (url) => {
  const [{ error, isLoading, data }, setState] = useState({
    isLoading: true,
  })

  const fetchData = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true
    }))
    get({ url })
      .then(resp => setState({
        isLoading: false,
        data: resp.data
      }))
      .catch(err => {
        setState({
          isLoading: false,
          error: err.response
        })
        if (err.response?.data?.error?.code === 'auth/id-token-expired') {
          fetchData()
        }
      })
  }, [url])

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return [
    { error, isLoading, data },
    fetchData
  ]
}

export const useLazyQuery = (url) => {
  const [{ error, isLoading, data }, setState] = useState({
    isLoading: true,
  })

  const fetchData = () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true
    }))
    get({ url })
      .then(resp => setState({
        isLoading: false,
        data: resp.data
      }))
      .catch(err => {
        setState({
          isLoading: false,
          error: err.response
        })
        if (err.response?.data?.error?.code === 'auth/id-token-expired') {
          fetchData()
        }
      })
  }

  return [
    { error, isLoading, data },
    fetchData
  ]
}

export const useMutation = (url, body, refetch) => {
  const [{ error, isLoading, data }, setState] = useState({
    isLoading: false,
  })

  const mutate = (bodyData) => {
    if (bodyData === undefined) bodyData = body
    setState((prevState) => ({
      ...prevState,
      isLoading: true
    }))
    return new Promise((resolve, reject) => {
      post({ url, data: bodyData })
        .then(resp => {
          setState({
            isLoading: false,
            data: resp.data,
          });
          if (typeof refetch === 'function') refetch()
          resolve(resp.data)
        })
        .catch(err => {
          setState({
            isLoading: false,
            error: err.response
          })
          if (err.response?.data?.error?.code === 'auth/id-token-expired') {
            mutate(bodyData)
          }
          reject(err.response)
        })
    })
  }

  return [
    { error, isLoading, data },
    mutate
  ]
}
