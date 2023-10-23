import { RiArrowDownSLine, RiDeleteBin5Line, RiEdit2Line } from 'react-icons/ri'
import { Tooltip as ReactTooltip } from 'react-tooltip'


const ListClientsItem = ({cliente}) => {
    return (
        <tr className="transition-all duration-500 ease-in-out hover:bg-gray-100  text-black font-medium border-b ">
            <td className="p-2 text-center bg-white">{cliente.nombre}</td>
            <td className="p-2 text-center bg-white ">{cliente.razon_social}</td>
            <td className="p-2 text-center bg-white  ">{cliente.rfc}</td>
            <td className="p-2 text-center bg-white  ">{cliente.telefono}</td>
            <td className="p-2 text-center bg-white  ">{cliente.celular}</td>
            <td className="p-2 text-center bg-white  ">{cliente.direccion}</td>
            <td className="p-2 text-center bg-white  ">{cliente.alias}</td>
            <td className="p-2 text-center bg-white">

                <div className='flex justify-center items-center gap-4'>
                    <button data-tooltip-id="my-tooltip-1" className="bg-[#FBE38F] text-[#7E7900] font-medium py-2 px-2 mt-1 rounded-full" ><RiEdit2Line /></button>


                    <button data-tooltip-id="my-tooltip-2" className="bg-[#FBDDD8] text-[#E85036] font-medium py-2 px-2 mt-1 rounded-full"><RiDeleteBin5Line /></button>


                    <button data-tooltip-id="my-tooltip-3" className="bg-[#D7F4F5] text-[#43CCCF] font-medium py-2 px-2 mt-1 rounded-full"><RiArrowDownSLine /></button>
                </div>


                <ReactTooltip
                    id="my-tooltip-1"
                    place="top"
                    style={{ backgroundColor: "#02004A", color: "#fff", padding: "5px", }}
                    content="Editar"
                />

                <ReactTooltip
                    id="my-tooltip-2"
                    place="top"
                    style={{ backgroundColor: "#02004A", color: "#fff", padding: "5px", }}
                    content="Borrar"
                />

                <ReactTooltip
                    id="my-tooltip-3"
                    place="top"
                    style={{ backgroundColor: "#02004A", color: "#fff", padding: "5px", }}
                    content="Ver mas?"
                />

            </td>
        </tr>
    )
}

export default ListClientsItem