
import { RecintosZoo } from "./recintos-zoo.js";

document.getElementById('animalForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const especie = document.getElementById('especie').value;
    const quantidade = parseInt(document.getElementById('quantidade').value, 10);

    const zoo = new RecintosZoo();
    const resultado = zoo.analisaRecintos(especie, quantidade);

    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; 

    if (resultado.erro) {
        resultadosDiv.innerHTML = `<p>${resultado.erro}</p>`;
    } else {
        resultado.recintosViaveis.forEach(recinto => {
            const recintoDiv = document.createElement('div');
            recintoDiv.classList.add('resultado');
            recintoDiv.innerText = recinto;
            resultadosDiv.appendChild(recintoDiv);
        });
    }
});