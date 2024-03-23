import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";

const Reserve = ({setOpen,hotelId}) =>
{
    const {data, loading, error} = useFetch(`hotels/room/${hotelId}`)
    return(
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={setOpen(false)}/>
                <span>Select your rooms:</span>
                {statusbar.map(item)}
            </div>
        </div>
    )
}

export default Reserve