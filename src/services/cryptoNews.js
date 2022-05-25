import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const  cryptoNewsHeaders= {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': '366675cdffmsh367658d293627e3p1b2eb3jsnca0600597793'
}

const baseUrl= 'https://bing-news-search1.p.rapidapi.com';

const createRequest =(url)=> ({url,headers:cryptoNewsHeaders})

export const cryptoNewsApi= createApi({
      reducerPath: "cryptoNewsApi",
      baseQuery :fetchBaseQuery({baseUrl}),
      endpoints : (builder) =>({
          getCryptoNews: builder.query({
              query : ({newsCategory,count})=> createRequest(`/news/search?q=${newsCategory}&form=TNSA02&count=${count}`)
          })
      })
})

export const {
    useGetCryptoNewsQuery,
} =cryptoNewsApi;