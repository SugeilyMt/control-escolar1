import { StyleSheet } from "react-native";
import colors from "./color";

const formStyles = StyleSheet.create({
    input: {
        marginBottom: 15
    },
    btnSuccess: {
        padding: 5,
        backgroundColor: colors.primario
    },
    btnText: {
        marginTop: 10
    },
    btnLabel: {
        color: colors.oscuro
    },
    comboBox: {
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 8
    },
    radioGroup: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-around',
        marginBottom: 20,  
        borderRadius: 8, 
        backgroundColor: 'white', 
        padding: 16, 
        elevation: 4, 
        shadowColor: '#000', 
        shadowOffset: { 
            width: 0, 
            height: 2, 
        }, 
        shadowOpacity: 0.25, 
    },
    radioButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    radioLabel: {  
        fontSize: 16 
    },
    tableHead: {
        backgroundColor: colors.primario
    },
    tableRow: {
        backgroundColor: colors.fuente
    }
});

export default formStyles