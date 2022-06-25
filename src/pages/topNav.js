import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
import StackPresensi from './stackPresensi';
import RiwayatPresensi from './riwayatPresensi';
export default function TopPresensi() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Menu Presensi" component={StackPresensi} />
            <Tab.Screen name="Riwayat Presensi" component={RiwayatPresensi} />
        </Tab.Navigator>
    );
}