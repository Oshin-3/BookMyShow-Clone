import React, { useEffect, useState } from 'react'
import { Table, Button, Divider, message } from 'antd'
//import { setTheaters } from '../../redux/theaterSlice'
import { showLoading, hideLoading } from '../../redux/loaderSlice'
import { useSelector, useDispatch } from 'react-redux'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { GetAllTheaters } from '../../api/theater'
import { UpdateTheaters } from '../../api/theater'


function AdminTheaterList() {

    //const theaters = useSelector((state) => state.theaters)
    const [theaters, setTheaters] = useState([])
    const dispatch = useDispatch()
  
    const getAllTheaters = async () => {
      try {
        dispatch(showLoading())
        //to be continued
        const response = await GetAllTheaters()
        //console.log("all theaters-> ", response.theaters)
        if (response.success){
            const allTheaters = response.theaters
            setTheaters(
                allTheaters.map(function (item) {
                    return {...item, key: `theater${item._id}`}
                })
            )
        }
        else{
            message.error(response.error)
        }
  
        dispatch(hideLoading())
      } catch (error) {
        dispatch(hideLoading())
        message.error(error)
      }
    }

    const handleStatusChange = async (theater) => {
        try {
            dispatch(showLoading())

            let value = {...theater, theaterId: theater._id, isActive: !theater.isActive}
            console.log(value)
            const response = await UpdateTheaters(value)

            if (response.success) {
                message.success("Theater is approved")
                getAllTheaters()
            }
            else {
                message.error(response.error)
            }

            dispatch(hideLoading())
        } catch (error) {
            message.error(error)
        }
    }


    useEffect(() => {
        getAllTheaters()
    },[])
  
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
                {
                    data.isActive ? (
                        <Button danger onClick={() => handleStatusChange(data)}>Reject</Button>
                    ) : (
                        <Button type='primary' onClick={() => handleStatusChange(data)}>Approve</Button>
                    )
                }
            </div>
          )
        }
      }
    ]

    return (
      <>
        <Table dataSource={theaters}  columns={tableHeading}></Table>
      </>

      
    )
}

export default AdminTheaterList