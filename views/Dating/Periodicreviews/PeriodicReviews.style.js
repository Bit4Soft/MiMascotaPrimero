import { StyleSheet } from "react-native";

export default StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: "#245e4b",
    },
    content: {
        flexGrow: 1,
        backgroundColor: "#f3eddf",
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1D2951",
    },
    statusBar: {
        backgroundColor: "#245e4b",
        barStyle: "light-content",
    },
    Button: {
        backgroundColor: "#f9f8f4",
        padding: 10,
        marginTop: 20,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: "#245e4b",
        borderRadius: 10,
        width: "80%",
        height: "15%",
        justifyContent:  'center',
        alignItems: 'center',
        borderWidth: 3
    },
    ButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        alignContent: "center",
    },
})