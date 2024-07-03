const pleyer1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const pleyer2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};


async function rollDice() {
    return Math.floor(Math.random() * 6 + 1);

}


async function getRandomBlock() {
    let random = Math.random();
    let resultado

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO"
    }

    return result
}


async function logRollResul(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);

}


async function pleyerRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // Sortear Bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`);

        // Rolar Dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // Test De Abilidades
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResul(character1.NOME,
                "velocidade",
                diceResult1,
                character1.VELOCIDADE);

            await logRollResul(character2.NOME,
                "velocidade",
                diceResult2,
                character2.VELOCIDADE);
        }
        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;


            await logRollResul(character1.NOME,
                "manobrabilidade",
                diceResult1,
                character1.MANOBRABILIDADE);

            await logRollResul(character2.NOME,
                "manobrabilidade",
                diceResult2,
                character2.MANOBRABILIDADE);
        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;


            console.log(`${character1.NOME} Confrontou com ${character2.NOME}!🥊`);

            await logRollResul(character1.NOME,
                "poder",
                diceResult1,
                character1.PODER);

            await logRollResul(character2.NOME,
                "poder",
                diceResult2,
                character2.PODER);
            

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} Venceu o Confronto! ${character2.NOME} Perdeu 1 ponto 🐢`);
                character2.PONTOS--;
            }

            //character2.PONTOS -= powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0;

            // if (powerResult1 > powerResult2) {
            //     if (character2.PONTOS > 0) {
            //         character2.PONTOS--;
            //     }
            // }

            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} Venceu o Confronto! ${character1.NOME} Perdeu 1 ponto 🐢`);
                character1.PONTOS--;
            }

            //character1.PONTOS -= powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 : 0;  

            // if (character2 > powerResult1) {
            //     if (character1 > 0) {
            //         character1.PONTOS--;
            //     }
            // }
            
            console.log(character2 === powerResult1 ? "Confronto Empatado! Nenhum ponto foi perdido" : "");
            // if (character2 === powerResult1) {
            //     console.log("Confronto Empatado! Nenhum ponto foi perdido");
            // }
        }

        // Verificando O vencedor
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} Marcou um ponto!`);
            character1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} Marcou um ponto!`);
            character2.PONTOS++;
        }



        console.log("----------------------------------------------------------")
    }


}

async function declareWinner(character1, character2) {
    console.log("Resultado Final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} Pontos(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} Pontos(s)`);

    if (character1.PONTOS > character2.PONTOS) 
        console.log(`\n${character1.NOME} Venceu a Corrida! Parabens! 🏆`);
    else if (character2.PONTOS > character1.PONTOS) 
        console.log(`\n${character2.NOME} Venceu a Corrida! Parabens! 🏆`);
    else console.log("A Corrida termino em Empate! ⚔");
    
}

(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${pleyer1.NOME} e ${pleyer2.NOME} Começando...\n`
    );

    await pleyerRaceEngine(pleyer1, pleyer2);
    await declareWinner(pleyer1, pleyer2)
})();




