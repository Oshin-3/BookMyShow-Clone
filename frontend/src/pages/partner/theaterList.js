import React, { useEffect, useState } from 'react'
import { Table, Divider, Button } from 'antd'
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { setTheaters } from '../../redux/theaterSlice'
import { showLoading, hideLoading } from '../../redux/loaderSlice'
import { useSelector, useDispatch } from 'react-redux'
import { GetAllTheatersByOwner } from '../../api/theater'
import TheaterModal from './theaterModal'
import DeleteTheaterModal from './deleteTheaterModal'
import ShowsModal from './showsModal'

function TheaterList() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedTheater, setSelectedTheater] = useState(null)
    const [formType, setFormType] = useState("add")
    const [isShowsModalOpen, setIsShowsModalOpen] = useState(false)
  
    const theaters = useSelector((state) => state.theaters)
    const owner = useSelector((state) => state.users)
  
    const dispatch = useDispatch()
  
    const getTheatersByOwner = async () => {
      try {
        dispatch(showLoading())
  
        //console.log("owner-> ", owner)
        const ownerId = owner.user._id
        const response = await GetAllTheatersByOwner(ownerId)
        dispatch(setTheaters(response))
  
        dispatch(hideLoading())
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
      getTheatersByOwner()
    }, [])
  
  
    console.log("theaters-> ", theaters.theaters.theaters)
  
    const tableHeading = [
      {
        title: "Theater Name",
        dataIndex: "theaterName",
        className: "text-color-red"
      },
      {
        title: "City",
        dataIndex: "city"
      },
      {
        title: "Address",
        dataIndex: "address"
      },
      {
        title: "Email",
        dataIndex: "email"
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (text, data) => {
          if (data.isActive) {
            return `Approved`
          }
          else {
            return `Pending/Blocked`
          }
        },
        className: "text-color-blue"
      },
      {
        title: "Action",
        dataIndex: "action",
        render: (text, data) => {
          return (
            <div>
              <Button onClick={() => {
                setIsModalOpen(true)
                setSelectedTheater(data)
                setFormType("edit")
              }}>
                <EditOutlined />
              </Button>
              <Divider type='vertical' />
              <Button onClick={() => {
                setIsDeleteModalOpen(true)
                setSelectedTheater(data)
              }}>
                <DeleteOutlined />
              </Button>
              {
                data.isActive && (
                  <><Divider type='vertical' />
                  <Button onClick={() => {
                    setIsShowsModalOpen(true)
                    setSelectedTheater(data)
                  }}>
                    <span><PlusOutlined/></span>Add Shows
                  </Button></>
                )
              }              
            </div>
          )
        }
      }
    ]
    return (
      <>
        <div className='d-flex justify-content-end'>
          <Button type='primary' onClick={() => {
            setIsModalOpen(true)
            setFormType("add")
          }}>
            <span><PlusOutlined /></span> Add Theater
          </Button>
        </div>
        <Divider type='horizontal' />
        <Table dataSource={theaters.theaters.theaters} columns={tableHeading}></Table>
        
        { isModalOpen && (
          <TheaterModal 
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            selectedTheater={selectedTheater}
            setSelectedTheater={setSelectedTheater}
            formType={formType}
            getTheatersByOwner={getTheatersByOwner}
          />
        )}
  
        { isDeleteModalOpen && (
          <DeleteTheaterModal 
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            selectedTheater={selectedTheater}
            setSelectedTheater={setSelectedTheater}
            getTheatersByOwner={getTheatersByOwner}
          />
        )}

        {
          isShowsModalOpen && (
            <ShowsModal 
              isShowsModalOpen={isShowsModalOpen}
              setIsShowsModalOpen={setIsShowsModalOpen}
              selectedTheater={selectedTheater}
              setSelectedTheater={setSelectedTheater}
              getTheatersByOwner={getTheatersByOwner}
            />

          )
        }
      </>
    )
}

export default TheaterList