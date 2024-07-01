import { useEffect, useState } from "react";
import { requestTime } from "../../utils/utils";
import Loader from "../../components/common/Loader";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RequestName from "../../components/request/RequestName";

export default function ListTicketsAdmin() {

    document.title = 'Support Tickets'

    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState([]);
    const userId = useSelector(state => state.auth.user.uid);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(firestore, 'tickets'), orderBy("ticketTime", "desc")), querySnapshot => {
            const tmpTickets = [];
            querySnapshot.forEach((doc) => {
                tmpTickets.push({docId: doc.id, ...doc.data()});
            })
            
            setLoading(false);
            setTickets(tmpTickets);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const handleDelete = (ticketId) => {
         deleteDoc(doc(firestore, 'tickets', ticketId));
    }

    function TicketsTable() {
        return (
            <div className="flex flex-col mt-8">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Ticket Subject</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Ticket Date</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Ticket Department</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100"></th>
                                
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                {tickets.map(ticket => {
                                    return (
                                        <tr key={ticket.docId}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5 font-medium text-gray-900">{ticket.subject}</div>      
                                            </td>
                                            
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5 text-gray-500">
                                                    {requestTime(ticket.ticketTime)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5 text-gray-500">
                                                    Support
                                                </div>      
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5 text-gray-500">
                                                    <RequestName userId={ticket.userId}/>
                                                </div>      
                                            </td>
                                            <td className="flex flex-col px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                <Link to={ticket.docId} className="text-indigo-600 hover:text-indigo-900">
                                                    View
                                                </Link>
                                            
                                            </td>
                                        
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <h3 className="text-gray-700 text-3xl font-semibold mb-8">Support Tickets</h3>
            {loading && <Loader/>}
            {!loading && <TicketsTable/>}
        </>
    );
}