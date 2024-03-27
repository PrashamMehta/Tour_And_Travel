import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import {SearchContext} from "../../context/SearchContext.js"
import {useNavigate} from "react-router-dom"

const Reserve = ({setOpen,hotelId}) =>
{
    const {selectedRooms, setSelectedRooms} = useState([]);
    const {data, loading, error} = useFetch(`hotels/room/${hotelId}`);
    const {dates} = useContext(SearchContext);

    const getDatesInRange = (startDate,endDate)=>{
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime());

        let dates = []

        while(date<=end)
        {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate()+1);
        }
        return dates;
    };

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) =>
    {
        const isFound = roomNumber.unavailableDates.some(date=>alldates.includes(new Date(date).getTime()));

        retrun !isFound
    }

    const handleSelect = (e) =>
    {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked ? [...selectedRooms,value] : selectedRooms.filter(item =>item!==value));
    };


    const navigate = useNavigate()

    const handleClick = async() =>
    {
        try 
        {
            await Promise.all
                (selectedRooms.map(roomId=>{
                    const res = axios.put(`/rooms/availablity/${roomId}`,
                    {dates:alldates});
                return res.data;
                })
            );
            setOpen(false)
            navigate("/")
        }
        catch (err) 
        {
            
        }
        
    }


    return
    (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={setOpen(false)}/>
                <span>Select your rooms:</span>
                {data.map(item=>(
                <div className="rItem">
                    <div className="rItemInfo"></div>
                    <div className="rTitle">{item.title}</div>
                    <div className="rDesc">{item.desc}</div>
                    <div className="rMax">Mx People : {item.maxPeople}</div>
                    <dive>
                        <div className="rPrice">{item.price}</div>
                    </dive>

                    <div className="rSelectRooms">
                        

                        {item.roomNumbers.map(roomNumbers)=>(
                                <div className="room">
                                    <label>{roomNumber.number}</label>
                                    <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)}/>
                                </div>
                        ))}
                    </div>
                </div>
                ))}
                <button onClick={handleClick} className="rbutton">Reserve Now!</button>
            </div>
        </div>
    )
}

export default Reserve