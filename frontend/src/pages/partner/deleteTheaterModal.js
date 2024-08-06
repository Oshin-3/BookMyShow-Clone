import React from 'react'
import { Modal, message } from 'antd'
import { DeleteTheater } from '../../api/theater'
import { showLoading, hideLoading } from '../../redux/loaderSlice'
import { useDispatch } from 'react-redux'

function DeleteTheaterModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedTheater,
  setSelectedTheater,
  getTheatersByOwner
}) {

  const dispatch = useDispatch()

  const handleCancel = () => {
    setIsDeleteModalOpen(false)
    setSelectedTheater(null)
  }

  const handleOk = async () =>{
    try {
      
      dispatch(showLoading())

      const theaterId = selectedTheater._id
      console.log(theaterId)

      const response = await DeleteTheater(theaterId)

      if (response.success){
        setIsDeleteModalOpen(false)
        getTheatersByOwner()
        message.success(response.message)
        
      }
      else {
        message.error(response.error)
        setIsDeleteModalOpen(false)
      }

      
      setSelectedTheater(null)
      dispatch(hideLoading())
      
    } catch (error) {
      dispatch(hideLoading())
      //message.error(error)
    }
  }


  return (
    <>
       <Modal
        title={null}
        open={isDeleteModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        width={"60%"}
       >
          <p>Are you sure you want to delete the theater details?</p>
        </Modal> 
    </>
  )
}

export default DeleteTheaterModal