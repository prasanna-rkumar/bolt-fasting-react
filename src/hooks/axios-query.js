import { useCallback, useContext, useEffect, useState } from "react";
import { AxiosContext } from "../Context/AxiosContext";

export const useQuery = (url) => {
  const { axiosClient, refreshToken } = useContext(AxiosContext);
  const [{ error, isLoading, data }, setState] = useState({
    isLoading: true,
  })

  const fetchData = useCallback(() => {
    setState({
      isLoading: true
    })
    axiosClient.get(url)
      .then(resp => setState({
        isLoading: false,
        data: resp.data
      }))
      .catch(err => {
        setState({
          isLoading: false,
          error: err
        })
        if (err.response.data?.error?.code === 'auth/id-token-expired') {
          refreshToken()
        }
      })
  }, [url, axiosClient, refreshToken])

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return [
    { error, isLoading, data },
    fetchData
  ]
}

export const useLazyQuery = (url) => {
  const { axiosClient, refreshToken } = useContext(AxiosContext);
  const [{ error, isLoading, data }, setState] = useState({
    isLoading: true,
  })

  const fetchData = () => {
    setState({
      isLoading: true
    })
    axiosClient.get(url)
      .then(resp => setState({
        isLoading: false,
        data: resp.data
      }))
      .catch(err => {
        setState({
          isLoading: false,
          error: err
        })
        if (err.response.data?.error?.code === 'auth/id-token-expired') {
          refreshToken()
        }
      })
  }

  return [
    { error, isLoading, data },
    fetchData
  ]
}

export const useMutation = (url, body, refetch) => {
  const { axiosClient, refreshToken } = useContext(AxiosContext);
  const [{ error, isLoading, data }, setState] = useState({
    isLoading: false,
  })

  const mutate = (bodyData = body) => {
    setState({
      isLoading: true
    })
    axiosClient.post(url, bodyData)
      .then(resp => {
        setState({
          isLoading: false,
          data: resp.data,
        });
        if (typeof refetch === 'function') refetch()
      })
      .catch(err => {
        setState({
          isLoading: false,
          error: err
        })
        if (err.response.data?.error?.code === 'auth/id-token-expired') {
          refreshToken()
        }
      })
  }

  useEffect(() => {

  }, [url, body, axiosClient])

  return [
    { error, isLoading, data },
    mutate
  ]
}
