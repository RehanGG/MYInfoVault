import { useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import { useNavigate } from "react-router-dom";

export default function Derpartments() {
    document.title = "Departments";

    const department = useSelector(state => state.department);
    const navigate = useNavigate();

    return (
        <>
            <h3 className="text-gray-700 text-3xl font-semibold mb-8">Departments</h3>
            {department.loading && <Loader/>}
            {!department.loading && (
                <div className="my-12 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {department.departments.map(dep => (
                        <div key={dep.id} onClick={() => navigate(`/department/${dep.tag}`)} className="flex flex-col items-center gap-4">
                            <div style={{ height: '200px', width: '200px' }} className="rounded-full overflow-hidden">
                                <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={dep.imgUrl} alt="" />
                            </div>
                            <span className="py-2 px-3 font-semibold text-2xl">{dep.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}