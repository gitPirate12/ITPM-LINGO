import './Popup.css'
import { IoClose } from "react-icons/io5";


const Popup = ({ showPopup, closePopup, children }) => {
  if (!showPopup) return null;
  
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <IoClose  className="close-btn" onClick={closePopup}/>
        
        {children} 
      </div>
    </div>
  )
}

export default Popup