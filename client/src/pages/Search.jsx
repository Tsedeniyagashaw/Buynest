import { useEffect, useState } from 'react'
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';

function Search() {
    const [results, setResults] = useState([]);
      const location = useLocation();

   const query = new URLSearchParams(location.search).get("q");

useEffect(() => {
  const fetchSearch = async () => {
    const res = await API.get(`/products?search=${query}`);

    setResults(res.data);
  };

  fetchSearch();
}, [query]);
  return (
    <div>
        <h2>Search results for {query}</h2>
        {results.map((product) => (
                <ProductCard key={product._id}  product={product}/>
            ))}
      
    </div>
  )
}

export default Search
