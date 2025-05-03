import { StyleSheet } from "react-native";

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f3eddf",
    },
    container: {
        padding: 16,
        
      },
      center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      },
      card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 3, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      title: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 8,
      },
      estado: {
        marginTop: 8,
        fontStyle: "italic",
        color: "#666",
      },
      emptyText: {
        fontSize: 18,
        color: "#111",
        textAlign: "center",
        fontWeight: "bold",
        top: -50,
        
      },
      imagenlogo: {
        width: 200,
        height: 200,
        marginBottom: 300,
        
      },
});