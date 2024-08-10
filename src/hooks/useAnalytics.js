import { useState, useEffect } from 'react';

// Define la URL del endpoint
const API_URL = 'https://api-v1.hotelman.dna-nova.tech:8000/analytics';

const useAnalytics = (period) => {
  const [totalPriceGuest, setTotalPriceGuest] = useState(0); // Estado para el totalPriceGuest
  const [guest, setGuest] = useState({ total: 0, occupied: 0 }); // Estado para los datos de guest
  const [rental, setRental] = useState({ total: 0, occupied: 0 }); // Estado para los datos de rental
  const [totalClients, setTotalClients] = useState(0); // Estado para el totalClients
  const [loading, setLoading] = useState(true); // Estado para el cargando
  const [error, setError] = useState(null); // Estado para errores

  useEffect(() => {
    // Función para calcular startDate y endDate
    const getDates = (period) => {
      const now = new Date();
      let startDate = new Date();
      let endDate = new Date();

      switch (period) {
        case 'daily':
          // Para 'daily', la fecha de inicio es el inicio del día anterior y la fecha de fin es el final del día actual
          startDate = new Date(now);
          startDate.setUTCDate(now.getUTCDate() - 1); // Un día antes
          startDate.setUTCHours(0, 0, 0, 0);

          endDate = new Date(now);
          endDate.setUTCHours(23, 59, 59, 999); // Fin del día actual
          break;
        case 'weekly':
          // Para 'weekly', retroceder 7 días desde el día actual
          startDate = new Date(now);
          startDate.setUTCDate(now.getUTCDate() - 7);
          startDate.setUTCHours(0, 0, 0, 0);

          endDate = new Date(now);
          endDate.setUTCHours(23, 59, 59, 999);
          break;
        case 'monthly':
          // Para 'monthly', retroceder un mes desde el día actual
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          startDate.setUTCHours(0, 0, 0, 0);

          endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          endDate.setUTCHours(23, 59, 59, 999);
          break;
        default:
          throw new Error('Invalid period');
      }

      return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
    };

    // Función para obtener los datos
    const fetchData = async () => {
      try {
        const { startDate, endDate } = getDates(period);

        // Construir la URL con parámetros de consulta
        const url = new URL(API_URL);
        url.searchParams.append('startDate', startDate);
        url.searchParams.append('endDate', endDate);

        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Actualiza los estados con los datos obtenidos
        setTotalPriceGuest(data.totalPriceGuest);
        setGuest(data.guest);
        setRental(data.rental);
        setTotalClients(data.totalClients);
        setLoading(false); // Cambia el estado de cargando a falso
      } catch (err) {
        setError(err); // Guarda el error en el estado
        setLoading(false); // Cambia el estado de cargando a falso
      }
    };

    fetchData(); // Llama a la función para obtener los datos
  }, [period]); // El efecto se ejecuta cada vez que cambia el período

  return { totalPriceGuest, guest, rental, totalClients, loading, error }; // Devuelve los estados
};

export default useAnalytics;
