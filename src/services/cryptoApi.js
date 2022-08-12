import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const  cryproApiHeaders= {
    'X-RapidAPI-Key': '366675cdffmsh367658d293627e3p1b2eb3jsnca0600597793',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
};

const baseUrl= 'https://coinranking1.p.rapidapi.com';

const createRequest =(url)=> ({url,headers:cryproApiHeaders})

export const cryptoApi= createApi({
      reducerPath: "cryptoApi",
      baseQuery :fetchBaseQuery({baseUrl}),
      endpoints : (builder) =>({
          getCryptos: builder.query({
              query : (count)=> createRequest(`/coins?limit=${count}`)
          }),
          getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
          }),
      
          // Note: Change the coin price history endpoint from this - `coin/${coinId}/history/${timeperiod} to this - `coin/${coinId}/history?timeperiod=${timeperiod}`
          getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
          }),
      
          // Note: To access this endpoint you need premium plan
          getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
          }),
      })
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
  useGetExchangesQuery,
  useGetCryptoHistoryQuery,
} =cryptoApi;