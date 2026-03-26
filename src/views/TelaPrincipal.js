import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";


export default function TelaPrincipal() {
    
    function Botao({ title, onPress, tipo }) {
      let estilo = [styles.botao];
    
      if (tipo === "numero") estilo.push(styles.botaoNumero);
      if (tipo === "operador") estilo.push(styles.botaoOperador);
      if (tipo === "igual") estilo.push(styles.botaoIgual);
      if (tipo === "clear") estilo.push(styles.botaoClear);
    
      return (
        <TouchableOpacity style={estilo} onPress={onPress}>
          <Text style={styles.textoBotao}>{title}</Text>
        </TouchableOpacity>
      );
    }

    const [txt, setTxt] = useState("");
    const [numeroAtual, setNumeroAtual] = useState("")
    const [listaNum, setListaNum] = useState([]);
    const [listaOp, setListaOp]  = useState([]);

    function concatVal(num){
        if (num == "C"){
            setTxt("")
            setListaNum([])
            setListaOp([])
            setNumeroAtual("")
        } else {
                if (!isNaN(num)){
                    setNumeroAtual(prev => prev + num)
                    setTxt(prev => prev + num)
                } else {
                    if (numeroAtual !== ""){
                        console.log(numeroAtual)
                        setListaNum(prev => [...prev, Number(numeroAtual)])
                        setNumeroAtual("")
                    }

                    if (num === "="){
                        calcular();
                    } else {
                        let qtdNums = listaNum.length;

                        if (numeroAtual !== "") {
                        qtdNums += 1;
                        }

                        if (qtdNums === 0 || qtdNums <= listaOp.length) return;

                        setListaOp(prev => [...prev, num])
                        setTxt(prev => prev + num)
                    }
                }

        }
    }

    /* 
        [784,332]
        ["+"]


    */

    function calcular(){
        let nums = [...listaNum]

        if(numeroAtual !== ""){
            nums.push(Number(numeroAtual))
        }



        if (nums.length == 0) return;
        
        let result = nums[0];

        for (let i = 0; i < listaOp.length; i++){
            let op = listaOp[i];
            let proxNum = nums[i + 1]
            
            switch(op) {
                case "+":
                    
                    result += proxNum;
                    break;
                case "-":
                    result -= proxNum;
                    break;
                case "x":
                    result *= proxNum;
                    break;
                case "/":
                    result = result / proxNum;
                    break;
            }
        }

        setTxt(String(result))
    }


       return(
        <View style={styles.container}>
            <TextInput 
                multiline={true} 
                numberOfLines={4}
                value={txt}
                onChangeText={(texto) => {
                    setTxt(texto);

                    if (texto == ""){
                        setTxt("")
                        setListaNum([])
                        setListaOp([])
                        setNumeroAtual("")
                    }
                }}
                placeholder="Digite algo ..."
                style={styles.txtArea}
             />
            <View style={styles.grid}>
                <Botao
                    title="7"
                    tipo="numero"
                    onPress={() => concatVal("7")}
                />
                <Botao
                    title="8"
                    tipo="numero"
                    onPress={() => concatVal("8")}
                />
                <Botao
                    title="9"
                    tipo="numero"
                    onPress={() => concatVal("9")}
                />
                <Botao
                    title="/"
                    tipo="operador"
                    onPress={() => concatVal("/")}
                />

                <Botao
                    title="4"
                    tipo="numero"
                    onPress={() => concatVal("4")}
                />
                <Botao
                    title="5"
                    tipo="numero"
                    onPress={() => concatVal("5")}
                />
                <Botao
                    title="6"
                    tipo="numero"
                    onPress={() => concatVal("6")}
                />
                <Botao
                    title="x"
                    tipo="operador"
                    onPress={() => concatVal("x")}
                />
                <Botao
                    title="1"
                    tipo="numero"
                    onPress={() => concatVal("1")}
                />
                <Botao
                    title="2"
                    tipo="numero"
                    onPress={() => concatVal("2")}
                />
                <Botao
                    title="3"
                    tipo="numero"
                    onPress={() => concatVal("3")}
                />
                <Botao
                    title="-"
                    tipo="operador"
                    onPress={() => concatVal("-")}
                />

                <Botao
                    title="0"
                    tipo="numero"
                    onPress={() => concatVal("0")}
                />
                <Botao
                    title="C"
                    tipo="clear"
                    onPress={() => concatVal("C")}
                />
                <Botao
                    title="="
                    tipo="igual"
                    onPress={() => concatVal("=")}
                />
                <Botao
                    title="+"
                    tipo="operador"
                    onPress={() => concatVal("+")}
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    justifyContent: "flex-end",
    padding: 10,
  },

  txtArea: {
    backgroundColor: "rgb(218, 252, 253)",
    color: "rgb(0, 0, 0)",
    fontSize: 32,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    textAlign: "right",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  botao: {
    width: "22%",
    height: 70,
    marginBottom: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotao: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  botaoNumero: {
    backgroundColor: "#333",
  },

  botaoOperador: {
    backgroundColor: "#ff9500",
  },

  botaoIgual: {
    backgroundColor: "#34c759",
  },

  botaoClear: {
    backgroundColor: "#ff3b30",
  },
});