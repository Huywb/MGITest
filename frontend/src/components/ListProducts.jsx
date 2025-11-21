import React from 'react'

const ListProducts = ({ filterProducts, handleToggleModel,currentPage, productsPerPage}) => {
    
    
    {/* Tính toán sản phảm theo trang để hiển thị */}
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filterProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className='grid grid-cols-1 p-10 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
        {currentProducts.length > 0 && currentProducts.map((product)=>(
            <div key={product.id} className='shadow-lg p-5 bg-[#f5f5f5] rounded-lg flex flex-col justify-between min-h-[250px] items-center'>
                <div className='flex flex-col items-center'>
                    <img src={product.image} alt={product.title} className='w-32 h-32 object-contain mb-4' />
                                                                 {/* Hiển thị tiêu đề sản phẩm 20 ký tự đầu*/}
                    <h2 className='text-lg font-semibold mb-2'>{product.title.slice(0,20) + "..."}</h2>
                    <p className='text-gray-700 font-bold'>${product.price}</p>
                </div>
                    <button onClick={() => handleToggleModel(product.id)} className='p-2 bg-gray-300 px-4 cursor-pointer hover:bg-[#bdbdbd] transition duration-300 outline-none'>Xem chi tiết</button>
                      
            </div>
        ))}
    </div>
  )
}

export default ListProducts
