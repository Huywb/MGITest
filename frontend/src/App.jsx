import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { CiSearch } from "react-icons/ci";
import ListProducts from './components/ListProducts';
import ProductDetails from './components/ProductDetails';

function App() {
  //* State Management *//
  const [products, setProducts] = useState([])            
  const [filterProducts,setFilterProducts] = useState([])
  const [showModel,setShowModel] = useState(false)
  const [detailProduct,setDetailProduct] = useState({})
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //* Lấy id và toggle modal *//
  const handleToggleModel = (id) =>{
    setShowModel(!showModel)
    setDetailProduct(products.find((product)=>product.id === id))
  }

  //* Phân trang *//
  let productsPerPage = 8
  let totalPages = Math.ceil(filterProducts.length / productsPerPage)

  //* Sắp xếp theo giá sản phẩm *//
  const handleChange = (e) =>{
    const value = e.target.value
    let sortedProducts = [...filterProducts]

    if(value === "increase"){
      sortedProducts.sort((a,b)=> a.price - b.price)
    } else if(value === "descrease"){
      sortedProducts.sort((a,b)=> b.price - a.price)
    } else {
      sortedProducts = [...products]
    }

    setFilterProducts(sortedProducts)
  }

  //* Lọc sản phẩm theo title *//
  const FilterProduct = (value)=>{
    let filterProducts = [...products]
     const filteredProducts = filterProducts.filter((product)=>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilterProducts(filteredProducts)
  }  

  //* Lấy dữ liệu từ API *//
  useEffect(()=>{
    //^set Loading trong khi đợi API call
    setLoading(true);
    const fetchData = async () => {
    try {
      const res = await axios.get('https://fakestoreapi.com/products')
      setProducts(res.data)
      setFilterProducts(res.data)
      setLoading(false);
    } catch (err) {
      console.error(err)
    }
  };
  // Giả lập delay 5.5s để thấy được hiệu ứng loading
  const delayFetchData = setTimeout(() => {
    fetchData();
  }, 5500);
  return () => clearTimeout(delayFetchData);
  },[])

  return (
      <div className=' w-full min-h-screen flex justify-center bg-[#616161] relative'>
        <div className=' m-10 flex flex-col container w-full '>
            
            {/* Thanh tìm kiếm và sắp xếp */}

            <div className='flex gap-2 items-center justify-center bg-[#f5f5f5] mx-auto relative w-[50%] '>
                <select className='p-2 cursor-pointer outline-none' onChange={handleChange} >
                  <option value="">All</option>
                  <option value="descrease">High to Low</option>
                  <option value="increase">Low to High</option>
                </select>
              <input type="text" onChange={(e)=>FilterProduct(e.target.value)} className='w-full rounded-lg py-2 outline-none bg-[#f5f5f5] text-black px-2 ' />
              <div className=' p-2 rounded-lg absolute right-0'>
                <CiSearch size={28} />
              </div>
            </div>
            
            {/* Loading animation trong khi đợi call API */}
            { 
              loading &&
              <div className="grid grid-cols-1 p-10 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {
                  Array.from({ length: 8 },(_, i) => (
                    <div key={i} className="animate-pulse  border   shadow-lg p-5 bg-[#f5f5f5] rounded-lg flex flex-col justify-between min-h-[250px] items-center'>
                    <div className='flex l items-center"
                    >
                    </div>
                  ))
                }
              </div>
            }

            {/* Component hiển thị danh sách sản phẩm */}
            <ListProducts filterProducts={filterProducts} handleToggleModel={handleToggleModel} currentPage={currentPage} productsPerPage={productsPerPage} />
            {
              filterProducts.length === 0 && !loading &&
              <p className='col-span-full w-full h-[300px] text-2xl font-semibold flex justify-center items-center'>Không tìm thấy sản phẩm</p>
            }
            
            {/* Các nút phân trang */}
            <div className='flex items-center justify-center '>
              {
                Array.from({length: totalPages}, (_, index) => (
                  <button key={index} className={` p-2 px-4 m-2 cursor-pointer outline-none hover:bg-blue-400 transition duration-200 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} rounded-lg`} onClick={() => setCurrentPage(index + 1)  }>
                    {index+1}
                  </button>
                ))
              }
            </div>
        </div>
        {/* Component hiển thị chi tiết sản phẩm */}
        <ProductDetails showModel={showModel} handleToggleModel={handleToggleModel} detailProduct={detailProduct} />
      </div>
  )
}

export default App
