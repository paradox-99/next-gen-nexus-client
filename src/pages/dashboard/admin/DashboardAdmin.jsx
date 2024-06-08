import { PieChart } from '@mui/x-charts/PieChart';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { ThemeProvider, createTheme } from '@mui/material';

const poppinsFont = createTheme({
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
        fontSize: 16,
    },
});

const DashboardAdmin = () => {

    const axiosPublic = useAxiosPublic();

    const { data: counts } = useQuery({
        queryKey: ['adminDashboard'],
        queryFn: async () => {
            const response = await axiosPublic.get("/adminDashboardData");
            return response.data;
        }
    });

    const data = [
        { id: 0, value: counts?.usersCount, label: 'Total Users' },

        { id: 1, value: counts?.productsCount, label: 'Total Product' },
        { id: 2, value: counts?.reviewsCount, label: 'Total Review' },
    ];

    return (
        <div className='flex justify-center items-center min-h-screen px-60'>
            <ThemeProvider theme={poppinsFont}>
                <PieChart
                    series={[
                        {
                            data,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            arcLabel: (item) => `${item.label} (${item.value})`,
                        },
                    ]}
                    height={500}
                    
                />
            </ThemeProvider>
        </div>
    );
};

export default DashboardAdmin;