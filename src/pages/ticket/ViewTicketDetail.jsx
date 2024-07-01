import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { useSelector } from "react-redux";

export default function ViewTicketDetail() {

    document.title = 'Ticket Details';

    const {ticketId} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [ticket, setTicket] = useState({});
    const userId = useSelector(state => state.auth.user.uid);

    useEffect(() => {
        getDoc(doc(firestore, 'tickets', ticketId)).then((snapshot) => {
            if(!snapshot.exists()) {
                navigate('/list-tickets');
                return;
            }

            if(snapshot.data().userId !== userId) {
                navigate('/list-tickets');
                return;
            }

            setTicket(snapshot.data());
            setLoading(false)
        });
    }, []);

    if(loading) {
        return (<Loader/>);
    }

    return (
        <> 
            <div className="mt-8">
                <h3 className="text-gray-700 text-2xl mb-8">Ticket Details - {ticketId}</h3>
                <div className="p-6 bg-white rounded-md shadow-md">
                    <div className="flex flex-col mb-3">
                        <span>Subject</span>
                        <span className="text-xl">{ticket.subject}</span>
                    </div>
                    <div className="flex flex-col mb-3">
                        <span>Issue</span>
                        <span className="text-xl">{ticket.detail}</span>
                    </div>
                </div>
            </div>
        </>
    );

}