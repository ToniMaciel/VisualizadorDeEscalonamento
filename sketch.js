// array com o tempo necessario para cada processo ser processado
let processos = [120, 90, 30, 30, 300, 30]
// quantum de tempo do escalonador
let quantum = 30
// cor de cada processo para desenho
let cores = [
	873, 111, 93,
	55, 114, 255,
	223, 41, 53,
	253, 202, 64,
	76, 159, 112,
	227, 185, 188
]

// tempo total necessario para processamento de todos os processos
const reducer = (accumulator, currentValue) => accumulator + currentValue;
let tempo_total = processos.reduce(reducer)
// numero de janelas necessarias
let janelas = tempo_total / quantum
// altura e largura das janelas no desenho
let largura_janela = 1000 / janelas
let altura_janela = 800 / processos.length


// funcao do P5 que inicia
function setup(){
	// cria uma tela
	createCanvas(1000, 800)
	// desenha o fundo numa cor cinza (200, 200, 200)
	background(200)

	// funcao que desenha a moldura para os processos
	desenhar_moldura()

	// funcao que desenha todos os processos
	desenhar_processos()
}


function desenhar_moldura(){

	// percorre as janelas necessarias para processar tudo
	for(let i = 0; i < janelas; i++){
		// bota quantas linhas vao ser necessarias (um projeto = uma linha)
		for(let j = 0; j < processos.length; j ++){
			// preenche o retangulo com branco e define a largura da linha como 4
			fill(255)
			stroke(4)
			// desenha o retangulo a partir do ponto (largura_janela * i, altura_janela * j) com a largura e a altura definidos
			rect(largura_janela * i, altura_janela * j, largura_janela, altura_janela)
		}
	}
}

function desenhar_processo(i, j, indice_do_processo){
	// pega o RGB referente ao processo e preenche o retangulo
	fill(cores[indice_do_processo*3], cores[indice_do_processo*3 + 1],cores[indice_do_processo*3 + 2])
	// desenha o retangulo com uma estrategia similar ao desenhar_moldura()
	rect(largura_janela * i, altura_janela * j, largura_janela, altura_janela)
}

function desenhar_processos(){

	// Round-robin

	// Etapa de computacao
	let indicejanela = 0

	while(processos.reduce(reducer) != 0){

		//Checa todo o ciclo de processos
		for (let indice = 0; indice < processos.length; indice++) {
			//Se o processo não tive terminado, dá mais um quantum para que ele possa executar
			if (processos[indice] != 0) {
				//Desenha o processo na tabela e reduz o tempo já computado
				desenhar_processo(indicejanela, indice, indice)
				processos[indice] -= quantum

				//Incrementa a etapa de computação
				indicejanela++
			}
		}
	}
}
