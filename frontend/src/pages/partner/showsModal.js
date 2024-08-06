import { Modal } from 'antd'
import React from 'react'

function ShowsModal({
    isShowsModalOpen,
    setIsShowsModalOpen,
    selectedTheater,
    setSelectedTheater,
    getTheatersByOwner
}) {

    const handleCancel = () => {
        setIsShowsModalOpen(false)
        setSelectedTheater(null)
    }
  return (
    <>
        <Modal centered title="Add Shows" open={isShowsModalOpen} onCancel={handleCancel}>

        </Modal>
    </>
  )
}

export default ShowsModal