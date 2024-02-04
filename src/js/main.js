import populateSuppliersField from './functions/genericFunctions/populateSuppliersField.js';
import changeBackground from './functions/genericFunctions/changeBackground.js';
import addSupplier from './functions/CRUD/addSupplier.js'

const defaultButtons = document.querySelectorAll('.ButtonType');
const submitButton = document.getElementById("SubmitButton");
const checkStatusSuppliersInfo = document.getElementById("completeSuppliers");
const searchField = document.getElementById("Search");
const addSupplierField = document.getElementById("addSupplier")

const caminhoArquivoCSV = '../data/Apoio Fornecedores AC - BD.csv';
let DATASTORE = null;

// Função para visualizar o conteúdo atual do CSV
async function visualizarConteudoAntes() {
    try {
        // Utilizando a API fetch para ler o arquivo localmente
        const response = await fetch(caminhoArquivoCSV);
        const conteudo = await response.text();
        DATASTORE = converterCSVParaArrayDeObjetos(conteudo);
        console.log(DATASTORE);  // Agora vai mostrar os dados corretamente

        // Chama outra função ou executa operações adicionais aqui, se necessário
        outraOperacao(DATASTORE);
    } catch (err) {
        console.error('Erro ao ler o arquivo CSV:', err);
    }
}

// Função para converter o CSV em um array de objetos
function converterCSVParaArrayDeObjetos(conteudoCSV) {
    // Utilizando a biblioteca papaparse para fazer o parse do CSV
    const resultado = Papa.parse(conteudoCSV, {
        header: true, // Indica que a primeira linha contém os campos
        skipEmptyLines: true // Ignora linhas vazias
    });

    // Retorna o array de objetos resultante do parse
    return resultado.data;
}

// Chama a função assíncrona
visualizarConteudoAntes();

// Função para realizar operações adicionais com DATASTORE
function outraOperacao(DATASTORE) {
    checkStatusSuppliersInfo.value = "on";
    
        let info = undefined;
        let value = checkStatusSuppliersInfo.checked ? checkStatusSuppliersInfo.value : "off";
    
        populateSuppliersField(DATASTORE, checkStatusSuppliersInfo.value);
    
        value = checkStatusSuppliersInfo.addEventListener('change', () => {
            value = checkStatusSuppliersInfo.checked ? checkStatusSuppliersInfo.value : "off";
            populateSuppliersField(DATASTORE, value, info)
            
        });
    
        defaultButtons.forEach(defaultButton => {
            defaultButton.addEventListener('click', () => {
                value = checkStatusSuppliersInfo.checked ? checkStatusSuppliersInfo.value : "off";
                info = defaultButton.textContent
                populateSuppliersField(DATASTORE, value, info)
                defaultButtons.forEach(button => {
                    button.classList.remove('clicked');
                });
                defaultButton.classList.add('clicked');
                });
        });
    
        submitButton.addEventListener('click', () => {
            if((searchField.value).length >= 3) {
                value = checkStatusSuppliersInfo.checked ? checkStatusSuppliersInfo.value : "off";
                info = searchField.value
                populateSuppliersField(DATASTORE, value, info)
                defaultButtons.forEach(button => {
                    button.classList.remove('clicked');
                });
            }
        });
    
        document.addEventListener('keydown', (event) => {
            if(event.key === "Enter" && (searchField.value).length >= 3) {
                event.preventDefault();
                value = checkStatusSuppliersInfo.checked ? checkStatusSuppliersInfo.value : "off";
                info = searchField.value
                populateSuppliersField(DATASTORE, value, info)
                defaultButtons.forEach(button => {
                    button.classList.remove('clicked');
                });
            }
        });
    
        addSupplierField.addEventListener("mouseout", () => changeBackground(null, addSupplierField))
        addSupplierField.addEventListener("mouseover", () => changeBackground("green", addSupplierField))
        addSupplierField.addEventListener("click", () => addSupplier())
}

      
