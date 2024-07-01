import { useState, useRef } from "react";
import Loader from "../../components/common/Loader";
import { ticketDetailValidations, ticketSubjectValidations } from "../../utils/ticket/ticket-validations";
import Input from "../../components/authentication/Input";
import { useSelector } from "react-redux";
import { useMessage } from "../../hooks/useMessage";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

export default function CreateTicket() {
    document.title = 'Create a Ticket';

    const userId = useSelector(store => store.auth.user.uid);
    const {messageContent, setMessage} = useMessage();

    const [loading, setLoading] = useState(false);

    const allowSubmit = useRef({
        subject: false,
        detail: false,
    });
    const newTicket = useRef(1);

    function onSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());

        if((Object.values(allowSubmit.current)).every(value => value === true)) {
            createFirebaseTicket(data);
        }
    }

    async function createFirebaseTicket(data) {
        setMessage(undefined);
        setLoading(true);

        try {
            const colRef = collection(firestore, 'tickets');
            await addDoc(colRef, {
                ...data,
                userId: userId,
                ticketTime: new Date().toISOString(),
            });
            newTicket.current = newTicket.current + 1;
            setMessage({type: 'success', message: 'New Ticket has been created!'});
            setLoading(false);
        }
        catch (error) {
            setMessage({type: 'error', message: 'Too many requests, try again later!'});
            setLoading(false);
        }
    }

    return (
        <div key={newTicket.current}>
            <h3 className="text-gray-700 text-3xl font-semibold mb-8">Create a Ticket</h3>
            {messageContent}
            <div className="p-6 bg-white rounded-md shadow-md">
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-6 mt-4">
                        <Input ref={allowSubmit} label='Ticket Subject' id='subject' disabled={loading} validations={ticketSubjectValidations}/>
                        <Input ref={allowSubmit} textarea label='Write your Issue' id='detail' disabled={loading} validations={ticketDetailValidations}/>
                    </div>
                    <div className={`flex ${loading ? 'justify-between items-end' : 'justify-end'} mt-4`}>
                        {loading && <Loader/>}
                        <button disabled={loading} className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}