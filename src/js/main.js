import populateSuppliersField from './functions/genericFunctions/populateSuppliersField.js';
import changeBackground from './functions/genericFunctions/changeBackground.js';
import addSupplier from './functions/CRUD/addSupplier.js'

const defaultButtons = document.querySelectorAll('.ButtonType');
const submitButton = document.getElementById("SubmitButton");
const checkStatusSuppliersInfo = document.getElementById("completeSuppliers");
const searchField = document.getElementById("Search");
const addSupplierField = document.getElementById("addSupplier")



checkStatusSuppliersInfo.value = "on";
d3.csv(`../data/Apoio Fornecedores AC - BD.csv`).then(DATASTORE => {

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
})          