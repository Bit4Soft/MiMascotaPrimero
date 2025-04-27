import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#245e4b",
  },
  scrollView: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    backgroundColor: "#fff4ea",
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 20,
    textAlign: 'center',
  },
  // Contenedores
  twoColumnContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  fullWidthContainer: {
    marginBottom: 15,
  },
  // Columnas
  column: {
    flex: 1,
    maxWidth: '50%',
  },
  columnSpacer: {
    width: 13,
  },
  // Formularios
  formContainer: {
    paddingLeft: 0, // Ajustado para mejor alineación
  },
  inputContainer: {
    marginBottom: 0,
  },
  label: {
    fontSize: 16,
    color: "#1D2951",
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#245e4b',
    borderRadius: 8,
    padding: 12,
    width: '100%',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#245e4b',
    borderRadius: 8,
  },
  multilineInput: {
    minHeight: 50,
    textAlignVertical: 'top',
  },
  continueButton: {
    backgroundColor: "#245e4b",
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#fff',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});