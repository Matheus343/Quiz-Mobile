import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { getPerguntasByTema } from './database';  

export default function TelaJogo({ route, navigation }) {
  const { temaId, quantidade } = route.params;
  const [perguntas, setPerguntas] = useState([]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [alternativas, setAlternativas] = useState([]);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [pontuacaoTotal, setPontuacaoTotal] = useState(0);
  const [respostas, setRespostas] = useState([]); 

  useEffect(() => {
    carregarPerguntas(); 
  }, []);

  const carregarPerguntas = async () => {
    try {
      const result = await getPerguntasByTema(temaId); 
      const perguntasSelecionadas = result.slice(0, quantidade); 
      setPerguntas(perguntasSelecionadas);
      embaralharAlternativas(perguntasSelecionadas[0]);
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
    }
  };

  const embaralharAlternativas = (pergunta) => {
    const alternativasEmbaralhadas = [
      pergunta.correta,
      pergunta.alternativa1,
      pergunta.alternativa2,
      pergunta.alternativa3,
    ]
    .filter((alternativa, index, self) => alternativa && self.indexOf(alternativa) === index) 
    .sort(() => Math.random() - 0.5); 

    setAlternativas(alternativasEmbaralhadas);
};


  const selecionarResposta = (resposta) => {
    setRespostaSelecionada(resposta);
  };

  const confirmarResposta = () => {
    if (respostaSelecionada === null) {
      Alert.alert('Erro', 'Por favor, selecione uma alternativa.');
      return;
    }

    const respostaCorreta = perguntas[perguntaAtual].correta;
    const pontuacao = respostaSelecionada === respostaCorreta ? 100 : 0;
    setPontuacaoTotal(pontuacaoTotal + pontuacao);

    const novasRespostas = [...respostas, pontuacao]; 
    setRespostas(novasRespostas);

    if (perguntaAtual + 1 < perguntas.length) {
      setPerguntaAtual(perguntaAtual + 1);
      embaralharAlternativas(perguntas[perguntaAtual + 1]);
      setRespostaSelecionada(null);
    } else {
      const resultadoFinal = ((pontuacaoTotal + pontuacao) / perguntas.length).toFixed(0); 
      navigation.navigate('TelaResultado', { resultadoFinal, respostas: novasRespostas, quantidade });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BrainBuster</Text>
      <Text style={styles.label}>Pergunta {perguntaAtual + 1}</Text>

      <ScrollView style={styles.questionBox}>
        <Text style={styles.questionText}>{perguntas[perguntaAtual]?.pergunta}</Text>
      </ScrollView>

      {alternativas.map((alternativa, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionBox,
            respostaSelecionada === alternativa && styles.selectedOptionBox,
          ]}
          onPress={() => selecionarResposta(alternativa)}
        >
          <Text style={styles.optionText}>{alternativa}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.confirmButton} onPress={confirmarResposta}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5C2F7A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#DEAB04',
    fontSize: 36,
    fontFamily: 'Jura_400Regular',
    marginTop: 60,
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Jura_400Regular',
  },
  questionBox: {
    backgroundColor: '#DEAB04',
    borderRadius: 20,
    width: '80%',
    height: 140,
    padding: 5,
    marginBottom: 15,
    paddingVertical: 15,
  },
  questionText: {
    color: '#5C2F7A',
    fontSize: 18,
    fontFamily: 'Jura_400Regular',
  },
  optionBox: {
    backgroundColor: '#DEAB04',
    borderRadius: 20,
    width: '80%',
    padding: 15,
    marginVertical: 3,
  },
  selectedOptionBox: {
    backgroundColor: '#FFFF',
  },
  optionText: {
    color: '#5C2F7A',
    fontSize: 18,
    fontFamily: 'Jura_400Regular',
  },
  confirmButton: {
    backgroundColor: '#DEAB04',
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: '#5C2F7A',
    fontSize: 20,
    fontFamily: 'Jura_400Regular',
  },
});
