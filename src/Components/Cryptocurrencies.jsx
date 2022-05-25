import React,{useState,useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card,Row ,Col,Input } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100;
  const {data : cryptoList,isFetching} = useGetCryptosQuery(count);
  const[cryptos,setCryptos]= useState(cryptoList?.data?.coins)
  const [searchTerm,setSearchTerm]= useState('')

  useEffect(()=>{
    setCryptos(cryptoList?.data?.coins);
    const filterData =cryptoList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filterData);
  },[cryptoList,searchTerm])
  if(isFetching) return 'Loading...'
  return (
    <div>
      {!simplified && (
        <div className='search-crypto'>
        <Input placeholder='Search Cryptocurrency' onChange={(e)=>setSearchTerm(e.target.value)}/>
      </div>
      )}  
      <Row gutter={[32,32]} className='crypto-card-container'>
        {cryptos?.map((currency)=>(
            <Col xs={24} lg={6} className="crypto-card" key={currency.id}>
              <Link to={`/crypto/${currency.id}`}>
                <Card
                 title= {`${currency.rank}.${currency.name}`}
                 extra={<img className='crypto-image' src={currency.iconUrl}/>}
                 hoverable
                >
                  <p> Price : {millify(currency.price)}</p>
                  <p> Price : {millify(currency.marketCap)}</p>
                  <p> Price : {millify(currency.change)}</p>
                </Card>
              </Link>
            </Col>
        ))}
      </Row>
    </div>
  )
}

export default Cryptocurrencies