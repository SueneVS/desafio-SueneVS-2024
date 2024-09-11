import recintos from "./lista-recintos.js";
import animais from "./lista-animais.js";


class RecintosZoo {
    constructor() {
        this.recintos = recintos;
        this.animais = animais;
    }

    encontrarAnimal(especie) {
        return this.animais.find(animal => animal.especie === especie);
    }

    validarEntrada(animal, quantidade) {
        const animalInfo = this.encontrarAnimal(animal);
        if (!animalInfo) {
            return { erro: "Animal inválido" };
        }
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }
        return null;
    }

    calcularEspacoOcupado(recinto, novoAnimal, quantidade) {
        let espacoOcupado = recinto.animais.reduce((total, animal) => {
            return total + (animal.quantidade * animal.espacoOcupado);
        }, 0);

        if (recinto.animais.length > 0 && !recinto.animais.some(animal => animal.especie === novoAnimal)) {
            espacoOcupado += 1; 
        }

        const animalInfo = this.encontrarAnimal(novoAnimal);
        if (animalInfo) {
            espacoOcupado += quantidade * animalInfo.tamanho;
        }
        return espacoOcupado;
    }

    biomaValido(recinto, animalInfo) {
        return animalInfo.biomas.includes(recinto.bioma) || recinto.bioma === "savana e rio";
    }

    podeAdicionarHipopotamo(recinto) {
        return recinto.bioma === "savana e rio" || recinto.animais.length === 0;
    }

    podeAdicionarMacaco(recinto, quantidade) {
        return quantidade >= 2 || recinto.animais.length > 0;
    }

    animaisCompatíveis(animalInfo, recinto) {
        const temAnimalIncompativel = recinto.animais.some(recintoAnimal => {
            const infoAnimalRecinto = this.encontrarAnimal(recintoAnimal.especie);
    
            if (animalInfo.carnivoro) {
                if (infoAnimalRecinto.carnivoro) {
                    return infoAnimalRecinto.especie !== animalInfo.especie;
                } else {
                    return true;
                }
            } else {
                if (infoAnimalRecinto.carnivoro) {
                    return true;
                }
            }
            return false; 
        });
        return !temAnimalIncompativel;
    }

    analisaRecintos(animal, quantidade) {
        const validacao = this.validarEntrada(animal, quantidade);
        if (validacao) {
            return validacao;
        }

        const recintosViaveis = [];
        const animalInfo = this.encontrarAnimal(animal);

        this.recintos.forEach(recinto => {

            if (!this.biomaValido(recinto, animalInfo)) {
                return;
            }

            if (animal === "HIPOPOTAMO" && !this.podeAdicionarHipopotamo(recinto)) {
                return;
            }

            if (animal === "MACACO" && !this.podeAdicionarMacaco(recinto, quantidade)) {
                return;
            }

            if (!this.animaisCompatíveis(animalInfo, recinto)) {
                return;
            }

            const espacoOcupado = this.calcularEspacoOcupado(recinto, animal, quantidade);
            if (espacoOcupado <= recinto.tamanhoTotal) {
                recintosViaveis.push(
                    `Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - espacoOcupado} total: ${recinto.tamanhoTotal})`
                );
            }
        });

        if (recintosViaveis.length > 0) {
            return { recintosViaveis };
            } else {
            return { erro: "Não há recinto viável" };
            }
    }
}

export { RecintosZoo as RecintosZoo };

//const zoo = new RecintosZoo();
//console.log(zoo.analisaRecintos('MACACO', 2));
//console.log(zoo.analisaRecintos('UNICORNIO', 1));
