import { IoMdClose } from "react-icons/io";

const ProductDetails = ({ showModel, handleToggleModel, detailProduct }) => {
    
        
  return (
    <>
        {/* Component show chi tiết sản phẩm và bật tắt model */}
        {showModel && (
          <div onClick={handleToggleModel} className='absolute inset-0 z-20 top-0 left-0 w-full h-full bg-black/50 bg-opacity-50 flex justify-center items-center'>
            
          </div>
        )}
        {
          showModel && (
            <div className='w-full absolute h-screen flex items-center justify-center'>
              <div className='bg-white p-10 rounded-lg absolute w-[50%] flex-col z-50 flex items-center justify-center'>
                <button onClick={handleToggleModel} className='absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold cursor-pointer duration-300'><IoMdClose /></button>
                <h2 className='text-2xl font-bold mb-4'>Chi tiết sản phẩm</h2>
                <div className='w-full flex flex-col md:flex-row gap-2 '>
                  <div className='md:w-1/2 p-6'>
                    <img src={detailProduct.image} alt={detailProduct.title} className='w-80 object-cover' />
                  </div>
                  <div className='md:w-1/2 flex flex-col gap-4'>
                    <h3 className='text-xl font-semibold'>{detailProduct.title}</h3>
                    <p className='text-gray-700'>{detailProduct.description}</p>
                    <p className='text-lg font-bold'>Price: ${detailProduct.price}</p>
                    <p className='text-md'>Category: {detailProduct.category}</p>
                  </div>
                </div>
              </div>
            </div>
            
          )
        }
    </>
  )
}

export default ProductDetails
