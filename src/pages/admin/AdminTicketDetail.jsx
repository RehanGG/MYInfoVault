import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import RequestName from "../../components/request/RequestName";

export default function AdminTicketDetail() {

    document.title = 'Ticket Details';

    const {ticketId} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [ticket, setTicket] = useState({});

    useEffect(() => {
        getDoc(doc(firestore, 'tickets', ticketId)).then((snapshot) => {
            if(!snapshot.exists()) {
                navigate('/admin/admin-tickets');
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
                        <span>Ticket From</span>
                        <span className="text-xl"><RequestName userId={ticket.userId}/></span>
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