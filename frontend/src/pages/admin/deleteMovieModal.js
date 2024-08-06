import React from 'react'
import { Modal, message } from 'antd'
import { DeleteMovie } from '../../api/movie'
import { showLoading, hideLoading } from '../../redux/loaderSlice'
import { useDispatch } from 'react-redux'

function DeleteMovieModal({
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    selectedMovie,
    setSelectedMovie
}) {

    const dispatch = useDispatch()
    const handleCancel = () => {
        setIsDeleteModalOpen(false)
        setSelectedMovie(null)
    }

    const handleOk = async () => {
        try {
            dispatch(showLoading())
            const movieId = selectedMovie._id
            console.log(movieId)
            const response = await DeleteMovie({movieId})
            if (response.success){
                message.success(response.message)
                setIsDeleteModalOpen(false)
            }
            else{
                message.error(response.message)
            }

            setSelectedMovie(null)
            dispatch(hideLoading())
        } catch (error) {
            dispatch(hideLoading())
            message.error(error)

        }
    }

  return (
    <>
        <Modal
            title={null}
            open={isDeleteModalOpen}
            onCancel={handleCancel}
            onOk={handleOk}
            width={'60%'}
                
        >
            <p>Are you sure you want to delete the movie details?</p>
        </Modal>
    </>
  )
}

export default DeleteMovieModal