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
        
    }, 
    textContainer: {
        width: "90%",
        alignSelf: "flex-end", 
        marginRight: 20,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1D2951",
        textAlign: "left",
    },
    input: {
        width: "90%",
        alignSelf: "center", 
    },
    Button: {
        backgroundColor: "#245e4b",
        padding: 10,
        marginTop: 20,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: "#a4c672",
        borderRadius: 10,
        width: "80%",
        height: 40,
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
    },
    inputnotas: {
        width: "90%",
        height: 100,
        textAlignVertical: 'top',
        alignSelf: "center",
        marginBottom: 150,
    },
    date: {
        width: "90%",
        alignSelf: "center", 
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#fff",
    },
    dateText: {
        fontSize: 16,
        color: "#1D2951",
    },
    horario: {
        width: "90%",
        alignSelf: "center", 
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#fff",   
    },
    
   
    dropdownButton: {
        width: "100%",
        alignSelf: "center", 
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#fff",
    },
    
});

