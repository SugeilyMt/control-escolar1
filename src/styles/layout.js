import { StyleSheet } from "react-native";

const layoutStyles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        backgroundColor: '#ff3a00',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 15,
        marginTop: 20,
        
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    logo: {
        width: "100%",
        height: 200,
        resizeMode: "contain",
        marginBottom: 20
    },
    userContainer: {
        backgroundColor: '#c1ff00',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 30,
        marginBottom: 20,
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 40, 
        marginRight: 10,
    },
    menuTitle: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: 'bold'
    },
    menuTable: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginLeft: 20,
        marginBottom: 5
    },
    menuText: {
        fontSize: 16,
        marginStart: 10
    },
    menuOption: {
        marginTop: 5,
        marginLeft: 50,
        marginBottom: 5
    },
    icon: {
        height: 30,
        width: 30
    },
    dialog: {
        backgroundColor: '#c1ff00'
    },
    dialogText: {
        fontSize: 16,
        marginBottom: 5
    }
});

export default layoutStyles