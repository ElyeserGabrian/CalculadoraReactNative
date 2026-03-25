import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { Button } from "react-native-web";


export default function TelaPrincipal() {

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
        <View>
            <TextInput 
                multiline={true} 
                numberOfLines={4}
                value={txt}
                onChangeText={setTxt}
                placeholder="Digite algo ..."
                style={styles.txtArea}
             />
            <View style={styles.botoes}>
                <Button
                    title="7"
                    onPress={() => concatVal("7")}
                />
                <Button
                    title="8"
                    onPress={() => concatVal("8")}
                />
                <Button
                    title="9"
                    onPress={() => concatVal("9")}
                />
                <Button
                    title="4"
                    onPress={() => concatVal("4")}
                />
                <Button
                    title="5"
                    onPress={() => concatVal("5")}
                />
                <Button
                    title="6"
                    onPress={() => concatVal("6")}
                />
                <Button
                    title="1"
                    onPress={() => concatVal("1")}
                />
                <Button
                    title="2"
                    onPress={() => concatVal("2")}
                />
                <Button
                    title="3"
                    onPress={() => concatVal("3")}
                />
                <Button
                    title="+"
                    onPress={() => concatVal("+")}
                />
                <Button
                    title="-"
                    onPress={() => concatVal("-")}
                />
                <Button
                    title="/"
                    onPress={() => concatVal("/")}
                />
                <Button
                    title="x"
                    onPress={() => concatVal("x")}
                />
                <Button
                    title="C"
                    onPress={() => concatVal("C")}
                />
                <Button
                    title="="
                    onPress={() => concatVal("=")}
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    txtArea:{
        width: "100%",
        height: "20%"
    }
})