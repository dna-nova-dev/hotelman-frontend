import React, { useState, useEffect } from 'react';
import { Edit, Trash, Plus } from 'lucide-react';

const RoomView = () => {
    const [rooms, setRooms] = useState([]);
    const [clients, setClients] = useState([]);
    const [assignOccupant, setAssignOccupant] = useState(null);
    const [updateRoomStatus, setUpdateRoomStatus] = useState(null);
    const [newRoom, setNewRoom] = useState(null);

    // Función para obtener las habitaciones desde el backend
    const fetchRooms = async () => {
        try {
            const response = await fetch('https://api-v1.hotelman.dna-nova.tech/rooms');
            if (!response.ok) {
                throw new Error('Error al obtener las habitaciones');
            }
            const data = await response.json();
            setRooms(data);
        } catch (error) {
            console.error('Error al obtener las habitaciones:', error);
        }
    };

    // Función para obtener los clientes desde el backend
    const fetchClients = async () => {
        try {
            const response = await fetch('https://api-v1.hotelman.dna-nova.tech/clients');
            if (!response.ok) {
                throw new Error('Error al obtener los clientes');
            }
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
        }
    };

    // Llamar a las funciones fetch al montar el componente
    useEffect(() => {
        fetchRooms();
        fetchClients();
    }, []);

    const handleAssignOccupant = async () => {
        try {
            const response = await fetch('https://api-v1.hotelman.dna-nova.tech/rooms/assign', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roomNumber: assignOccupant.roomNumber,
                    occupantId: assignOccupant.occupantId,
                }),
            });
            if (response.ok) {
                setRooms(rooms.map(r => r._id === assignOccupant._id ? { ...r, occupantId: assignOccupant.occupantId } : r));
                setAssignOccupant(null);
            } else {
                throw new Error('Error al asignar ocupante');
            }
        } catch (error) {
            console.error('Error al asignar ocupante:', error);
        }
    };

    const handleUpdateRoomStatus = async () => {
        try {
            const response = await fetch('https://api-v1.hotelman.dna-nova.tech/rooms/status', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    occupantId: updateRoomStatus.occupantId,
                    status: updateRoomStatus.status,
                }),
            });
            if (response.ok) {
                setRooms(rooms.map(r => r._id === updateRoomStatus._id ? { ...r, status: updateRoomStatus.status } : r));
                setUpdateRoomStatus(null);
            } else {
                throw new Error('Error al actualizar estado de la habitación');
            }
        } catch (error) {
            console.error('Error al actualizar estado de la habitación:', error);
        }
    };

    const handleCreateRoom = async () => {
        try {
            const response = await fetch('https://api-v1.hotelman.dna-nova.tech/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newRoom,
                    roomType: newRoom.roomType === 'Hospedaje' ? 'guest' : 'rental', // Convertir al formato interno
                }),
            });
            if (response.ok) {
                const createdRoom = await response.json();
                setRooms([...rooms, createdRoom]);
                setNewRoom(null);
            } else {
                throw new Error('Error al crear la habitación');
            }
        } catch (error) {
            console.error('Error al crear la habitación:', error);
        }
    };

    return (
        <div className="px-4 lg:px-33 p-6 bg-gray-100 min-h-screen">
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Buscar clientes por nombre o ID"
                    className="p-2 border border-gray-300 rounded-md w-1/3 mr-4"
                />
                <button
                    onClick={() => setNewRoom({ roomNumber: '', roomType: 'Hospedaje', name: '', description: '', status: 'Disponible' })}
                    className="bg-purple-500 text-white p-2 rounded-md flex items-center"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Habitación
                </button>
                <button
                    onClick={() => setAssignOccupant({ roomNumber: '', occupantId: '' })}
                    className="bg-blue-500 text-white p-2 rounded-md flex items-center ml-2"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Asignar Ocupante
                </button>
                <button
                    onClick={() => setUpdateRoomStatus({ roomNumber: '', status: 'Disponible' })}
                    className="bg-green-500 text-white p-2 rounded-md flex items-center ml-2"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Actualizar Estado
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Número de Habitación</th>
                            <th className="py-2 px-4 border-b">Nombre</th>
                            <th className="py-2 px-4 border-b">Descripción</th>
                            <th className="py-2 px-4 border-b">Ocupante</th>
                            <th className="py-2 px-4 border-b">Estado</th>
                            <th className="py-2 px-4 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => (
                            <tr key={room._id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{room.roomNumber}</td>
                                <td className="py-2 px-4 border-b">{room.name}</td>
                                <td className="py-2 px-4 border-b">{room.description}</td>
                                <td className="py-2 px-4 border-b">
                                    {clients.find(client => client._id === room.occupantId)?.nombres || 'Ninguno'}
                                </td>
                                <td className="py-2 px-4 border-b">{room.status}</td>
                                <td className="py-2 px-4 border-b flex space-x-2">
                                    <button
                                        onClick={() => setAssignOccupant(room)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setRooms(rooms.filter(r => r._id !== room._id))}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {newRoom && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Crear Nueva Habitación</h2>
                        <input
                            type="text"
                            value={newRoom.roomNumber}
                            onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                            placeholder="Número de Habitación"
                            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
                        />
                        <select
                            value={newRoom.roomType}
                            onChange={(e) => setNewRoom({ ...newRoom, roomType: e.target.value })}
                            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
                        >
                            <option value="Hospedaje">Hospedaje</option>
                            <option value="Renta">Renta</option>
                        </select>
                        <input
                            type="text"
                            value={newRoom.name}
                            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                            placeholder="Nombre"
                            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
                        />
                        <input
                            type="text"
                            value={newRoom.description}
                            onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                            placeholder="Descripción"
                            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
                        />
                        <select
                            value={newRoom.status}
                            onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}
                            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
                        >
                            <option value="Disponible">Disponible</option>
                            <option value="No disponible">No disponible</option>
                            <option value="Limpiando">Limpiando</option>
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setNewRoom(null)}
                                className="bg-gray-500 text-white p-2 rounded-md"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateRoom}
                                className="bg-purple-500 text-white p-2 rounded-md"
                            >
                                Crear
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {assignOccupant && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Asignar Ocupante</h2>
                        <input
                            type="text"
                            value={assignOccupant.roomNumber}
                            onChange={(e) => setAssignOccupant({ ...assignOccupant, roomNumber: e.target.value })}
                            placeholder="Número de Habitación"
                            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
                            disabled
                        />
                        <select
                            value={assignOccupant.occupantId}
                            onChange={(e) => setAssignOccupant({ ...assignOccupant, occupantId: e.target.value })}
                            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
                        >
                            <option value="">Seleccionar Ocupante</option>
                            {clients.map(client => (
                                <option key={client._id} value={client._id}>
                                    {client.nombres}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setAssignOccupant(null)}
                                className="bg-gray-500 text-white p-2 rounded-md"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleAssignOccupant}
                                className="bg-blue-500 text-white p-2 rounded-md"
                            >
                                Asignar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {updateRoomStatus && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Actualizar Estado de Habitación</h2>
                        <input
                            type="text"
                            value={updateRoomStatus.roomNumber}
                            onChange={(e) => setUpdateRoomStatus({ ...updateRoomStatus, roomNumber: e.target.value })}
                            placeholder="Número de Habitación"
                            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
                            disabled
                        />
                        <select
                            value={updateRoomStatus.status}
                            onChange={(e) => setUpdateRoomStatus({ ...updateRoomStatus, status: e.target.value })}
                            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
                        >
                            <option value="Disponible">Disponible</option>
                            <option value="No disponible">No disponible</option>
                            <option value="Limpiando">Limpiando</option>
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setUpdateRoomStatus(null)}
                                className="bg-gray-500 text-white p-2 rounded-md"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleUpdateRoomStatus}
                                className="bg-blue-500 text-white p-2 rounded-md"
                            >
                                Actualizar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomView;
